---
title: "Criação de evento pelo usuário (anfitrião) — lado da oferta no MVP"
labels: [wayfinder:grilling, wayfinder:domain-modeling]
status: closed
assignee: paulovitor
blocked_by: [06]
---

## Resolution

Aprofundamento (grilling + domain-modeling) do que o mapa listava em **"Not yet specified"** como
**"Estratégia galinha-e-ovo da oferta / hosts"**. Ativa o **lado da oferta** — qualquer usuário
verificado por SMS pode **criar um evento** dentro do app (estilo NomadTable), leve e com poucas
informações. Isso **puxa pro MVP** a persona 3 (criador/host), antes "majoritariamente passiva", e
destrava a semente de conteúdo próprio sem depender só da ingestão de terceiros. **Vai para
implementação** (diferente da roda, ticket 10, que fica arquivada).

**Vocabulário travado (ver `CONTEXT.md`):** o objeto continua sendo **Evento**, agora com uma
**origem** — `ingerido` (fontes externas) ou `anfitrião` (criado no app). Quem cria é o **Anfitrião**
(novo termo no glossário), automaticamente **admin** da comunidade daquele evento.

### Decisões

- **D1 — Mesmo objeto, com origem.** Evento criado por usuário é o **mesmo `Evento`** do catálogo, com
  atributo `origem ∈ {ingerido, anfitrião}`. Reaproveita home (mapa/lista), detalhe e comunidade. Uma
  única primitiva; nada de objeto/telas paralelas.

- **D2 — Campos mínimos.** Núcleo: **título · data/hora · local · categoria**. Opcionais: **foto de
  capa (opcional)** e **descrição curta**. **Fora do MVP:** limite de vagas e preço (este último
  arrastaria pagamento/monetização, que está fora).

- **D3 — Local sempre aproximado.** O pin no mapa é sempre **nível bairro/região**; não há endereço
  exato plotado nem fluxo de "revelar após confirmar". Se o anfitrião colocar o endereço exato na
  descrição (texto livre), é responsabilidade dele. Decisão de segurança + simplicidade.

- **D4 — Entrada aberta, anfitrião admin.** Participar = **confirmar presença** e entrar na
  **comunidade aberta** do evento (igual aos ingeridos). Sem aprovação por pedido. O **anfitrião é
  admin** da comunidade (modelo WhatsApp da roda/ticket 10: remover / reportar).

- **D5 — Gatilho de criação + gate SMS.** Ponto de entrada = **FAB "+"** na home. A **verificação SMS**
  dispara **just-in-time** ao tocar em **"Publicar"** (reusa o portão da comunidade), só na 1ª vez.
  Consistente com "verificação SMS just-in-time antes de interagir com estranhos" (ticket 06).

- **D6 — Distinção discreta.** No feed, o evento de anfitrião aparece **misturado** aos ingeridos, com
  apenas um **selo discreto "Anfitrião"** no card. **Sem** bloco de perfil do host no detalhe no MVP
  (o host aparece naturalmente como admin da comunidade). Decisão do usuário — mais enxuta; um bloco de
  host com "seguir" fica como evolução.

### Reuso reconhecido

Não há tela de chat/detalhe/home nova: a criação só **alimenta** o mesmo `Evento`/`Comunidade` que já
existem. A comunidade autocriada ganha um **dono/admin** (o anfitrião) — antes a comunidade de evento
ingerido "não tinha dono". Essa é a única diferença estrutural.

### Aberto (a definir mais à frente, fora deste escopo)

- **Curadoria/segurança reforçada** para eventos de anfitrião: como o produto amadurece, revisitar
  "host aprova participação" e "revelar endereço após confirmar" — deixados de fora do MVP por
  simplicidade, mas o risco de estranho-em-casa é maior que a comunidade aberta.
- **Incentivo à oferta** (o "ovo" do galinha-e-ovo): o que motiva alguém a criar — analytics para
  criadores, destaque, IA generativa de criação (roadmap, PRD §10).
- **Bloco de anfitrião + seguir** no detalhe (gancho com a camada social / seguir-conexão).

## Question

Como fica a **criação de evento pelo usuário** (o lado da oferta / hosts que o mapa listava como não
especificado) no MVP, de forma leve e estilo NomadTable? Definir, em nível de produto: conceito e
relação com o Evento ingerido, campos mínimos, tratamento do local (segurança), modelo de participação
e papel do host, ponto de entrada e gate de verificação, e como o evento criado se distingue no feed.
Deixar pronto para implementação. Insumo: escopo do MVP (06), fontes de eventos (05), segurança (07),
glossário (`CONTEXT.md`). Prompt de design em `docs/design/prompt-rodada-3-criar-evento.md`.
