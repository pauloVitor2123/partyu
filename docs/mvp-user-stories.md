# Partyu — User Stories do MVP (entrada para design)

> **O que é este documento.** Especificação de fluxos e user stories do MVP do Partyu, escrita para
> alimentar um prompt de design (ex.: Claude design / Figma). Descreve *o que* cada tela precisa
> permitir e *por quê* — não define visual, stack nem código. Decisões consolidadas do ticket
> `wayfinder/tickets/06-escopo-fluxos-mvp.md`.

## Contexto do produto (resumo para o designer)

Partyu recomenda **eventos/experiências urbanas** e usa isso para **aproximar pessoas** (personalização
social, não só individual). O **evento é o objeto social** que ancora tudo. Duas frentes convivem:

1. **Grupos que já se conhecem** — juntar amigos em torno de um evento em comum.
2. **Entrar em grupos de estranhos** — cada evento tem uma **comunidade/chat aberta**; a
   **compatibilidade** entre perfis aparece como *sinal*, não como formador de grupos (no MVP).

Princípio de design central: **existe uma única "primitiva de chat"** reutilizada em dois modos —
comunidade **aberta** (do evento) e grupo **privado** (dos amigos). Desenhar uma vez, usar nas duas.

## Personas

- **Duda, a articuladora social (24, Rio)** — é o "hub" do grupo de amigos e cansa de organizar
  programas no WhatsApp. Quer achar algo legal e juntar a galera rápido. → frente 1.
- **Rafa, o recém-chegado (28, mudou pro Rio)** — poucos vínculos na cidade, quer conhecer gente
  indo a eventos, mas com segurança. → frente 2.

---

## Épico 1 — Onboarding & Consentimento  *(MUST · desenhar 1º)*

**Objetivo:** do primeiro toque ao mapa, com o mínimo de fricção, coletando interesses e consentimento.

- Como novo usuário, quero **entrar com o Google**, para não preencher formulário de cadastro.
- Como novo usuário, quero **escolher meus interesses** (categorias/subcategorias), para receber
  recomendações relevantes desde o início.
- Como novo usuário, quero **conceder acesso à localização**, para ver eventos próximos no mapa.
- Como novo usuário, quero **ler e aceitar Termos & Privacidade** que declaram claramente que meus
  dados de uso alimentam **pesquisa científica, artigos e projetos acadêmicos** (finalidade
  acadêmica/social), para dar consentimento de forma transparente.

**Telas/estados:** login Google · seleção de interesses (multi-seleção, buscável) · permissão de
localização (com fallback se negada) · tela de termos com o texto de uso acadêmico + aceite explícito.
**Critérios:** não é possível chegar ao mapa sem aceitar os termos; interesses têm mínimo sugerido;
localização negada → app cai na visão de lista com busca por cidade/bairro.

## Épico 2 — Primitiva de Chat  *(MUST · desenhar 2º, é reutilizada 3×)*

**Objetivo:** uma tela de conversa que serve tanto à comunidade aberta quanto ao grupo privado.

- Como participante, quero **ver e enviar mensagens** numa conversa, para me comunicar com o grupo.
- Como participante, quero **ver quem está na conversa** (lista de membros), para saber com quem falo.
- Como participante, quero **ver o evento fixado no topo** da conversa, para não perder o contexto.
- Como participante, quero **denunciar ou bloquear** uma mensagem/pessoa, para me proteger.

**Estados:** aberta (comunidade) vs. privada (grupo) · vazia vs. ativa · membro vs. visitante ainda não
verificado (ver Épico 5) · evento fixado presente/ausente.

## Épico 3 — Home / Descoberta  *(MUST · desenhar 3º — a espinha)*

**Objetivo:** descobrir eventos próximos, em mapa ou lista.

- Como usuário, quero ver **eventos próximos em um mapa** (pinos geolocalizados), para descobrir o que
  rola perto de mim.
- Como usuário, quero **alternar entre mapa e lista em cards**, para escolher a forma que prefiro
  navegar.
- Como usuário, quero que os eventos venham **ordenados/destacados pela minha afinidade**, para ver
  primeiro o que combina comigo.
- Como usuário, quero **tocar num pino/card e abrir o detalhe do evento**, para saber mais e agir.

**Telas/estados:** mapa (default) com pinos e clusters · lista em cards (mesmo dataset) · toggle
mapa⇄lista persistente · filtro básico (data/categoria) · estado sem eventos por perto.

## Épico 4 — Detalhe do Evento  *(MUST · desenhar 4º)*

**Objetivo:** entender o evento e escolher uma das duas portas sociais.

