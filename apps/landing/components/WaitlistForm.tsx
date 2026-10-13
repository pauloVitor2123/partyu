"use client";

import { track } from "@vercel/analytics";
import { Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useState } from "react";

const OPCOES = [
  { value: "organizar_grupo", label: "Organizar rolês com meus amigos" },
  { value: "achar_companhia", label: "Achar gente pra ir junto aos eventos" },
  { value: "criar_evento", label: "Criar meu próprio evento ou rolê" },
] as const;

type Origem = { utm_source?: string; utm_medium?: string; utm_campaign?: string; referrer?: string };

const STORAGE_KEY = "partyu:origem";

// Guarda a primeira origem da visita (UTM + referrer), para atribuir a inscrição ao canal certo
// mesmo que a pessoa navegue entre páginas antes de se inscrever.
function lerOrigem(): Origem {
  try {
    const salva = sessionStorage.getItem(STORAGE_KEY);
    if (salva) return JSON.parse(salva) as Origem;
  } catch {}
  const params = new URLSearchParams(window.location.search);
  const origem: Origem = {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    referrer: document.referrer || undefined,
  };
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(origem));
  } catch {}
  return origem;
}

type Estado = { tipo: "idle" } | { tipo: "enviando" } | { tipo: "ok" } | { tipo: "erro"; mensagem: string };

export function WaitlistForm({ titulo = true }: { titulo?: boolean }) {
  const id = useId();
  const [estado, setEstado] = useState<Estado>({ tipo: "idle" });
  // Registra a origem já na chegada, antes de a pessoa navegar para outra página.
  useEffect(() => {
    lerOrigem();
  }, []);

  async function enviar(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (form.getAll("interesses").length === 0) {
      setEstado({ tipo: "erro", mensagem: "Marque pelo menos uma opção do que você quer do Partyu." });
      return;
    }
    setEstado({ tipo: "enviando" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          interesses: form.getAll("interesses"),
          bairro: form.get("bairro"),
          consent: form.get("consent") === "on",
          empresa: form.get("empresa"),
          pagina: window.location.pathname,
          ...lerOrigem(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setEstado({ tipo: "erro", mensagem: data.error ?? "Algo deu errado. Tente de novo." });
        return;
      }
      track("waitlist_signup", { interesses: form.getAll("interesses").join(",") });
      setEstado({ tipo: "ok" });
    } catch {
      setEstado({ tipo: "erro", mensagem: "Sem conexão. Confira sua internet e tente de novo." });
    }
  }

  if (estado.tipo === "ok") {
    return (
      <div className="form-sucesso" role="status">
        <p className="form-sucesso-titulo">Pronto, você está na lista! 🎉</p>
        <p>Assim que a versão de testes abrir no Rio, a gente te chama por e-mail.</p>
      </div>
    );
  }

  return (
    <form className="waitlist" onSubmit={enviar} noValidate={false}>
      {titulo && <h2 className="waitlist-titulo">Entre na lista de espera</h2>}

      <label className="campo" htmlFor={`${id}-email`}>
        <span>Seu e-mail</span>
        <input id={`${id}-email`} name="email" type="email" required autoComplete="email" placeholder="voce@email.com" />
      </label>

      <fieldset className="campo">
        <legend>
          O que você mais quer do Partyu? <small>(marque quantas quiser)</small>
        </legend>
        {OPCOES.map((op) => (
          <label key={op.value} className="opcao">
            <input type="checkbox" name="interesses" value={op.value} />
            <span className="opcao-caixa" aria-hidden="true">
              <Check size={14} strokeWidth={3} />
            </span>
            <span>{op.label}</span>
          </label>
        ))}
      </fieldset>

      <label className="campo" htmlFor={`${id}-bairro`}>
        <span>
          Seu bairro <small>(opcional)</small>
        </span>
        <input id={`${id}-bairro`} name="bairro" type="text" maxLength={80} placeholder="Ex.: Tijuca" />
      </label>

      {/* Honeypot anti-robô: escondido de pessoas e de leitores de tela. */}
      <div className="honeypot" aria-hidden="true">
        <label>
          Empresa
          <input name="empresa" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="consentimento">
        <input type="checkbox" name="consent" required />
        <span>
          Aceito receber o convite e novidades do Partyu por e-mail e li a{" "}
          <Link href="/privacidade">Política de Privacidade</Link>.
        </span>
      </label>

      <button className="botao" type="submit" disabled={estado.tipo === "enviando"}>
        {estado.tipo === "enviando" ? "Enviando…" : "Quero ser avisado"}
      </button>

      {estado.tipo === "erro" && (
        <p className="form-erro" role="alert">
          {estado.mensagem}
        </p>
      )}
    </form>
  );
}
