import { parseWaitlist } from "@/lib/waitlist";

// Limite simples por IP (melhor esforço: vale por instância da função).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (rateLimited(ip)) return json({ error: "Muitas tentativas. Tente de novo em um minuto." }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requisição inválida." }, 400);
  }

  const parsed = parseWaitlist(body);
  if (!parsed.ok) return json({ error: parsed.error }, 400);
  if ("spam" in parsed) return json({ ok: true });

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) {
    console.error("waitlist: SUPABASE_URL/SUPABASE_SECRET_KEY não configuradas");
    return json({ error: "A lista de espera ainda não está configurada. Volte em breve!" }, 503);
  }

  // Chaves novas (sb_secret_...) vão só no header apikey; chaves JWT legadas também no Authorization.
  const headers: Record<string, string> = {
    apikey: key,
    "Content-Type": "application/json",
    // E-mail repetido = sucesso silencioso, sem duplicar e sem revelar que já existia.
    Prefer: "resolution=ignore-duplicates,return=minimal",
  };
  if (!key.startsWith("sb_")) headers.Authorization = `Bearer ${key}`;

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/waitlist?on_conflict=email`, {
    method: "POST",
    headers,
    body: JSON.stringify(parsed.entry),
  });

  if (!res.ok) {
    console.error("waitlist: falha ao gravar", res.status, await res.text());
    return json({ error: "Não deu para salvar agora. Tente de novo em instantes." }, 502);
  }

  return json({ ok: true });
}
