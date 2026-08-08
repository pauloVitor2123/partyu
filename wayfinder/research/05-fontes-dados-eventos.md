# Fontes de dados de eventos para ingestão (Sympla / Google Events / Eventbrite)

- **Data:** 2026-08-08 (verificado ao vivo em agosto/2026)
- **Ticket:** `wayfinder/tickets/05-fontes-dados-eventos.md`
- **Objetivo:** decidir a(s) fonte(s) de dados de eventos para o MVP do Partyu (foco Rio de Janeiro), viabilizando ingestão + auto-criação de chats/comunidades por evento.

> **Nota de método.** Diferente do rascunho anterior (escrito de memória, sem acesso à rede), esta versão foi **verificada ao vivo** via WebSearch em agosto/2026 contra documentação oficial, changelogs e cobertura jornalística. Cada afirmação sensível traz a marca **[VERIFICADO]** com a fonte na seção "Fontes". Onde a doc oficial não expõe um número publicamente (ex.: rate limit da Sympla), isso é sinalizado como **[NÃO PUBLICADO]**.
>
> **Mudança material desde o rascunho:** em **dez/2025 o Google processou a SerpApi** por scraping do SERP (DMCA); o tribunal **concedeu a moção de arquivamento da SerpApi em 20-21/jul/2026**. Isso altera a análise de risco da opção "Google Events via SerpApi" (ver §3.4 e §3.5). Além disso, preços/cotas da SerpApi foram corrigidos (plano grátis é **250/mês**, não 100; há plano de **US$25/mês por 1.000 buscas**).

---

## 1. Eventbrite

### 1.1 Existe API pública? O que expõe?
- **[VERIFICADO]** A Eventbrite mantém uma API REST v3 (`https://www.eventbriteapi.com/v3/`), documentada em `https://www.eventbrite.com/platform/api`. Autenticação por **OAuth token** (private token do painel). Expõe objetos `event`, `venue`, `organizer`, `category`/`subcategory`, `format`, `ticket_class`, com campos ricos (`name`, `description`, `start`/`end` com timezone, `venue` com endereço e lat/long, `organizer`, `category_id`, `is_free`, `logo`, `url`).
- **[VERIFICADO] Ponto crítico — a busca pública de terceiros foi DESCONTINUADA (datas confirmadas):**
  - O endpoint `GET /v3/events/search/` teve o **acesso público removido em 12/dez/2019**; a partir de **20/fev/2020** todas as requisições passaram a ser negadas. Não há substituto público de descoberta.
  - A API v3 hoje é orientada à **gestão dos seus próprios eventos** (da conta/organização autenticada), não ao catálogo global de terceiros.
- **[VERIFICADO]** Endpoints que **permanecem** exigem IDs conhecidos e/ou são escopados ao dono do token:
  - `GET /v3/organizations/{id}/events/` — eventos da sua própria organização.
  - `GET /v3/venues/{venue_id}/events/` — eventos de um local (por ID de venue).
  - `GET /v3/events/{event_id}/` — detalhe de um evento por ID (útil se você já tem o ID/URL).
  - `GET /v3/categories/` etc.
- **[VERIFICADO] Novidade em relação ao rascunho:** para acesso a eventos públicos de muitos criadores, a Eventbrite direciona ao **"distribution partner program"** (programa de parceiros de distribuição), sujeito a **aplicação/aprovação** — não é self-service via API pública.
- **Consequência para o Partyu:** **não** dá para pedir, via API oficial, "todos os eventos públicos no Rio nos próximos 30 dias". Isso mata o caso de uso central de ingestão ampla por cidade. **[VERIFICADO]**

### 1.2 Cobertura no Rio / Brasil
- **[qualitativo]** A Eventbrite tem presença no Brasil, porém no Rio/Brasil é **secundária** frente à Sympla para eventos locais (shows, festas, cursos, gastronomia). Ainda que a cobertura existisse, é **inacessível via API pública** por causa da descontinuação da busca (§1.1).

### 1.3 Limites, chave/aprovação, custo
- **[VERIFICADO]** A API é **gratuita**; autenticação por **OAuth token** gerado no painel do desenvolvedor, sem aprovação manual pesada (para o escopo "seus próprios eventos").
- **[NÃO PUBLICADO com precisão]** Rate limits não são destacados numericamente na página principal da API; historicamente citados na ordem de milhares/hora e dezenas de milhares/dia por token. Confirmar caso a Eventbrite venha a ser usada (o que não é o caso na recomendação).

