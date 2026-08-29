# PRD — Partyu
### Product Requirements Document — Protótipo/MVP

**Autor do produto:** Paulo Vitor
**Versão:** 1.2 — 11/08/2026
**Status:** documento-destino do processo de visão de produto (`wayfinder/`), pronto para virar issues técnicas. A v1.1 incorpora o aprofundamento pós-destino da **roda** (matchmaker perfil↔perfil) e do motor de compatibilidade. A **v1.2** traz a **criação de evento pelo usuário (anfitrião)** para dentro do MVP (ticket 11, ativando o lado da oferta).
**Fontes:** decisões consolidadas em `wayfinder/tickets/01` a `11`, pesquisa de posicionamento competitivo (`wayfinder/research/03`), pesquisa de fontes de dados de eventos (`wayfinder/research/05`), artigo científico base (`docs/Artigo.pdf`), design das telas (`docs/design/`), motor de recomendação (`docs/motor-de-recomendacao.md`), glossário de domínio (`CONTEXT.md`), ADRs (`docs/adr/`) e specs de implementação (`docs/specs/`)

---

## 1. Visão Geral

### 1.1 Problema de produto

O Partyu resolve duas dores conectadas pelo mesmo mecanismo. A dor **primária** é a de quem
historicamente carrega o trabalho social de um grupo — a pessoa que sempre propõe o rolê, cria a
enquete no WhatsApp, corre atrás de confirmação um por um e acaba desistindo de organizar por
cansaço. Hoje ela não tem nenhuma ferramenta: usa links soltos de Instagram/Sympla e a paciência do
próprio grupo. A dor **secundária** é a de quem quer viver experiências novas mas não tem com quem
ir — o recém-chegado a uma cidade, ou quem simplesmente não tem no ciclo de amigos gente livre pra
determinado programa. Hoje essa pessoa rola feed, entra em grupos genéricos de apps de amizade sem
nenhum contexto de evento real, ou simplesmente não vai.

O estudo piloto conduzido pelo autor (n=163, out–nov/2023, predominância 17–25 anos) evidencia a
escala do problema de descoberta que antecede as duas dores: **72,1%** relatam dificuldade em
encontrar eventos relevantes ao seu interesse, **97,5%** têm interesse explícito em recomendação
personalizada, e os canais de descoberta hoje são dominados por **redes sociais (95,7%)** e
**recomendação de amigos (76,1%)** — apps dedicados aparecem em apenas **11%** das menções. Esse
último dado é o mais relevante para o Partyu: o componente social já é, informalmente, o principal
mecanismo de descoberta de eventos. O produto formaliza computacionalmente algo que as pessoas já
fazem de forma manual e ineficiente.

### 1.2 Contexto social

O avanço das redes sociais e do consumo digital deslocou parte relevante do tempo social para
telas — e a pandemia acelerou esse deslocamento, normalizando rotinas com mais tempo em casa e menor
prática de experiências presenciais significativas. Passado o pico da pandemia, esse padrão não
reverteu por completo: para parte da população, sobretudo jovens adultos urbanos, a coordenação de
encontros presenciais continua sendo um atrito não resolvido, com efeitos observados na literatura
sobre bem-estar e conexão social. Ao mesmo tempo, o mercado de descoberta de eventos amadureceu do
lado transacional (catálogo, ingresso, ticketing), mas não do lado social — nenhum player relevante
resolve simultaneamente "que evento" e "com quem".

### 1.3 Proposta de valor

**"O Partyu tira de você o trabalho de organizar: a gente indica o evento certo já com o grupo (o
seu, ou um compatível) pra ir junto."**

O salto de personalização individual → social é o núcleo do produto: o Partyu não recomenda só "o
evento pra você" — recomenda evento **+** grupo. Para quem já tem grupo (frente 1), o Partyu ajuda a
achar o programa em comum e coordenar a ida. Para quem não tem (frente 2), cada evento ingerido de
fontes públicas vira uma **comunidade/chat autocriada**, onde a compatibilidade entre perfis aparece
como sinal e a pessoa entra, conversa e vai junto com quem tem afinidade real. "Chats/comunidades por
evento" é a forma concreta desse valor: cada evento deixa de ser um item passivo de catálogo e vira
um ponto de encontro social ativo.

---

## 2. Objetivos do Protótipo (MVP Técnico)

### 2.1 Objetivos de produto

