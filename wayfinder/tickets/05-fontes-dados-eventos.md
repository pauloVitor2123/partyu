---
title: "Fontes de dados de eventos (Sympla / Google Events / Eventbrite)"
labels: [wayfinder:research]
status: closed
assignee: paulovitor
blocked_by: []
---

## Resolution

Verificação ao vivo concluída em `../research/05-fontes-dados-eventos.md`. **Eventbrite:** busca
pública de terceiros removida (12/dez/2019; desligada 20/fev/2020) — catálogo amplo só via programa de
parceiros. **Descartada** para descoberta. **Sympla:** melhor cobertura BR, mas API restrita à conta
do próprio produtor (sem busca do catálogo global); amplo depende de parceria/feed. **Google Events:**
sem API oficial (Places retorna lugares, não eventos) → via prática é **SerpApi** (campos title/date/
address/ticket_info/venue; grátis 250/mês, tiers pagos). **Risco material novo:** litígio Google×SerpApi
(processo dez/2025; moção de arquivamento concedida jul/2026) → tratar SerpApi como fonte plugável.
**Recomendação:** primária **SerpApi (Google Events)** para arrancar rápido; plano B **parceria/feed
Sympla**; isolar ingestão atrás de uma interface de "provedor de eventos" para trocar sem reescrever.

## Question

Que APIs públicas de eventos viabilizam ingerir eventos e auto-criar chats/comunidades por evento no
Rio? Investigar **Sympla, Google Events (Places/Events), Eventbrite**: o que cada API expõe (campos:
título, descrição, categorias, local, data), **cobertura no Rio de Janeiro**, limites de uso,
custo, e **termos de uso** — em especial se permitem derivar comunidades/chats a partir dos eventos.
Concluir com uma recomendação de qual(is) fonte(s) usar no MVP e riscos (disponibilidade, cobertura,
mudança de termos — já sinalizados como risco na tese).

Achados → `wayfinder/research/05-fontes-dados-eventos.md`. Resolvido por subagente `/research`.
