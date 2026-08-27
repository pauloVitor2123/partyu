# Prompt Claude Design — Rodada 3: seção "08 · Criar evento"

> Colar no Claude Design, na mesma conversa/artefato que gerou o HTML (para manter o estilo). Se
> reclamar do tamanho, partir em duas colagens: telas 1–3, depois 4–5.

## Decisões travadas (grilhadas com o usuário — `/grill-with-docs`)

- **Conceito:** um evento criado por usuário é o **mesmo objeto `Evento`** do catálogo, com um atributo
  de **origem**: `ingerido` (SerpApi/Sympla) vs `anfitrião` (criado no app, estilo NomadTable).
  Reaproveita home, detalhe e comunidade. (Glossário atualizado em `CONTEXT.md`: `Evento`, `Anfitrião`.)
- **Campos mínimos:** núcleo = **título · data/hora · local · categoria**; opcionais = **foto de capa
  (opcional)** e **descrição curta**. **Fora do MVP:** limite de vagas, preço.
- **Local:** o pin no mapa é **sempre aproximado** (nível bairro); sem toggle e sem "revelar endereço
  após confirmar". Se o anfitrião colar o endereço exato na descrição, é responsabilidade dele.
- **Participar:** entrada **aberta** — quem confirma presença entra na **comunidade aberta** do evento
  (mesma primitiva dos eventos ingeridos). O **anfitrião é admin** da comunidade (estilo WhatsApp da
  Rodada 1: remover / reportar).
- **Entrada na navegação:** **FAB "+"** sobre a home (mapa/lista). A **verificação SMS** dispara
  **just-in-time** ao tocar em "Publicar" (reusa o "Portão de verificação" da seção 05), só na 1ª vez.
- **Distinção no feed:** apenas um **selo discreto "Anfitrião"** no card; **sem** bloco de perfil do
  host no detalhe (host aparece naturalmente como admin da comunidade).
- **Gate:** criar evento e entrar em qualquer conversa exigem SMS (consistente com o já decidido).

## Prompt

```
Estenda o protótipo existente "Partyu — Fluxos do produto" adicionando uma nova
seção numerada: "08 · Criar evento — qualquer pessoa (verificada) publica um rolê".

Mantenha EXATAMENTE o mesmo estilo visual das seções 01–07:
- Molduras de iPhone 340×736, telas estáticas de alta fidelidade lado a lado, com um
  rótulo curto acima de cada moldura.
- Fonte Poppins; rosa da marca #FF4D80 (hover #E63E70); fundo geral #F5F1EF.
- Mesmo cabeçalho de seção (número grande "08" + título + linha de descrição).
- Reutilize componentes já existentes: a Home mapa/lista (seção 03), o Detalhe do evento
  (seção 04), a Comunidade do evento (seção 05) e o "Portão de verificação" SMS (seção 05).

CONCEITO (para você entender, não exibir cru):
No Partyu, um "evento" pode vir de duas origens: INGERIDO (de fontes externas, o catálogo
que já existe) ou de ANFITRIÃO (criado por um usuário dentro do app, estilo NomadTable —
um jantar, um rolê, uma experiência simples). É o MESMO objeto: mesma home, mesmo detalhe,
mesma comunidade aberta. Qualquer pessoa VERIFICADA POR SMS pode criar um evento. Quem cria
é o "anfitrião" e vira admin da comunidade daquele evento. A criação é LEVE, com poucas
informações.

VOCABULÁRIO FIXO (use exatamente estes rótulos):
- "Criar evento" (ação/título do formulário).
- "Anfitrião" (quem criou; nunca "host", "organizador" ou "criador" na UI).
- "Publicar" (botão que finaliza a criação).
- "Confirmar presença" (como alguém entra no evento — já existe no produto).

TELAS DA SEÇÃO 08 (crie uma moldura para cada, nesta ordem):

1) "FAB criar evento (na home)"
   Reaproveite a Home (mapa/lista) da seção 03 e sobreponha um BOTÃO FLUTUANTE "+"
   (rosa da marca #FF4D80) no canto inferior direito, acima do conteúdo. Um micro-rótulo
   "Criar evento" pode aparecer ao lado do FAB. É o único ponto de entrada da criação.

2) "Formulário mínimo"
   A tela "Criar evento" — enxuta, estilo NomadTable, com poucos campos nesta ordem:
   - Foto de capa: uma área tocável "Adicionar foto (opcional)" no topo; deixe claro que é
     OPCIONAL (sem foto, usa um placeholder por categoria).
   - "Título do rolê" (campo de texto, placeholder ex.: "Jantar mexicano lá em casa").
   - "Quando" (data e hora).
   - "Onde" (local) — com uma nota discreta abaixo: "No mapa mostramos só o bairro."
   - "Categoria" (1–2 tags selecionáveis, ex.: gastronomia, MPB, cinema) — alimenta a
     compatibilidade.
   - "Descrição (opcional)" (campo multilinha curto).
   - Botão primário fixo embaixo: "Publicar".
   NÃO inclua campos de preço nem de limite de vagas.

3) "Portão SMS ao publicar"
   Ao tocar em "Publicar" sem ter verificado o telefone, aparece o "Portão de verificação"
   por SMS (reutilize a tela da seção 05 — verificar telefone + aceitar diretrizes). Um
   texto de contexto: "Para publicar um evento, confirme seu telefone." Só na 1ª vez.

4) "Evento publicado (detalhe do anfitrião)"
   O Detalhe do evento (reaproveite a seção 04) para o evento recém-criado:
   - Cabeçalho com a foto/placeholder, título, data/hora e o LOCAL como bairro aproximado
     (ex.: "📍 Botafogo") com um mini-mapa de pin aproximado — NUNCA o endereço exato no mapa.
   - Um selo DISCRETO "Anfitrião" perto do título/categoria (indica origem de anfitrião).
     NÃO crie um bloco de perfil do host nesta tela.
   - Botão "Confirmar presença".
   - Um card mostrando que a COMUNIDADE aberta do evento já foi criada ("Comunidade do
     evento · entre e converse") levando ao chat da seção 05, no qual o criador é admin.

5) "Card na home (entre os ingeridos)"
   Uma faixa da Home em modo lista mostrando o evento de anfitrião MISTURADO aos eventos
   ingeridos, visualmente igual, com apenas um selo discreto "Anfitrião" no card
   (ex.: "🍽 Jantar mexicano · Sáb 20h · Botafogo · 🏷️ Anfitrião"). Deixe claro que não há
   distinção forte além do selo.

RESTRIÇÕES:
- Evento de anfitrião é o MESMO objeto visual dos ingeridos; não invente uma home, um
  detalhe ou uma comunidade novos — reutilize as seções 03/04/05.
- O mapa mostra o local sempre aproximado (bairro); jamais plote endereço exato.
- Criação é leve: só título, data/hora, local, categoria + foto opcional e descrição
  opcional. Sem preço, sem limite de vagas.
- A verificação SMS é just-in-time no "Publicar" (reutilize o portão da seção 05).
- Distinção do evento de anfitrião = apenas um selo discreto "Anfitrião"; sem bloco de host.
```
