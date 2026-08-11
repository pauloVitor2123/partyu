---
title: "Modelo de dados e sinais de comportamento"
labels: [wayfinder:grilling, wayfinder:domain-modeling]
status: closed
assignee: paulovitor
blocked_by: []
---

## Resolution

**Decisão-chave:** o sinal de compatibilidade é **similaridade pura** (interesses declarados +
comportamento implícito) — sem fator de "diversidade" explícito no MVP. "Compatível mas diverso" não
é um objetivo de produto na v1; é, no máximo, um efeito observável a posteriori (dois perfis com
interesses parecidos podem ter background bem diferente) — não algo que o produto otimiza ou
comunica ativamente. Isso simplifica o vocabulário de domínio:

- **Perfil** — representação de um usuário: interesses explícitos (categorias/subcategorias
  escolhidas no onboarding) + histórico de comportamento (o que gerou sinais implícitos).
- **Sinal** — qualquer evento de interação que informa o perfil: curtir, favoritar, tempo de
  visualização de um evento, confirmar presença, avaliar pós-evento. Sinais têm peso diferente
  (confirmar presença > favoritar > visualizar) mas isso é detalhe de algoritmo, fora deste ticket.
- **Compatibilidade** — grau de sobreposição entre dois perfis (par-a-par) ou entre um perfil e um
  agregado de perfis (perfil↔grupo/comunidade), derivado de interesses + comportamento. Exibida como
  o ícone de força já decidido no ticket 06. Não carrega semântica de "diversidade" no MVP.
- **Comunidade/chat de evento** — agregado de perfis que confirmaram interesse/presença num mesmo
  evento ingerido; a compatibilidade de um perfil com essa comunidade é a média/composição da
  compatibilidade par-a-par com quem já está nela.
- **Grupo (privado)** — conjunto de perfis que já se conhecem (frente 1), formado por convite, não
  por matching de compatibilidade.
- **Adequação evento↔grupo** — o quanto um evento serve a um grupo específico: combinação da
  compatibilidade agregada do grupo com as categorias/tags do evento. Nível de produto: aparece como
  "esse evento combina com o seu grupo" ao lado de eventos sugeridos para um grupo privado; não tem
  score numérico exposto ao usuário no MVP (só o ícone de força, qualitativo).

Diversidade fica marcada como direção de pesquisa/roadmap (ver ticket 09 — riscos/limitações e
extensões futuras), não como requisito de produto do MVP.

## Question

Quais dados e sinais o Partyu deve coletar/analisar para estimar, em nível de produto (não de
algoritmo): (i) **interesses individuais** — explícitos (categorias/subcategorias no onboarding) e
implícitos (curtidas, tempo de visualização, favoritar, confirmar presença, avaliar); (ii)
**compatibilidade social/cultural par-a-par e em grupo** — que sinais indicam encaixe entre perfis
diversos, e o que "compatível mas diverso" significa concretamente; (iii) **adequação evento↔grupo**
— quando um evento serve bem a um grupo. Definir o vocabulário de domínio (perfil, sinal,
compatibilidade, comunidade/chat de evento, grupo) via `/domain-modeling`, sem entrar em cosseno/
embeddings (isso é a base técnica já dada).
