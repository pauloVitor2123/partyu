# Partyu — Índice de Specs

Specs de implementação derivadas do PRD (`docs/PRD-Partyu.md`), dos tickets de visão
(`wayfinder/tickets/`), do glossário (`CONTEXT.md`) e das 3 rodadas de design
(`docs/design/`). Cada spec é uma **fatia buildável e testável isoladamente**, escrita no
template do `/to-spec` (Problem → Solution → User Stories → Implementation Decisions →
Testing Decisions → Out of Scope → Further Notes) e marcada `ready-for-agent`.

> **Estado:** ainda não há código — greenfield. As specs definem contratos e comportamento
> externo (nos seams), não caminhos de arquivo nem trechos de código. Todas as 14 specs (Fases
> 1–3) estão escritas e `ready-for-agent`; a ordem de implementação segue a coluna "Depende de".

## Seams (fronteiras de teste) — greenfield

1. **API do backend (Supabase/Postgres + RPC/Edge Functions)** — seam mais alto; a maioria
   das specs testa contrato de API + comportamento observável, não implementação.
2. **Serviço de recomendação (Python + embeddings/cosseno)** — interface própria; entra e
   sai por contrato (vetores, scores → faixas qualitativas).
3. **Provedor de eventos (ingestão)** — interface plugável (SerpApi/Google Events primário,
   Sympla plano B); trocável sem reescrever consumidores.
4. **Primitiva de chat** — módulo único reusado em 3 modos (comunidade aberta, grupo
   privado, roda); os consumidores diferenciam por `tipo/contexto`, não por primitiva nova.

## Fase 1 — MVP (MUST)

Ordem de construção segue dependências. Segurança (10) e pesquisa (11) são transversais:
implementar junto às features que tocam, verificar ao longo.

| #  | Spec | Depende de | Status |
|----|------|-----------|--------|
| 01 | [Autenticação & Onboarding](01-auth-onboarding.md) | — | ready-for-agent |
| 02 | [Motor de recomendação & serviço de embeddings](02-motor-recomendacao.md) | 01 | ready-for-agent |
| 03 | [Ingestão de eventos (cron + provedor plugável)](03-ingestao-eventos.md) | — | ready-for-agent |
| 04 | [Home / Descoberta (mapa ⇄ lista)](04-home-descoberta.md) | 02, 03 | ready-for-agent |
| 05 | [Detalhe do evento](05-detalhe-evento.md) | 03, 04 | ready-for-agent |
| 06 | [Perfil & sinal de compatibilidade](06-perfil-compatibilidade.md) | 02 | ready-for-agent |
| 07 | [Chat: primitiva + comunidade do evento](07-chat-comunidade.md) | 05, 10 | ready-for-agent |
| 08 | [Grupo privado (frente 1)](08-grupo-privado.md) | 07 | ready-for-agent |
| 09 | [Criação de evento (anfitrião)](09-criacao-evento.md) | 05, 07, 10 | ready-for-agent |
| 10 | [Confiança & segurança (transversal)](10-confianca-seguranca.md) | 01 | ready-for-agent |
| 11 | [Camada de pesquisa instrumentada](11-pesquisa-instrumentada.md) | 01 | ready-for-agent |

## Fase 2 — Pós-MVP: Roda (matchmaker perfil↔perfil)

| #  | Spec | Depende de | Status |
|----|------|-----------|--------|
| 12 | [Roda / matchmaker perfil↔perfil](12-roda-matchmaker.md) | 07, 02 | ready-for-agent |

## Fase 3 — Camada social

| #  | Spec | Depende de | Status |
|----|------|-----------|--------|
| 13 | [Seguir / conexão](13-seguir-conexao.md) | 06 | ready-for-agent |
| 14 | [Depoimentos no perfil](14-depoimentos.md) | 06, 13 | ready-for-agent |

## Referências cruzadas

- Decisões de produto: `wayfinder/tickets/01`–`11`.
- Design (telas): `docs/design/prompt-rodada-1-roda.md` (roda),
  `prompt-rodada-2-social.md` (social), `prompt-rodada-3-criar-evento.md` (criar evento),
  `rodada-1-roda-e-proximos.md` (handoff/estado).
- Glossário: `CONTEXT.md`. Motor: `docs/motor-de-recomendacao.md`. ADRs: `docs/adr/`.
