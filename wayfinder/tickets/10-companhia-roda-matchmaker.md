---
title: "Companhia / Roda — matchmaker perfil↔perfil (pós-MVP)"
labels: [wayfinder:grilling, wayfinder:domain-modeling]
status: closed
assignee: paulovitor
blocked_by: [06]
---

## Resolution

Aprofundamento (grilling + domain-modeling) do que o mapa listava como **"Mesas" compatíveis** —
a virada da tese: sair de "compatibilidade como *sinal* exibido" para **matchmaker perfil↔perfil que
forma subgrupos pequenos de estranhos**. Decisões arquivadas, **prontas para implementar, sem
implementar agora**. Nível de produto; a base técnica (cosseno/embeddings) é dada e está descrita em
`docs/motor-de-recomendacao.md`.

**Vocabulário travado (ver `CONTEXT.md`):** o ciclo de nomes é **comunidade → roda → grupo**.
"Companhia" é o texto do **convite** ("achamos uma companhia pra você nesse evento"); a coisa formada é
uma **roda** (recorte pequeno e privado da comunidade); se a roda permanece após o evento, vira um
**grupo**. O termo "Mesa" (emprestado do Nomadtable) foi descartado.

### Decisões

- **D1 — Natureza (ancorada no evento).** A roda é um **recorte da comunidade de um evento já
  ingerido**. Uma única primitiva. O modo "pessoas-primeiro" (montar o grupo e *depois* achar a
  experiência — Nomadtable puro) fica como evolução futura **atrás da oferta/hosts**, fora deste escopo.

- **D2 — Gatilho de formação (cutucada + criação pelo usuário).** O sistema **cutuca** com o pitch
  ("companhia"); **quem cria a roda é o usuário**. Ao criar, o matchmaker **sugere** perfis afins para
  *aquela* roda. Duas pessoas cutucadas no mesmo evento criam **rodas próprias**, com composições
  diferentes ou parecidas. Ressalva de pesquisa registrada: isto desloca a roda de "o sistema forma o
  grupo" para "o usuário é dono de um grupo que o sistema **sugeriu**" — o matchmaker é motor de
  **sugestão**, não formador puro (ver `docs/adr/0001-roda-matchmaker-como-sugestao.md`).

- **D3 — Ciclo de vida (efêmera com ponte).** A roda vale para o evento e **se dissolve depois**. No
  pós-evento oferece "virar grupo": conversão **por pessoa** (não-unânime) → cria um **grupo** com quem
  topou. **Piso:** se só 1 pessoa topa continuar, não há grupo — e esse evento (intenção de vínculo sem
  par) é **registrado como telemetria de estudo**. Nome do grupo = **nome do evento** por padrão, até
  alguém editar.

- **D4 — Tamanho.** Mínimo **3** para formar; **sem teto**. A quantidade que o matchmaker sugere é
  variável (os "5" das conversas eram exemplo). **Duplicidade permitida:** duas rodas podem ter os
  mesmos membros; o sistema **não deduplica** (não há limite de "uma roda por pessoa por evento").

- **D5 — Base do match (diverso mas compatível, recíproco).** O matchmaker **não** junta o maior
  cosseno (isso dá clones). Garante um **denominador comum** que sustenta assunto (o eixo do evento) **e**
  **variedade** no resto do perfil, com afinidade **recíproca** (nos dois sentidos). É o núcleo da tese
  do produto. Nota de coerência com o ticket 04: lá se decidiu que o **sinal do MVP é similaridade pura**
  e a diversidade é direção de roadmap — a roda (pós-MVP) é justamente onde essa direção se materializa.

- **D6 — Segurança.** Entrar numa roda **exige verificação (SMS)** — portão obrigatório, coerente com
  "estranhos em grupo pequeno" ser risco maior que a comunidade aberta. Os perfis sugeridos **sempre
  precisam aceitar** o convite: ninguém cai na roda sem topar (consentimento mútuo).

- **D7 — Visibilidade e nome.** A roda é **invisível** para quem não foi convidado — ninguém na
  comunidade sabe que ela existe nem quem está nela (evita panelinha/constrangimento). Nomes: convite =
  *companhia*; objeto ativo = *roda*; se permanece = *grupo*.

- **D8 — Propriedade / admin.** Quem cria a roda é **admin**, modelo WhatsApp: promover outro a admin,
  remover membro, excluir a roda.

- **D9 — Adição de membros muda com a fase.** *Enquanto roda:* adicionar gente é **recomendado pelo
  matchmaker** (a comunidade cresce, surgem novos compatíveis; o admin adiciona **com base na
  recomendação**). *Depois que vira grupo:* adds são **livres** (grupo padrão tipo WhatsApp/Telegram, com
  funções primárias) — o matchmaker sai de cena. A **recomendação de membros só existe na fase roda**.
  Excluir a roda encerra aquela **instância**; "criar de novo" = abrir uma roda nova (duplicar já é
  permitido), sem "desfazer exclusão".

- **D10 — Piso de sanidade.** Se o melhor candidato de afinidade está **abaixo de ~0.10**, o sistema
  **não sugere ninguém** e trata como **alerta** — sinal de comunidade vazia ou dados quebrados. Vira
  telemetria de saúde.

### Reuso reconhecido

A roda ficou **quase idêntica ao grupo privado** — chat privado, com admin e convites. A diferença que
sobra: a roda é **semeada pelo matchmaker + amarrada a um evento + temporária**; o grupo é
**auto-convidado + permanente**. É a **mesma primitiva de chat**, num modo a mais (o 3º modo, ao lado de
comunidade aberta e grupo privado).

### Aberto (a definir mais à frente)

- **Métricas de pesquisa da roda** (o "C" adiado): o que exatamente medir para dizer que o matchmaker
  "funcionou". Pista forte: **depoimentos** pós-experiência (ver mapa, "Not yet specified").
- **Quantidade-alvo** que o matchmaker mira ao sugerir (calibrável por dados).

## Question

Como fica a "roda" (o que o mapa chamava de "Mesas compatíveis") — o matchmaker perfil↔perfil que forma
subgrupos pequenos de estranhos afins a partir da comunidade de um evento? Definir, em nível de produto:
natureza, formação, ciclo de vida, tamanho, base do match, segurança, visibilidade, propriedade e
regras de adição de membros. Deixar arquivado e pronto para implementação, sem implementar agora.
Insumo: escopo do MVP (06), sinais/compatibilidade (04), o motor de recomendação
(`docs/motor-de-recomendacao.md`).
