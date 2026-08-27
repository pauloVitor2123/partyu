# Prompt Claude Design — Rodada 2: seção "07 · Camada social"

> Colar no Claude Design, na mesma conversa/artefato que gerou o HTML (para manter o estilo). Se
> reclamar do tamanho, partir em duas colagens: telas 1–4, depois 5–7.

## Decisões travadas (grilhadas com o usuário)

- **Follow é unidirecional** (tipo Instagram): eu sigo sem precisar de aprovação. O perfil mostra
  três leituras: **seguidores** (quem me segue), **seguindo** (quem eu sigo) e **conexões**.
- **Conexão = follow mútuo.** Quando os dois se seguem, aquele vínculo vira "conexão"
  automaticamente (sem pedido/aceite). Uma pessoa pode ser minha seguidora **e** minha conexão; os
  estados coexistem. Isso reconcilia o antigo rótulo "148 Conexões" = follows mútuos.
- **Depoimento — quem pode deixar:** **só conexões** (as duas pessoas se seguem). Sem conexão, não
  dá pra depor.
- **Depoimento — exibição:** publicado **na hora** e **público para todos** (inclusive quem não
  segue). **Não** dá pra ordenar nem fixar.
- **Depoimento — controle:** o **autor** pode **excluir** (não pode editar); o **dono do perfil**
  pode **ocultar** do próprio perfil; qualquer um pode **denunciar**.
- **Gancho com a roda (métrica):** depois que uma roda rola, seus membros viram conexões e o app
  os **cutuca a deixar um depoimento** — é o sinal de que a roda gerou experiência boa.

## Prompt

