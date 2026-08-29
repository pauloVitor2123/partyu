# Spec 05 — Detalhe do evento

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** 03 (evento existe), 04 (navegação vem da Home)
- **Origem:** PRD §5.4; ticket 06; ticket 07 (aviso de 1º encontro); ticket 11 (D3, D4, D6);
  `docs/design/prompt-rodada-3-criar-evento.md` (tela 4).

## Problem Statement

Depois de descobrir um evento na Home, o usuário precisa de informação suficiente para decidir se vale
a pena, e de um caminho claro para uma das duas portas sociais do produto (comunidade aberta ou grupo
privado) — sem que o momento de "vou mesmo, com estranhos" fique sem nenhum lembrete de segurança.

## Solution

Uma tela de detalhe única para o **mesmo objeto `Evento`**, independente de `origem`: informações
completas, ação de favoritar (sinal leve), ação de confirmar presença (sinal forte, acompanhada de um
aviso de segurança de primeiro encontro) e um **CTA duplo** — "entrar na comunidade" (frente 2, leva à
spec 07) ou "chamar meu grupo" (frente 1, leva à spec 08). Para eventos `origem=anfitrião`, a tela
mostra o local sempre em nível aproximado, um selo discreto "Anfitrião" (sem bloco de perfil do host) e
confirma que a comunidade daquele evento já existe.

## User Stories

1. Como usuário, quero ver **título, descrição, categoria, local no mapa e data/hora** do evento, para
   decidir se me interessa.
2. Como usuário, quero **favoritar** um evento, para sinalizar interesse leve e me organizar.
3. Como usuário, quero **confirmar presença**, para sinalizar interesse forte e me preparar para ir.
4. Como usuário, ao confirmar presença, quero ver um **aviso de segurança de primeiro encontro**
   (prefira local público, avise alguém), para ir mais seguro quando for encontrar gente nova.
5. Como Rafael (frente 2), quero um botão **"Entrar na comunidade"**, para conhecer quem mais vai.
6. Como Marina (frente 1), quero um botão **"Chamar meu grupo"**, para combinar com meus amigos —
   escolhendo um grupo existente ou criando um novo já com este evento fixado.
7. Como usuário, quero ver o estado **confirmado vs. não confirmado** refletido na tela, para saber se
   já me organizei para aquele evento.
8. Como usuário vendo um evento **de anfitrião**, quero ver o local **sempre como bairro/região**
   aproximado no mini-mapa, nunca o endereço exato plotado.
9. Como usuário vendo um evento **de anfitrião**, quero ver um **selo discreto "Anfitrião"** perto do
   título/categoria, sem um bloco de perfil do criador ocupando a tela.
10. Como usuário vendo um evento de anfitrião recém-publicado, quero ver que a **comunidade daquele
    evento já existe** ("Comunidade do evento · entre e converse"), para entrar direto.
11. Como usuário, quero abrir o detalhe tanto a partir de um pino do mapa quanto de um card da lista
    (spec 04), para chegar ao mesmo lugar por qualquer caminho.

## Implementation Decisions

- **Um único componente de detalhe:** renderiza o mesmo `Evento` para as duas origens; a única
  ramificação visual é (a) precisão do pin no mini-mapa e (b) presença/ausência do selo "Anfitrião".
- **Favoritar → `Interação(tipo=favoritado)`** (spec 02), peso leve na composição do vetor de perfil.
- **Confirmar presença → `Interação(tipo=presenca_confirmada)`** (spec 02), peso alto; **dispara** o
  aviso de segurança de primeiro encontro **antes** de efetivar a confirmação (modal informativo, não
  bloqueante — o usuário confirma ciente do aviso).
- **CTA duplo:**
  - "Entrar na comunidade" → spec 07, modo aberto; se o usuário ainda não passou pelo gate de
    verificação SMS/diretrizes (spec 10), o gate dispara just-in-time nesse ponto de entrada.
  - "Chamar meu grupo" → spec 08: se o usuário já tem grupo(s), oferece escolher um para fixar este
    evento; senão, oferece criar um novo grupo já com este evento fixado.
- **Local por origem:** `ingerido` mostra a localização normalizada da fonte (spec 03, pode ser
  endereço exato quando a fonte fornece); `anfitrião` mostra **sempre** nível bairro/região (regra
  travada na spec 09/ticket 11 D3) — esta spec apenas respeita o campo já normalizado, não decide a
  precisão.
- **Criação da Comunidade por origem:** para `origem=ingerido`, a Comunidade é autocriada quando o
  **primeiro usuário** confirma presença/entra (PRD §6). Para `origem=anfitrião`, a Comunidade já
  existe **desde a publicação** (o anfitrião é seu primeiro membro/admin) — o detalhe apenas exibe o
  card de acesso, nunca precisa "criar" a comunidade nesse momento.
- **Seam de teste:** contrato de leitura do `Evento` + efeitos observáveis das ações (favoritar,
  confirmar presença, roteamento do CTA duplo).

## Testing Decisions

- Testar comportamento observável no seam de API/estado: dado um `Evento` (de cada origem), a tela
  exibe os campos corretos e as ações produzem os efeitos esperados.
- Casos-chave: (a) favoritar registra `Interação` correta sem exigir confirmação; (b) confirmar
  presença registra `Interação` de peso alto **e** exibe o aviso de 1º encontro antes de efetivar; (c)
  CTA "entrar na comunidade" roteia para spec 07 e aciona o gate SMS se necessário; (d) CTA "chamar meu
  grupo" oferece escolher/criar grupo (spec 08) com o evento já fixado; (e) evento `anfitrião` sempre
  renderiza local em nível bairro mesmo que o campo bruto tenha um endereço mais preciso; (f) selo
  "Anfitrião" aparece só quando `origem=anfitrião`, sem bloco de perfil do host; (g) para evento
  `anfitrião`, a comunidade já aparece acessível mesmo sem nenhum outro usuário ter confirmado
  presença ainda.
- Prior art: contrato de API (padrão das specs 01–04).

## Out of Scope

- Votação/enquete de evento (SHOULD, pós-MVP).
- Avaliação/feedback pós-evento (SHOULD, pós-MVP).
- Bloco de perfil do anfitrião com "seguir" (evolução futura, ticket 11 "Aberto").
- Curadoria/segurança reforçada para eventos de anfitrião (aprovação de participação, revelar endereço
  pós-confirmação) — deixado de fora do MVP por decisão explícita (ticket 11).

## Further Notes

- Design correspondente: seção "04 Perfil"... não — seção do **Detalhe do evento** (reaproveitada nas
  seções 03–05 e explicitamente na seção "08 · Criar evento", tela 4, para o caso `anfitrião`) — ver
  `docs/design/prompt-rodada-3-criar-evento.md`.
- Reuso reconhecido: esta é a **mesma tela** para as duas origens (ticket 11, D1) — não criar telas
  paralelas.
