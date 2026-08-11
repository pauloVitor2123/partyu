---
title: "Confiança, segurança e moderação (grupos de estranhos)"
labels: [wayfinder:grilling]
status: closed
assignee: paulovitor
blocked_by: [06]
---

## Resolution

Modelo: **regras automáticas + revisão manual para casos graves.**

- **Sanção automática:** um usuário que acumula N denúncias (a calibrar em operação, ex. 3) contra si
  em janelas de tempo distintas tem o perfil suspenso automaticamente até revisão — sem esperar fila
  humana. Evita exposição contínua a um mau ator enquanto o piloto ainda tem pouca gente moderando.
- **Escalonamento manual prioritário:** categorias de denúncia marcadas como graves (assédio, ameaça,
  discurso de ódio, conteúdo ilegal) pulam a fila automática e vão direto pra revisão manual
  prioritária — você (ou a pequena equipe do piloto) revisa e decide sanção (suspensão temporária,
  banimento) em vez de deixar só a contagem decidir.
- **Denúncia e bloqueio** (já no ticket 06): usuário denuncia mensagem/perfil e bloqueia
  individualmente, independente da ação automática/manual.
- **Política de conteúdo mínima:** diretrizes aceitas no primeiro acesso (ticket 06) cobrem o que é
  proibido (assédio, discurso de ódio, spam/golpe, conteúdo ilegal) — texto simples, não precisa de
  documento jurídico complexo na v1.
- **Resposta a incidente presencial:** aviso de segurança de 1º encontro (já decidido no ticket 06) é
  a salvaguarda principal; não há suporte ao vivo/hotline no MVP — fora de escopo por tamanho do
  piloto, registrado como limitação (ver ticket 09).
- **Reputação:** selo "verificado" (SMS) é o único sinal de reputação no MVP; nada de score de
  confiança numérico ainda — simplicidade proporcional ao risco de um piloto pequeno e monitorado de
  perto.

## Question

> **Já decidido no ticket 06 (superfície mínima do MVP):** verificação SMS just-in-time antes de
> interagir com estranhos + selo "verificado" + aceite de diretrizes na 1ª entrada + denunciar/bloquear
> + aviso de 1º encontro. **O que resta a este ticket:** operação de moderação (fila de denúncias,
> escalonamento, sanções), política de conteúdo, e resposta a incidentes — o "atrás das telas".

Como o MVP garante confiança e segurança quando desconhecidos se encontram (frente 2 / chats por
evento)? Decidir o mínimo viável: verificação de identidade/perfil, moderação de chats/comunidades,
denúncia e bloqueio, sinais de reputação, e salvaguardas do primeiro encontro presencial. Nível de
produto (o que existe e por quê), não implementação. Deve ser proporcional ao risco de juntar
estranhos num evento real — sem inviabilizar a adoção.
