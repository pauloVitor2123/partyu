# Spec 15 — Landing page de validação (SEO + métricas + waitlist)

- **Fase:** 0 (Validação — antes do app)
- **Status:** ready-for-agent (com pendências de operação listadas em "Pendências do dono")
- **Depende de:** —
- **Origem:** PRD §8 ("Landing page (Next.js) — divulgação, waitlist"), §1.3 (proposta de valor), §3
  (personas); `CONTEXT.md`; decisão de 2026-10-12: validar a ideia com uma landing **antes** de
  construir o app, com SEO focado em **marca + cauda longa**.

## Problem Statement

Construir o app inteiro (specs 01–11) antes de saber se alguém quer o Partyu é caro e arriscado. Falta
um instrumento barato que (a) coloque a proposta de valor na frente de pessoas reais do Rio, (b) seja
encontrável no Google por quem já está procurando "o que fazer / com quem ir", e (c) **meça** se a ideia
atrai — não só visitas, mas **intenção** (deixar o contato) e **qual frente** atrai mais (grupo de
amigos vs. companhia para ir junto vs. criar o próprio rolê). Visita sozinha não valida nada; conversão
em waitlist, sim.

## Solution

Um site estático e rápido (Next.js com geração estática), hospedado com domínio próprio, composto por:

1. **Home** com a proposta de valor, as duas frentes, como funciona, o lado da pesquisa acadêmica e um
   **formulário de waitlist** (e-mail + "o que você mais quer?" + bairro opcional).
2. **Páginas de cauda longa** (3–5 no lançamento), cada uma respondendo uma busca real de quem tem a
   dor do Partyu e terminando no mesmo CTA de waitlist.
3. **Páginas institucionais**: Sobre/Pesquisa, Privacidade (LGPD), FAQ.

SEO técnico completo (metadados, dados estruturados, sitemap, Core Web Vitals) e um **funil medido de
ponta a ponta**: Search Console (como chegam pelo Google) → analytics de tráfego (quantos, de onde) →
evento de conversão próprio gravado no Supabase (quem entrou na waitlist, por qual página/origem, com
qual interesse). A waitlist vira, depois, a base de convite para o piloto do app.

## User Stories

1. Como visitante, quero entender **em uma frase** o que o Partyu faz, para decidir se me interessa.
2. Como articuladora social (Marina), quero ver que o Partyu **tira de mim o trabalho de organizar o
   rolê** do meu grupo, para me reconhecer na proposta.
3. Como recém-chegado (Rafael), quero ver que dá para **ir a eventos reais com gente compatível**, com
   segurança, para me reconhecer na proposta.
4. Como visitante interessado, quero **entrar na lista de espera** só com meu e-mail, para ser avisado
   quando o app abrir.
5. Como visitante, quero dizer **o que mais quero** (organizar com meus amigos / achar companhia /
   criar meu próprio rolê), para o produto saber o que priorizar.
6. Como visitante, quero informar **meu bairro** opcionalmente, sem ser obrigado.
7. Como visitante, quero saber **o que acontece com meu e-mail** (política de privacidade, uso
   acadêmico), para confiar antes de deixar o contato.
8. Como visitante que já se inscreveu, quero uma **confirmação clara** na tela, e inscrever o mesmo
   e-mail de novo não deve gerar erro feio nem duplicata.
9. Como pessoa buscando no Google "o que fazer no Rio sozinho" (ou similar), quero cair numa página que
   **responda de verdade** a minha dúvida, para confiar no site.
10. Como pessoa buscando "Partyu", quero que o site oficial seja o **primeiro resultado**, com título e
    descrição corretos.
11. Como visitante no celular, quero que a página **carregue rápido** e funcione bem numa tela pequena.
12. Como visitante que compartilha o link no WhatsApp/Instagram, quero que apareça uma **prévia bonita**
    (imagem, título, descrição).
13. Como dono do produto, quero ver **quantas pessoas visitaram**, de **onde vieram** (Google, Instagram,
    WhatsApp, direto) e **por qual página entraram**.
14. Como dono do produto, quero ver **quantas se inscreveram**, a **taxa de conversão** por página e por
    origem, e a distribuição de "o que mais quer".
15. Como dono do produto, quero ver no Search Console **para quais buscas** o site aparece, a posição
    média e os cliques, para acompanhar o objetivo de SEO.
16. Como dono do produto, quero usar **links com UTM** em divulgações (Instagram, grupos, universidade),
    para atribuir inscrições a cada canal.
17. Como dono do produto, quero **exportar a waitlist** para convidar as pessoas para o piloto do app.
18. Como produto, quero que o formulário resista a **spam de robô** sem atrapalhar humanos.

## Implementation Decisions

### Stack e hospedagem
- **Next.js (App Router) com geração estática** de todas as páginas (sem SSR por request): HTML pronto
  para o Google e carregamento rápido. Coerente com o PRD §8 e com o React do app.
- **Hospedagem:** Vercel (padrão para Next.js, HTTPS e CDN automáticos, plano gratuito suficiente).
  Alternativa equivalente: Cloudflare Pages. Não é decisão de produto; trocar não afeta a spec.
