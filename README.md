# Partyu

App de recomendação de **eventos e experiências urbanas** com foco em personalização
**social** — não apenas encontrar o evento certo para uma pessoa, mas **aproximar pessoas**
em torno de experiências de lazer em grupo.

Duas frentes de produto (ambas no MVP):
1. **Potencializar grupos que já se conhecem** — achar eventos/experiências em comum e coordenar a ida juntos.
2. **Entrar em grupos de estranhos compatíveis** (modelo tipo Nomadtable/Timeleft) — realizado como
   **chats/comunidades por evento**, auto-criados a partir de eventos ingeridos de fontes públicas **ou**
   criados por um anfitrião dentro do app.

O Partyu é também uma **plataforma de pesquisa acadêmica** sobre sistemas de recomendação sociais e
compatibilidade em grupos, com coleta instrumentada e opt-in dedicado de coorte.

## Base técnica (estágio piloto)

- App móvel multiplataforma em **React Native**
- Backend como serviço em **Supabase** (PostgreSQL)
- Serviço **Python** de geração/comparação de embeddings (`text-embedding-ada-002`) via API REST
- Recomendação por **similaridade de cosseno** (perfil↔evento; em evolução para perfil↔perfil)

## Estrutura do repositório

- `CONTEXT.md` — glossário canônico do domínio (vocabulário travado do produto).
- `docs/PRD-Partyu.md` — documento de visão de produto (destino do processo Wayfinder), pronto
  para virar issues técnicas.
- `docs/motor-de-recomendacao.md` — explicação, em nível de produto, do motor de compatibilidade
  (as três operações do cosseno, alavanca de novidade, menor sofrimento).
- `docs/adr/` — Architecture Decision Records (trade-offs conscientes registrados).
- `docs/design/` — prompts de design (Claude Design) e o handoff de estado da prototipagem de UI.
- `docs/specs/` — **specs de implementação**, derivadas do PRD/tickets/design, uma por fatia
  buildável e testável isoladamente. Comece por `docs/specs/00-index.md`.
- `docs/Artigo.pdf` — artigo científico base do projeto (TCC/pesquisa acadêmica).
- `wayfinder/` — mapa de visão de produto (processo Wayfinder): destino, decisões e tickets.
  - `wayfinder/map.md` — o mapa (índice de decisões).
  - `wayfinder/tickets/` — tickets de decisão (registro histórico, não editar após fechados).
  - `wayfinder/research/` — pesquisas resolvidas (posicionamento competitivo, fontes de eventos).

## Status

**Planejamento de produto encerrado, implementação ainda não iniciada (greenfield).** O destino do
mapa Wayfinder foi alcançado (`wayfinder/map.md`) e as 14 specs de `docs/specs/` estão todas
`ready-for-agent`. Não há código de app/backend neste repositório ainda — o próximo passo é começar
a implementação a partir de `docs/specs/01-auth-onboarding.md` (sem dependências) ou aplicar os
prompts de design pendentes em `docs/design/`.