O usuário deve conseguir, no MVP: (i) criar um perfil com interesses declarados em poucos minutos;
(ii) descobrir eventos reais próximos, em mapa ou lista, ordenados por afinidade; (iii) entender por
que um evento foi recomendado e ver um sinal simples de compatibilidade com outras pessoas; (iv)
confirmar presença e favoritar eventos; (v) **frente 1** — criar um grupo privado com amigos, fixar
um evento e coordenar por chat; (vi) **frente 2** — entrar na comunidade/chat aberta de um evento,
ver quem mais vai e conversar antes de ir, com uma camada mínima de segurança (verificação por SMS,
denúncia/bloqueio).

### 2.2 Objetivos técnicos

Validar, como desenvolvedor/pesquisador: (i) a viabilidade de ingerir eventos reais de uma fonte
externa (Google Events via SerpApi) com qualidade suficiente para sustentar comunidades ativas; (ii)
a extensão do módulo de recomendação de similaridade perfil↔evento (já existente, embeddings
`text-embedding-ada-002` + cosseno) para produzir um sinal de compatibilidade perfil↔perfil e
perfil↔grupo, sem ainda formar grupos automaticamente (isso fica para a fase da **roda** — o
matchmaker perfil↔perfil especificado no ticket 10, pós-MVP); (iii) a operação de uma camada de confiança/segurança proporcional a um
piloto pequeno (regras automáticas + revisão manual); (iv) a instrumentação de telemetria suficiente
para, no futuro, avaliar formalmente a hipótese de pesquisa.

### 2.3 Como o protótipo apoia a pesquisa

O MVP é desenhado para operar como **plataforma experimental viva**: toda interação relevante
(interesse declarado, comportamento implícito, entrada em comunidade, formação de grupo, mensagens,
denúncias) é instrumentada desde o primeiro dia (seção 8 do ticket 08 / seção 9 deste documento),
mesmo que a análise formal da hipótese de compatibilidade em grupo só aconteça depois, com uma coorte
instrumentada via app sob TCLE separado do ToS geral. O escopo dessa coorte é **aberto e guiado pelos
dados** — a pesquisa é exploratória e emergente, sem amarra geográfica (não só o Rio) nem prazo fixo
(pode ir além de 2027); diversidade intencional de perfil segue desejável. Como o **matchmaker da roda**
(formação automática perfil↔perfil) não entra no MVP, a compatibilidade em grupo é medida sobre o
**sinal exibido** (é notado? influencia decisão de entrar numa comunidade?) e não sobre grupos formados
algoritmicamente — isso é, precisamente, o dado que justifica ou não avançar para a próxima fase de
pesquisa (a roda).

---

## 3. Personas e Cenários de Uso

Recorte geral do piloto: **18–35 anos, classe média urbana, Rio de Janeiro** (zona sul, centro,
Tijuca/zona norte adjacente).

### 3.1 Marina, a articuladora social (27, Botafogo) — frente 1

É quem sempre propõe o rolê no grupo de amigos e sempre acaba decidindo onde, quando, e mandando
mensagem pra 8 pessoas confirmarem. **Gatilho:** sexta à tarde, "vamos fazer algo esse fim de
semana?" solto no grupo, sem plano. **Hoje:** cria enquete manual, cola links de Instagram/Sympla,
corre atrás de confirmação um por um, gente desmarca em cima da hora. **Jornada esperada:** abre o
Partyu, cria um grupo privado (ou usa um existente), vê eventos recomendados pro perfil do grupo,
fixa um evento, convida por link/WhatsApp. **Critério de sucesso do primeiro uso:** grupo formado e
evento fixado em menos tempo do que levaria organizando só por WhatsApp.

### 3.2 Rafael, o isolado/recém-chegado (24, Barra/Centro) — frente 2

Mudou de Belo Horizonte pro Rio há 2 meses por trabalho, ainda não tem grupo de amigos formado.
**Gatilho:** fim de semana livre, sem plano, sem gente pra chamar. **Hoje:** rola feed de Instagram,
entra em grupo genérico de Meetup/Bumble BFF sem nenhum contexto de evento concreto. **Jornada
esperada:** abre o app, vê um evento real perto dele (ex. feira gastronômica na Praça XV, exposição
na Cidade das Artes), entra na comunidade/chat aberta daquele evento, sente o sinal de compatibilidade
com quem já está lá, confirma presença. **Critério de sucesso do primeiro uso:** entrar numa
comunidade de evento e trocar ao menos uma mensagem antes do evento acontecer.