### 1.4 Termos de uso relevantes
- **[VERIFICADO/estrutural]** O Developer Agreement restringe o uso a integrações que agreguem valor ao ecossistema Eventbrite e limita replicar/competir com a plataforma. Combinado com a ausência de endpoint de busca, **construir uma camada de descoberta/comunidade sobre o catálogo global deles não é um caso suportado**.
- **[estrutural]** Scraping do site é vedado pelos Termos e combatido tecnicamente. Não é caminho recomendável.

### 1.5 Riscos e veredito
- **Disponibilidade do caso de uso:** praticamente **inviável** para ingestão ampla por cidade (busca pública desligada desde fev/2020). **[VERIFICADO]**
- **Veredito:** **não recomendada** como fonte primária de descoberta no MVP. Só faz sentido como integração pontual **se** um organizador parceiro autorizar e compartilhar IDs/URLs dos próprios eventos, ou via o programa de parceiros de distribuição (processo comercial, fora do escopo de MVP rápido).

---

## 2. Sympla

### 2.1 Existe API pública? O que expõe?
- **[VERIFICADO]** A Sympla oferece uma **API pública para produtores/organizadores** (`https://developers.sympla.com.br/api-doc/index.html`), base `https://api.sympla.com.br/public/`. Autenticação por **token** gerado no painel (**Minha Conta → Integrações → criar chave de acesso**), que assina todas as requisições.
- **[VERIFICADO] Ponto crítico — escopo restrito à conta autenticada:** a doc oficial afirma explicitamente que **"o acesso aos dados é restrito aos eventos do próprio cliente"**. Os endpoints retornam **os eventos do próprio produtor** e seus ingressos/pedidos/participantes:
  - `GET /public/v3/events` — lista **os eventos vinculados ao seu token** (não o catálogo geral). Suporta parâmetro `fields` (querystring) para escolher atributos; campos incluem `name`, `detail`, `start_date`/`end_date`, `address` (local, cidade, lat/long), `category_prim`/`category_sec`, `host`, `url`, imagem.
  - `GET /public/v3/events/{id}` — detalhe do evento.
  - `GET /public/v4/events/{id}/participants` e `/orders` — participantes e pedidos (dados de venda/check-in — sensível, LGPD).
- **[VERIFICADO]** **Não existe endpoint público oficial de busca do catálogo global** ("todos os eventos no Rio"). Para ingerir eventos de **terceiros**, a API oficial **não cobre** o caso.

### 2.2 Cobertura no Rio / Brasil
- **[qualitativo]** A Sympla é **a maior plataforma de eventos do Brasil** e tem a **melhor cobertura do Rio** entre as três (shows, festas, baladas, cursos, gastronomia, esporte, cultura). O problema **não é cobertura** — é **acesso programático ao catálogo de terceiros**.

### 2.3 Limites, chave/aprovação, custo
- **[VERIFICADO]** Uso da API é **gratuito**; requer **conta de organizador** e geração de token no painel. O token dá acesso **aos eventos daquela conta**, não ao catálogo geral.
- **[NÃO PUBLICADO]** Rate limits específicos **não são publicados** na doc do desenvolvedor. Confirmar diretamente com a Sympla se houver dependência operacional.

### 2.4 Termos de uso relevantes
- **[estrutural/LGPD]** Dados de participantes (nome, e-mail, pedidos) são **pessoais** e altamente sensíveis sob a LGPD. Para o Partyu, o interesse é o **metadado público do evento** (título, data, local, categoria, link), não dados de compradores — o que reduz o risco **se** a fonte for autorizada. **Recomendação: não ingerir dados de participantes.**
- **[estrutural]** Scraping do site público da Sympla é vedado pelos Termos. **Observação de mercado (nova):** existem scrapers de terceiros (ex.: actor "Sympla-Brazil-Events" no Apify) que extraem o catálogo público — funcionam tecnicamente, mas caem na **mesma zona cinzenta jurídica** de scraping não autorizado; não recomendados como fundação.

### 2.5 Riscos e veredito
- **Acesso ao catálogo de terceiros:** a API oficial **não** entrega isso — precisa de **parceria/acordo com a Sympla** (feed de parceiro) ou de **modelo lado-da-oferta** (organizadores conectam seus eventos Sympla ao Partyu via token). **[VERIFICADO]**
- **Veredito:** **melhor fonte de cobertura e qualidade para o Rio**, porém o acesso amplo depende de **acordo comercial** ou do modelo lado-da-oferta. A API self-service sozinha só serve eventos de produtores que já estejam na Sympla **e** conectados ao Partyu.

