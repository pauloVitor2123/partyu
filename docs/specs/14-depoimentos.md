# Spec 14 — Depoimentos no perfil

- **Fase:** 3 (Camada social)
- **Status:** ready-for-agent
- **Depende de:** 06 (Perfil), 13 (Conexão)
- **Origem:** design `docs/design/prompt-rodada-2-social.md` (decisões travadas, telas 4–7); ticket 10
  ("Aberto" — depoimentos como métrica de sucesso da roda); `CONTEXT.md`.

## Problem Statement

O selo "verificado" é o único sinal de confiança do MVP (ticket 07) — falta uma prova social concreta,
de alguém que teve uma experiência real com a pessoa, e um candidato forte a métrica de sucesso do
matchmaker da roda ("a roda gerou experiência boa de verdade?").

## Solution

Um **depoimento** é um texto curto deixado no perfil de alguém, restrito a **conexões** (spec 13),
publicado **na hora** e **público a qualquer visitante** — sem estrelas, sem nota, sem ordenar ou
fixar (sempre mais recentes primeiro). O **autor** pode excluir o próprio depoimento (não editar); o
**dono do perfil** pode ocultá-lo (sem apagar para o autor); qualquer pessoa pode denunciar. Depois que
uma roda converte membros em conexões (spec 12/13), o app cutuca os novos pares a deixarem um
depoimento um para o outro.

## User Stories

1. Como usuário, quero **escrever um depoimento** para uma **conexão**, contando como foi minha
   experiência com essa pessoa.
2. Como usuário sem conexão com alguém, quero ver um **aviso bloqueando** o campo de texto ("vocês
   precisam ser conexão para deixar um depoimento"), em vez de conseguir escrever sem critério.
3. Como usuário, ao publicar um depoimento, quero que ele apareça **imediatamente** no perfil do alvo,
   visível a **qualquer visitante** — não só a conexões.
4. Como visitante de qualquer perfil, quero ver a lista de **depoimentos** públicos dessa pessoa, mais
   recentes primeiro, sem controle de ordenação.
5. Como autor de um depoimento, quero poder **excluí-lo** depois, mas **não editá-lo**.
6. Como dono de um perfil, quero poder **ocultar** um depoimento do meu perfil, sem apagá-lo para quem
   escreveu.
7. Como qualquer usuário, quero poder **denunciar** um depoimento problemático.
8. Como membro de uma roda que virou conexões dos outros membros, quero ser **cutucado** (notificação
   + card no chat) a deixar um depoimento para essas novas conexões, depois que o evento rolou.

## Implementation Decisions

- **`Depoimento`:** autor, perfil_alvo, texto, timestamp, status (`visível` | `oculto_pelo_dono` |
  `denunciado`). Componentes de campo: texto livre multilinha com contador de caracteres — **sem**
  campo de nota/estrelas.
- **Checagem de conexão:** compor um depoimento exige verificar, no momento do envio, que autor e alvo
  são **conexão mútua** (spec 13); sem isso, a UI bloqueia o campo com mensagem explicativa e nenhum
  registro é criado.
- **Ordenação fixa:** sempre mais recentes primeiro; não existe reordenar, fixar ou destacar um
  depoimento.
- **Sem nota numérica:** é só texto — nenhuma média, estrela ou pontuação é calculada ou exibida.
- **Controle assimétrico:** o **autor** pode **excluir** (remoção definitiva do seu próprio
  depoimento) — não há edição. O **dono do perfil** só pode **ocultar** (`status=oculto_pelo_dono`,
  reversível só pelo próprio autor recriando, não pelo dono restaurando). Qualquer visitante pode
  **denunciar**, criando uma `Denúncia` (spec 10) com `contexto=Depoimento`.
- **Gancho pós-roda:** quando uma roda converte membros em conexões (specs 12/13), dispara notificação
  + card cutucando a deixar depoimento para os novos pares — evento de telemetria (contrato com spec
  11), candidato a métrica de sucesso do matchmaker.
- **Seam de teste:** contrato de criação/exclusão/ocultação de depoimento + a checagem de conexão como
  pré-condição.

## Testing Decisions

- Testar comportamento observável: a checagem de conexão como gate de escrita, e os efeitos de
  excluir/ocultar/denunciar.
- Casos-chave: (a) sem conexão mútua, a tentativa de compor é bloqueada e nenhum `Depoimento` é
  criado; (b) com conexão, publicar cria o registro e ele aparece de imediato no perfil do alvo,
  visível a qualquer visitante (mesmo não-seguidor); (c) o autor pode excluir seu próprio depoimento
  (remoção definitiva); não existe operação de "editar"; (d) o dono do perfil pode ocultar um
  depoimento — ele some da vista pública, mas o registro permanece associado ao autor, sem opção de o
  dono restaurá-lo; (e) denunciar cria uma `Denúncia` referenciando o depoimento (contexto=Depoimento,
  spec 10); (f) a listagem de depoimentos de um perfil vem sempre em ordem de mais recente primeiro,
  sem parâmetro de reordenação; (g) após uma roda converter membros em conexões, a cutucada de
  depoimento é disparada para os novos pares.
- Prior art: contrato de API (padrão das demais specs); a checagem de conexão (spec 13) e a criação de
  denúncia (spec 10) são dependências mockáveis aqui.

## Out of Scope

- Métricas formais de sucesso da roda a partir de depoimentos — são candidato de análise, não parte
  desta entrega (a extração/análise pertence à spec 11).
- Moderação automática do conteúdo do texto — só denúncia manual + a regra geral de sanção da spec 10.
- Qualquer forma de resposta do dono do perfil a um depoimento — não prevista no design desta rodada.

## Further Notes

- Design correspondente: seção "07 · Camada social", telas 4–7 — ver
  `docs/design/prompt-rodada-2-social.md`.
- Ao implementar, atualizar `CONTEXT.md`: a seção "Camada social (a especificar)" pode ser promovida a
  vocabulário travado, já que as specs 13 e 14 resolvem o que antes estava listado como "ainda a
  especificar".
