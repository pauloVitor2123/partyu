# Spec 13 — Seguir / conexão

- **Fase:** 3 (Camada social)
- **Status:** ready-for-agent
- **Depende de:** 06 (Perfil)
- **Origem:** design `docs/design/prompt-rodada-2-social.md` (decisões travadas, telas 1–3); PRD
  roadmap §10; `CONTEXT.md`.

## Problem Statement

Fora do contexto pontual de um evento, não existe forma de acompanhar um perfil que se conheceu numa
comunidade/roda, nem de reconhecer que um vínculo é mútuo — pré-requisito para prova social
(depoimentos, spec 14) e para uma futura camada de descoberta social.

## Solution

**Seguir é unidirecional** (tipo Instagram): qualquer usuário segue outro sem aprovação. Quando os
dois se seguem, o vínculo vira **conexão** automaticamente — sem pedido nem aceite, e os estados
coexistem (alguém pode ser seguidora **e** conexão ao mesmo tempo). O perfil (spec 06) ganha três
contagens tocáveis — **seguidores · seguindo · conexões** — que abrem um **modal estilo Instagram**
com abas e busca simples client-side sobre a lista já carregada.

## User Stories

1. Como usuário, quero **seguir** outro perfil sem precisar de aprovação, para acompanhar quem me
   interessa.
2. Como usuário, quero **deixar de seguir** alguém quando quiser.
3. Como usuário, quero ver minhas contagens de **seguidores, seguindo e conexões** no meu perfil e no
   de terceiros.
4. Como usuário, quero **tocar em qualquer uma das três contagens** e abrir um modal com abas
   correspondentes (Seguidores / Seguindo / Conexões).
5. Como usuário, dentro do modal, quero **buscar por nome** na lista já carregada, para achar alguém
   rápido sem rolar tudo.
6. Como usuário, quero ver um selo **"Conexão"** ao lado de quem me segue de volta, para saber que o
   vínculo é mútuo.
7. Como usuário, ao seguir alguém que já me seguia, quero ver a conexão se formar **automaticamente**,
   sem nenhum pedido ou aceite extra.
8. Como usuário que acabou de virar conexão de alguém, quero ver um **realce discreto** ("vocês agora
   são conexão"), com atalho para escrever um depoimento (spec 14).
9. Como usuário, dentro do modal, quero ver o botão certo por linha (**"Seguir"** para quem não sigo,
   **"Seguindo"** para quem já sigo), para agir direto da lista.

## Implementation Decisions

- **Grafo simples e unidirecional:** entidade `Follow(seguidor, seguido, timestamp)`. Não existe
  pedido/aceite — a ação "Seguir" é imediata e completa.
- **Conexão é derivada, não persistida como entidade própria:** calculada pela existência do par
  recíproco de `Follow` (A segue B **e** B segue A) — suficiente para o volume esperado do MVP/piloto;
  não precisa de uma tabela `Conexao` separada.
- **Contagens:** `seguidores = count(Follow onde seguido=eu)`; `seguindo = count(Follow onde
  seguidor=eu)`; `conexões = count(interseção dos dois conjuntos)`.
- **Modal com 3 abas** (Seguidores/Seguindo/Conexões) — a aba tocada na contagem é a que abre por
  padrão; busca é **client-side**, filtro local sobre a lista já carregada (sem nova chamada de rede a
  cada tecla).
- **Sem tela de pedido/aceite:** decisão explícita — não criar esse fluxo mesmo que pareça "faltando".
- **Reuso de componentes:** cartões de pessoa na lista reaproveitam anel de afinidade e selo verificado
  já definidos na spec 06 — nenhum visual novo do zero.
- **Seam de teste:** contrato de leitura/escrita do grafo `Follow` + a derivação de conexão.

## Testing Decisions

- Testar comportamento observável: seguir/deixar de seguir e a derivação de conexão a partir do grafo.
- Casos-chave: (a) seguir é efetivado imediatamente, sem estado de "pendente"; (b) quando A segue B e
  B segue A, ambos os perfis mostram o selo "Conexão"; (c) se A deixa de seguir B, a conexão deixa de
  existir automaticamente para os dois (deixou de ser mútuo); (d) as três contagens exibidas
  correspondem exatamente ao grafo de `Follow` armazenado; (e) a busca dentro do modal filtra a lista
  já carregada sem disparar nova chamada de rede; (f) uma pessoa pode aparecer simultaneamente como
  "seguidora" e como "conexão" quando aplicável.
- Prior art: contrato de API (padrão das demais specs).

## Out of Scope

- Pedido/aceite de follow — decisão explícita de não ter esse fluxo.
- Notificação de "fulano começou a te seguir" — não coberta pelo design desta rodada; candidata a
  extensão futura.
- Perfil privado/fechado — todos os perfis são públicos por padrão no MVP.

## Further Notes

- Design correspondente: seção "07 · Camada social", telas 1–3 — ver
  `docs/design/prompt-rodada-2-social.md`. Vocabulário fixo: "Seguir"/"Seguindo", "seguidores",
  "seguindo", "conexões", selo "Conexão" — nunca "pedido de amizade" ou equivalente.
