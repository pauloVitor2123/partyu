# Spec 02 — Motor de recomendação & serviço de embeddings

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 01 (perfil com interesses)
- **Origem:** PRD §7; `docs/motor-de-recomendacao.md`; tickets 04, 10; ADR 0002.

## Problem Statement

O valor central do Partyu é mostrar "o evento certo" e "as pessoas com quem combina" —
sem isso a Home é um catálogo qualquer e o perfil não diz nada. Para isso é preciso um
serviço que transforme interesses/eventos em vetores e compare-os por afinidade, exposto
por um contrato estável que a Home (spec 04), o Perfil (spec 06) e a Comunidade (spec 07)
consomem. O risco é vazar número cru de afinidade para a UI (vira "app de namoro" / ranking
tóxico) e acoplar o resto do app ao modelo de embedding específico.

## Solution

Um **serviço de recomendação** isolado atrás de uma interface própria (o seam #2). Ele: (a)
compõe e mantém o **vetor de perfil** (interesses explícitos + sinais implícitos ponderados)
e o **vetor de evento** (título+descrição+tags); (b) calcula **similaridade de cosseno** nas
três operações — pessoa↔evento, pessoa↔pessoa, grupo↔evento; (c) devolve à UI **faixas
qualitativas** (baixa/média/alta) e nunca o score cru; (d) suporta a **alavanca de
novidade** (parâmetro precisão↔surpresa) e a agregação **menor sofrimento** para grupos.
No MVP o sinal pessoa↔pessoa é **similaridade pura** (sem diversidade explícita); o
"diverso mas compatível" e o piso de sanidade ~0.10 ficam preparados para a roda (spec 12).

## User Stories

1. Como usuário, quero ver eventos ordenados pela afinidade comigo, para achar rápido o que
   tem a minha cara.
2. Como usuário, quero uma alavanca "parecido comigo ↔ me surpreenda", para controlar o
   quanto saio da minha bolha.
3. Como usuário, quero que meu vetor de perfil evolua com o que eu favorito/confirmo, para
   as recomendações melhorarem com o uso.
4. Como usuário, quero ver "vocês curtem X, Y" no perfil de alguém, para entender por que
   combinamos, sem um número.
5. Como usuário, quero ver a força de compatibilidade como faixa qualitativa (baixa/média/
   alta), para não comparar pontuações.
6. Como usuário numa comunidade, quero saber "quantos aqui têm alta afinidade comigo", para
   sentir se vale entrar.
7. Como grupo de amigos, quero recomendações de evento que agradem a todos, para ninguém
   ficar de fora.
8. Como grupo, quero que a escolha priorize "ninguém detesta" em vez da média morna, para o
   rolê não ser um meio-termo sem graça.
9. Como produto, quero compor o vetor de evento a partir de título+descrição+tags, para
   novos eventos entrarem no motor automaticamente.
10. Como produto, quero pesos distintos por tipo de sinal (visualizar < favoritar <
    confirmar ≈ avaliar), para refletir intensidade real de interesse.
11. Como produto, quero que a similaridade seja calculada sob demanda (ou cache com TTL
    curto), para não persistir afinidade como fato bruto.
12. Como produto, quero um piso de sanidade (~0.10) que, ao sugerir pessoas, sinalize
    "comunidade vazia/dados quebrados" em vez de forçar sugestão (preparado para a roda).
13. Como produto, quero trocar o modelo de embedding sem reescrever os consumidores, para
    não acoplar a Home/Perfil ao modelo.
14. Como pesquisador, quero registrar os parâmetros usados (alavanca, pesos) por
    recomendação servida, para analisar precisão×novidade na coorte (spec 11).
15. Como usuário sem histórico (recém-onboarded), quero recomendações a partir só dos meus
    interesses declarados, para não ver uma Home vazia (cold start).

## Implementation Decisions

- **Serviço isolado (seam #2):** motor de embeddings/cosseno em serviço próprio (Python,
  conforme arquitetura PRD §8), consumido pelo backend por contrato. Nenhum consumidor
  conhece o modelo de embedding por dentro.
- **Contratos de API (do PRD §7.3, canônicos):**
  - `GET /api/recommendations/events?user_id&lat&lng&radius_km` → lista de eventos com
    `score` (cosseno), `distance_km`, `start_at`, `source`. A UI usa ordenação/destaque, não
    exibe `score`.
  - `GET /api/compatibility/user-to-community?user_id&community_id` → `signal_level`
    (baixa|media|alta), `shared_interests[]`, `members_count`, `high_affinity_count`.
  - `GET /api/compatibility/user-to-user?user_id&target_user_id` → faixa qualitativa +
    interesses em comum (nunca score cru).
  - (Grupo↔evento) endpoint de recomendação para grupo aplicando **menor sofrimento**
    (usado pela spec 08).
- **Faixas qualitativas:** o mapeamento score→{baixa,média,alta} é responsabilidade do
  serviço/backend; a UI recebe já a faixa. Os limiares são calibráveis por dados, não
  constantes sagradas.
- **Alavanca de novidade:** parâmetro de entrada na recomendação pessoa↔evento (contínuo
  "parecido"→"surpreenda"); default sai dos dados de uso (spec 11), não fixo em código.
  Não travar faixa de similaridade no código.
- **Composição de vetores:** perfil = interesses explícitos + interações ponderadas
  (`Interação.tipo` com peso); evento = embedding de título+descrição+tags. Recomposição do
  perfil disparada por novas interações relevantes.
- **Menor sofrimento (grupo↔evento):** agrega por *least-misery* (máximo da menor nota
  individual), não média (ADR 0002).
- **Preparado, não ativo no MVP:** "diverso mas compatível" (recíproco) e piso ~0.10 são
  do matchmaker da roda (spec 12) — a interface já prevê, a lógica ativa vem depois.

## Testing Decisions

- Testar o **contrato do serviço**: dado um perfil e um conjunto de eventos/pessoas, a saída
  é a ordenação/faixa esperada — comportamento observável, não a matemática interna do
  embedding (que é dependência externa, mockável).
- Casos-chave: (a) ordenação pessoa↔evento respeita afinidade; (b) UI nunca recebe score
  cru nos endpoints de compatibilidade — só faixa; (c) alavanca em "surpreenda" muda o
  conjunto retornado vs "parecido"; (d) grupo↔evento escolhe pelo menor-sofrimento (o
  exemplo funk 9/8/2 vs feira 7/7/6 → feira); (e) pesos de sinal: confirmar presença desloca
  mais o vetor que visualizar; (f) cold start: perfil só com interesses ainda recomenda.
- Prior art: contrato de API (padrão da spec 01). O serviço de embedding é dependência
  externa — testes usam duplo controlável para vetores determinísticos.

## Out of Scope

- Matchmaker da roda ("diverso mas compatível", recíproco, piso de sanidade **ativo**) —
  spec 12.
- Treino/afinação do modelo de embedding e escolha de modelo (dado de arquitetura; a base
  `text-embedding-ada-002` já existe conceitualmente — ver `map.md`).
- Métricas formais de precisão/revocação da coorte (spec 11 define a captura; a análise é
  pesquisa).

## Further Notes

- O design nunca mostra número de afinidade: no evento é ordenação/destaque; entre pessoas
  é o **anel de afinidade** (3 níveis) + "interesses em comum" — ver design rodada 1
  (elemento reutilizável) e PRD §5.3.
- Coerência com ticket 04: no MVP o sinal é similaridade pura; a diversidade é direção de
  roadmap materializada na roda.
