# Spec 04 — Home / Descoberta (mapa ⇄ lista)

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 02 (recomendação), 03 (ingestão) — também recebe eventos de origem `anfitrião` (spec 09)
- **Origem:** PRD §5.2, §5.3; ticket 06; `docs/design/rodada-1-roda-e-proximos.md` (seção "03 Home"); `docs/motor-de-recomendacao.md`.

## Problem Statement

A Home é a espinha do produto: se não mostrar eventos reais, próximos e ordenados por afinidade de
forma clara, o resto do app (comunidades, grupos, sinal de compatibilidade) não tem onde nascer. O
risco é virar "só mais um catálogo" — sem ordenação por afinidade — ou expor a matemática interna
(score cru) de um jeito que pareça ranking.

## Solution

Uma Home com **mapa como visualização padrão** (pinos geolocalizados, com clustering quando há muitos
eventos próximos) e **toggle persistente para lista em cards** do mesmo dataset, ambos alimentados pelo
contrato `GET /api/recommendations/events` (spec 02) — a UI usa a ordenação/destaque que a API já
devolve, nunca exibe o `score`. Eventos de origem `anfitrião` (spec 09) aparecem **misturados** aos
`ingerido` (spec 03), diferenciados apenas por um selo discreto "Anfitrião". Um filtro básico
(data/categoria) refina a mesma lista já ordenada. A Home também hospeda o ponto de entrada da criação
de evento (FAB "+", cujo fluxo pertence à spec 09).

## User Stories

1. Como usuário, quero ver eventos próximos num **mapa** com pinos, para descobrir o que rola perto de
   mim assim que abro o app.
2. Como usuário, quero **alternar entre mapa e lista em cards**, para escolher a forma que prefiro
   navegar.
3. Como usuário, quero que a alternância mapa⇄lista **lembre minha última escolha**, para não escolher
   de novo toda vez que abro o app.
4. Como usuário, quero ver os eventos **ordenados/destacados pela minha afinidade**, para ver primeiro
   o que combina comigo.
5. Como usuário, quero **filtrar por data e categoria**, para restringir a um recorte que me interessa
   no momento.
6. Como usuário, quero **tocar num pino ou card e abrir o detalhe** do evento, para saber mais e agir.
7. Como usuário, quero que pinos próximos uns dos outros se agrupem em **clusters**, para o mapa não
   ficar ilegível em áreas densas.
8. Como usuário, quero identificar rapidamente um evento **de anfitrião** por um selo discreto, mas
   sem ele parecer de segunda categoria frente aos ingeridos.
9. Como usuário sem eventos por perto, quero um **estado vazio claro** (com sugestão de ampliar
   raio/data), para não achar que o app está quebrado.
10. Como usuário que negou localização no onboarding, quero que a Home use minha
    **cidade/bairro informado manualmente**, para continuar recebendo recomendações relevantes.
11. Como usuário, quero ver o botão **"+"** flutuante na Home, para saber que posso criar meu próprio
    evento (o formulário em si é da spec 09).
12. Como produto, quero que a Home nunca receba nem exiba o **score numérico cru**, para manter a
    afinidade sempre qualitativa (ordenação/destaque, não número).

## Implementation Decisions

- **Fonte de dados única:** Home consome só o contrato de `GET /api/recommendations/events?user_id&lat
  &lng&radius_km` (spec 02), estendido com parâmetros de filtro opcionais (`category`, `date_range`).
  Mapa e lista renderizam o **mesmo dataset já ordenado** — não há uma segunda chamada para a lista.
- **Persistência do toggle:** a preferência mapa/lista é lembrada por usuário (não é estado de sessão
  volátil), coerente com "não escolher de novo toda vez".
- **Clustering:** responsabilidade da camada de mapa (não do backend) — agrupa pinos por proximidade
  visual em determinado nível de zoom.
- **Localização de origem:** usa a localização aproximada gravada no onboarding (spec 01) como
  parâmetro `lat/lng`; se o usuário só informou cidade/bairro (permissão negada), usa o geocode
  aproximado equivalente.
- **Selo "Anfitrião":** renderizado quando `evento.origem = anfitrião`; não altera a ordenação nem
  destaque — só a etiqueta visual do card/pino (ticket 11, D6).
- **Precisão do pin:** eventos `ingerido` plotam a localização que a fonte fornece; eventos
  `anfitrião` plotam **sempre** em nível bairro/região (regra vem de spec 09/ticket 11 D3 — a Home só
  respeita o dado já normalizado, não recalcula precisão).
- **Ponto de entrada da criação:** a Home expõe o FAB "+" como slot fixo sobre o mapa/lista; o
  formulário e o gate de publicação pertencem à spec 09 — esta spec só garante que o botão existe e
  está sempre acessível.
- **Seam de teste:** contrato de `GET /api/recommendations/events` (com filtros) — comportamento
  observável de ordenação/filtragem, não a renderização pixel a pixel do mapa.

## Testing Decisions

- Testar no seam de API: dado um conjunto de eventos com `score`/`distance_km`/`start_at` retornado
  por um duplo do serviço de recomendação (spec 02), a Home exibe a ordenação esperada em ambos os
  modos.
- Casos-chave: (a) mapa e lista mostram o mesmo dataset, só a visualização muda; (b) toggle persiste
  entre sessões; (c) filtro por categoria/data restringe corretamente sem quebrar a ordenação; (d)
  evento com `origem=anfitrião` aparece com selo, misturado na mesma ordenação dos ingeridos; (e)
  ausência de eventos no raio retorna estado vazio; (f) localização por cidade/bairro (fallback)
  produz resultados coerentes com esse ponto aproximado; (g) `score` cru nunca aparece em nenhum
  elemento de UI renderizado.
- Prior art: mesmo padrão de teste de contrato de API das specs 01–03; o serviço de recomendação é
  dependência mockável.

## Out of Scope

- **Alavanca de novidade** ("parecido ↔ me surpreenda") — o motor já suporta o parâmetro (spec 02),
  mas o design ainda não posicionou onde esse controle vive na UI ("novo — a posicionar" em
  `docs/motor-de-recomendacao.md`); fica para uma spec/decisão de design futura.
- Busca textual livre por evento.
- Notificações push de novos eventos.
- Modo de visualização "tinder-like"/swipe (roadmap, PRD §10).

## Further Notes

- Design correspondente: seção "03 Home" do protótipo (modo mapa, modo lista) — ver
  `docs/design/rodada-1-roda-e-proximos.md`. O FAB "+" é introduzido na seção "08 · Criar evento"
  (`docs/design/prompt-rodada-3-criar-evento.md`, tela 1), mas o formulário pertence à spec 09.
- Coerência com ticket 06: mapa é a home; lista é "uma visão alternada do mesmo conteúdo", não uma
  tela separada com lógica própria.
