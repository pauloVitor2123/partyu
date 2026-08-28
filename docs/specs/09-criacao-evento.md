# Spec 09 — Criação de evento (anfitrião)

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 05 (Detalhe do evento), 07 (Comunidade), 10 (gate SMS)
- **Origem:** ticket 11 (decisão completa D1–D6); PRD §4, §5.6, §6; `CONTEXT.md` (`Evento`,
  `Anfitrião`); design `docs/design/prompt-rodada-3-criar-evento.md`.

## Problem Statement

O catálogo de eventos dependia só de ingestão externa (spec 03) — o lado da oferta era passivo. Sem
uma forma de qualquer usuário criar seu próprio evento (um jantar, um rolê, uma experiência que não
existe em nenhuma fonte pública), o produto perde exatamente os programas mais informais que a
articuladora social e o recém-chegado mais precisam.

## Solution

Um FAB "+" fixo na Home (spec 04) abre um formulário **leve**, estilo NomadTable — título, data/hora,
local, categoria (núcleo) + foto de capa e descrição (opcionais), sem preço nem limite de vagas. Ao
tocar em "Publicar", dispara o gate de verificação SMS just-in-time (spec 10) na primeira vez. O
evento criado é o **mesmo objeto `Evento`** do catálogo, com `origem=anfitrião`; sua comunidade
(spec 07) é criada **no ato da publicação**, com o criador como admin. No feed (spec 04) e no detalhe
(spec 05), o evento aparece misturado aos ingeridos com apenas um selo discreto "Anfitrião".

## User Stories

1. Como usuário, quero tocar no **FAB "+"** na Home, para começar a criar meu próprio evento.
2. Como usuário, quero preencher um formulário **enxuto** — título, data/hora, local, categoria —,
   para publicar sem fricção.
3. Como usuário, quero que **foto de capa** e **descrição** sejam **opcionais**, para publicar rápido
   mesmo sem ter uma foto pronta.
4. Como usuário, quero uma nota explícita de que **"no mapa mostramos só o bairro"**, para entender a
   política de privacidade de local antes de publicar.
5. Como usuário, ao tocar em **"Publicar"** sem ter verificado meu telefone ainda, quero passar pelo
   **portão SMS just-in-time**, só nessa primeira vez.
6. Como usuário, depois de publicar, quero ver o **detalhe do meu evento** já com o selo "Anfitrião" e
   um card de acesso à **comunidade** (já criada), para começar a interagir.
7. Como criador de um evento, quero ser automaticamente **anfitrião e admin** da comunidade daquele
   evento, para poder remover membro/reportar se precisar (spec 07).
8. Como outro usuário, quero ver o evento de anfitrião **misturado** aos ingeridos na Home, distinguido
   só por um **selo discreto "Anfitrião"**, para não tratá-lo como de segunda categoria.
9. Como outro usuário, quero **confirmar presença** e **entrar na comunidade** de um evento de
   anfitrião do mesmo jeito que faria com um evento ingerido (spec 05/07).
10. Como produto, quero que o campo "local" seja sempre reduzido a **nível bairro/região** no pin do
    mapa, mesmo que o usuário digite um endereço mais específico no campo.
11. Como produto, quero **não** oferecer campos de preço ou limite de vagas, para manter a criação
    fora do escopo de pagamento/monetização.

## Implementation Decisions

- **D1 — Mesmo objeto, com origem (ticket 11):** cria um `Evento` com `origem=anfitrião` e
  `anfitrião` = referência ao usuário criador; reaproveita integralmente Home (spec 04), Detalhe (spec
  05) e Comunidade (spec 07) — nenhuma tela nova além do próprio formulário.
- **D2 — Campos mínimos:** núcleo obrigatório = título, data/hora, local, categoria; opcionais = foto
  de capa e descrição curta. **Sem** preço nem limite de vagas (fora do MVP, ligado a monetização).
