# Prompt Claude Design — Rodada 1: seção "06 · Roda"

> Colar no Claude Design, na mesma conversa/artefato que gerou o HTML (para manter o estilo). Se
> reclamar do tamanho, partir em duas colagens: telas 1–5, depois 6–9.

```
Estenda o protótipo existente "Partyu — Fluxos do produto" adicionando uma nova
seção numerada: "06 · Roda — encontrar quem combina pra ir junto (comunidade → roda → grupo)".

Mantenha EXATAMENTE o mesmo estilo visual das seções 01–05:
- Molduras de iPhone 340×736, telas estáticas de alta fidelidade lado a lado, com um
  rótulo curto acima de cada moldura.
- Fonte Poppins; rosa da marca #FF4D80 (hover #E63E70); fundo geral #F5F1EF.
- Mesmo cabeçalho de seção (número grande "06" + título + linha de descrição).

CONCEITO (para você entender, não para exibir cru na tela):
A "roda" é um chat pequeno e PRIVADO de estranhos compatíveis, recortado da COMUNIDADE
aberta de um evento. Só existe por convite do app + aceite. Ciclo de vida:
comunidade (aberta, todo mundo) → roda (poucos, privada, temporária) → grupo (permanente).
É a mesma primitiva de chat das seções 05, num 3º modo. A roda é INVISÍVEL para quem
não foi convidado.

NOVO ELEMENTO REUTILIZÁVEL — "anel de afinidade":
Um anel colorido (rosa da marca) em volta do avatar da pessoa, com 3 níveis de
preenchimento: baixa (~1/3), média (~2/3), alta (cheio). É qualitativo — NUNCA mostre
número, porcentagem ou ranking. Na primeira aparição, acompanhe de um micro-rótulo
"afinidade". Use esse anel em todo avatar de pessoa nas telas abaixo.

TELAS DA SEÇÃO 06 (crie uma moldura para cada, nesta ordem):

1) "Cutucada na comunidade"
   A tela de Comunidade do evento (aberta) — reutilize a da seção 05 — com um CARD em
   destaque no topo do chat:
   "✨ Achamos uma companhia pra você" / subtexto "4 pessoas com alta afinidade que também
   vão ao Sunset Rooftop" / botão primário "Formar roda". Mostre 3–4 mini-avatares com
   anel de afinidade dentro do card.

2) "Notificação"
   Uma notificação (push/sino) com o mesmo convite: "✨ Achamos uma companhia pra você no
   Sunset Rooftop — 4 pessoas com alta afinidade. Toque para ver."

3) "Formar roda (sugestões)"
   Cabeçalho: "Essas pessoas também vão ao Sunset Rooftop e combinam com você."
   Lista de 4 cartões de pessoa, cada um com: foto COM anel de afinidade, primeiro nome +
   inicial (ex.: "Rafa N."), 1–2 interesses em comum ("vocês curtem MPB, cinema"), selo
   "verificado" quando houver, e um "×" para REMOVER a pessoa (o usuário só pode remover,
   não adicionar à mão). NÃO mostre bairro. Botão primário fixo embaixo: "Formar roda".

4) "Aguardando quórum"
   Estado após "Formar roda": "Convites enviados — aguardando" com contador "2 de 4
   toparam". Liste os membros com estado (topou / pendente). Texto de apoio: "A roda abre
   quando pelo menos 3 pessoas toparem."

5) "Convite recebido"
   A visão de quem foi convidado: card "Duda quer formar uma roda com você pro Sunset
   Rooftop" com mini-avatares (anéis), botões "Topar" e "Agora não". Ao topar, leva ao
   portão de verificação por SMS (reutilize a tela "Portão de verificação" da seção 05 —
   verificar telefone + aceitar diretrizes; só na 1ª vez).

6) "Roda ativa"
   O chat da roda (mesma primitiva das seções 05), modo "roda":
   - Cabeçalho: título "Roda · Sunset Rooftop", subtítulo "vocês 4 combinam · pro sábado",
     fileira de avatares dos membros COM anel de afinidade, e um menu "⋯" à direita.
   - Evento fixado no topo (card "📌 Sunset Rooftop Session · Sáb, 31 Ago · 20:00"), igual
     ao grupo privado.
   - Algumas mensagens de exemplo entre os membros. Campo "Mensagem...".
   Deixe claro que é PEQUENA e PRIVADA (sem "entrar", sem contagem tipo "24 pessoas aqui"
   — isso é da comunidade, não da roda).

7) "Admin (controles)"
   Sobre a "Roda ativa", mostre os controles de admin estilo WhatsApp:
   - Uma folha (bottom sheet) que abre ao tocar num membro: opções "Tornar admin" e
     "Remover da roda".
   - O menu "⋯" do cabeçalho aberto, com: "Adicionar pessoa (sugestões do app)", "Sair" e
     "Excluir roda". Só o admin vê promover/remover/excluir.

8) "Adicionar pessoa"
   Tela/folha acionada por "Adicionar pessoa": mostra novas pessoas SUGERIDAS PELO APP
   (mesmo cartão com anel de afinidade + interesses em comum), porque entrou mais gente
   compatível na comunidade. O admin adiciona a partir das sugestões (não busca livre).

9) "Virar grupo"
   Fluxo pós-evento, em 3 estados (pode ser 3 molduras pequenas ou uma com os estados):
   - Card no topo da roda: "✨ O Sunset Rooftop já rolou. Quer continuar com essa galera?"
     botão "Continuar".
   - Intermediário: "Você topou · aguardando os outros (2 de 4)".
   - Resultado: vira um GRUPO privado chamado "Sunset Rooftop" (nome editável), e a roda se
     arquiva com uma marca "→ virou grupo". (Se menos de 2 topam, mostre discretamente
     "Essa roda foi encerrada".)

RESTRIÇÕES:
- Afinidade é sempre qualitativa (anel + palavras como "alta afinidade"); jamais número,
  score ou ranking público.
- A roda reutiliza a primitiva de chat; não invente um visual de chat novo.
- Vocabulário fixo: "companhia" só no convite; o objeto é "roda"; se permanece, vira "grupo".
```