---

## 3. Google Events (Places API / dados de eventos do Google / SerpApi)

### 3.1 Existe API oficial? O que expõe?
- **[VERIFICADO] Não há API oficial do "Google Events".** O bloco "Eventos" da Busca é um recurso de **front-end da Pesquisa**, alimentado por dados estruturados (schema.org/Event) rastreados de sites de terceiros. O Google **não publica** uma API que retorne esse feed.
- **[VERIFICADO] Google Places API (New) NÃO retorna eventos.** A Places API expõe **lugares** (POIs: nome, endereço, lat/long, tipos, avaliações, fotos, horários) — **não** eventos com data/hora. Não é fonte de eventos.
- **[VERIFICADO] Google Calendar API não serve** como catálogo público de eventos da cidade (é para calendários de contas).
- **[VERIFICADO] Alternativa de fato — SerpApi Google Events API** (`https://serpapi.com/google-events-api`): serviço **de terceiro** que faz scraping estruturado do bloco de eventos da Busca e entrega JSON. Campos confirmados: `title`, `date` (com `start_date` e `when` legível), `address` (lista: local + cidade), `link` (fonte), `ticket_info` (vendedores + links de ingresso), `venue` (nome, avaliação), `thumbnail`/`image` — e às vezes `description`. Parâmetros: `q` (busca, ex.: "Events in Rio de Janeiro"), `location`, `hl`/`gl` (pt-br/BR), filtros via `htichips` (`date:today|tomorrow|week|next_week|month|next_month`, `event_type:Virtual-Event`, combináveis por vírgula). **Paginação por offset** via `start` (0, 10, 20…), e **não** por token.
  - Concorrentes de mercado (mesma natureza jurídica de scraping do SERP): **HasData**, **Oxylabs**, **Bright Data**, **DataForSEO**, **Apify**.

### 3.2 Cobertura no Rio / Brasil
- **[qualitativo]** O bloco de Eventos do Google **agrega múltiplas fontes** (Sympla, Eventbrite, Facebook Events, venues, Ticketmaster/Ingresso.com etc.). Para o Rio, isso dá **a cobertura mais ampla e diversa** em um único ponto. É de longe o feed mais abrangente dos três em variedade de origem.
- **[qualitativo]** Qualidade dos campos varia (datas relativas, endereços parciais), pois depende do que cada site publica em schema.org.

### 3.3 Limites, chave/aprovação, custo — **CORRIGIDO**
- **[VERIFICADO]** Não há chave/produto oficial do Google. Via **SerpApi**: exige conta + API key.
- **[VERIFICADO] Preços SerpApi (agosto/2026), corrigidos frente ao rascunho:**
  - **Plano gratuito: 250 buscas/mês** (o rascunho dizia ~100 — **errado**).
  - **Pago a partir de US$25/mês por 1.000 buscas** (~US$0,025/busca) — este tier **não constava** no rascunho.
  - **Developer: US$75/mês por 5.000 buscas** (throughput de ~1.000/hora, i.e. 20% do volume mensal).
  - Tiers maiores: **US$150/15.000** e **US$275/30.000**; custo por 1k cai para ~US$9 nos planos "Big Data".
  - **"Use it or lose it":** buscas não usadas **não acumulam** para o mês seguinte. Cada "busca" = 1 requisição de página de resultados.

### 3.4 Termos de uso relevantes — **ATUALIZADO (litígio Google v. SerpApi)**
- **[VERIFICADO] Google:** os Termos de Serviço do Google **proíbem acesso automatizado/scraping** dos resultados da Busca ("robots, spiders or scrapers"). Você mesmo raspar o SERP viola os ToS do Google.
- **[VERIFICADO — NOVO E MATERIAL] Litígio Google v. SerpApi:** em **19/dez/2025** o Google **processou a SerpApi** (Northern District of California) alegando violação de **DMCA** — que a SerpApi teria gerado centenas de milhões de consultas artificiais e contornado controles para revender conteúdo do SERP. Em **20-21/jul/2026** o tribunal **concedeu a moção de arquivamento da SerpApi**:
  - Dismissed **sem possibilidade de refiling** a parte das alegações sobre resultados **sem conteúdo protegido** (DMCA não protege material não-copyrightável); o "SearchGuard" do Google não foi reconhecido como medida efetiva de controle de acesso a obra protegida.
  - O Google recebeu **21 dias para emendar** a parte estreita relativa a trechos protegidos (ex.: snippets de Knowledge Panels).
  - **Leitura para o MVP:** foi uma vitória processual da SerpApi e um sinal favorável de que agregar **fatos de eventos** (não conteúdo protegido) tende a ser defensável — **mas** demonstra que a fonte está sob **pressão jurídica ativa do Google**, ou seja, é um **risco de continuidade do fornecedor**, não só de layout.