- **Local no repositório:** `apps/landing/`, já preparando o monorepo que a Spec 00 (fundação) vai
  formalizar para `apps/mobile` e `services/recommender`.
- **Domínio próprio** (ver Pendências). URL canônica única (com ou sem `www`, a outra redireciona 301).

### Conteúdo
- **Idioma:** pt-BR, foco no Rio de Janeiro (público 18–35, PRD §3).
- **Home:** hero com a proposta de valor (PRD §1.3) → as duas frentes (com Marina e Rafael como cenários,
  sem usar os nomes como se fossem pessoas reais dando depoimento) → como funciona (eventos reais →
  comunidade do evento → ir junto) → segurança (verificação, denúncia) → bloco da pesquisa acadêmica →
  waitlist → FAQ.
- **Vocabulário:** respeitar `CONTEXT.md` (evento, comunidade, grupo, anfitrião, afinidade). Não usar
  "match", "score", "mesa". Afinidade sempre qualitativa.
- **Honestidade:** não prometer funções fora do MVP (roda, gamificação), não exibir números de usuários
  ou depoimentos inventados. O app ainda não existe: o CTA é "entrar na lista de espera", não "baixar".
- **Páginas de cauda longa (lançamento, 3–5):** cada uma mira uma intenção de busca da dor do Partyu.
  Ponto de partida (validar volume na pesquisa de palavras-chave antes de escrever):
  - "o que fazer no Rio sozinho" / "programas para ir sozinho no Rio"
  - "como fazer amigos no Rio de Janeiro" / "recém-chegado no Rio"
  - "como organizar um rolê com os amigos" / "enquete de rolê no grupo"
  - "eventos gratuitos no Rio no fim de semana" (só se houver como manter atualizado; senão fica para
    quando a ingestão da spec 03 existir)
  Cada página: conteúdo original e útil (≥ ~600 palavras), um H1 com a intenção, links internos para a
  Home e as outras páginas, e o CTA de waitlist. Sem texto gerado em massa nem página vazia "para SEO".

### SEO técnico
- `<title>` e meta description únicos por página; `lang="pt-BR"`; `link rel="canonical"`.
- Open Graph + Twitter Card com imagem 1200×630 por página (prévia no WhatsApp/Instagram).
- Dados estruturados JSON-LD: `Organization` + `WebSite` na Home; `FAQPage` onde houver FAQ;
  `Article` nas páginas de cauda longa.
- `sitemap.xml` e `robots.txt` gerados no build; sitemap enviado ao Search Console.
- Hierarquia semântica (um H1 por página), `alt` em imagens, links internos descritivos.
- **Core Web Vitals** dentro do "bom" no celular: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Imagens
  otimizadas (formato moderno, dimensões explícitas), fontes com `display: swap`, JS mínimo.
- **Marca:** Search Console verificado no domínio; perfis do Partyu (Instagram etc.) apontando para o
  site e vice-versa (`sameAs` no JSON-LD). Buscar backlinks legítimos: página da universidade/
  laboratório da pesquisa, o artigo, perfis pessoais do autor.

### Waitlist (dados e privacidade)
- **Armazenamento:** tabela no **Supabase** (já é a stack do produto) — `waitlist`: e-mail (único,
  normalizado em minúsculas), interesse (`organizar_grupo | achar_companhia | criar_evento`), bairro
  (opcional, texto), página de entrada, UTM (`source/medium/campaign`), referrer, timestamp, versão do
  texto de consentimento aceito.
- **Escrita:** por uma rota de servidor (route handler/Edge Function) com chave de serviço; a tabela
  **não** é gravável direto do navegador (RLS fechado). E-mail repetido = sucesso silencioso (idempotente,
  sem revelar se já existia).
- **Consentimento LGPD:** checkbox/linha explícita "aceito receber o convite e a Política de
  Privacidade" com link; e-mail usado **só** para convite ao piloto e novidades do Partyu; descadastro a
  qualquer momento. A waitlist **não** é dado da pesquisa acadêmica (a coorte só existe no app, sob TCLE
  — spec 11).
- **Anti-spam:** campo honeypot + limite de taxa por IP na rota. Captcha (ex. Turnstile) só se houver
  spam real — não no lançamento.
- **Nada sensível:** sem nome completo, telefone, idade exata ou qualquer atributo sensível.

### Métricas
- **Google Search Console** (obrigatório): impressões, cliques, posição média por consulta e página.
- **Analytics de tráfego, sem cookies:** Vercel Web Analytics ou Plausible/Umami (visitas, origem,
  página de entrada, dispositivo). Sem cookie de rastreio, não exige banner de consentimento. GA4 só se
  o dono quiser, e nesse caso com banner LGPD + Consent Mode (ver Pendências).
- **Conversão própria (fonte da verdade):** a inscrição gravada no Supabase com página + UTM + interesse
  permite calcular a conversão por página/canal sem depender do analytics de terceiros. O analytics
  registra também um evento `waitlist_signup` para cruzar com as visitas.
