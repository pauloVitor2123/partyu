# Spec 08 — Grupo privado (frente 1)

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 07 (primitiva de chat)
- **Origem:** PRD §5.5; ticket 06; `docs/design/rodada-1-roda-e-proximos.md` (seção "05 Chats"); ADR 0002.

## Problem Statement

A articuladora social (Marina/Duda) já tem o grupo de amigos — o que falta é uma ferramenta para
achar o programa em comum e coordenar a ida, sem o atrito de enquete manual + confirmação um por um no
WhatsApp, e sem o gate de segurança pensado para estranhos (aqui são pessoas que ela já conhece).

## Solution

Reaproveita a primitiva de chat (spec 07) no modo `privado`: qualquer usuário cria um grupo, convida
por link compartilhável (ou WhatsApp), vê **recomendações de evento para o grupo** (adequação
evento↔grupo por **menor sofrimento**, spec 02/ADR 0002), fixa um evento no topo e coordena por chat.
Sem gate de verificação SMS — são pessoas que o criador já conhece.

## User Stories

1. Como Marina, quero **criar um grupo privado**, para reunir meus amigos num só lugar.
2. Como Marina, quero **convidar por link** (compartilhável via WhatsApp ou qualquer canal), para
   trazer todo mundo sem atrito de cadastro manual.
3. Como convidado, quero **entrar no grupo pelo link**, sem precisar de aprovação prévia de ninguém.
4. Como membro do grupo, quero ver **eventos recomendados para o grupo todo**, com uma explicação
   qualitativa ("combina com 4 de 5 membros"), para decidir com base em algo além do meu gosto sozinho.
5. Como Marina, quero **fixar um evento** no grupo, para todo mundo ver e se organizar em torno dele.
6. Como Marina, quero poder **trocar** o evento fixado se os planos mudarem.
7. Como membro do grupo, quero **conversar** no grupo (mesma primitiva de chat, modo privado), para
   combinar os detalhes.
8. Como criadora do grupo, quero ser automaticamente **admin** (modelo WhatsApp: promover outro
   membro, remover alguém), para gerenciar o grupo.
9. Como membro promovido a admin, quero ter as mesmas permissões de gestão, para dividir a
   responsabilidade de organizar.
10. Como membro, quero poder **sair** do grupo quando quiser.
11. Como membro de um grupo **sem evento fixado ainda**, quero ver um estado vazio com um convite claro
    a buscar/fixar um evento, para saber o próximo passo.

## Implementation Decisions

- **Mesma entidade de chat da spec 07**, diferenciada por `tipo: privado`; **sem** gate de verificação
  SMS (a diferença deliberada frente à Comunidade — aqui são amigos, não estranhos).
- **Criação e convite:** o criador é `owner`; convite é um link compartilhável (deep link) que qualquer
  pessoa pode usar para entrar diretamente, sem fila de aprovação — coerente com "convite por link/
  WhatsApp" (ticket 06).
- **Recomendação evento↔grupo:** consome o endpoint de compatibilidade de grupo (spec 02, contrato
  `GET /api/compatibility/event-fit-for-group`), que aplica **menor sofrimento** (ADR 0002) — nunca
  média simples. A UI mostra `fit_level` + explicação textual, nunca o score.
- **Vetor do grupo:** composição (ex. centróide) dos vetores de perfil dos membros (PRD §7.2),
  recalculado quando a composição do grupo muda (entrada/saída de membro).
- **Evento fixado:** um evento **ativo** por vez no topo do chat; fixar outro substitui o anterior no
  topo (sem exigir histórico obrigatório de fixados passados no MVP).
- **Admin modelo WhatsApp:** owner = admin inicial; pode promover outros a admin e remover membros —
  mesmo padrão reaproveitado pela spec 09 (comunidade de anfitrião) e pela spec 12 (roda).
- **Seam de teste:** contrato de criação/convite/fixação de evento + contrato de recomendação
  evento↔grupo (spec 02).

## Testing Decisions

- Testar comportamento observável: criação, convite, fixação de evento e a recomendação por menor
  sofrimento — via duplo controlável do serviço de compatibilidade.
- Casos-chave: (a) criar grupo define o criador como admin; (b) entrar pelo link não exige aprovação
  nem SMS; (c) recomendação de evento para o grupo aplica menor sofrimento — dado o exemplo do motor
  (funk 9/8/2 vs. feira 7/7/6), o grupo recebe a feira como melhor recomendação; (d) fixar um evento
  reflete no topo do chat e substitui o anterior; (e) admin pode promover/remover, membro comum não
  consegue; (f) grupo sem evento fixado mostra o estado vazio com CTA de buscar recomendação; (g)
  entrar/sair de membros dispara recomposição do vetor do grupo.
- Prior art: contrato de API (padrão das specs 01–07); o serviço de compatibilidade é dependência
  mockável.

## Out of Scope

- Votação/enquete de evento dentro do grupo (SHOULD, pós-MVP).
- Avaliação/feedback pós-evento (SHOULD, pós-MVP).
- Roda (spec 12) — outro modo de chat, semeado pelo matchmaker, não auto-convidado como o grupo.

## Further Notes

- Design correspondente: seção "05 Chats" do protótipo (grupo privado com evento fixado 📌) — ver
  `docs/design/rodada-1-roda-e-proximos.md`.
- Ver `docs/adr/0002-agregacao-grupo-menor-sofrimento.md` para a justificativa completa da estratégia
  de agregação.
