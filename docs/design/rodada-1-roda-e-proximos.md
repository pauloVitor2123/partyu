# Partyu — Design via Claude Design (handoff entre rodadas)

> **O que é este doc.** Estado da prototipagem de UI feita com o **Claude Design** (que gera um
> HTML de alta fidelidade). Serve de handoff: uma sessão nova de Claude Code pode ler isto e
> retomar sem o histórico anterior. Decisões de produto/mecânica da roda estão em
> `wayfinder/tickets/10-companhia-roda-matchmaker.md`; glossário em `CONTEXT.md`.

## Protótipo base (o que já existe)

Artefato: HTML gerado pelo Claude Design — arquivo do usuário `Downloads/Partyu - Fluxo Completo.html`
(é um "bundled page": o conteúdo real está no `<script type="__bundler/template">`; o texto foi
extraído e mapeado abaixo).

**Estilo:** molduras de iPhone **340×736**, telas estáticas de alta fidelidade lado a lado com rótulo
acima; fonte **Poppins**; rosa da marca **#FF4D80** (hover **#E63E70**); fundo **#F5F1EF**. Seções
numeradas.

**Fluxo existente (seções 01–05):**
- **01 Autenticação** — Login (e-mail/senha + Google/Apple) · Boas-vindas social · Cadastro.
- **02 Onboarding** — 1 Interesses · 2 Gêneros musicais · 3 Localização · 4 Termos & consentimento
  (com "uso em pesquisa acadêmica").
- **03 Home** — Modo mapa · Modo lista (cards por categoria).
- **04 Perfil** — Meu perfil (stats "32 Eventos · 6 Grupos · 148 Conexões") · Editar perfil (Fotos
  mín. 4) · Configurações · Política de Privacidade.
- **05 Chats** — Lista (Eventos/Diretas) · Comunidade do evento (aberta, "24 pessoas · 6 com alta
  afinidade") · Grupo privado (evento fixado 📌) · Direto 1:1 · Portão de verificação SMS.

## Elemento novo reutilizável: anel de afinidade

Anel rosa em volta do avatar da pessoa, **3 níveis** (baixa ~1/3 · média ~2/3 · alta cheio).
**Qualitativo — nunca número, %, ou ranking.** Micro-rótulo "afinidade" na 1ª aparição. Usar em todo
avatar de pessoa.

## Rodada 1 — Roda (CONCLUÍDA: prompt gerado, aguardando aplicar no Claude Design)

Decisões de design travadas:
- **Entrada da cutucada:** card na **comunidade do evento** + **notificação**.
- **Criar a roda:** modelo **"só remover"** (matchmaker sugere, usuário só poda; não adiciona à mão).
  Cartão de pessoa: foto **com anel**, nome + inicial, 1–2 interesses em comum, selo verificado —
  **sem bairro**.
- **Quórum:** estado "Convites enviados — aguardando (2 de 4)"; abre com mínimo 3.
- **Roda ativa:** cabeçalho "Roda · Sunset Rooftop" / "vocês 4 combinam · pro sábado"; avatares com
  anel; evento fixado; admin estilo WhatsApp (tocar membro → Tornar admin / Remover; menu ⋯ →
  Adicionar pessoa (sugestões) / Sair / Excluir roda). Pequena e privada (sem "entrar", sem contagem).
- **Ponte pós-evento:** card "O Sunset Rooftop já rolou. Quer continuar com essa galera?" botão
  **"Continuar"** → "Você topou · aguardando (2 de 4)" → vira **grupo** "Sunset Rooftop" (editável);
  se <2, "Essa roda foi encerrada".
- **Vocabulário:** "companhia" só no convite; objeto = "roda"; se permanece, vira "grupo"; afinidade
  sempre qualitativa.

O **prompt do Claude Design** da Rodada 1 está em `docs/design/prompt-rodada-1-roda.md`.

## Rodada 2 — Camada social (CONCLUÍDA: prompt gerado, aguardando aplicar no Claude Design)

**Escopo:** **seguir/seguidor** (contagem no perfil) + **depoimentos no perfil** (prova social +
métrica de sucesso da roda). Gamificação continua **fora** (bloqueada por "definir recompensa").

Decisões de design travadas (grilhadas com o usuário):
- **Follow unidirecional** (tipo Instagram): sigo sem aprovação. Perfil mostra três contagens —
  **seguidores** · **seguindo** · **conexões**.
- **Conexão = follow mútuo**, automático (sem pedido/aceite). Os estados coexistem (alguém pode ser
  seguidora **e** conexão). Reconcilia o antigo "148 **Conexões**" = follows mútuos.
- **Depoimento — quem:** **só conexões** podem depor.
- **Depoimento — exibição:** publicado **na hora**, **público a todos** (mesmo não-seguidor); **sem**
  ordenar nem fixar; sem estrelas/nota (é texto).
- **Depoimento — controle:** **autor exclui** (não edita); **dono do perfil oculta**; qualquer um
  **denuncia**.
- **Gancho roda↔métrica:** após a roda rolar, membros viram conexões e o app os **cutuca a depor** —
  sinal de que a roda gerou experiência boa.
- **Listas de seguidores/seguindo/conexões:** **modal estilo Instagram** (abre na aba tocada) com
  **busca simples client-side** (filtro local sobre a lista carregada; sem backend).

O **prompt do Claude Design** da Rodada 2 (seção "07 · Camada social", 7 telas) está em
`docs/design/prompt-rodada-2-social.md`.

## Rodada 3 — Criar evento (CONCLUÍDA: prompt gerado, aguardando aplicar no Claude Design)

**Escopo:** criação de evento pelo usuário, leve e com poucas infos (estilo NomadTable). Ativa o
**lado da oferta / hosts** que o `map.md` listava como não especificado ("Estratégia galinha-e-ovo").
Puxa pro MVP a persona 3 (host), antes passiva.

Decisões de design travadas (grilhadas com `/grill-with-docs`):
- **Conceito:** mesmo objeto `Evento`, com atributo de **origem** (`ingerido` vs `anfitrião`). Glossário
  atualizado em `CONTEXT.md` (`Evento`, novo termo `Anfitrião`).
- **Campos mínimos:** título · data/hora · local · categoria (núcleo) + foto de capa opcional +
  descrição curta. **Fora:** limite de vagas, preço.
- **Local:** pin **sempre aproximado** (bairro) no mapa; sem toggle nem "revelar após confirmar".
- **Participar:** entrada **aberta** (confirmar presença → comunidade aberta); **anfitrião = admin**
  (estilo WhatsApp da Rodada 1).
- **Entrada (nav):** **FAB "+"** na home; verificação **SMS just-in-time** no "Publicar" (portão da 05).
- **Distinção:** só um **selo discreto "Anfitrião"** no card; **sem** bloco de host no detalhe.

O **prompt do Claude Design** da Rodada 3 (seção "08 · Criar evento", 5 telas) está em
`docs/design/prompt-rodada-3-criar-evento.md`.
