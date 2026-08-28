# Spec 11 — Camada de pesquisa instrumentada

- **Fase:** 1 (MVP) — transversal (instrumenta pontos das demais specs)
- **Status:** ready-for-agent
- **Depende de:** 01 (Usuário existe)
- **Origem:** ticket 08 (+ "Atualização — coorte aberta"); PRD §2.3, §9, §11.

## Problem Statement

A pesquisa acadêmica precisa viver **dentro** do produto, sem deformá-lo: exige um consentimento
formal separado do ToS geral, uma telemetria mínima bem definida, e uma fronteira ética clara — sem
acoplar a participação na pesquisa a nenhuma funcionalidade do app.

## Solution

Um **opt-in de TCLE** oferecido **depois** do onboarding normal (nunca acoplado ao aceite geral de
Termos da spec 01), com linguagem de consentimento livre e esclarecido. Em paralelo, uma **telemetria
mínima** de eventos de produto é instrumentada **para todos os usuários** (operação do produto), mas
qualquer **extração para análise formal da pesquisa** filtra só quem deu opt-in explícito no TCLE.
Nenhum atributo sensível é coletado em nenhum ponto. Escopo geográfico/temporal da coorte é **aberto**
(não travar Rio ou um período fixo em validação/código).

## User Stories

1. Como novo usuário, depois de terminar o onboarding normal, quero ver um **convite separado** para
   participar da pesquisa acadêmica do Partyu, para decidir com calma, fora do fluxo obrigatório.
2. Como usuário convidado, quero **ler o TCLE** (o que é coletado, por quanto tempo, como é usado, meu
   direito de sair a qualquer momento), para dar um consentimento informado de verdade.
3. Como usuário, quero poder **aceitar ou recusar** o TCLE sem perder acesso a nenhuma função do app,
   para não me sentir coagido a participar.
4. Como usuário que aceitou o TCLE, quero poder **revogar** minha participação depois, a qualquer
   momento, para exercer meu direito de sair.
5. Como usuário que revogou/recusou, quero um **pedido de exclusão** dos meus dados de pesquisa, para
   fazer valer o direito de exclusão (LGPD).
6. Como produto, quero registrar os eventos de telemetria mínimos (perfil criado, interesse
   selecionado, evento visualizado/favoritado, tempo de visualização, presença confirmada, avaliação
   pós-evento, sinal de compatibilidade exibido/visualizado, entrada em comunidade, mensagem enviada,
   grupo criado, convite enviado, denúncia enviada, bloqueio realizado) para **todo** usuário, como
   parte da operação normal do produto.
7. Como pesquisador, quero que a **extração formal** para análise use só registros de usuários com
   TCLE aceito, para respeitar o consentimento diferenciado.
8. Como produto, quero garantir que **nenhum atributo sensível** (raça, orientação, religião, saúde)
   seja coletado em nenhum ponto do app, para respeitar a fronteira ética.
9. Como pesquisador, quero que os dados extraídos para análise sejam **pseudonimizados**, para não
   expor identidade direta na pesquisa.

## Implementation Decisions

- **`Consentimento` (PRD §6):** `tipo ∈ {ToS_geral, TCLE_coorte}`, usuário, timestamp, versão do texto
  aceito. `ToS_geral` é gravado no onboarding (spec 01); `TCLE_coorte` é um fluxo **separado**,
  disparado por um CTA **pós-onboarding**, adiável e reabrível depois (ex. via configurações — spec
  06) — nunca bloqueante para nenhuma função do app.
- **Telemetria como operação de produto:** uma tabela/stream de eventos (nome do evento, usuário,
  payload mínimo relevante, timestamp) é instrumentada nos pontos correspondentes das demais specs
  (01, 02, 05, 06, 07, 08, 10) **para todos os usuários**, independentemente do opt-in — é
  instrumentação de produto, não de pesquisa por si só.
- **Filtro da coorte formal:** qualquer extração/consulta destinada à análise acadêmica faz `join`
  contra `Consentimento.tipo=TCLE_coorte` e usa **só** os usuários que aceitaram — a telemetria bruta
  não vira "dado de pesquisa" sem esse filtro.
- **Nenhum atributo sensível:** nem o onboarding (spec 01) nem a telemetria coletam
  raça/orientação/religião/saúde — a interface de perfil não expõe esses campos.
- **Pseudonimização:** extrações de pesquisa usam identificador interno, não dado de contato direto
  (nome/telefone/e-mail); mapeamento reverso restrito a quem administra a extração.
- **Exclusão sob pedido:** usuário com TCLE aceito pode solicitar exclusão dos seus dados de pesquisa;
  o pedido marca o usuário para expurgo nas próximas extrações formais (não exige apagar a telemetria
  operacional do produto em si, só o vínculo com a análise acadêmica).
- **Escopo aberto:** nada no produto trava validação de recorte geográfico (só Rio) ou temporal
  (2026–2027) para o opt-in — o app é o instrumento; o recorte da coorte é decisão de operação da
  pesquisa, não uma regra de produto.
- **Telemetria complementar da roda:** os eventos adicionais listados no ticket 08 ("proposta pelo
  sistema" vs. "pedida pelo usuário", intenção de vínculo sem par, alerta de piso de sanidade) ficam
  preparados como extensão desta spec quando a spec 12 (roda) for implementada — não fazem parte desta
  entrega.
- **Seam de teste:** contrato de opt-in (criar/revogar `Consentimento`) + contrato de escrita de
  telemetria (efeito observável: o evento foi registrado com os campos certos).

## Testing Decisions

- Testar comportamento observável: opt-in nunca bloqueia função do app; telemetria é registrada nos
  pontos esperados; extração formal respeita o filtro de consentimento.
- Casos-chave: (a) usuário que recusa ou nunca vê o TCLE continua usando o app normalmente, em
  qualquer função; (b) cada evento de telemetria listado é registrado no ponto de interação
  correspondente, para todo usuário, independentemente do TCLE; (c) uma consulta/extração de pesquisa
  formal retorna só registros de usuários com `TCLE_coorte` aceito; (d) nenhum campo de atributo
  sensível existe no schema de perfil ou de telemetria; (e) um pedido de exclusão de dados de pesquisa
  marca o usuário e ele não aparece na extração seguinte; (f) revogar o TCLE não apaga a conta nem
  restringe nenhuma função do produto.
- Prior art: contrato de API (padrão das specs 01–10).

## Out of Scope

- Metodologia estatística de análise da pesquisa (fora do escopo de produto).
- Aprovação formal em comitê de ética (CEP) — pré-requisito administrativo externo ao produto.
- Telemetria específica da roda (extensão futura, junto da spec 12).
- Dashboard de pesquisa — no MVP, a extração pode ser consulta direta, sem interface dedicada.

## Further Notes

- O texto completo do TCLE é responsabilidade do pesquisador/orientador, fora deste documento de
  produto — esta spec só define o que o produto precisa expor/registrar.
- A "Atualização — coorte aberta" no próprio `wayfinder/tickets/08-camada-pesquisa-instrumentada.md`
  já reflete a flexibilização de escopo geográfico/temporal incorporada aqui.
