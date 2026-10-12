# Partyu — Roadmap em marcos testáveis

> **O que é este doc.** As specs (`docs/specs/`) são fatias técnicas. Este doc agrupa essas fatias em
> **marcos verticais**: cada marco termina com algo que o dono **abre e usa de verdade** (no navegador
> ou no celular) e um **roteiro de teste manual** para dizer "passou" ou "não passou". Só se começa o
> próximo marco depois que o atual passou no roteiro.
>
> Os testes automatizados de cada spec (seção "Testing Decisions") continuam valendo. O roteiro manual
> é o que o dono executa.

## Visão geral

| Marco | Entrega que dá para usar | Specs | Onde se testa |
|---|---|---|---|
| **M0** | Landing page pública com waitlist e métricas | 15 | navegador + Search Console |
| — | **Rodada de decisões → Spec 00 (fundação)** | 00 (a escrever) | — |
| **M1** | App abre no celular e lista eventos reais do Rio | 00, 03, 04 (parcial), 05 (parcial) | celular (build de desenvolvimento) |
| **M2** | Entrar, escolher interesses e ver eventos ordenados por afinidade | 01, 02 (pessoa↔evento), 04, 11 (telemetria + ToS) | celular, 2 contas |
| **M3** | Frente 2: confirmar presença, entrar na comunidade, conversar com segurança | 05, 06, 07, 10, 02 (pessoa↔pessoa) | 2 celulares/contas |
| **M4** | Frente 1: grupo privado com convite por link e evento para o grupo | 08, 02 (grupo↔evento) | 2–3 contas + WhatsApp |
| **M5** | Criar o próprio evento (anfitrião) | 09 | 2 contas |
| **M6** | Pronto para piloto fechado nas lojas | 11 (TCLE), lojas, exclusão de conta | TestFlight + Play teste interno |
| Pós-MVP | Roda (Fase 2), seguir/conexão e depoimentos (Fase 3) | 12, 13, 14 | — |

> A ordem M3/M4 pode inverter conforme o resultado da landing (qual frente atrai mais: hipótese H3 da
> spec 15).

---

## M0 — Landing page de validação

- **Specs:** 15.
- **Pronto quando:** site no ar no domínio próprio, waitlist gravando no Supabase, analytics e Search
  Console funcionando, metas H1–H4 definidas.
- **Roteiro manual:** o da spec 15, seção "Testing Decisions" (passos 1–8).
- **Depois de pronto:** divulgar com UTMs e acompanhar por 8 semanas **em paralelo** com M1+. Não é
  preciso esperar o fim da validação para começar a fundação, mas os resultados podem mudar a prioridade
  das frentes.

## Rodada de decisões → Spec 00 (fundação)

Antes do M1, uma rodada curta de decisões (grilling) para escrever a **Spec 00** e os ADRs
correspondentes. Itens em aberto encontrados na revisão de 2026-10-12:

1. **Stack do app:** Expo (managed + dev build) ou React Native puro. Recomendação: Expo.
2. **Onde roda o serviço de embeddings** (Python): hospedagem, custo, como o Supabase chama. Avaliar se
   no MVP o cosseno cabe no próprio Postgres (`pgvector`) e o Python fica só para gerar embeddings.
3. **Modelo de embedding:** o piloto usou `text-embedding-ada-002` (legado desde 2024); escolher o
   substituto (ex. família `text-embedding-3`) e o custo por evento/perfil.
4. **Forma da API:** o PRD descreve REST (`GET /api/...`), mas a base é Supabase (PostgREST/RPC/Edge
   Functions). Decidir e ajustar o contrato das specs 02/04/06/07/08.
5. **Mapa e geocoding** (Google Maps, Mapbox ou MapLibre), com custo.
6. **SMS** (Supabase Auth phone + provedor como Twilio): custo por verificação no Brasil.
7. **Links de convite** (deep links/universal links) para o grupo privado (spec 08).
8. **Ambientes e qualidade:** dev/staging/prod do Supabase, CI, como rodar tudo localmente, estrutura do
   monorepo (`apps/landing`, `apps/mobile`, `services/recommender`, `supabase/`).