- **[estrutural]** Os **dados subjacentes** pertencem a terceiros (Sympla, venues etc.). A prática defensável é armazenar **metadados factuais** (título, data, local, categoria, URL da fonte) + **linkar de volta**, sem copiar descrições integrais nem re-hospedar imagens protegidas.
- **[VERIFICADO — mitigado]** O próprio modelo de negócio da SerpApi pressupõe que o cliente **use/armazene** os resultados retornados na sua aplicação. Confirmar limites de retenção/redistribuição nos termos da SerpApi antes de escalar.
- **Auto-criar chats/comunidades por evento:** criar comunidade **atrelada a um fato** (data/local/título) e linkar à fonte oficial é defensável — a comunidade é **conteúdo do Partyu/usuários**, não redistribuição. Cuidado: **não** se passar por oficial do evento/organizador e **não** copiar ativos protegidos.

### 3.5 Riscos e veredito
- **Risco de continuidade do fornecedor (elevado frente ao rascunho):** a SerpApi está em **litígio ativo com o Google**; embora tenha vencido a rodada de jul/2026, o Google pode emendar e/ou mudar controles técnicos, e o bloco de eventos pode ser alterado a qualquer momento. Tratar como fonte **substituível**. **[VERIFICADO]**
- **Custo variável** que cresce com volume de cidades/consultas (mitigável por cache/dedup).
- **Qualidade de dados** irregular (datas/endereços) — normalizar no pipeline.
- **Veredito:** **maior cobertura e menor esforço de integração** para arrancar o MVP no Rio, ao custo de **dependência frágil e juridicamente pressionada**. Excelente para validar rápido, ruim como fundação única de longo prazo.

---

## 4. Quadro comparativo

| Critério | **Sympla** | **Google Events (via SerpApi)** | **Eventbrite** |
|---|---|---|---|
| API oficial de **busca de terceiros** | Não (só eventos do próprio produtor) | Não há API oficial do Google; SerpApi (3º) faz o proxy | **Descontinuada** (busca pública off desde 20/fev/2020) |
| Cobertura Rio/Brasil | **Melhor** (líder BR) | **Mais ampla** (agrega várias fontes, incl. Sympla) | Secundária no BR |
| Campos (título/desc/cat/local/data/organizador) | Completos (para eventos do produtor) | Bons, porém irregulares (schema.org) | Completos (só p/ eventos da conta) |
| Chave/aprovação | Token de organizador (grátis) | Conta SerpApi + API key | OAuth token (grátis); catálogo amplo só via partner program |
| Custo | Grátis (API) | Grátis 250/mês; pago US$25/1k, US$75/5k, US$150/15k… | Grátis |
| Armazenar/derivar comunidades | Cinzento; ideal via parceria/LGPD | Defensável se só metadados + link (ver litígio §3.4) | Restritivo (Dev Agreement) |
| Risco principal | Depende de parceria p/ catálogo amplo | Fragilidade + **litígio Google v. SerpApi** | Caso de uso inviável (sem busca) |
| Esforço de integração MVP | Médio (depende de acordo) | **Baixo** | Alto/inviável p/ descoberta |

---

## 5. Recomendação para o MVP (foco Rio)

### Escolha primária: **Google Events via SerpApi** como agregador de ingestão do MVP.
**Por quê:**
1. **Cobertura mais ampla do Rio** num único ponto (agrega Sympla + venues + outros) — exatamente o que a auto-criação de comunidades por evento precisa: **volume e variedade**.
2. **Menor esforço de integração** e sem depender de negociar acordo comercial para começar — valida rápido a hipótese das "comunidades por evento".
3. **Termos administráveis** para o MVP se o Partyu armazenar apenas **metadados factuais** + **linkar de volta** à página de ingresso oficial. O arquivamento do processo (jul/2026) é sinal favorável de que agregar fatos é defensável.

**Ressalva nova (não estava no rascunho):** a SerpApi está em **litígio ativo com o Google**. Isso reforça — não anula — a decisão de tratá-la como **fonte plugável/substituível**. Ter um **provedor alternativo pré-avaliado** (HasData/Oxylabs/DataForSEO ou feed Sympla) reduz o risco de continuidade.

