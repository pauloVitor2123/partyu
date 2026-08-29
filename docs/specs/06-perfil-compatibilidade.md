# Spec 06 — Perfil & sinal de compatibilidade

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 02 (compatibilidade pessoa↔pessoa)
- **Origem:** PRD §5.3, §7.3; ticket 04; `docs/design/rodada-1-roda-e-proximos.md` (seção "04 Perfil"); `CONTEXT.md`.

## Problem Statement

Um perfil precisa representar uma pessoa (interesses, verificação) e comunicar **o quanto ela combina
comigo** sem virar um app de namoro nem convidar comparação/ranking social — e ainda dar acesso às
ações mínimas de confiança (denunciar/bloquear) sempre que duas pessoas se encontram no produto.

## Solution** — "Meu perfil"** editável (interesses, fotos, configurações) e **"Perfil de outra
pessoa"** somente-leitura com selo de verificado, **ícone de força de compatibilidade** (3 níveis,
qualitativo) e interesses em comum em texto, mais denunciar/bloquear. Toda leitura de compatibilidade
pessoa↔pessoa passa pelo contrato `GET /api/compatibility/user-to-user` (spec 02) — a UI nunca recebe
nem exibe o score cru.

## User Stories

1. Como usuário, quero **editar meus interesses** depois do onboarding, para meu perfil e minhas
   recomendações acompanharem como meu gosto muda.
2. Como usuário, quero **gerenciar minhas fotos** (recomendado mínimo de 4), para meu perfil ficar
   apresentável a quem visita.
3. Como usuário, quero ver minhas **estatísticas** (eventos, grupos) no meu próprio perfil, para ter
   uma visão geral da minha atividade.
4. Como usuário, quero acessar **configurações** e a **Política de Privacidade**, para gerenciar minha
   conta e entender o que acontece com meus dados.
5. Como usuário, quero ver o **perfil de outra pessoa** (nome, foto, interesses), para conhecê-la antes
   de interagir.
6. Como usuário, quero ver um **selo "verificado"** no perfil de quem passou pela verificação SMS, para
   confiar mais.
7. Como usuário, quero ver um **ícone de força de compatibilidade** (baixa → média → alta) no perfil de
   outra pessoa, para captar a afinidade num relance, sem número.
8. Como usuário, quero ler **"vocês curtem X, Y"** (interesses em comum), para entender por que
   combinamos, em vez de um score frio.
9. Como usuário, quero **denunciar** ou **bloquear** uma pessoa a partir do perfil dela, para me
   proteger.
10. Como produto, quero que editar interesses **recomponha meu vetor de perfil** (spec 02), para as
    recomendações refletirem a mudança.
11. Como produto, quero que o selo "verificado" venha **exclusivamente** do status de verificação por
    SMS (spec 10), sem outro sinal de reputação numérico.

## Implementation Decisions

- **Ícone de força de compatibilidade:** mapeamento direto e exclusivo de `signal_level`
  (baixa|média|alta), devolvido por `GET /api/compatibility/user-to-user` (spec 02) — nunca um número
  ou percentual. Visual (arcos tipo wifi ou barras) é decisão de design, não desta spec.
- **Interesses em comum:** renderizados a partir de `shared_interests[]` do mesmo contrato.
- **Edição de interesses:** reaproveita a mesma taxonomia de categorias/subcategorias do onboarding
  (spec 01); ao salvar, dispara a recomposição do vetor de perfil (contrato com spec 02), do mesmo modo
  que o onboarding dispara a composição inicial.
- **Fotos:** mínimo de 4 é **recomendado, não bloqueante** — nudge de completude de perfil, coerente
  com a filosofia de onboarding leve; não há validação dura impedindo salvar com menos (decisão
  default desta spec, a recalibrar em operação se necessário).
- **Selo verificado:** reflete exatamente `Usuário.telefone_verificado` (spec 10); não há cálculo
  adicional de reputação nesta spec.
- **Denunciar/bloquear a partir do perfil:** cria `Denúncia`/`Bloqueio` (PRD §6), mesmas entidades e
  regras operadas pela spec 10 (esta spec só oferece o ponto de entrada da ação no perfil).
- **Configurações e Política de Privacidade:** páginas majoritariamente estáticas (texto/toggles
  simples de conta), sem lógica de negócio nova além do que outras specs já definem (ex.: logout é da
  spec 01).
- **Seam de teste:** contrato de `user-to-user` + efeitos observáveis de editar interesses/denunciar/
  bloquear.

## Testing Decisions

- Testar no seam de API: dado um duplo do serviço de compatibilidade, o perfil de outra pessoa mostra
  exatamente a faixa e os interesses em comum devolvidos — nunca um score.
- Casos-chave: (a) editar interesses persiste e dispara recomposição do vetor (evento/chamada ao
  serviço de spec 02); (b) perfil de outra pessoa nunca renderiza número/score em nenhum elemento; (c)
  selo verificado aparece se e somente se `telefone_verificado=true`; (d) denunciar cria `Denúncia`
  com denunciante/denunciado/contexto=Perfil corretos; (e) bloquear cria `Bloqueio` e passa a ocultar
  o conteúdo da pessoa bloqueada para quem bloqueou (comportamento compartilhado com specs 07/08,
  definido operacionalmente na spec 10); (f) meu perfil exibe corretamente minhas estatísticas
  (contagem de eventos/grupos).
- Prior art: contrato de API (padrão das specs 01–05).

## Out of Scope

- Seguir/seguidor e contagem de conexões (spec 13, Fase 3).
- Depoimentos no perfil (spec 14, Fase 3).
- Reputação numérica/score de confiança (ticket 07: selo verificado é o único sinal no MVP).
- Definição visual final do ícone de força (design explora 2–3 variações; esta spec só fixa o contrato
  de dados por trás dele).

## Further Notes

- Design correspondente: seção "04 Perfil" (meu perfil, editar perfil, configurações, política de
  privacidade) — ver `docs/design/rodada-1-roda-e-proximos.md`. O "ícone de compatibilidade em
  HTML/CSS" é decisão de design ainda a explorar (2–3 variações), não fixada por esta spec.
- Coerência com ticket 04: no MVP a compatibilidade pessoa↔pessoa é **sinal** de similaridade pura —
  não há matchmaker aqui (isso é a roda, spec 12, Fase 2).