9. **Requisitos das lojas** (afetam spec 01):
   - **Exclusão de conta dentro do app** é exigida pela Apple e pelo Google Play. A spec 01 a deixa como
     pós-MVP; precisa entrar no MVP (no M6, no máximo).
   - **Login Apple:** a Apple exige uma opção de login equivalente quando o app oferece login Google.
     A spec 01 o deixa fora do MVP; precisa entrar para publicar no iOS.
10. **Design × specs:** o protótipo mostra mensagens diretas 1:1 ("Diretas"), login por e-mail/senha,
    uma etapa "Gêneros musicais" no onboarding e "Conexões" no perfil. Nenhuma spec do MVP cobre isso.
    Decidir: entra no MVP (escrever spec) ou sai do design.
11. **Protótipo versionado:** o HTML do Claude Design está só em `Downloads/`. Trazer para
    `docs/design/` e aplicar as Rodadas 1–3 pendentes (a Rodada 3, criar evento, é MVP).

---

## M1 — Catálogo real no celular

- **Specs:** 00 (fundação), 03 (ingestão), 04 **parcial** (só lista, ordenada por data, sem login e sem
  afinidade), 05 **parcial** (detalhe só leitura).
- **Por que esse corte:** é o primeiro risco técnico do PRD (§2.2-i): a ingestão sustenta um catálogo
  de qualidade? Dá para ver isso sem login nem recomendação.
- **Pronto quando:** o cron roda sozinho e o app mostra eventos reais e futuros do Rio.
- **Roteiro manual:**
  1. Abrir o app no celular: a lista mostra eventos reais do Rio, com título, data, local e categoria.
  2. Conferir 10 eventos ao acaso contra a fonte original: dados corretos e link de volta para a fonte.
  3. Procurar duplicatas óbvias (mesmo evento duas vezes): nenhuma.
  4. Rodar a ingestão de novo manualmente: a contagem não cresce com duplicatas.
  5. Esperar um evento passar da data: ele sai da lista.
  6. Simular falha da fonte (chave inválida): o app continua mostrando o catálogo anterior; o log
     registra o erro.
  7. Ver o log/telemetria do cron: quantos ingeridos, duplicados e erros por execução.

## M2 — Entrar e receber recomendação

- **Specs:** 01, 02 (pessoa↔evento + cold start), 04 completa (mapa ⇄ lista, filtros, ordenação por
  afinidade), 11 parcial (ToS com uso acadêmico + telemetria básica).
- **Pronto quando:** duas pessoas com interesses diferentes veem Homes ordenadas de forma diferente.
- **Roteiro manual:**
  1. Instalar do zero, entrar com Google, escolher interesses, negar localização e informar bairro:
     cai na Home com eventos.
  2. O botão de continuar nos Termos só habilita depois do aceite; o uso acadêmico aparece destacado.
  3. Fechar e reabrir: vai direto para a Home (sem repetir o onboarding).
  4. **Conta A** (música/festa) e **conta B** (gastronomia/arte): as listas começam com eventos
     diferentes e coerentes com cada perfil.
  5. Alternar mapa ⇄ lista, fechar o app e reabrir: lembra a última escolha.
  6. Filtrar por categoria e data: a lista restringe sem perder a ordem.
  7. Nenhum número de afinidade aparece em lugar nenhum.
  8. Favoritar/confirmar alguns eventos de uma categoria nova e reabrir: a ordem se desloca na direção
     deles.
  9. No banco: usuário, perfil, aceite de ToS (data + versão) e eventos de telemetria gravados.

## M3 — Frente 2: comunidade do evento

- **Specs:** 05 completa, 06, 07, 10, 02 (pessoa↔pessoa e agregado da comunidade).
- **Pronto quando:** duas contas de estranhos se encontram na comunidade de um evento e conversam com o
  piso de segurança funcionando.