- Como usuário, quero ver **informações do evento** (título, descrição, local no mapa, data), para
  decidir se me interessa.
- Como usuário, quero **confirmar presença** e **favoritar**, para me organizar e treinar minha
  recomendação.
- Como Rafa, quero **entrar na comunidade do evento**, para conhecer quem também vai (frente 2).
- Como Duda, quero **"chamar meu grupo"** para este evento, para combinar com meus amigos (frente 1).
- Como usuário, ao confirmar presença, quero um **aviso de segurança de primeiro encontro** (local
  público, avise alguém), para ir com mais segurança.

**Telas/estados:** detalhe com CTA duplo (comunidade / chamar grupo) · confirmado vs. não confirmado ·
aviso de 1º encontro no fluxo de confirmação.

## Épico 5 — Comunidade do Evento (chat aberto de estranhos)  *(MUST · desenhar 5º)*

**Objetivo:** frente 2 — entrar com estranhos, com confiança e sinal de compatibilidade.

- Como Rafa, ao entrar numa comunidade de estranhos pela **1ª vez**, quero passar por um **portão**:
  **verificar meu telefone (SMS)** e **aceitar as diretrizes da comunidade**, para o ambiente ser
  mais seguro. *(verificação é just-in-time, não no cadastro)*
- Como Rafa, quero ver um **sinal agregado de compatibilidade** ("12 pessoas aqui, 4 com alta
  afinidade com você"), para me sentir estimulado a participar.
- Como Rafa, quero **ver o perfil de outra pessoa** a partir da comunidade, para conhecê-la antes de
  interagir.

**Telas/estados:** portão de verificação SMS · aceite de diretrizes · comunidade (usa a primitiva de
chat, modo aberto) com faixa de compatibilidade agregada · membro verificado vs. visitante.

## Épico 6 — Perfil / Detalhe do Usuário  *(MUST · desenhar 6º)*

**Objetivo:** representar uma pessoa e sua compatibilidade comigo.

- Como usuário, quero ver **interesses da pessoa e o que temos em comum** ("vocês curtem X, Y"), para
  avaliar afinidade sem um número frio.
- Como usuário, quero ver um **selo de "verificado"** quando a pessoa passou pela verificação, para
  confiar mais.
- Como usuário, quero ver um **ícone de força de compatibilidade** (baixa → alta) — um indicador
  simples e visual — para captar a afinidade num relance.
- Como usuário, quero **denunciar ou bloquear** a pessoa, para me proteger.

**Elemento de design específico (a explorar):** um **ícone de compatibilidade em HTML/CSS**, simples,
metáfora de *força de sinal* — ex.: **arcos concêntricos tipo wi-fi** ou **barras de sinal** que
acendem conforme a compatibilidade (baixa = 1 arco, alta = 3 arcos preenchidos). Deve ler-se
instantaneamente e não parecer "app de namoro". Produzir 2–3 variações para comparação.

## Épico 7 — Grupo Privado (amigos)  *(MUST · desenhar 7º)*

**Objetivo:** frente 1 — juntar quem você já conhece em torno de um evento.

- Como Duda, quero **criar um grupo privado**, para reunir meus amigos.
- Como Duda, quero **convidar por link/WhatsApp**, para trazer todo mundo sem atrito.
- Como Duda, quero **fixar um evento no grupo**, para todos verem e confirmarem presença.
- Como membro do grupo, quero **conversar no grupo** (mesma primitiva de chat, modo privado), para
  combinar os detalhes.

**Telas/estados:** criar grupo · convite (link) · grupo com evento fixado · grupo sem evento ainda.

---

## SHOULD (não desenhar agora)

- Votação/enquete de evento dentro do grupo privado.
- **"Mesas" compatíveis** — subgrupos pequenos de estranhos formados por compatibilidade (o matchmaker
  da tese; hoje só sinal).
- Fluxo dedicado de **consentimento informado da coorte de pesquisa** (Rio).
- Avaliação/feedback pós-evento.

## Fora do MVP

Monetização · onboarding de hosts/oferta · expansão geográfica além do Rio · moderação proativa ·
verificação por documento.

## Notas transversais para o design

- **Reuso:** Épicos 2, 5 e 7 compartilham a mesma primitiva de chat — desenhar variações de um mesmo
  componente, não telas separadas.
- **Mapa é a home**; lista em cards é uma visão alternada do mesmo conteúdo.
- **Segurança visível** onde há estranhos: portão de verificação, diretrizes, denunciar/bloquear,
  aviso de 1º encontro.
- **Compatibilidade** = sinal (agregado + interesses em comum + ícone de força), nunca ranking cru.
