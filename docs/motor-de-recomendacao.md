# Partyu — O motor de compatibilidade

> **O que é este documento.** Explicação, em nível de produto, do "motor de recomendação" do Partyu:
> o que ele calcula, onde aparece no app e quais decisões de produto o guiam. Escrito para alimentar
> a redação acadêmica (artigo/mestrado) e o design. **Não** entra em código nem em detalhes de
> implementação além do necessário para entender as decisões. Decisões consolidadas nos tickets
> `wayfinder/tickets/04-modelo-dados-sinais.md` e `wayfinder/tickets/10-companhia-roda-matchmaker.md`.

## O núcleo

O coração do produto é **um único cálculo**: a **similaridade de cosseno** entre dois vetores, um número
entre **0 e 1** (0 = nada a ver, 1 = idêntico). A mesma matemática vale para **eventos** e para
**pessoas** — ambos são representados como vetores (perfis de interesse; embeddings). É uma peça só,
reaproveitada em tudo.

## As três operações

O mesmo núcleo serve a três perguntas diferentes:

| # | Operação | Pergunta que responde | Onde vive |
|---|---|---|---|
| 1 | **Pessoa ↔ evento** | "que evento combina comigo?" | recomendação individual — *já existe* |
| 2 | **Pessoa ↔ pessoa** | "quanto duas pessoas combinam?" | sinal de afinidade + matchmaker da roda |
| 3 | **Grupo ↔ evento** | "que evento agrada o grupo todo?" | grupo privado (frente 1) |

### 1. Pessoa ↔ evento

A recomendação individual clássica: ordena/destaca eventos pela afinidade com o perfil da pessoa. É a
espinha da home (mapa/lista).

### 2. Pessoa ↔ pessoa

Aqui mora a virada da tese do Partyu. Ela aparece em **dois pesos, com regras diferentes** — e a
distinção importa (ver `wayfinder/tickets/04-modelo-dados-sinais.md`):

- Como **sinal** (já no MVP): **similaridade pura** (interesses declarados + comportamento), exibida como
  ícone de força de compatibilidade e "interesses em comum" no perfil, e faixa agregada na comunidade do
  evento ("4 de 12 aqui têm alta afinidade com você"). No MVP **não** há fator de diversidade explícito.
- Como **matchmaker** (pós-MVP): forma a **roda** e é onde entra o **"diverso mas compatível"** — a
  direção de roadmap que o ticket 04 deixou marcada. Aqui a regra **não** é o maior cosseno (isso junta
  clones): é **piso de afinidade no que importa** (um denominador comum que garante assunto — o eixo do
  evento) **+ variedade no resto do perfil**, com afinidade **recíproca**. "Parecido onde conta,
  diferente no resto." (Ver `10-companhia-roda-matchmaker.md`.)

### 3. Grupo ↔ evento — "menor sofrimento"

Cenário do bar: "eu + meus amigos, o que agrada todo mundo?". A armadilha é **mediar os vetores** — a
média de mim com um amigo de gosto oposto dá um "meio-termo morno" que não empolga ninguém. A decisão é
usar **menor sofrimento** (*least-misery*): para cada evento, olhar a nota **da pessoa que menos gostou**,
e escolher o evento onde *até o menos animado* dá nota alta. Prioriza "ninguém detesta" sobre "a média
gosta". Ver `docs/adr/0002-agregacao-grupo-menor-sofrimento.md`.

> Exemplo: show de funk → 9, 8, **2** (menor = 2); feira gastronômica → 7, 7, **6** (menor = 6). A
> média preferiria o funk; o menor-sofrimento escolhe a feira, porque os três saem satisfeitos.

## A alavanca de novidade (precisão × novidade)

Recomendação por similaridade pura sofre de **over-specialization**: só devolve "mais do mesmo" (o
problema da *filter bubble* / câmara de eco). A resposta do Partyu **não** é travar uma faixa fixa de
similaridade no código (ex.: "só eventos entre 0.5 e 0.8") — esse número seria um chute e mudaria de
significado se trocarmos o modelo de embedding.

Em vez disso: uma **alavanca controlada pelo usuário** — de *"parecido comigo"* a *"me surpreenda"* —
como um botão de volume. A pessoa decide o quanto quer sair da bolha. Os **ajustes-padrão saem dos dados
de uso reais** (o app é o instrumento de pesquisa), não de uma constante arbitrária. A intuição de que
"o interessante mora na faixa alta-média" está direcionalmente certa; só não vira número fixo.

Fundamentação (literatura de sistemas de recomendação): *filter bubble* (Pariser); *serendipity /
novelty / diversity* (surveys de Kaminskas & Bridge); *Maximal Marginal Relevance* — relevância menos
redundância — (Carbonell & Goldstein); recomendação para grupos e estratégias de agregação, incluindo
*least-misery* (Masthoff; PolyLens).

## Piso de sanidade

Se, ao sugerir pessoas para uma roda, o melhor candidato de afinidade está **abaixo de ~0.10**, o
sistema **não sugere ninguém** e emite **alerta** — é sinal de comunidade vazia ou dados quebrados, não
de "ninguém compatível". Serve de telemetria de saúde do motor.

## Onde a recomendação aparece — resumo

| Funcionalidade | Operação | Status |
|---|---|---|
| Home (mapa/lista) | pessoa↔evento | MVP — já existe |
| "Eventos diferentes" | alavanca de novidade | novo — a posicionar |
| Perfil / detalhe do usuário | pessoa↔pessoa (sinal) | MVP |
| Comunidade do evento (faixa agregada) | pessoa↔pessoa (agregado) | MVP |
| Grupo privado — "achar evento pra galera" | grupo↔evento (menor sofrimento) | novo — frente 1 |
| Roda (matchmaker de estranhos) | pessoa↔pessoa (diverso+compatível, recíproco) | pós-MVP |