- **D3 — Local sempre aproximado:** o campo "local" preenchido pelo usuário é sempre reduzido/
  geocodificado a nível **bairro/região** para o pin do mapa; nunca se plota endereço exato, mesmo que
  o usuário informe um endereço específico no campo. Se o usuário colar um endereço exato na
  **descrição** (texto livre), isso é responsabilidade dele — o produto não impede nem valida esse
  texto.
- **D4 — Entrada aberta, anfitrião admin:** participar = confirmar presença → entra na comunidade
  aberta (spec 07), sem aprovação por pedido. O anfitrião é admin da comunidade (remover membro,
  reportar) desde a criação.
- **D5 — Gatilho de criação + gate SMS:** ponto de entrada único = FAB "+" na Home. A verificação SMS
  (spec 10) dispara **just-in-time** ao tocar em "Publicar", só na 1ª vez que o usuário publica ou
  interage com estranhos.
- **D6 — Distinção discreta:** no feed, o evento aparece misturado aos ingeridos com apenas um selo
  discreto "Anfitrião" no card (spec 04); **sem** bloco de perfil do host no detalhe (spec 05) — o
  anfitrião aparece naturalmente como admin da comunidade.
- **Comunidade criada no ato:** diferente dos eventos `ingerido` (autocriados no primeiro
  confirmar/entrar), a comunidade de um evento `anfitrião` é criada **imediatamente na publicação**,
  com o criador como primeiro membro/admin (contrato com spec 07/05).
- **Vetorização:** ao publicar, dispara a composição do vetor de evento a partir de
  título+descrição+categoria (mesmo contrato da spec 02), sem passar pelo pipeline de cron/provedor da
  spec 03 — o registro é criado diretamente pelo backend no momento da publicação.
- **Seam de teste:** contrato de criação de evento (entrada: formulário; saída: `Evento` com
  `origem=anfitrião` + `Comunidade` criada) + o gate de verificação (spec 10).

## Testing Decisions

- Testar comportamento observável: dado um formulário preenchido, o resultado é um `Evento` e uma
  `Comunidade` corretamente criados, com o gate acionado quando necessário.
- Casos-chave: (a) publicar sem telefone verificado aciona o gate SMS **antes** de persistir o evento;
  publicar só é efetivado após completar o gate; (b) evento criado tem `origem=anfitrião`,
  `anfitrião=criador`, sem hash de deduplicação (dedupe é exclusivo da ingestão, spec 03); (c) a
  comunidade já existe no momento da publicação, com o criador como admin; (d) o pin no mapa é sempre
  nível bairro, mesmo que o campo "local" tenha um endereço específico digitado; (e) o card na Home
  mostra o selo "Anfitrião" e o evento entra na mesma ordenação por afinidade dos ingeridos; (f) não
  existem campos de preço/vagas no formulário nem no modelo de dados resultante; (g) a vetorização do
  evento é disparada (contrato spec 02) ao publicar.
- Prior art: contrato de API (padrão das specs 01–08); o gate de verificação (spec 10) é dependência
  mockável aqui.

## Out of Scope

- Curadoria/segurança reforçada (aprovação de participação, revelar endereço exato após confirmação)
  — deixado explicitamente de fora do MVP (ticket 11, "Aberto"), risco registrado para revisitar.
- Incentivo à oferta — analytics para criadores, criação assistida por IA generativa (roadmap PRD
  §10).
- Bloco de perfil do anfitrião com "seguir" no detalhe (evolução futura, gancho com spec 13).

## Further Notes

- Design correspondente: seção "08 · Criar evento" (5 telas) — ver
  `docs/design/prompt-rodada-3-criar-evento.md`.
- Reuso reconhecido (ticket 11): não há tela de chat/detalhe/home nova — a criação só alimenta o
  mesmo `Evento`/`Comunidade` que já existem (specs 04, 05, 07). A única diferença estrutural é que a
  comunidade autocriada ganha um dono/admin.
