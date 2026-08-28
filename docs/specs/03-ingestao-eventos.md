# Spec 03 — Ingestão de eventos (cron + provedor plugável)

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** — (produz o dado que 04/05 consomem)
- **Origem:** PRD §4, §6, §8; ticket 05; `wayfinder/research/05-fontes-dados-eventos.md`;
  `CONTEXT.md` (Evento).

## Problem Statement

A Home só tem valor se estiver cheia de eventos reais e atuais do Rio — mas nenhuma API
pública oferece um catálogo global confiável e estável: Eventbrite descartada, Sympla
restrita à conta do produtor, Google Events sem API oficial (via SerpApi, sob litígio). O
produto precisa **popular e manter** o catálogo periodicamente, sem se acoplar a uma fonte
que pode mudar termos ou cair, e sem duplicar o mesmo evento vindo de origens diferentes.

## Solution

Um **job agendado (cron)** que chama um **provedor de eventos plugável** (seam #3),
normaliza os campos para o modelo `Evento`, deduplica e dispara a vetorização (spec 02). A
fonte primária é **SerpApi/Google Events**; Sympla é plano B via parceria/feed. Trocar de
provedor não afeta os consumidores (Home/Detalhe), porque todos falam com a interface
"provedor de eventos", não com a API concreta. Eventos ingeridos recebem `origem =
ingerido` — coexistindo no mesmo objeto com os de `origem = anfitrião` (spec 09).

## User Stories

1. Como usuário, quero abrir a Home e ver eventos reais e futuros perto de mim, para ter o
   que descobrir.
2. Como usuário, não quero ver o mesmo evento repetido vindo de fontes diferentes, para a
   lista não ficar poluída.
3. Como usuário, quero que eventos já passados saiam da Home, para não perder tempo com o
   que já aconteceu.
4. Como produto, quero buscar eventos do Rio periodicamente (cron), para o catálogo ficar
   fresco sem ação manual.
5. Como produto, quero normalizar título, descrição, categorias, local (endereço+lat/long)
   e data/hora vindos da fonte, para ter um `Evento` consistente.
6. Como produto, quero deduplicar por hash (título+data+venue), para não criar eventos
   repetidos.
7. Como produto, quero registrar a fonte de origem de cada evento (ex.: "via Google
   Events"), para rastreabilidade e conformidade de termos.
8. Como produto, quero disparar a vetorização de cada evento novo (spec 02), para ele já
   entrar na recomendação.
9. Como produto, quero trocar o provedor (SerpApi → Sympla) sem reescrever a Home/Detalhe,
   para me proteger de mudança de termos/litígio.
10. Como produto, quero lidar com falha/limite de cota da fonte sem derrubar a ingestão,
    para o catálogo existente continuar servindo.
11. Como produto, quero atualizar (não só inserir) um evento já ingerido quando a fonte
    muda data/local, para o dado ficar correto.
12. Como operador, quero logs/telemetria da execução do cron (quantos ingeridos, duplicados,
    erros), para monitorar a saúde da ingestão.
13. Como produto, quero guardar só metadados públicos do evento (não conteúdo proprietário
    além do permitido), para respeitar os termos da fonte (PRD §9).
14. Como produto, quero que cada `Evento` ingerido tenha sua **comunidade** pronta para ser
    autocriada quando o primeiro usuário entrar (contrato com spec 07).

## Implementation Decisions

- **Provedor plugável (seam #3):** interface "provedor de eventos" com uma implementação
  `SerpApi/Google Events` (primária) e contrato para `Sympla` (plano B). Os campos mínimos
  do contrato: title, description, categories/tags, local (address + lat/long), start/end,
  ticket/source link. Consumidores dependem da interface, nunca da API concreta.
- **Agendamento:** job cron no backend (Supabase scheduled function / worker) com cadência
  configurável; idempotente (rodar de novo não duplica).
- **Normalização → `Evento` (PRD §6):** grava `origem = ingerido`, `source` (nome da fonte),
  hash de deduplicação (título+data+venue). Vetorização (spec 02) disparada na criação/
  atualização.
- **Deduplicação:** chave de dedupe por hash normalizado; colisão → atualiza o existente em
  vez de inserir. Regras de expiração: eventos passados saem da vitrine (não
  necessariamente apagados).
- **Cobertura/escopo:** recorte geográfico Rio de Janeiro no MVP (coerente com "sem
  expansão geográfica").
- **Resiliência:** falha/limite de cota da fonte é tolerada — a ingestão degrada
  graciosamente, o catálogo já existente permanece. SerpApi tratado como plugável por causa
  do litígio Google×SerpApi (ticket 05).
- **Conformidade de termos:** ingerir apenas metadados públicos do evento; não copiar
  conteúdo proprietário de participantes (PRD §9).
- **Seam de teste:** a interface do provedor (entrada: resposta da fonte; saída: `Evento`
  normalizado/deduplicado) e o efeito observável no catálogo.

## Testing Decisions

- Testar comportamento no seam #3 com um **provedor fake** determinístico: dada uma resposta
  de fonte, o catálogo resultante tem os eventos normalizados/deduplicados esperados — sem
  chamar SerpApi de verdade.
- Casos-chave: (a) evento novo → cria `Evento` com `origem=ingerido`, source e hash, e
  dispara vetorização; (b) mesmo evento em duas fontes → um só registro (dedupe); (c) fonte
  muda data/local → atualiza o existente, não duplica; (d) rodar o cron 2× é idempotente;
  (e) fonte indisponível/estourou cota → ingestão não quebra, catálogo prévio intacto;
  (f) evento passado sai da vitrine.
- Prior art: contrato de API (spec 01). Provedor externo é dependência mockável.

## Out of Scope

- Criação de evento **por usuário/anfitrião** (spec 09) — outra origem do mesmo objeto.
- Curadoria manual de eventos malformados (PRD §4 SHOULD; pós-MVP).
- Parceria/feed formal com Sympla (o *contrato* fica pronto; a parceria é externa).
- Enriquecimento por IA (roadmap PRD §10).

## Further Notes

- Ver `wayfinder/research/05-fontes-dados-eventos.md` para o detalhe de cada fonte, cotas e
  o risco de litígio. Decisão: isolar ingestão atrás da interface para trocar sem reescrever.
- `Evento` é o mesmo objeto para ingerido e anfitrião — só muda `origem` (ver `CONTEXT.md`).
  A ingestão nunca cria `Evento` com anfitrião.
