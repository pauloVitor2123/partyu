// Validação da inscrição na lista de espera (spec 15). Função pura: usada pela rota e pelos testes.

export const INTERESSES = ["organizar_grupo", "achar_companhia", "criar_evento"] as const;
export type Interesse = (typeof INTERESSES)[number];

// Versão do texto de consentimento exibido no formulário. Mude ao alterar o texto.
export const CONSENT_VERSION = "2026-10-13";

export type WaitlistEntry = {
  email: string;
  interesses: Interesse[];
  bairro: string | null;
  pagina: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  consent_version: string;
};

export type ParseResult =
  | { ok: true; entry: WaitlistEntry }
  | { ok: true; spam: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

export function parseWaitlist(body: unknown): ParseResult {
  if (!body || typeof body !== "object") return { ok: false, error: "Requisição inválida." };
  const b = body as Record<string, unknown>;

  // Honeypot: humanos não veem o campo "empresa"; robôs costumam preencher.
  if (text(b.empresa, 200)) return { ok: true, spam: true };

  const email = text(b.email, 254)?.toLowerCase();
  if (!email || !EMAIL_RE.test(email)) return { ok: false, error: "Informe um e-mail válido." };

  const brutos = Array.isArray(b.interesses) ? b.interesses : [];
  if (brutos.length === 0 || !brutos.every((i) => INTERESSES.includes(i as Interesse))) {
    return { ok: false, error: "Escolha pelo menos uma opção do que você quer do Partyu." };
  }
  // Remove repetidos e mantém a ordem canônica.
  const interesses = INTERESSES.filter((i) => brutos.includes(i));

  if (b.consent !== true) return { ok: false, error: "É preciso aceitar a Política de Privacidade." };

  return {
    ok: true,
    entry: {
      email,
      interesses,
      bairro: text(b.bairro, 80),
      pagina: text(b.pagina, 200),
      utm_source: text(b.utm_source, 100),
      utm_medium: text(b.utm_medium, 100),
      utm_campaign: text(b.utm_campaign, 100),
      referrer: text(b.referrer, 500),
      consent_version: CONSENT_VERSION,
    },
  };
}
