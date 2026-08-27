# Spec 07 — Chat: primitiva + comunidade do evento

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 05 (Detalhe do evento), 10 (gate de verificação/diretrizes, denunciar/bloquear)
- **Origem:** PRD §4, §5.4, §6; ticket 06; `docs/mvp-user-stories.md` (Épicos 2 e 5); `CONTEXT.md`.

## Problem Statement

O produto precisa de **uma única primitiva de conversa** reutilizável em múltiplos modos (comunidade
aberta, grupo privado, e futuramente a roda), em vez de telas de chat redesenhadas para cada contexto.
A comunidade aberta em particular precisa acolher estranhos com um piso de segurança e mostrar, de
forma qualitativa, que "vale a pena" entrar.

## Solution

Um módulo de chat único (Mensagem + Comunidade/Grupo, diferenciados por `tipo: aberto|privado`) que
esta spec implementa no modo **comunidade aberta** (1:1 com um `Evento`). Qualquer pessoa pode entrar;
na primeira entrada em **qualquer** comunidade, passa pelo gate de verificação SMS + aceite de
diretrizes (spec 10). A comunidade mostra o evento fixado no topo, uma **faixa agregada de
compatibilidade** ("N pessoas aqui, M com alta afinidade com você" — via spec 02), e as ações
denunciar/bloquear por mensagem ou pessoa. Quando o evento é `origem=anfitrião`, o criador é
automaticamente **admin** da comunidade (remover membro, reportar).

## User Stories

1. Como participante, quero **ver e enviar mensagens** numa conversa, para me comunicar com quem está
   na comunidade.
2. Como participante, quero **ver quem está** na comunidade (lista de membros), para saber com quem
   falo.
3. Como participante, quero ver o **evento fixado** no topo da conversa, para não perder o contexto.
4. Como Rafael, na **primeira vez** que entro numa comunidade de estranhos, quero passar por um
   **portão** (verificar telefone + aceitar diretrizes), para o ambiente ser mais seguro.
5. Como Rafael, uma vez verificado, quero **não repetir** o portão ao entrar em outras comunidades.
6. Como Rafael, quero ver um **sinal agregado de compatibilidade** ("12 pessoas aqui, 4 com alta
   afinidade com você"), para me sentir estimulado a participar.
7. Como Rafael, quero **ver o perfil de outra pessoa** a partir da comunidade, para conhecê-la antes de
   interagir (spec 06).
8. Como participante, quero **denunciar ou bloquear** uma mensagem/pessoa direto do chat, para me
   proteger.
9. Como anfitrião de um evento que criei, quero ser automaticamente **admin** da comunidade daquele
   evento, para poder remover ou reportar alguém.
10. Como membro comum de uma comunidade de evento `anfitrião`, quero **não** ver as ações de admin, já
    que não sou o criador.
11. Como participante, quero que a comunidade **encerre** (pare de aceitar novas mensagens) depois que
    o evento já aconteceu, para o chat não virar um espaço morto reaberto sem propósito.
12. Como produto, quero que a comunidade seja **autocriada** — 1:1 com cada `Evento` — sem exigir uma
    ação manual de "criar comunidade".

## Implementation Decisions

- **Primitiva única de chat:** entidades `Mensagem` (remetente, conteúdo, timestamp, referência a
  Comunidade **ou** Grupo) e um container de conversa com campo `tipo: aberto|privado` (PRD §6). Esta
  spec implementa o modo `aberto` (Comunidade); o modo `privado` é a spec 08; um 3º modo (roda) é a
  spec 12 — todos consomem o mesmo componente de UI/back-end, diferenciado por contexto.
- **Criação da Comunidade:** 1:1 por `Evento`. Para `origem=ingerido`, autocriada quando o primeiro
  usuário confirma presença/entra (spec 05). Para `origem=anfitrião`, já existe desde a publicação
  (spec 09), com o anfitrião como primeiro membro e admin.
- **Entrada na comunidade:** ação explícita "Entrar na comunidade" a partir do Detalhe do evento (spec
  05); não é automaticamente acoplada a "confirmar presença" — são ações distintas, ainda que
  costumem coincidir na jornada do usuário.
- **Gate de verificação:** dispara **apenas na primeira entrada de cada usuário em qualquer comunidade
  de estranhos** (reaproveita o gate transversal da spec 10); usuários já verificados entram direto.
  **Isto não se aplica ao Grupo privado** (spec 08) — lá são pessoas que o usuário já conhece, sem
  gate.
- **Faixa agregada de compatibilidade:** consome `GET /api/compatibility/user-to-community` (spec 02);
  a UI renderiza `signal_level` + `members_count` + `high_affinity_count` — nunca um score cru.
- **Admin de comunidade:** ausente (sem "dono") para `origem=ingerido`; para `origem=anfitrião`, o
  criador é admin (remover membro, reportar) — modelo WhatsApp reaproveitado das specs 08/09/12 (ticket
  11, D4).
- **Denunciar/bloquear:** esta spec fornece o ponto de entrada da ação (por mensagem ou por pessoa
  dentro do chat); a regra de sanção/consequência pertence à spec 10.
- **Encerramento:** a comunidade muda para estado `encerrada` após o evento acontecer (cadência exata
  calibrável em operação); no estado encerrada, o histórico permanece visível mas não aceita novas
  mensagens.
- **Seam de teste:** contrato do container de conversa (entrar, listar membros, enviar mensagem, fixar
  evento) + contrato de compatibilidade agregada (spec 02) + o gate transversal (spec 10).

## Testing Decisions

- Testar comportamento observável no seam da primitiva de chat + nos contratos das specs 02 e 10 (via
  duplos controláveis).
- Casos-chave: (a) primeira entrada de um usuário não verificado numa comunidade aciona o gate SMS +
  diretrizes antes de permitir enviar mensagem; (b) usuário já verificado entra direto; (c) a faixa
  agregada exibida reflete exatamente o contrato de `user-to-community`; (d) o evento fixado aparece
  corretamente no topo; (e) denunciar/bloquear cria o registro esperado (spec 10) e o bloqueio oculta
  mensagens do bloqueado para quem bloqueou; (f) comunidade de evento `anfitrião` mostra ações de
  admin (remover/reportar) só para o anfitrião, nunca para membros comuns; (g) comunidade `encerrada`
  rejeita novas mensagens mas mantém o histórico visível; (h) comunidade de evento `ingerido` não tem
  nenhum membro com ações de admin.
- Prior art: contrato de API (padrão das specs 01–06); os contratos de spec 02 (compatibilidade) e
  spec 10 (verificação/denúncia) são dependências mockáveis aqui.

## Out of Scope

- Grupo privado em si (spec 08) — outro modo da mesma primitiva.
- Roda (spec 12, Fase 2) — 3º modo, ainda não implementado.
- A regra de sanção automática/escalonamento em si (spec 10 define; aqui só se aciona o registro).

## Further Notes

- Design correspondente: seção "05 Chats" do protótipo (lista, comunidade do evento aberta, portão de
  verificação SMS) — ver `docs/design/rodada-1-roda-e-proximos.md`.
- Reuso reconhecido: esta é a **mesma primitiva** usada pela spec 08 (grupo privado) e, no futuro, pela
  spec 12 (roda) — evitar telas/lógica duplicadas entre os três modos.
