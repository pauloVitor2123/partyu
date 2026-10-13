import { describe, expect, it } from "vitest";
import { CONSENT_VERSION, parseWaitlist } from "./waitlist";

const valid = {
  email: "  Pessoa@Exemplo.com ",
  interesses: ["criar_evento", "achar_companhia"],
  bairro: "Botafogo",
  consent: true,
  pagina: "/",
  utm_source: "instagram",
};

describe("parseWaitlist", () => {
  it("aceita uma inscrição válida e normaliza o e-mail", () => {
    const result = parseWaitlist(valid);
    expect(result).toMatchObject({
      ok: true,
      entry: {
        email: "pessoa@exemplo.com",
        interesses: ["achar_companhia", "criar_evento"],
        bairro: "Botafogo",
        pagina: "/",
        utm_source: "instagram",
        utm_medium: null,
        consent_version: CONSENT_VERSION,
      },
    });
  });

  it("bairro é opcional", () => {
    const result = parseWaitlist({ ...valid, bairro: "   " });
    expect(result.ok && "entry" in result && result.entry.bairro).toBeNull();
  });

  it("rejeita e-mail inválido", () => {
    expect(parseWaitlist({ ...valid, email: "nao-e-email" })).toEqual({
      ok: false,
      error: "Informe um e-mail válido.",
    });
  });

  it("aceita uma única opção", () => {
    const result = parseWaitlist({ ...valid, interesses: ["organizar_grupo"] });
    expect(result.ok && "entry" in result && result.entry.interesses).toEqual(["organizar_grupo"]);
  });

  it("remove opções repetidas", () => {
    const result = parseWaitlist({ ...valid, interesses: ["criar_evento", "criar_evento"] });
    expect(result.ok && "entry" in result && result.entry.interesses).toEqual(["criar_evento"]);
  });

  it("exige pelo menos uma opção", () => {
    expect(parseWaitlist({ ...valid, interesses: [] }).ok).toBe(false);
    expect(parseWaitlist({ ...valid, interesses: undefined }).ok).toBe(false);
  });

  it("rejeita opção fora da lista", () => {
    expect(parseWaitlist({ ...valid, interesses: ["achar_companhia", "namoro"] }).ok).toBe(false);
  });

  it("exige consentimento explícito", () => {
    expect(parseWaitlist({ ...valid, consent: "true" }).ok).toBe(false);
    expect(parseWaitlist({ ...valid, consent: undefined }).ok).toBe(false);
  });

  it("marca como spam quando o honeypot vem preenchido", () => {
    expect(parseWaitlist({ ...valid, empresa: "ACME" })).toEqual({ ok: true, spam: true });
  });

  it("rejeita corpo vazio", () => {
    expect(parseWaitlist(null).ok).toBe(false);
  });
});
