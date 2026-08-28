# Spec 12 — Roda / matchmaker perfil↔perfil

- **Fase:** 2 (Pós-MVP)
- **Status:** ready-for-agent
- **Depende de:** 07 (primitiva de chat), 02 (motor de compatibilidade — ativa a lógica "diverso mas
  compatível" já preparada)
- **Origem:** ticket 10 (decisão completa D1–D10); ADR 0001; `docs/motor-de-recomendacao.md`; design
  `docs/design/prompt-rodada-1-roda.md`; `CONTEXT.md`.

## Problem Statement

A comunidade de um evento mostra o sinal de compatibilidade, mas não empurra ninguém de "notei que
combino" para "de fato me juntei a alguém". Formar grupos automaticamente pelo maior cosseno produziria
clones (gente parecidíssima) e tiraria a agência do usuário; não formar nada deixa a compatibilidade
como mera decoração. É preciso uma ponte que sugira, sem forçar, e que funcione com o risco real de
juntar estranhos num grupo pequeno e privado.

## Solution

Um matchmaker de **sugestão, não formador puro** (ADR 0001): a partir da comunidade de um evento, o
sistema **cutuca** (convite "companhia") um usuário com candidatos de afinidade; **o próprio usuário
cria a roda** — um recorte pequeno, privado e efêmero da comunidade, ancorado ao evento —, podendo
apenas **remover** candidatos sugeridos, nunca adicionar à mão na criação. A base de match ativa a
lógica "diverso mas compatível, recíproca" (piso no eixo do evento + variedade no resto) já preparada
na spec 02, com piso de sanidade ~0.10. A roda é invisível a quem não foi convidado, tem admin (modelo
WhatsApp) e, após o evento, oferece uma ponte individual para virar **Grupo** permanente (spec 08) se
ao menos 2 pessoas toparem continuar.

## User Stories

1. Como usuário na comunidade de um evento, quero receber uma **cutucada** ("achamos uma companhia pra
   você") com poucas pessoas de alta afinidade, para ser convidado a formar uma roda.
2. Como usuário cutucado, quero ver o convite tanto como **card na comunidade** quanto como
   **notificação**, para não perder a oportunidade.
3. Como usuário formando uma roda, quero ver os candidatos sugeridos com foto+anel de afinidade,
   interesses em comum e selo verificado, para decidir com quem seguir.
4. Como usuário formando uma roda, quero poder **remover** alguém da lista sugerida, mas **não**
   adicionar manualmente ninguém fora da sugestão, para manter o critério do matchmaker.
5. Como usuário, ao formar a roda, quero ver o estado **"aguardando quórum"** (mínimo 3 aceites), para
   saber quando ela realmente abre.
6. Como pessoa convidada para uma roda, quero ver quem está propondo e **topar ou recusar**, para
   decidir por mim mesma se entro.
7. Como pessoa que topa entrar, quero passar pelo **portão de verificação SMS** se ainda não sou
   verificada, para o ambiente ser seguro (spec 10).
8. Como membro de uma roda ativa, quero um **chat pequeno e privado** (mesma primitiva de chat, spec
   07) com o evento fixado no topo, para combinar antes de ir.
9. Como admin da roda (quem a criou), quero **promover** outro membro a admin ou **remover** alguém, e
   **excluir** a roda inteira, para gerenciar esse grupo pequeno.
10. Como admin, quero **adicionar** novas pessoas à roda só a partir de **sugestões do matchmaker**
    (não busca livre), para crescer com quem realmente combina.
11. Como membro de uma comunidade, quero que uma roda existente seja **invisível** para mim se eu não
    fui convidado, para não sentir que existe uma "panelinha" excludente.
12. Como membro de uma roda, depois que o evento já aconteceu, quero ver a proposta **"quer continuar
    com essa galera?"** e decidir individualmente, sem ser forçado a permanecer.
13. Como membro que topa continuar e há **quórum de conversão** (mínimo 2), quero que nasça um
    **Grupo** com nome-padrão igual ao do evento, editável depois.
14. Como membro que fica sozinho topando continuar (ninguém mais), quero que a roda simplesmente
    **encerre** sem virar grupo, sem constrangimento — e que essa intenção sem par fique registrada
    como telemetria de pesquisa.
15. Como produto, quero permitir que **duas pessoas cutucadas no mesmo evento formem rodas próprias e
    distintas**, sem deduplicar membros entre rodas.
16. Como produto, quero registrar se cada roda foi **proposta pelo sistema** ou **pedida pelo
    usuário**, para preservar o recorte de pesquisa (ADR 0001).
17. Como produto, quando o melhor candidato de afinidade está **abaixo do piso de sanidade (~0.10)**,
    quero **não sugerir ninguém** e emitir um alerta, em vez de forçar uma sugestão ruim.

## Implementation Decisions

- **D1 — Natureza:** a roda é um recorte da **Comunidade de um evento já existente** (spec 07) — uma
  única primitiva. O modo "pessoas-primeiro" (Nomadtable puro) fica fora deste escopo.
- **D2 — Gatilho (cutucada + criação pelo usuário):** o sistema cutuca com o pitch ("companhia"); quem
  **cria** a roda é o usuário. Ao criar, o matchmaker sugere candidatos para *aquela* roda específica
  (ADR 0001). Telemetria distingue roda **proposta pelo sistema** vs. **pedida pelo usuário**.
- **D3 — Ciclo de vida (efêmera com ponte):** a roda vale para o evento e se dissolve depois. No
  pós-evento, oferece "virar grupo": conversão **por pessoa** (não-unânime). Piso: se só 1 pessoa topa,
  não há grupo — e essa intenção de vínculo sem par é registrada como telemetria de estudo (contrato
  com spec 11).
- **D4 — Tamanho:** mínimo **3** para abrir; sem teto. Duas rodas podem ter os mesmos membros — **não
  há dedupe** entre rodas nem limite de "uma roda por pessoa por evento".
- **D5 — Base do match ("diverso mas compatível", recíproca):** ativa, na spec 02, a lógica preparada
  (mas inativa no MVP) de piso de afinidade no eixo do evento **+** variedade no resto do perfil, com
  reciprocidade nos dois sentidos — não o maior cosseno bruto (isso formaria clones).
- **D6 — Segurança:** entrar numa roda exige verificação SMS (gate transversal, spec 10), reaproveitado
  igual às demais interações com estranhos. Consentimento mútuo obrigatório: ninguém entra sem topar.
- **D7 — Visibilidade e nome:** a roda é **invisível** para quem não foi convidado — consultas de
  membros/atividade da comunidade nunca revelam rodas nem seus participantes a não-convidados.
  Vocabulário travado: convite = "companhia"; objeto ativo = "roda"; se permanece = "grupo".
- **D8 — Propriedade/admin:** quem cria é admin, modelo WhatsApp (promover, remover, excluir) — mesmo
  padrão reaproveitado das specs 08 e 09.
- **D9 — Adição de membros muda com a fase:** enquanto é roda, adicionar é **só a partir de sugestões
  do matchmaker** (admin escolhe dentre elas, sem busca livre); depois de virar grupo, adds ficam
  livres (spec 08) e o matchmaker sai de cena.
- **D10 — Piso de sanidade:** se o melhor candidato de afinidade fica abaixo de ~0.10, o sistema não
  sugere ninguém e emite um **alerta** (telemetria de saúde do motor) em vez de forçar uma sugestão.
- **Reuso:** a roda é o **3º modo** da mesma primitiva de chat (spec 07), com `contexto=roda`. Ao
  converter em grupo, os membros que topou migram para um registro de `Grupo` (spec 08).
- **Seam de teste:** contrato do matchmaker (entrada: comunidade + perfis; saída: sugestões ou alerta
  de piso) + contrato da primitiva de chat no modo roda + o gate transversal (spec 10).

## Testing Decisions

- Testar comportamento observável: dado um estado de comunidade e perfis, a cutucada/sugestão segue as
  regras D2–D10; testar via duplo controlável do motor de compatibilidade (spec 02).
- Casos-chave: (a) abaixo do piso de sanidade (~0.10), nenhuma sugestão é feita e um alerta é
  registrado; (b) o usuário remove um candidato da lista sugerida e a lista final respeita a remoção,
  sem permitir adicionar alguém fora da sugestão nesse momento; (c) a roda só abre ao atingir quórum
  mínimo (3 aceites), ficando em estado "aguardando" antes disso; (d) um usuário não verificado que
  topa entrar é roteado ao gate SMS antes de ingressar; (e) consultas feitas por um não-convidado nunca
  retornam a existência da roda nem seus membros; (f) admin pode promover/remover/excluir; membro
  comum não; (g) "adicionar pessoa" numa roda ativa só oferece candidatos sugeridos pelo matchmaker,
  nunca busca livre; (h) pós-evento, 1 pessoa topando não forma grupo (só registra telemetria); 2+
  topando formam um `Grupo` com nome-padrão igual ao do evento; (i) duas rodas do mesmo evento podem
  compartilhar membros sem erro de duplicidade; (j) cada roda tem seu campo de origem
  (sistema|usuário) corretamente registrado.
- Prior art: contrato de API (padrão das demais specs); o motor de compatibilidade e o gate de
  verificação são dependências mockáveis.

## Out of Scope

- Quantidade-alvo exata que o matchmaker mira ao sugerir (calibrável por dados de uso, não uma
  constante travada).
- Métricas formais de sucesso da roda — candidato forte: depoimentos pós-experiência (spec 14).
- Modo "pessoas-primeiro" (Nomadtable puro, atrás da oferta/hosts) — evolução futura, fora deste
  escopo.

## Further Notes

- Ver `docs/adr/0001-roda-matchmaker-como-sugestao.md` para o trade-off consciente de pesquisa × UX
  por trás de D2.
- Design correspondente: seção "06 · Roda" (9 telas, elemento reutilizável "anel de afinidade") — ver
  `docs/design/prompt-rodada-1-roda.md`.
- Reaproveita o padrão de admin das specs 08/09 e o gate transversal da spec 10 — não reinventar
  nenhum dos dois aqui.
