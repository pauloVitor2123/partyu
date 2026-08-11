---
title: "Features priorizadas, riscos e redação da visão"
labels: [wayfinder:grilling]
status: closed
assignee: paulovitor
blocked_by: [06, 07, 08]
---

## Resolution

Documento de visão final escrito e sintetizado a partir de todas as decisões (01–08) em
**`docs/PRD-Partyu.md`**. Cobre: visão geral (problema, contexto, proposta de valor), objetivos do
MVP técnico e ligação com a pesquisa, 3 personas com cenários no Rio, escopo funcional MUST/SHOULD/
COULD, 5 fluxos principais de usuário, modelo de dados de alto nível (9 entidades), especificação do
módulo de recomendação (base existente + extensão perfil↔perfil + endpoints em pseudo-JSON),
arquitetura macro (React Native + Supabase + serviço Python de embeddings + ingestão isolada por
interface + landing Next.js), requisitos não funcionais, roadmap de extensões futuras (mesas
compatíveis, IA generativa para criação de eventos, gamificação, analytics para criadores, feed estilo
TikTok, etc.) e métricas de sucesso separando o que é validável no MVP do que depende da coorte de
pesquisa 2026–2027. **Riscos e limitações assumidos na v1** (registrados no corpo do documento):
dependência de fonte de dados de terceiro sob litígio ativo (SerpApi/Google, tratada como plugável);
segurança de estranhos apoiada em verificação leve (SMS) + moderação reativa, não em verificação de
documento; coorte de pesquisa pequena (≥20) e não generalizável estatisticamente; as duas frentes
(grupo existente + estranhos compatíveis) entram juntas no MVP, aumentando escopo de segurança desde
o início por decisão deliberada (não adiável, ver `map.md`).

**Isso fecha o destino do mapa** (`wayfinder/map.md`).

## Question

Ticket de síntese que **produz o documento-destino**. A partir de tudo já decidido, entregar:
(1) resumo de propósito do projeto (1–2 parágrafos); (2) descrição de alto nível do MVP;
(3) lista de funcionalidades priorizadas **MUST / SHOULD / COULD**; (4) riscos e limitações
assumidas na primeira versão (incl. as duas frentes no MVP, dependência de APIs de terceiros,
segurança de estranhos, coorte pequena/não generalizável). Montar o documento de visão final,
coerente e pronto para virar issues técnicas. Fechar este ticket = alcançar o destino do mapa.
