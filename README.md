# Partyu

App de recomendação de **eventos e experiências urbanas** com foco em personalização
**social** — não apenas encontrar o evento certo para uma pessoa, mas **aproximar pessoas**
em torno de experiências de lazer em grupo.

Duas frentes de produto:
1. **Potencializar grupos que já se conhecem** — achar eventos/experiências em comum e coordenar a ida juntos.
2. **Entrar em grupos de estranhos compatíveis** (modelo tipo Nomadtable/Timeleft) — realizado como
   **chats/comunidades por evento**, auto-criados a partir de eventos reais ingeridos de fontes públicas.

O Partyu é também uma **plataforma de pesquisa acadêmica** sobre sistemas de recomendação sociais e
compatibilidade em grupos, com coleta instrumentada e coorte no Rio de Janeiro (2026–2027).

## Base técnica (estágio piloto)

- App móvel multiplataforma em **React Native**
- Backend como serviço em **Supabase** (PostgreSQL)
- Serviço **Python** de geração/comparação de embeddings (`text-embedding-ada-002`) via API REST
- Recomendação por **similaridade de cosseno** (perfil↔evento; em evolução para perfil↔perfil)

## Estrutura do repositório

- `Artigo_Recomendacao_Eventos.md` — artigo científico base do projeto
- `Paulo Vitor e Samira - TCC ...docx.md` — TCC (documento completo)
- `docs/` — cópias dos documentos acima
- `wayfinder/` — **mapa de visão de produto** (Wayfinder): destino, decisões e tickets
  - `wayfinder/map.md` — o mapa (índice de decisões)
  - `wayfinder/tickets/` — tickets de decisão
  - `wayfinder/research/` — pesquisas resolvidas (posicionamento competitivo, fontes de eventos)

## Status

Fase de **visão de produto**. Consulte `wayfinder/map.md` para o destino e o estado das decisões.