```
Estenda o protótipo existente "Partyu — Fluxos do produto" adicionando uma nova
seção numerada: "07 · Camada social — seguir, conexão e depoimentos".

Mantenha EXATAMENTE o mesmo estilo visual das seções 01–06:
- Molduras de iPhone 340×736, telas estáticas de alta fidelidade lado a lado, com um
  rótulo curto acima de cada moldura.
- Fonte Poppins; rosa da marca #FF4D80 (hover #E63E70); fundo geral #F5F1EF.
- Mesmo cabeçalho de seção (número grande "07" + título + linha de descrição).
- Reaproveite o "anel de afinidade" (da seção 06) em todo avatar de pessoa: anel rosa
  em 3 níveis (baixa ~1/3, média ~2/3, alta cheio), qualitativo — NUNCA número/%/ranking.

CONCEITO (para você entender, não exibir cru):
A camada social conecta perfis. "Seguir" é UNIDIRECIONAL (como no Instagram): eu sigo
sem precisar de aprovação. Quando as duas pessoas se seguem, aquele vínculo vira uma
"conexão" (automático, sem pedido nem aceite). Uma pessoa pode ao mesmo tempo ser minha
seguidora e minha conexão. Só CONEXÕES podem deixar "depoimentos" no perfil uma da outra
— relatos curtos de prova social, publicados na hora e públicos para todo mundo.

VOCABULÁRIO FIXO (use exatamente estes rótulos na UI):
- "Seguir" (botão para passar a seguir) / "Seguindo" (estado, com opção de deixar de seguir).
- Contagens no perfil: "seguidores", "seguindo", "conexões".
- "Conexão" = selo/rótulo para follow mútuo.
- "Depoimento" (nunca "avaliação", "review", "nota" ou "estrela"). É texto, sem estrelas
  nem pontuação.

TELAS DA SEÇÃO 07 (crie uma moldura para cada, nesta ordem):

1) "Perfil de outra pessoa (não sigo)"
   Reaproveite o layout do "Meu perfil" da seção 04, mas visto de fora:
   - Foto grande COM anel de afinidade + micro-rótulo "afinidade" (é a afinidade entre
     mim e essa pessoa), nome + inicial ("Duda M."), selo verificado.
   - Uma faixa de três contagens tocáveis: "128 seguidores · 84 seguindo · 46 conexões".
   - Stats existentes do produto ("32 Eventos · 6 Grupos") podem ficar numa linha abaixo.
   - Botão primário "Seguir" (rosa da marca, largura cheia).
   - Uma prévia da seção "Depoimentos (12)" mais abaixo (2 cartões, ver tela 4).

2) "Depois de seguir → virou conexão"
   O mesmo perfil, agora que EU sigo e a pessoa me segue de volta:
   - O botão vira o estado "Seguindo" (contorno, não preenchido).
   - Ao lado do nome, aparece um selo "✓ Conexão".
   - Um toast/realce discreto no topo: "Vocês agora são conexão — já dá pra deixar um
     depoimento." com um link/botão secundário "Escrever depoimento".
   (Mostre também, sutilmente, que se a pessoa NÃO me seguisse de volta o botão ficaria só
    "Seguindo" sem o selo "Conexão" — pode ser uma mini-nota, não precisa outra moldura.)

3) "Modal de seguidores / seguindo / conexões"
   Um MODAL (estilo Instagram) que sobe ao tocar em qualquer uma das contagens do perfil,
   sobre um leve escurecimento do fundo. Estrutura:
   - Cabeçalho do modal com o nome da pessoa e um "×" para fechar.
   - 3 abas no topo: "Seguidores", "Seguindo", "Conexões" (aba "Conexões" ativa como
     exemplo; a aba tocada na contagem é a que abre).
   - Um campo de BUSCA simples logo abaixo das abas ("Buscar", com lupa) — filtro
     client-side sobre a lista já carregada (mostre-o preenchido com "ra" filtrando para
     "Rafa N." em um dos estados, para deixar claro que é busca local e instantânea).
   - Lista rolável de pessoas, cada linha com: avatar COM anel de afinidade, nome +
     inicial, selo verificado quando houver, selo "Conexão" quando for mútuo, e um botão à
     direita no estado certo ("Seguir" para quem não sigo, "Seguindo" para quem já sigo).

4) "Depoimentos no perfil"
   A seção de depoimentos do perfil (pública, qualquer visitante vê), cabeçalho
   "Depoimentos (12)". Lista de cartões, cada um com:
   - Avatar do AUTOR com anel de afinidade + nome ("Rafa N.") + selo "Conexão".
   - Contexto opcional em cinza: "depois da roda Sunset Rooftop" ou "de um grupo".
   - O texto do depoimento (2–3 linhas, tom informal e caloroso).
   - Data discreta e um "⋯" no canto (abre os controles da tela 7).
   NÃO mostre estrelas, nota, ordenação ou botão de "fixar" — a ordem é fixa (mais
   recentes primeiro) e não editável.

5) "Escrever depoimento (só conexão)"
   Folha para compor um depoimento sobre uma conexão:
   - Cabeçalho "Depoimento para Duda M." com o avatar (anel).
   - Campo de texto multilinha "Conte como foi a experiência com a Duda..." + contador
     simples de caracteres.
   - Botão primário "Publicar".
   - Nota de apoio: "Depoimentos são públicos e ficam no perfil da Duda. Você pode excluir
     o seu depois, mas não editar."
   Mostre TAMBÉM, como segunda mini-moldura ou estado, o caso BLOQUEADO: quando não há
   conexão, no lugar do campo aparece um aviso "Vocês precisam ser conexão para deixar um
   depoimento — siga a Duda e espere ela seguir você de volta." (sem campo de texto).

6) "Cutucada pós-roda para depor"
   O gancho com a roda (seção 06). Dois formatos lado a lado:
   - Uma notificação (push/sino): "✨ A roda Sunset Rooftop rolou! Que tal deixar um
     depoimento pra galera? Toque para escrever."
   - Um card dentro de um chat/grupo: "O Sunset Rooftop foi ótimo? Deixe um depoimento
     para suas novas conexões." com mini-avatares (anel) de Rafa, Duda e +1, e botão
     "Deixar depoimento" que leva à tela 5.

7) "Controles do depoimento"
   Sobre um cartão de depoimento (da tela 4), mostre a folha (bottom sheet) do "⋯" em
   DOIS pontos de vista:
   - Como AUTOR do depoimento: opção "Excluir depoimento" (destaque de remoção). NÃO há
     "Editar".
   - Como DONO do perfil: opções "Ocultar do meu perfil" e "Denunciar". (Ocultar tira da
     vista pública sem apagar para o autor.)
   Deixe claro por rótulo qual folha é de quem.

RESTRIÇÕES:
- Seguir é unidirecional e sem aprovação; conexão é follow mútuo e automático — não invente
  tela de "pedido de conexão" nem "aceitar/recusar".
- Só conexão pode depor; depoimento é público, publicado na hora, sem estrelas/nota, sem
  ordenar nem fixar. Autor exclui (não edita); dono oculta; qualquer um denuncia.
- Afinidade continua qualitativa (anel + palavras); jamais número, score ou ranking público.
- Reutilize os componentes existentes (perfil da seção 04, anel de afinidade da 06); não
  crie um visual novo do zero.
```
