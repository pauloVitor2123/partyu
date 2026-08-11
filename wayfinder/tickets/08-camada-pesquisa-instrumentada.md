---
title: "Camada de pesquisa instrumentada (coorte Rio 2026–2027)"
labels: [wayfinder:grilling]
status: closed
assignee: paulovitor
blocked_by: [06]
---

## Resolution

**Consentimento em duas camadas:**
1. ToS geral (ticket 06) — todo usuário do app aceita, divulga uso acadêmico em termos gerais.
2. **TCLE dedicado, opt-in explícito** — fluxo separado, oferecido após o onboarding normal ("quer
   participar da pesquisa acadêmica do Partyu?"), com linguagem de consentimento livre e esclarecido:
   o que é coletado, por quanto tempo, como é usado, direito de sair a qualquer momento sem perder
   acesso ao app. Só quem aceita entra na coorte formal (≥20 participantes, diversidade intencional
   de perfil, 2026–2027); quem recusa continua usando o Partyu normalmente, só fica fora das análises.

**Telemetria mínima a instrumentar** (eventos, não estatística):
- `perfil_criado`, `interesse_selecionado` (onboarding, explícito)
- `evento_visualizado`, `evento_favoritado`, `tempo_visualizacao_evento` (implícito, recomendação
  individual)
- `presenca_confirmada`, `avaliacao_pos_evento` (implícito de maior peso + feedback direto)
- `sinal_compatibilidade_exibido`, `sinal_compatibilidade_visualizado` (para medir se o sinal é
  notado/usado — proxy de compatibilidade em grupo, já que "mesas" não estão no MVP)
- `comunidade_evento_entrou`, `mensagem_enviada`, `grupo_privado_criado`, `convite_grupo_enviado`
  (coordenação social — a métrica central da tese: aumento de experiências presenciais de maior
  impacto)
- `denuncia_enviada`, `bloqueio_realizado` (para a análise de confiança/segurança, ticket 07)

**Recrutamento e operação da coorte:** via convite direto (rede do pesquisador + divulgação em
grupos/comunidades do Rio) direcionado a diversidade intencional de perfil (idade dentro de 18–35,
mas variando bairro, ocupação, tempo de vivência na cidade); operação dentro do próprio app — sem
ferramenta externa de pesquisa — usando o toggle de opt-in e a telemetria acima como única fonte de
dados formal.

**Fronteira ética:** nenhum atributo sensível (raça, orientação, religião, saúde) é coletado
explicitamente para compatibilidade — só interesses de lazer/cultura e comportamento no app; dados da
coorte tratados de forma pseudonimizada nas análises; participante pode pedir exclusão dos seus dados
de pesquisa a qualquer momento (LGPD). Aprovação formal em comitê de ética (CEP), se exigida pelo
programa de pós-graduação, é tratada como pré-requisito administrativo fora do escopo deste
documento de produto — mas o fluxo de TCLE acima já nasce compatível com esse requisito.

## Question

> **Já decidido no ticket 06:** o onboarding tem aceite de Termos & Privacidade com divulgação
> explícita de uso acadêmico (artigos, projetos de mestrado, fim acadêmico/social). **O que resta a
> este ticket:** o **consentimento informado dedicado da coorte do Rio** (rigor ético + LGPD, separado
> do ToS geral) e a **especificação da telemetria** a instrumentar. Nota: sem "mesas compatíveis" no
> MVP, a métrica de compatibilidade em grupo mede-se sobre o *sinal* exibido, não sobre grupos formados.

Como a pesquisa acadêmica vive *dentro* do produto sem deformá-lo? Decidir, em nível de produto: o
que precisa de **consentimento** e como coletá-lo no fluxo; que **telemetria/eventos** instrumentar
para avaliar recomendação individual e compatibilidade em grupo; como recrutar e operar a **coorte
do Rio (≥20 participantes, diversidade intencional, 2026–2027)** dentro do app; e a fronteira ética
(privacidade, dados sensíveis). Não definir a metodologia estatística — apenas o que o produto
precisa expor/registrar para que a pesquisa seja possível.

## Atualização — coorte aberta (ticket 10)

Ao aprofundar a roda (ticket 10), o escopo da coorte foi **afrouxado**: o **app é o instrumento** e a
pesquisa é **exploratória e emergente** (pode mudar bastante conforme os dados aparecem). A amarra
rígida cai — a coorte **não é só o Rio** e **não tem prazo fixo** (pode passar de 2027). Diversidade
proposital continua desejável. A Resolution acima (consentimento em duas camadas, telemetria mínima,
fronteira ética) permanece válida; muda só a delimitação geográfica/temporal da coorte.

**Telemetria a somar quando a roda existir:** roda "proposta pelo sistema" vs "pedida pelo usuário"
(D2); intenção de vínculo sem par quando a ponte não forma grupo (D3); alerta de piso de sanidade
< ~0.10 (D10). **Candidato a métrica de sucesso da roda:** depoimentos pós-experiência.
