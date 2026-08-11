---
labels: [wayfinder:map]
title: "Visão de produto do Partyu"
---

# Mapa — Visão de produto do Partyu

## Destination

Um **documento de visão de produto do Partyu** — *produto-primeiro, com a pesquisa acadêmica
instrumentada dentro dele* — cobrindo: problema de produto, proposta de valor, personas/cenários
no Rio, modelo de dados e sinais de compatibilidade, posicionamento competitivo, escopo e fluxos
mínimos do MVP, features priorizadas (MUST/SHOULD/COULD) e riscos/limitações. Pronto para virar
issues técnicas. Chega-se ao destino quando o ticket de síntese (features + riscos + redação da
visão) está fechado e o documento existe.

## Notes

**Domínio.** Partyu = app de recomendação de eventos/experiências urbanas com foco em
personalização **social** (aproximar pessoas), não só individual. Base já construída (fato, não
decidir): React Native + Supabase/Postgres + serviço Python de embeddings (`text-embedding-ada-002`)
+ similaridade de cosseno; recomendação individual, favoritar, confirmar presença, avaliar e gestão
de eventos já existem. A virada da tese: cosseno perfil↔evento → perfil↔perfil (compatibilidade
social/cultural entre perfis diversos) e formação de grupos.

**Duas frentes do produto (ambas no MVP):**
1. Potencializar **grupos que já se conhecem** achando eventos/experiências em comum.
2. **Entrar em grupos de estranhos** (modelo Nomadtable) — realizado como **chats/comunidades por
   evento**, auto-criados a partir de eventos ingeridos via APIs públicas (Sympla / Google Events).

**Decisões de escopo já tomadas:** destino é doc de visão produto-primeiro com pesquisa
instrumentada (não dois docs separados); as duas frentes entram no MVP → segurança/confiança/
moderação de estranhos entram no MVP (não adiáveis); monetização fica fora do MVP.

**Preferências permanentes deste esforço:** responder em **português**; sem detalhes de código/stack
nos tickets — é nível de visão de produto; uma pergunta por vez ao grilhar.

**Skills a consultar:** `/grilling` e `/domain-modeling` (default), `/prototype` (quando "como
deveria parecer/comportar" for a pergunta), `/research` (tickets AFK).

**Convenção do tracker (local-markdown):** mapa em `map.md` (label `wayfinder:map`); tickets em
`tickets/NN-slug.md`. Sem bloqueio nativo → campo `blocked_by: [ids]` no frontmatter. Posse/claim =
campo `assignee`. `status: open|closed`. Achados de pesquisa em `research/<name>.md` (sem branch git —
não é repositório). Frontier = tickets `open`, com `blocked_by` vazio ou só de tickets fechados, e
`assignee` vazio.

## Decisions so far

<!-- índice — uma linha por ticket fechado -->

- [Problema e proposta de valor](tickets/01-problema-proposta-valor.md) — dor primária é a do
  articulador social (organizar o grupo); dor secundária é o isolado/recém-chegado. Proposta de
  valor: "o Partyu tira de você o trabalho de organizar: indica o evento certo já com o grupo".
- [Personas e cenários no Rio](tickets/02-personas-cenarios-rio.md) — três personas: articuladora
  social, isolado/recém-chegado, criador/host de evento (majoritariamente passivo no MVP). Recorte:
  18–35 anos, classe média urbana, Rio de Janeiro.
- [Modelo de dados e sinais](tickets/04-modelo-dados-sinais.md) — sinal de compatibilidade é
  similaridade pura (interesses + comportamento implícito), sem fator de diversidade explícito no
  MVP; diversidade fica como direção de pesquisa/roadmap.
- [Posicionamento competitivo](tickets/03-posicionamento-competitivo.md) — Partyu ocupa o quadrante
  vazio: catálogo de eventos reais + comunidades autocriadas por evento + compatibilidade estruturada
  perfil↔perfil + duas frentes; ninguém combina os quatro. Maior ameaça: Bumble BFF ancorar grupos em
  eventos. Detalhe em `research/03-posicionamento-competitivo.md`.
- [Fontes de dados de eventos](tickets/05-fontes-dados-eventos.md) — MVP: SerpApi (Google Events) como
  fonte primária (plugável, dado litígio Google×SerpApi), Sympla como plano B via parceria, Eventbrite
  descartada. Isolar ingestão atrás de interface "provedor de eventos". Detalhe em
  `research/05-fontes-dados-eventos.md`.
- [Escopo e fluxos do MVP](tickets/06-escopo-fluxos-mvp.md) — espinha evento-primeiro (home mapa⇄lista);
  frente 2 = comunidade/chat aberta por evento (compatibilidade é sinal, não matchmaker); frente 1 =
  grupo privado (mesma primitiva de chat); onboarding leve + verificação SMS just-in-time; 7 fluxos MUST
  para desenhar. User stories em `docs/mvp-user-stories.md`.
- [Confiança, segurança e moderação](tickets/07-confianca-seguranca-moderacao.md) — sanção automática
  por N denúncias + escalonamento manual prioritário para casos graves; política de conteúdo mínima;
  selo verificado como único sinal de reputação no MVP.
- [Camada de pesquisa instrumentada](tickets/08-camada-pesquisa-instrumentada.md) — TCLE dedicado,
  opt-in explícito e separado do ToS geral, para a coorte formal (≥20, Rio, 2026–2027); telemetria
  mínima especificada; nenhum atributo sensível coletado para compatibilidade.
- [Features priorizadas, riscos e visão](tickets/09-features-priorizadas-riscos-visao.md) — **destino
  alcançado.** Documento de visão final em `docs/PRD-Partyu.md`.
- [Companhia / Roda — matchmaker perfil↔perfil](tickets/10-companhia-roda-matchmaker.md) — aprofundamento
  pós-destino da "fronteira seguinte". Ciclo **comunidade → roda → grupo**; roda = recorte pequeno,
  privado e efêmero da comunidade, semeado pelo matchmaker (sugestão, não formador puro), com admin e
  ponte para virar grupo. Motor de recomendação (3 operações + menor sofrimento + alavanca de novidade)
  em `docs/motor-de-recomendacao.md`; glossário em `CONTEXT.md`; ADRs em `docs/adr/`.

## Not yet specified

- **Grafo social (seguir/seguidor)** — seguir/deixar de seguir perfis; contagem de seguidores no
  detalhe do perfil. Camada social transversal, ainda a especificar.
- **Depoimentos no perfil** — relato deixado por quem teve experiência real com a pessoa; prova social
  ligada a confiança/segurança (ticket 07) e forte candidato a métrica de sucesso da roda (ticket 10).
- **Gamificação** — pontos por seguir/curtir/depor; **bloqueada por "definir recompensa"** (o que os
  pontos valem ainda é indefinido). Explicitamente futura.
- **Votação de evento no grupo privado** e **avaliação pós-evento** — SHOULD, pós-MVP.
- **Modelo de negócio / monetização** — fora do MVP; revisitar quando a tração existir.
- **Estratégia galinha-e-ovo da oferta / hosts** — como incentivar quem cria experiências
  (lado da oferta), além dos eventos ingeridos. É o que destrava o modo "pessoas-primeiro" da roda.
- **Métricas de sucesso e avaliação formal** da recomendação individual e da compatibilidade em
  grupo (precisão/revocação; núcleo da fase de pesquisa) — detalhado no PRD, seção 11.
- **Expansão geográfica** além do Rio.

## Out of scope

<!-- vazio por ora -->
