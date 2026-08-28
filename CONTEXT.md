# Partyu — Linguagem do domínio

Vocabulário canônico do Partyu (app de recomendação de eventos/experiências urbanas com foco em
aproximar pessoas). Glossário e nada mais — decisões ficam nos tickets em `wayfinder/` e nos ADRs em
`docs/adr/`.

## Language

### Objetos sociais

**Evento**:
Acontecimento urbano (show, feira, festa, jantar, rolê) que ancora tudo no produto. Tem uma **origem**:
`ingerido` (de fontes externas — SerpApi/Sympla) ou `anfitrião` (criado por um usuário no app, estilo
NomadTable). Independente da origem é o mesmo objeto: aparece na mesma home, tem o mesmo detalhe e a
mesma comunidade.

**Anfitrião**:
Usuário (verificado por SMS) que **cria** um evento de origem `anfitrião`. É automaticamente **admin**
da comunidade daquele evento (modelo WhatsApp). Eventos `ingerido` não têm anfitrião.
_Avoid_: host (use em código/UI só se necessário), organizador, criador.

**Comunidade**:
Chat **aberto** de um evento — qualquer pessoa que vá ao evento pode entrar. Uma por evento.
_Avoid_: grupo do evento, sala.

**Roda**:
Recorte **pequeno e privado** da comunidade de um evento: um subgrupo de estranhos afins, semeado pelo
matchmaker e amarrado àquele evento. **Efêmera** (dissolve após o evento) e **invisível** para quem não
foi convidado. Ciclo de vida: **comunidade → roda → grupo**.
_Avoid_: mesa, subgrupo, subcomunidade, núcleo.

**Companhia**:
O **texto do convite** que forma uma roda ("achamos uma companhia pra você nesse evento, topa?"). Não é
um objeto persistente — é o pitch do matchmaker no momento de propor a roda.

**Grupo**:
Chat **privado e permanente**. Nasce de duas formas: (a) auto-convidado, entre amigos que já se conhecem
(frente 1); ou (b) por **conversão de uma roda** que decidiu permanecer após o evento. Tem admin (modelo
WhatsApp). Quando nasce de uma roda, seu nome-padrão é o nome do evento até alguém editar.
_Avoid_: grupo privado (redundante), turma.

### Compatibilidade e recomendação

**Motor de compatibilidade**:
O núcleo de recomendação do produto: similaridade de cosseno (0→1) entre vetores, aplicada a três
operações — pessoa↔evento, pessoa↔pessoa e grupo↔evento. Detalhe em `docs/motor-de-recomendacao.md`.

**Afinidade**:
Grau de compatibilidade calculado pelo motor. No **sinal do MVP** é **similaridade pura**; no
**matchmaker da roda (pós-MVP)** vira "chão comum no que importa + variedade no resto", **recíproca**
("diverso mas compatível").
_Avoid_: match, score, similaridade (crua).

**Sinal (de compatibilidade)**:
A afinidade **exibida** (ícone de força no perfil, interesses em comum, faixa agregada na comunidade),
em oposição ao matchmaker que **forma** rodas. No MVP a compatibilidade é sinal; o matchmaker é pós-MVP.

**Alavanca de novidade**:
Controle, na mão do usuário, entre "parecido comigo" e "me surpreenda". Substitui uma faixa fixa de
similaridade travada no código.
_Avoid_: band, threshold, filtro de diversidade.

**Menor sofrimento**:
Estratégia de agregação para grupo↔evento: escolher o evento cuja **menor** nota individual no grupo é a
mais alta ("ninguém detesta"), em vez da média.
_Avoid_: least-misery, average.

### Camada social

**Seguir / seguidor**:
Relação de acompanhar outro perfil, **unidirecional** (tipo Instagram) — seguir não exige aprovação.
Contagens no perfil: "seguidores", "seguindo", "conexões". Fase 3, spec `docs/specs/13-seguir-conexao.md`.

**Conexão**:
Vínculo que nasce **automaticamente** quando duas pessoas se seguem mutuamente (sem pedido/aceite). Uma
pessoa pode ser seguidora **e** conexão ao mesmo tempo — os estados coexistem. Pré-requisito para
deixar um depoimento. Fase 3, spec `docs/specs/13-seguir-conexao.md`.

**Depoimento**:
Relato em texto (sem estrelas/nota) deixado no perfil de uma **conexão** por quem teve uma **experiência
real** com a pessoa. Publicado na hora, público a todos, sem ordenar/fixar. Autor exclui (não edita);
dono do perfil oculta; qualquer um denuncia. Prova social/confiança e candidato a métrica de sucesso da
roda. Fase 3, spec `docs/specs/14-depoimentos.md`.
_Avoid_: avaliação, review, nota, estrela.