**Regras de implementação (obrigatórias, para reduzir risco jurídico):**
- Guardar somente **fatos** (título, data/hora, endereço, categoria, link da fonte); a descrição rica da comunidade é **gerada pelo Partyu/usuários**.
- Sempre exibir **"via [fonte]"** e um **botão que leva ao link oficial** de ingresso.
- Não re-hospedar imagens protegidas (usar thumbnail com atribuição ou arte própria).
- **Deduplicar** por (título + data + venue) — a mesma festa aparece em várias fontes.
- **Isolar a ingestão atrás de uma interface "provedor de eventos"** para trocar SerpApi ↔ Sympla ↔ outro sem reescrever o produto.

### Plano B (e caminho de maturação): **parceria/integração com a Sympla.**
- Melhor **cobertura local + qualidade de dados**, mas o acesso amplo ao catálogo exige **acordo de parceria/feed** ou o **modelo lado-da-oferta** (organizadores conectam eventos Sympla ao Partyu via token — alimenta a estratégia de hosts/galinha-e-ovo do mapa).
- Estratégia: **começar com SerpApi** (velocidade), **abrir conversa de parceria com a Sympla** em paralelo e, com tração, migrar a fundação para o feed oficial da Sympla (mais estável e defensável), mantendo SerpApi como complemento.

### Descartar no MVP: **Eventbrite** como fonte de descoberta.
- Sem busca pública (off desde fev/2020) e com Dev Agreement restritivo. Reconsiderar só como integração pontual se um organizador parceiro trouxer os próprios eventos (via ID/URL) ou via distribution partner program.

### Riscos residuais a monitorar
- **Litígio/termos do Google** e **quebra de layout** → SerpApi como fonte substituível (interface de provedor).
- **Cobertura desigual** de campos → normalizar/enriquecer; permitir curadoria manual.
- **Custo** cresce com nº de consultas/cidades → cachear e limitar frequência de polling por bairro/categoria (lembrar do teto de throughput e do "não acumula" da SerpApi).

---

## 6. Fontes (verificadas em agosto/2026)

**Eventbrite**
- API (visão geral): https://www.eventbrite.com/platform/api
- Descontinuação da busca (12/dez/2019 remoção pública; 20/fev/2020 desligamento) — issue/rastreio: https://github.com/Automattic/eventbrite-api/issues/83
- Changelog da plataforma: https://www.eventbrite.com/platform/docs/changelog
- Guia de terceiro confirmando foco "seus próprios eventos" + partner program: https://rollout.com/integration-guides/eventbrite/api-essentials

**Sympla**
- Documentação do desenvolvedor: https://developers.sympla.com.br/api-doc/index.html
- Blog — "Sympla disponibiliza API pública": https://blog.sympla.com.br/blog-do-produtor/sympla-disponibiliza-api-publica/
- Central de ajuda — "Como configurar API pública?": https://ajuda.produtor.sympla.com.br/hc/pt-br/articles/15422073696653-Como-configurar-API-p%C3%BAblica
- Scraper de terceiro (zona cinzenta, não recomendado): https://apify.com/aiteks.ltda/sympla-brazil-events

**Google / SerpApi**
- Google — Places Web Service (confirma foco em lugares/POI, não eventos): https://developers.google.com/maps/documentation/places/web-service/faq
- Google — Termos de Serviço / proibição de scraping: https://policies.google.com/terms
- Google — Spam Policies (tráfego gerado por máquina): https://developers.google.com/search/docs/essentials/spam-policies
- SerpApi — Google Events API (campos, parâmetros, filtros `htichips`): https://serpapi.com/google-events-api
- SerpApi — Events Results (paginação por `start`): https://serpapi.com/events-results
- SerpApi — pricing (grátis 250/mês; US$25/1k; US$75/5k…): https://serpapi.com/pricing
- **Litígio Google v. SerpApi** (processo dez/2025): https://blog.google/technology/safety-security/serpapi-lawsuit/
- **Arquivamento da moção (jul/2026)**: https://serpapi.com/blog/google-v-serpapi-the-court-granted-our-motion-to-dismiss/
- Cobertura independente do arquivamento: https://searchengineland.com/google-sues-serpapi-466541 · https://ipwatchdog.com/2025/12/26/google-sues-serpapi-parasitic-scraping-circumvention-protection-measures/
- Concorrentes de SERP/eventos: https://hasdata.com/apis/google-events-api