- **Painel mínimo:** uma consulta/visão salva no Supabase com inscrições por dia, por interesse, por
  página e por `utm_source`, mais o painel do analytics e o do Search Console. Sem dashboard próprio.

### Critérios de validação (hipóteses, calibráveis pelo dono)
Definidos **antes** do lançamento, para o resultado não ser interpretado depois por conveniência.
Referência de partida (ajustar na Pendência 3):
- **H1 — interesse:** ≥ 10% de conversão visita→waitlist no tráfego vindo de divulgação direcionada.
- **H2 — volume:** ≥ 150 inscritos do Rio em 8 semanas.
- **H3 — frente:** a distribuição de "o que mais quer" indica qual frente priorizar no MVP (nenhuma
  meta: é aprendizado).
- **H4 — SEO:** em 8 semanas, 1º lugar para "Partyu" e páginas de cauda longa indexadas com impressões
  crescentes. O 1º lugar em termos genéricos ("eventos no Rio") **não** é meta desta fase: concorre com
  Sympla, Time Out e Veja Rio e exige meses e conteúdo dinâmico (eventos ingeridos, spec 03).

## Testing Decisions

- Testar **comportamento observável**: a página publicada, o efeito da inscrição no banco e os sinais de
  SEO. Nada de teste de pixel.
- Automatizados (no build/CI): (a) cada página tem title, description, canonical, OG e um H1 únicos;
  (b) o JSON-LD é válido; (c) `sitemap.xml` lista todas as páginas públicas; (d) a rota de waitlist grava
  com e-mail válido, rejeita e-mail inválido, trata e-mail repetido como sucesso sem duplicar, descarta
  envio com honeypot preenchido e não aceita escrita direta sem passar pela rota.
- **Roteiro manual (teste do dono antes de divulgar):**
  1. Abrir o site no celular (4G) e no desktop: tudo legível, sem rolagem horizontal, formulário usável.
  2. Rodar Lighthouse/PageSpeed Insights no celular: Performance, SEO, Acessibilidade e Boas práticas
     ≥ 90; Core Web Vitals no "bom".
  3. Inscrever-se com um e-mail real via um link com `?utm_source=teste`: a confirmação aparece, a linha
     aparece no Supabase com página, UTM e interesse corretos, e o evento aparece no analytics.
  4. Inscrever o mesmo e-mail de novo: sucesso, sem segunda linha.
  5. Colar o link no WhatsApp: prévia com imagem, título e descrição.
  6. Passar a URL no Rich Results Test do Google: dados estruturados sem erros.
  7. No Search Console: domínio verificado, sitemap enviado, inspeção de URL da Home = "indexável";
     pedir indexação das páginas.
  8. Uma semana depois: buscar "Partyu" no Google (aba anônima) e conferir a posição.
- Prior art: primeira spec com interface pública; estabelece o padrão de "roteiro manual" que os marcos
  do app reaproveitam (`docs/roadmap-marcos.md`).

## Out of Scope

- O app em si (specs 01–14) e qualquer login na landing.
- Agenda de eventos dinâmica / páginas programáticas por evento — depende da ingestão (spec 03); é a
  evolução natural do SEO depois do M1.
- Blog com publicação recorrente e CMS (as páginas de cauda longa são estáticas no código).
- Teste A/B de títulos com ferramenta dedicada (pode ser feito depois trocando o hero e comparando
  períodos; não no lançamento).
- E-mail marketing automatizado (sequência de boas-vindas). No máximo, um e-mail manual de convite ao
  piloto exportando a lista.
- Anúncios pagos.

## Pendências do dono (decidir antes ou durante a implementação)

1. **Domínio:** escolher e registrar (ex. `partyu.com.br` e/ou `partyu.app`; checar disponibilidade e
   conflito de marca no INPI).
2. **Analytics:** padrão = sem cookies (Vercel Analytics ou Plausible). Confirmar, ou optar por GA4 com
   banner de consentimento.
3. **Metas de validação:** confirmar ou ajustar H1–H4 (números e prazo).
4. **Identidade visual:** reaproveitar a do protótipo (Poppins, rosa `#FF4D80`, fundo `#F5F1EF`,
   `docs/design/rodada-1-roda-e-proximos.md`) — padrão desta spec, salvo decisão contrária.
5. **Pesquisa de palavras-chave:** validar as intenções de cauda longa com dados (Google Trends, Search
   Console após o lançamento, sugestões do Google) antes de escrever as páginas.
6. **Canais de divulgação:** onde o link vai circular (Instagram próprio, grupos de recém-chegados no
   Rio, universidade), cada um com seu UTM.

## Further Notes

- A landing também serve à pesquisa: divulga o projeto acadêmico e forma a base de convite para a coorte,
  mas a waitlist **não** é a coorte. O consentimento formal da pesquisa continua sendo o TCLE dentro do
  app (spec 11).
- Ligação com o roadmap: este é o **Marco M0** em `docs/roadmap-marcos.md`. O resultado de H3 (qual
  frente atrai mais) deve ser levado em conta na ordem dos marcos M3/M4 do app.