### 3.3 Coletivo/produtor independente — criador de evento

Já publica o evento no Sympla/Instagram, mas quer alcançar público novo e engajado, não só vender
ingresso. No MVP, essa persona **ganha uma primeira ferramenta ativa**: qualquer usuário verificado por
SMS pode **criar um evento** dentro do app (leve, estilo NomadTable — ticket 11), tornando-se
**anfitrião** e admin da comunidade daquele evento. Continua valendo a ingestão de fontes públicas para
o grande volume do catálogo; a criação própria cobre o rolê/experiência que não existe em fonte
externa. Features mais avançadas do lado da oferta (criação assistida por IA, analytics para criadores)
seguem no roadmap (seção 10). **Gatilho:** evento sem lotação prevista, quer mais gente indo em grupo
(maior taxa de comparecimento real do que ingresso vendido isolado).

---

## 4. Escopo Funcional (MVP)

### MUST (obrigatórias no MVP)

- **Onboarding leve** com login Google, seleção de interesses (categorias/subcategorias, multi-seleção
  buscável), permissão de localização (com fallback de busca por cidade/bairro) e aceite de Termos &
  Privacidade com divulgação explícita de uso acadêmico.
- **Home de descoberta** em mapa (pinos geolocalizados, default) com toggle para lista em cards do
  mesmo dataset, ordenados/destacados por afinidade individual.
- **Detalhe do evento**: informações completas, favoritar, confirmar presença (com aviso de
  segurança de primeiro encontro), e as duas portas sociais — "entrar na comunidade" (frente 2) ou
  "chamar meu grupo" (frente 1).
