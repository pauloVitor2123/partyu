---
title: "Escopo e fluxos mínimos do MVP (duas frentes)"
labels: [wayfinder:grilling]
status: closed
assignee: paulovitor
blocked_by: [01, 02, 04, 05]
---

## Resolution

MVP definido via grilling (resolvido à frente dos blockers 01/02/04, cujo essencial já estava nos
docs). **Espinha evento-primeiro:** home = mapa de eventos próximos ⇄ toggle lista (cards). **Frente
2:** uma comunidade/chat aberta por evento; compatibilidade é **sinal** (agregado + interesses em
comum + ícone de força HTML/CSS no perfil), **não** matchmaker. **Frente 1:** grupo privado (mesma
primitiva de chat), convite por link/WhatsApp, evento fixado. **Onboarding leve:** Google + interesses
+ localização + termos com divulgação de uso acadêmico; verificação SMS **just-in-time** antes de
interagir com estranhos. **Segurança:** denunciar/bloquear + selo verificado + aceite de diretrizes +
aviso de 1º encontro.

**Fluxos a desenhar (MUST, nesta ordem):** 1) Onboarding & consentimento; 2) Primitiva de chat (reusada
3×); 3) Home mapa/lista; 4) Detalhe do evento; 5) Comunidade do evento (chat aberto); 6) Perfil/detalhe
do usuário (c/ ícone de compatibilidade); 7) Grupo privado.

**Asset (user stories p/ design):** `docs/mvp-user-stories.md`.

**Decisão de escopo:** "mesas compatíveis" (matchmaker da tese) saem do MVP → fronteira seguinte.

## Question

Quais são os fluxos mínimos do MVP para as duas frentes, e o que fica claramente fora do escopo
inicial? Frente 1 (grupos que já se conhecem): do onboarding à formação de grupo e à escolha de um
evento/experiência em comum. Frente 2 (entrar em grupos de estranhos): dos eventos ingeridos →
chats/comunidades por evento → como alguém entra e é acolhido, com a compatibilidade influenciando.
Definir: onboarding mínimo, telas/estados essenciais, o "primeiro momento de valor", e a fronteira
explícita do que NÃO entra no MVP. Insumo: personas (02), sinais (04), fontes de eventos (05),
proposta de valor (01).
