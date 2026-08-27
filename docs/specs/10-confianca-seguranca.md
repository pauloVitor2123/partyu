# Spec 10 — Confiança & segurança (transversal)

- **Fase:** 1 (MVP) — transversal, usada por 07, 09 e 12
- **Status:** ready-for-agent
- **Depende de:** 01 (Usuário existe)
- **Origem:** ticket 06 (superfície mínima), ticket 07 (operação de moderação); PRD §4, §9.

## Problem Statement

Quando estranhos se encontram — na comunidade de um evento, numa roda futura, ou publicando/
participando de um evento de anfitrião — o produto precisa de um piso de segurança proporcional ao
risco, sem exigir moderação humana constante nem inviabilizar a adoção de um piloto pequeno.

## Solution

Uma camada transversal reutilizada por qualquer ponto de contato com estranhos: **verificação de
telefone por SMS just-in-time** (dispara só quando necessário, não no cadastro), **selo "verificado"**
como único sinal de reputação, **aceite de diretrizes** na primeira entrada, **denunciar/bloquear**
(por mensagem ou perfil, independentes entre si), **sanção automática** por acúmulo de N denúncias em
janela de tempo, **escalonamento manual prioritário** para categorias graves, e um **aviso de
segurança de primeiro encontro** no fluxo de confirmar presença (spec 05).

## User Stories

1. Como usuário, ao tentar entrar numa comunidade/roda ou publicar um evento pela primeira vez, quero
   **verificar meu telefone por SMS**, para o ambiente ficar mais seguro para todos.
2. Como usuário já verificado, quero **não repetir** a verificação em interações futuras, para não ter
   fricção repetida.
3. Como usuário, quero **aceitar as diretrizes da comunidade** na minha primeira entrada num ambiente
   com estranhos, para saber o que é esperado de mim.
4. Como usuário, quero ver um **selo "verificado"** no meu perfil e no de outros, para confiar mais em
   quem já passou pela verificação.
5. Como usuário, quero **denunciar** uma mensagem ou um perfil, categorizando o motivo, para reportar
   comportamento problemático.
6. Como usuário, quero **bloquear** alguém independente de denunciar, para parar de ver o conteúdo
   dessa pessoa.
7. Como produto, quero que um usuário que acumula **N denúncias** contra si em uma janela de tempo seja
   **suspenso automaticamente** até revisão, para não expor o piloto a um mau ator enquanto a fila
   humana não chega.
8. Como produto, quero que denúncias de categorias **graves** (assédio, ameaça, discurso de ódio,
   conteúdo ilegal) **pulem** a contagem automática e vão direto para uma fila de **revisão manual
   prioritária**.
9. Como usuário suspenso automaticamente, quero ver uma mensagem clara de que minha conta está em
   revisão, para entender o que aconteceu.
10. Como usuário, ao confirmar presença num evento pela primeira vez, quero ver um **aviso de
    segurança de primeiro encontro** (prefira local público, avise alguém), para ir com mais cuidado.
11. Como revisor (equipe pequena do piloto), quero conseguir **consultar** as denúncias graves
    escaladas, para decidir a sanção manualmente.

## Implementation Decisions

- **Verificação SMS just-in-time:** código enviado por SMS com expiração curta (minutos, calibrável);
  ao validar, grava `Usuário.telefone_verificado=true` + timestamp. O gate dispara na primeira vez que
  qualquer ação exige contato com estranhos (entrar em comunidade — spec 07 —, entrar numa roda — spec
  12 —, ou publicar um evento — spec 09) e **não se repete** depois de verificado uma vez.
- **Diretrizes:** texto de política de conteúdo mínima (proibições: assédio, discurso de ódio, spam/
  golpe, conteúdo ilegal); aceite registrado com timestamp+versão (mesmo padrão do aceite de ToS da
  spec 01), capturado junto ao gate de verificação, na primeira entrada em qualquer ambiente com
  estranhos.
- **Selo verificado:** deriva **exclusivamente** de `telefone_verificado`; nenhum score de confiança
  numérico existe no MVP (ticket 07).
- **`Denúncia`** (PRD §6): denunciante, denunciado, contexto (Mensagem/Comunidade/Grupo/Perfil/
  Depoimento — este último quando spec 14 existir), motivo (categoria), timestamp, status
  (aberta|escalada|resolvida). Categorias **graves** entram direto com `status=escalada`, sem contar
  para a regra automática.
- **Sanção automática:** contador de denúncias **não-graves** recebidas por um usuário dentro de uma
  janela de tempo; ao atingir **N** (N e a janela são **parâmetros calibráveis em operação**, não
  constantes travadas — referência de partida "N=3" citada no ticket 07 como exemplo, não como valor
  final), a conta muda para `suspensa` até revisão manual. Suspensão bloqueia ações de interação
  (enviar mensagem, confirmar presença, criar evento/grupo/roda) mas mantém acesso de leitura ao
  próprio perfil.
- **`Bloqueio`** (PRD §6): independe de denúncia; oculta mensagens e perfil do bloqueado **para quem
  bloqueou** (unidirecional — o bloqueado não precisa ser notificado).
- **Aviso de 1º encontro:** modal informativo (não bloqueante) exibido no fluxo de "confirmar
  presença" (spec 05), pelo menos na primeira confirmação de presença do usuário no app.
- **Revisão manual:** o MVP não exige um painel administrativo completo — basta que denúncias
  `escaladas` fiquem consultáveis (mesmo que por consulta direta) para a pequena equipe do piloto
  decidir suspensão temporária ou banimento.
- **Seam de teste:** contrato de verificação/gate + efeitos observáveis de denúncia/bloqueio/sanção.

## Testing Decisions

- Testar comportamento observável: dado um usuário não verificado, qualquer ação que exija estranhos é
  bloqueada até completar o gate; dado um histórico de denúncias, a sanção automática dispara
  corretamente.
- Casos-chave: (a) usuário não verificado tentando entrar em comunidade/roda ou publicar evento é
  roteado ao gate SMS+diretrizes antes de prosseguir; (b) usuário já verificado não vê o gate de novo;
  (c) N denúncias não-graves contra um usuário numa janela de tempo suspendem a conta automaticamente;
  (d) uma única denúncia de categoria grave marca `status=escalada` imediatamente, sem contar para o
  automático; (e) bloqueio oculta mensagens/perfil do bloqueado para o bloqueador, mas não afeta o
  bloqueado nem outros usuários; (f) selo verificado reflete exatamente `telefone_verificado`; (g)
  aviso de 1º encontro aparece na primeira confirmação de presença do usuário.
- Prior art: contrato de API (padrão das specs 01–06). N e janela de tempo são dependências
  configuráveis, não constantes — testar com valores injetados, não hardcoded.

## Out of Scope

- Verificação por documento (só SMS no MVP).
- Moderação proativa (só reativa, via denúncia).
- Painel administrativo completo de moderação (um mecanismo mínimo de consulta basta).
- Suporte ao vivo/hotline em incidente presencial (limitação registrada no ticket 09, fora do MVP por
  tamanho do piloto).

## Further Notes

- Design correspondente: "Portão de verificação SMS" (seção "05 Chats" do protótipo) — reutilizado
  literalmente pelas specs 07, 09 e 12.
- N (limiar de denúncias) e a janela de tempo são explicitamente **calibráveis em operação** (ticket
  07: "a calibrar, ex. 3") — não travar como constante de produto no código.