- **Comunidade do evento (chat aberto)**: portão de verificação SMS just-in-time + aceite de
  diretrizes na primeira entrada; sinal agregado de compatibilidade ("12 pessoas aqui, 4 com alta
  afinidade com você"); primitiva de chat compartilhada.
- **Grupo privado**: criação, convite por link/WhatsApp, evento fixado, chat (mesma primitiva, modo
  privado).
- **Perfil/detalhe do usuário**: interesses em comum, selo de verificado, ícone de força de
  compatibilidade (baixa→alta), denunciar/bloquear.
- **Confiança e segurança**: verificação por SMS just-in-time, diretrizes de comunidade, denúncia e
  bloqueio, sanção automática por acúmulo de denúncias + escalonamento manual para casos graves,
  aviso de segurança de primeiro encontro.
- **Consentimento de pesquisa em duas camadas**: ToS geral no onboarding + TCLE dedicado e opt-in
  separado, oferecido após o onboarding, para quem topa entrar formalmente na coorte de pesquisa.
- **Ingestão de eventos** via provedor plugável (SerpApi/Google Events como fonte primária), com
  deduplicação e normalização mínima.
- **Criação de evento pelo usuário (anfitrião)** — formulário leve (estilo NomadTable): título,
  data/hora, local, categoria + foto de capa e descrição opcionais (sem preço nem limite de vagas). É o
  mesmo objeto `Evento`, com `origem: anfitrião`; entra na mesma home/detalhe/comunidade, com pin no
  mapa sempre aproximado (bairro). Ponto de entrada: FAB "+" na home; verificação SMS just-in-time no
  "Publicar". O criador vira **anfitrião** e admin da comunidade autocriada. Detalhe no ticket 11.

### SHOULD (muito desejáveis se houver tempo)

- Votação/enquete de evento dentro do grupo privado.
- Avaliação/feedback pós-evento (alimenta sinais implícitos e telemetria de pesquisa).
- Curadoria manual de eventos malformados vindos da ingestão automática.

### COULD (versões posteriores)

- **Roda** — matchmaker perfil↔perfil que forma subgrupos pequenos de estranhos afins a partir da
  comunidade de um evento (ciclo **comunidade → roda → grupo**); o núcleo da tese, especificado no
  ticket 10, deliberadamente fora do MVP.
- Onboarding assistido de hosts e ferramentas avançadas de oferta (criação assistida por IA, analytics
  para criadores) — a criação *básica* de evento já é MUST; o que fica para depois é o suporte avançado
  ao lado da oferta.
- Tudo listado na seção 10 (roadmap de longo prazo).

**Fora de escopo do MVP, explicitamente:** monetização, moderação proativa (só reativa/denúncia),
verificação por documento (só SMS), expansão geográfica além do Rio.

---

## 5. Fluxos de Usuário (User Flows)

**5.1 Primeiro acesso.** Login com Google → seleção de interesses (mínimo sugerido de categorias) →
permissão de localização (se negada, cai em lista com busca por cidade/bairro) → tela de Termos &
Privacidade com aceite explícito do uso acadêmico dos dados (obrigatório para prosseguir) → home
(mapa). Não há verificação de identidade nesse momento — ela é adiada (just-in-time) para o momento
em que o usuário tenta interagir com estranhos.

**5.2 Encontrar eventos compatíveis.** Usuário abre o app → home mostra eventos próximos no mapa
(ou lista), já ordenados por afinidade individual (score de similaridade perfil↔evento) → usuário
filtra por data/categoria se quiser → toca num pino/card → abre o detalhe do evento.

**5.3 Ver por que foi recomendado.** No detalhe do evento e no perfil de outra pessoa, a explicação
de compatibilidade é sempre qualitativa, nunca um score numérico cru: no evento, aparece como
ordenação/destaque na home; entre pessoas, aparece como "vocês curtem X, Y" (interesses em comum) +
um ícone visual de força (arcos/barras, baixa a alta). Esse design é deliberado — comunicar
afinidade sem parecer "app de namoro" e sem expor um número que convide a comparação/ranking social
tóxico.

**5.4 Sinalizar interesse ou participação.** No detalhe do evento: favoritar (sinal implícito leve) e
confirmar presença (sinal implícito forte, dispara aviso de segurança de primeiro encontro). A partir
daí, o usuário escolhe uma das duas portas: entrar na comunidade aberta do evento (frente 2) ou
chamar seu grupo privado (frente 1) — ambas levam à mesma primitiva de chat, em modos diferentes.

**5.5 Selecionar amigos e pedir eventos para o grupo.** Na frente 1: usuário cria um grupo privado,
convida por link/WhatsApp, e a partir daí vê eventos recomendados considerando o perfil agregado do
grupo (adequação evento↔grupo — "esse evento combina com o seu grupo", com estratégia de **menor
sofrimento**: prioriza o evento que ninguém do grupo rejeita, não a média morna — ver
`docs/adr/0002-agregacao-grupo-menor-sofrimento.md`), fixa um evento no grupo, e o grupo coordena por
chat até a confirmação.

**5.6 Criar um evento (anfitrião).** Qualquer usuário toca no **FAB "+"** na home → abre o formulário
leve de "Criar evento" (título, data/hora, local, categoria + foto e descrição opcionais) → toca em
**"Publicar"**; se ainda não verificou o telefone, aparece o **portão SMS just-in-time** (só na 1ª
vez). Publicado, o evento entra na home (misturado aos ingeridos, com selo discreto "Anfitrião", pin
aproximado por bairro) e tem sua **comunidade autocriada**, na qual o criador é **anfitrião/admin**. A
partir daí é o mesmo fluxo de qualquer evento: outras pessoas confirmam presença e entram na
comunidade.

---

## 6. Modelo de Dados de Alto Nível

Modelagem agnóstica de tecnologia, mas detalhada o suficiente para um banco relacional.

**Usuário** — identidade de autenticação (login Google), telefone verificado (SMS, opcional até ser
necessário), localização aproximada, status de verificação, aceite de ToS (timestamp), status de
opt-in da coorte de pesquisa (timestamp do TCLE, se aplicável). Relaciona-se 1:1 com **Perfil**.

**Perfil** — interesses explícitos (lista de categorias/subcategorias escolhidas no onboarding) +
vetor de perfil (embedding derivado de interesses + histórico de sinais implícitos, ver seção 7).
Relaciona-se com **Interação** (1:N) e é insumo do cálculo de compatibilidade.

**Evento** — título, descrição, categoria(s)/tags, local (endereço + lat/long), data/hora, link da
fonte oficial, **origem** (`ingerido | anfitrião`), fonte de origem quando ingerido (ex. "via Google
Events") ou **anfitrião** (referência ao Usuário criador) quando `origem = anfitrião`, hash de
deduplicação (título+data+venue), vetor de embedding próprio (título+descrição+tags concatenados).
Relaciona-se com **Comunidade** (1:1, autocriada), **Interação** (1:N) e pode ser fixado em um ou mais
**Grupo**. Nota de exibição: para eventos de anfitrião o local é plotado no mapa em nível **aproximado
(bairro)**, nunca o endereço exato.

**Comunidade (chat aberto de evento)** — vinculada 1:1 a um Evento; lista de membros (Usuários que
entraram); estado da comunidade (ativa, encerrada após o evento); mensagens (ver **Mensagem**).
Autocriada quando o primeiro usuário confirma interesse/entra no evento. Não tem "dono" quando o evento
é `ingerido`; quando o evento é de `anfitrião`, o **criador é admin** (modelo WhatsApp: remover
membro, reportar).

**Grupo (privado)** — criado por um Usuário (owner), lista de membros (convidados), evento(s) fixado(s),
mensagens (mesma entidade de chat que a Comunidade, diferenciada por `tipo: aberto|privado`).

**Mensagem** — remetente, conteúdo, timestamp, referência a Comunidade ou Grupo (mesma primitiva de
chat, campo de contexto diferencia o modo).

**Interação** — registro de sinal implícito: usuário, evento, tipo (`visualizado`, `favoritado`,
`presenca_confirmada`, `avaliado`), timestamp, peso (usado na composição do vetor de perfil).
Relaciona-se N:1 com Usuário e N:1 com Evento.

**Compatibilidade (derivada, não persistida como fato bruto)** — calculada sob demanda (ou
cacheada com TTL curto) via similaridade de cosseno entre vetores de Perfil (par-a-par) ou entre um
Perfil e o vetor agregado de uma Comunidade/Grupo. Resultado exposto como faixa qualitativa
(baixa/média/alta), nunca como score cru na UI.

**Denúncia** — denunciante, denunciado, contexto (Mensagem/Comunidade/Grupo), motivo (categoria:
assédio/spam/outro), timestamp, status (aberta, escalada, resolvida). Alimenta a regra de sanção
automática (N denúncias em janela de tempo → suspensão) e a fila de revisão manual para categorias
graves.

**Bloqueio** — usuário que bloqueia, usuário bloqueado, timestamp — independe de denúncia.

**Consentimento de pesquisa** — usuário, tipo (ToS geral | TCLE coorte), timestamp, versão do texto
aceito.

---

## 7. Módulo de Recomendação

### 7.1 Base técnica já existente (não é decisão em aberto)

O título, a descrição e as categorias/tags de cada evento são concatenados e submetidos ao modelo
`text-embedding-ada-002` (OpenAI), gerando um vetor de comprimento fixo. O mesmo processo gera o
**vetor de perfil do usuário**, composto a partir de: (i) interesses explícitos do onboarding
(categorias/subcategorias) e (ii) histórico de interações implícitas — eventos visualizados,
favoritados, confirmados e avaliados (cada tipo de sinal com peso distinto na composição, maior peso
para presença confirmada/avaliação do que para visualização). A relevância evento↔usuário é a
**similaridade de cosseno** entre os dois vetores.

### 7.2 Extensão para perfil↔perfil e perfil↔grupo (o objeto de pesquisa)

A mesma métrica de cosseno, já validada para perfil↔evento, é estendida para comparar vetores de
**dois ou mais perfis de usuário** entre si. Decisão de escopo de produto (ticket 04): esse sinal é
**similaridade pura** (interesses + comportamento) — sem fator de diversidade explícito no MVP;
"compatível mas diverso" não é otimizado ativamente na v1, fica registrado como direção de pesquisa
futura (seção 10). Para compatibilidade **perfil↔grupo/comunidade**, o vetor do grupo é a
composição (ex. centróide) dos vetores de perfil de seus membros. Já para **recomendar um evento a um
grupo** (adequação evento↔grupo), a estratégia decidida é **menor sofrimento** (*least-misery*):
escolher o evento cuja menor nota individual no grupo é a mais alta — "ninguém detesta" em vez da média
morna (ver `docs/adr/0002-agregacao-grupo-menor-sofrimento.md`).

Importante: no MVP, esse sinal **não forma grupos automaticamente** — ele apenas é exibido (ícone de
força + interesses em comum) para influenciar a decisão do usuário de entrar numa comunidade ou não.
O matchmaker automático — a **roda** (ticket 10) — é a fronteira seguinte, deliberadamente fora do MVP.

### 7.3 Pontos de integração (API, pseudo-JSON)

```
GET /api/recommendations/events?user_id={id}&lat={lat}&lng={lng}&radius_km={r}
→ {
    "events": [
      {
        "event_id": "evt_123",
        "title": "Feira Gastronômica da Praça XV",
        "score": 0.87,               // similaridade de cosseno perfil↔evento
        "distance_km": 1.2,
        "start_at": "2026-08-15T18:00:00-03:00",
        "source": "google_events"
      },
      ...
    ]
  }

GET /api/compatibility/user-to-community?user_id={id}&community_id={cid}
→ {
    "community_id": "com_evt_123",
    "signal_level": "alta",           // baixa | media | alta — nunca score cru na UI
    "shared_interests": ["gastronomia", "música ao vivo"],
    "members_count": 12,
    "high_affinity_count": 4
  }

GET /api/compatibility/user-to-user?user_id={id}&target_user_id={id2}
→ {
    "signal_level": "media",
    "shared_interests": ["fotografia"],
    "verified": true
  }

GET /api/compatibility/event-fit-for-group?event_id={eid}&group_id={gid}
→ {
    "fit_level": "alta",
    "explanation": "combina com 4 de 5 membros do grupo"
  }
```

Parâmetros e respostas priorizam **níveis qualitativos** (baixa/média/alta) em vez de score numérico
exposto — decisão de design da seção 5.3, para não parecer app de dating nem convidar comparação
social direta. O score numérico bruto (cosseno) fica disponível internamente para ordenação/ranking,
mas não é contrato de API voltado à UI além do necessário para ordenar a lista de eventos.

### 7.4 O motor de compatibilidade (visão completa)

O cosseno é o **núcleo único** do produto — a mesma matemática serve a três operações e uma alavanca
transversal (detalhe em `docs/motor-de-recomendacao.md`):

1. **Pessoa ↔ evento** — recomendação individual (MVP, já existe).
2. **Pessoa ↔ pessoa** — no MVP aparece como **sinal** de similaridade pura (seção 7.2); no pós-MVP vira
   o **matchmaker da roda**, onde entra o "diverso mas compatível" (piso de afinidade no que importa +
   variedade no resto, recíproco).
3. **Grupo ↔ evento** — recomendar um evento que agrade um grupo, por **menor sofrimento** (seção 7.2 e
   ADR 0002).

**Alavanca de novidade.** Para combater a bolha (*over-specialization* / câmara de eco), a saída não é
travar uma faixa fixa de similaridade no código, e sim uma **alavanca controlada pelo usuário** — de
"parecido comigo" a "me surpreenda". Os ajustes-padrão saem dos dados de uso reais, não de uma constante
arbitrária. **Piso de sanidade:** se o melhor candidato de afinidade fica abaixo de ~0.10, o sistema não
sugere ninguém e emite alerta (comunidade vazia / dados quebrados).

---

## 8. Arquitetura de Sistema (Visão Macro)

- **App mobile (React Native)** — multiplataforma, consome a API do backend; único ponto de
  interação do usuário no MVP (sem web app de produto).
- **Backend/API (Supabase — PostgreSQL + BaaS)** — persistência das entidades da seção 6, autenticação
  (Google), regras de negócio de chat/comunidade/grupo, orquestração de ingestão de eventos, exposição
  dos endpoints de recomendação/compatibilidade (que internamente chamam o serviço de embeddings).
- **Serviço de embeddings (Python, API REST)** — responsável por gerar embeddings (evento e perfil) via
  `text-embedding-ada-002` e calcular similaridade de cosseno; desacoplado do backend principal para
  poder evoluir o modelo/algoritmo sem tocar no resto do sistema.
- **Serviço de ingestão de eventos** — isolado atrás de uma interface "provedor de eventos" (decisão do
  ticket 05), com SerpApi (Google Events) como fonte primária plugável e Sympla como plano B via
  parceria; guarda apenas metadados factuais (título, data, local, categoria, link) e sempre linka de
  volta à fonte oficial — nunca redistribui descrição rica ou imagens protegidas de terceiros.
- **Landing page (Next.js)** — divulgação do produto e da pesquisa, captura de interesse (waitlist),
  fora do app em si.

**Fluxo típico de requisição:** App React Native → Backend (Supabase) autentica e roteia →
para descoberta de eventos, Backend consulta cache local de eventos ingeridos (atualizados
periodicamente pelo Serviço de Ingestão) já ordenados por score pré-calculado ou calculado sob
demanda via chamada ao Serviço de Embeddings → resposta volta ao app. Para compatibilidade
perfil↔perfil/grupo, o Backend chama o Serviço de Embeddings passando os vetores relevantes (já
armazenados) e recebe o nível de sinal qualitativo. A ingestão de eventos roda de forma assíncrona
(job periódico), não em request-time.

---

## 9. Requisitos Não Funcionais

**Desempenho.** Latência aceitável para recomendação de eventos na home: até ~1–2s percebidos pelo
usuário (cache de scores pré-calculados por região/categoria é aceitável para o MVP, não precisa ser
cosseno em tempo real a cada scroll). Volume esperado no protótipo: dezenas a poucas centenas de
usuários simultâneos (piloto + coorte de pesquisa ≥20), não é requisito de produto suportar picos
grandes.

**Segurança e privacidade.** Dados de perfil/preferências e localização aproximada (não precisa
GPS de alta precisão constante — bairro/raio é suficiente para a home). Nenhum atributo sensível
(raça, orientação, religião, saúde) é coletado para fins de compatibilidade. Dados de participantes
de eventos de terceiros (ex. Sympla) não são ingeridos — só metadados públicos do evento em si.
Consentimento em duas camadas (ToS geral + TCLE da coorte), conforme seção 4 e ticket 08.

**Observabilidade.** Logs e métricas mínimas: eventos de telemetria de produto/pesquisa listados na
seção 11.2 (perfil criado, interesse selecionado, evento visualizado/favoritado/confirmado/avaliado,
sinal de compatibilidade exibido/visualizado, entrada em comunidade, mensagem enviada, grupo criado,
convite enviado, denúncia enviada, bloqueio realizado). Logs de erro/latência do serviço de embeddings
e do job de ingestão (falhas de fonte externa, deduplicação).

**Restrições explícitas de protótipo.** Não precisa escalar para milhões de usuários nem alta
disponibilidade de produção; SerpApi é tratada como fonte de dados **substituível** (litígio ativo
Google×SerpApi, risco de continuidade do fornecedor — isolar atrás de interface de provedor é
mitigação obrigatória, não opcional); moderação é reativa (denúncia + regra automática), não
proativa; foco é viabilidade técnica das duas frentes + coleta de dados estruturada para a próxima
fase de pesquisa.

---

## 10. Futuras Extensões (Roadmap Alto Nível)

Visão de longo prazo, além do MVP — não implementar agora:

- **Roda (matchmaker perfil↔perfil)** — a extensão natural do módulo de recomendação e a fronteira
  imediatamente após o MVP, já **especificada no ticket 10**. A partir da comunidade de um evento, o
  sistema cutuca e **sugere** (não forma à força) um subgrupo pequeno de estranhos afins — a *roda* —
  com aceite mútuo, verificação obrigatória, admin (modelo WhatsApp) e ponte para virar **grupo** se a
  galera permanecer (ciclo **comunidade → roda → grupo**). O matchmaker é motor de **sugestão**, não
  formador puro — trade-off consciente de pesquisa × UX (ADR 0001). É o núcleo da agenda de pesquisa.
- **Diversidade como objetivo explícito de compatibilidade** — hoje (ticket 04) o sinal é similaridade
  pura; a roda é onde essa direção se materializa: testar formulações de "compatível mas diverso" (perfis
  diferentes porém complementares) e comparar com a similaridade pura em termos de qualidade de
  experiência reportada.
- **Camada social — seguir/seguidor** — seguir e deixar de seguir perfis, com contagem de seguidores no
  detalhe do perfil; a base de grafo social que sustenta descoberta e gamificação futuras.
- **Depoimentos no perfil** — relato deixado por quem teve uma experiência real com a pessoa. Dupla
  função: **prova social/confiança** (reforça a camada de segurança do ticket 07) e forte **candidato a
  métrica de sucesso da roda** — "a roda gerou experiência boa de verdade?".
- **Criação de eventos assistida por IA generativa** — evolução da criação manual (que já é MUST no
  MVP, ticket 11): um assistente conversacional que ajuda qualquer pessoa a definir título, descrição,
  categorias, horário e local sugerido de um evento próprio, reduzindo ainda mais o atrito do lado da
  oferta.
- **Gamificação** — pontos por ações sociais (seguir, curtir, deixar depoimento) e por participar de
  eventos, incentivando recorrência e comparecimento real. **Bloqueada por "definir recompensa"**: o que
  os pontos valem ainda é uma questão em aberto.
- **Analytics para criadores de eventos** — dados de alcance, engajamento e recomendações de
  horário/descrição para produtores otimizarem seus eventos, aprofundando as ferramentas do anfitrião
  (seção 3.3) para além da criação básica já presente no MVP.
- **Recomendação orientada a grupos como fluxo de primeira classe** — selecionar um conjunto de
  amigos e pedir diretamente "eventos para este grupo" (o cenário do bar), com agregação por **menor
  sofrimento** (ADR 0002), generalizando a adequação evento↔grupo já presente no MVP (seções 5.5 e 7.2)
  para uma feature de busca dedicada.
- **Modos de visualização adicionais** — mapa e lista já existem no MVP; adicionar modo
  "tinder-like" (swipe) como forma alternativa de navegar recomendações.
- **Reels/vídeos de eventos** anexados pelos criadores, e **feed estilo TikTok** baseado nesses
  eventos como canal de descoberta adicional.
- **"Onde seus amigos estarão"** — seção mostrando próximos eventos com presença confirmada de
  amigos, aprofundando a camada social da frente 1.

---

## 11. Métricas de Sucesso do Protótipo

### 11.1 Métricas de produto (sucesso mínimo do MVP, mensurável em semanas)

Taxa de conclusão do onboarding; número de eventos visualizados/favoritados por usuário ativo;
taxa de confirmação de presença sobre eventos vistos; taxa de entrada em comunidade de evento sobre
eventos vistos (frente 2); número de grupos privados criados e taxa de evento fixado por grupo
(frente 1); taxa de troca de ao menos uma mensagem em comunidades/grupos após entrada (proxy de
"primeiro momento de valor", conforme critérios de sucesso definidos por persona na seção 3);
volume de denúncias e tempo até resolução (saúde da camada de confiança).

### 11.2 Métricas de pesquisa (dependem da coorte e de tempo mais longo)

Se o sinal de compatibilidade exibido é notado e influencia a decisão de entrar numa comunidade
(comparando taxa de entrada entre sinal alto vs. baixo/médio); se usuários com sinal de
compatibilidade mais alto entre si trocam mais mensagens ou confirmam presença com mais frequência
em conjunto; percepção qualitativa de compatibilidade coletada via avaliação pós-evento (quando
implementada, SHOULD); indicadores auto-relatados de aumento de experiências presenciais e bem-estar
percebido, coletados junto à coorte instrumentada via app sob o TCLE específico — não o ToS geral —
com escopo geográfico e duração **abertos** (não fixados em Rio/2026–2027). Quando a roda existir,
**depoimentos** pós-experiência entram como candidato a métrica de sucesso do matchmaker.

### 11.3 O que é sucesso mínimo do MVP vs. o que depende de estudo posterior

**Sucesso mínimo do MVP** (validável em semanas, sem a coorte formal): as duas frentes funcionam
tecnicamente de ponta a ponta, a ingestão de eventos sustenta comunidades com atividade real (não
vazias), e as métricas de produto da seção 11.1 mostram uso recorrente acima de ruído. **Depende de
estudo posterior** (meses, com a coorte instrumentada): qualquer afirmação causal sobre aumento de
experiências presenciais de maior impacto, sobre a validade do sinal de compatibilidade como preditor
de encontros reais bem-sucedidos, e sobre efeitos em bem-estar — isso é precisamente o objeto da
segunda fase de pesquisa (a **roda** e a coorte instrumentada — de escopo e duração abertos, além do
horizonte de 2026–2027 originalmente previsto) descrita na Seção 6 do artigo científico base, não uma
entrega do protótipo em si.

---

## Apêndice — Rastreabilidade das decisões

Este PRD sintetiza decisões tomadas via processo de grilling estruturado, registradas em
`wayfinder/tickets/`: 01 (problema/proposta de valor), 02 (personas/cenários), 03 (posicionamento
competitivo, pesquisa), 04 (modelo de dados/sinais), 05 (fontes de dados de eventos, pesquisa), 06
(escopo/fluxos do MVP), 07 (confiança/segurança/moderação), 08 (camada de pesquisa instrumentada), 09
(este documento de síntese), 10 (Companhia/roda — matchmaker perfil↔perfil, pós-MVP) e 11 (criação de
evento pelo anfitrião). Ver `wayfinder/map.md` para o índice completo, `CONTEXT.md` para o glossário de
domínio, `docs/motor-de-recomendacao.md` para o motor de compatibilidade, `docs/adr/` para os registros
de decisão arquitetural, `docs/design/` para as telas prototipadas via Claude Design e
`docs/specs/00-index.md` para as specs de implementação derivadas deste escopo.