- **Roteiro manual (2 celulares ou celular + emulador):**
  1. Conta A confirma presença: aparece o aviso de primeiro encontro antes de efetivar.
  2. Conta A toca em "Entrar na comunidade": pede SMS + diretrizes (primeira vez); depois de verificar,
     entra.
  3. Conta A sai e entra em outra comunidade: **não** pede SMS de novo.
  4. Conta B entra na mesma comunidade; as duas trocam mensagens em tempo real.
  5. A faixa "N pessoas aqui, M com alta afinidade com você" aparece, sem número de score.
  6. A abre o perfil de B: anel de afinidade, "vocês curtem X, Y", selo verificado.
  7. A bloqueia B: as mensagens de B somem para A, mas continuam visíveis para os outros.
  8. Três contas denunciam B (motivo não grave): B fica suspensa e vê a mensagem de conta em revisão.
     Uma denúncia grave vai direto para a fila escalada (consultável no banco).
  9. Depois do evento: a comunidade fica encerrada (histórico visível, não aceita mensagem nova).

## M4 — Frente 1: grupo privado

- **Specs:** 08, 02 (grupo↔evento, menor sofrimento).
- **Pronto quando:** a articuladora cria um grupo, os amigos entram pelo link do WhatsApp e o grupo fixa
  um evento recomendado para todos.
- **Roteiro manual (3 contas):**
  1. Conta A cria um grupo e compartilha o link pelo WhatsApp.
  2. Contas B e C tocam no link: abrem o app direto no grupo e entram sem aprovação e **sem** SMS.
  3. O grupo mostra eventos recomendados "para o grupo" com explicação ("combina com 3 de 3"), sem
     número.
  4. Com perfis bem diferentes (A festa, B gastronomia, C arte), a recomendação **não** é a favorita de
     um só: o caso "ninguém detesta" funciona (conferir com o exemplo funk × feira do motor).
  5. A fixa um evento: aparece no topo para todos; trocar substitui o anterior.
  6. A promove B a admin; C (membro comum) não vê as ações de admin; C sai do grupo.
  7. "Chamar meu grupo" no detalhe de um evento: escolhe o grupo e já fixa o evento.

## M5 — Criar evento (anfitrião)

- **Specs:** 09 (depende do design da Rodada 3 aplicado).
- **Pronto quando:** um usuário publica um rolê e outra pessoa o encontra na Home e entra na comunidade.
- **Roteiro manual:**
  1. Conta A (nova, sem SMS) toca no "+", preenche título, data, local (endereço completo) e categoria,
     sem foto, e toca em Publicar: pede SMS só nesse momento.
  2. Depois de publicar: o detalhe mostra o selo "Anfitrião" e a comunidade já existe com A como admin.
  3. Conta B vê o evento misturado aos ingeridos na Home, com o selo discreto; o pin está no **bairro**,
     não no endereço digitado.
  4. B confirma presença e entra na comunidade; A consegue remover B; B não vê ações de admin.
  5. O formulário não tem preço nem limite de vagas.

## M6 — Pronto para piloto fechado

- **Specs:** 11 completa (convite ao TCLE pós-onboarding, revogar, pedido de exclusão dos dados de
  pesquisa), exclusão de conta no app, login Apple, publicação em canal de teste.
- **Pronto quando:** o app está no TestFlight e no teste interno do Play, e os primeiros convidados da
  waitlist (M0) conseguem instalar.
- **Roteiro manual:**
  1. Recusar o TCLE: o app funciona inteiro normalmente. Aceitar, depois revogar: idem.
  2. Excluir a conta dentro do app: a conta some e o login seguinte começa do zero.
  3. Entrar com Apple no iPhone.
  4. Convidar de 5 a 10 pessoas da waitlist, acompanhar a primeira semana pelas métricas de produto do
     PRD §11.1 (conclusão do onboarding, entrada em comunidade, primeira mensagem).
