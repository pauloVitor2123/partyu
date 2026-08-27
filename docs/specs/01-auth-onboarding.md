# Spec 01 — Autenticação & Onboarding

- **Fase:** 1 (MVP)
- **Status:** ready-for-agent
- **Depende de:** —
- **Origem:** PRD §4 (MUST), §5.1; tickets 06, 08; design seções 01–02; `CONTEXT.md`.

## Problem Statement

Um novo usuário abre o Partyu pela primeira vez e precisa entrar de forma rápida, dizer o
mínimo sobre si (interesses, localização) para que o app já recomende algo relevante, e
entender/consentir com o uso dos seus dados — inclusive o uso **acadêmico** (o produto tem
uma pesquisa instrumentada dentro dele). Se esse primeiro momento for pesado ou confuso, a
pessoa abandona antes de ver qualquer valor; se for leve demais e sem consentimento claro,
o produto fica sem base ética/legal para a pesquisa e sem sinal para recomendar.

## Solution

Um onboarding **leve** e sequencial: login social (Google no MVP), seleção de interesses
(categorias/subcategorias buscáveis), permissão de localização (com fallback por
cidade/bairro) e uma tela de Termos & Privacidade com **divulgação explícita do uso
acadêmico**, obrigatória para prosseguir. **Não** há verificação de identidade/telefone
aqui — ela é adiada (just-in-time) para quando a pessoa for interagir com estranhos (spec
10). O opt-in formal da **coorte de pesquisa** (TCLE) é separado e oferecido *depois* do
onboarding, nunca acoplado ao aceite geral (spec 11). Ao fim, o usuário cai na Home já com
um perfil mínimo capaz de alimentar a recomendação.

## User Stories

1. Como novo usuário, quero entrar com minha conta Google, para não precisar criar e
   lembrar mais uma senha.
2. Como novo usuário, quero ver uma tela de boas-vindas que explique em uma frase o que o
   app faz, para decidir se sigo.
3. Como novo usuário, quero escolher meus interesses a partir de categorias, para o app
   recomendar eventos com a minha cara.
4. Como novo usuário, quero **buscar** um interesse por texto, para achar rápido sem rolar
   listas longas.
5. Como novo usuário, quero selecionar **vários** interesses (multi-seleção), para
   representar a variedade do que curto.
6. Como novo usuário, quero ver subcategorias dentro de uma categoria (ex.: Música → MPB,
   rock), para ser específico quando quiser.
7. Como novo usuário, quero conceder acesso à minha localização, para ver eventos perto de
   mim no mapa.
8. Como novo usuário que nega localização, quero informar minha cidade/bairro manualmente,
   para ainda assim receber recomendações.
9. Como novo usuário, quero ler os Termos & Privacidade antes de aceitar, para entender o
   que acontece com meus dados.
10. Como novo usuário, quero ver **claramente destacado** que meus dados podem ser usados
    em pesquisa acadêmica, para dar um consentimento informado.
11. Como novo usuário, quero que o botão de prosseguir só habilite após eu aceitar os
    termos, para não avançar sem consentir.
12. Como novo usuário, quero terminar o onboarding e cair direto na Home, para começar a
    usar sem passos extras.
13. Como usuário que já fez onboarding, quero pular direto para a Home ao reabrir o app,
    para não repetir o fluxo.
14. Como usuário, quero poder rever/editar meus interesses depois no perfil, para ajustar
    conforme meu gosto muda (o *ajuste* vive na spec 06; aqui garante-se que o dado é
    editável e não imutável).
15. Como usuário, quero que minha sessão persista com segurança entre aberturas do app,
    para não relogar toda hora.
16. Como usuário, quero poder sair (logout), para proteger minha conta em um aparelho
    compartilhado.
17. Como produto, quero registrar o timestamp e a versão do texto de Termos aceito, para
    ter rastro de consentimento auditável.
18. Como novo usuário, quero um estado de erro claro se o login Google falhar, para tentar
    de novo sem me perder.

## Implementation Decisions

- **Provedor de identidade:** Google como único login social no MVP (Apple aparece no
  design mas fica fora do MVP salvo custo trivial). Backend de auth: Supabase Auth.
- **Modelo de dados (ver PRD §6):** cria-se `Usuário` (identidade, localização aproximada,
  status de verificação = não verificado, aceite de ToS com timestamp+versão) e `Perfil`
  1:1 (lista de interesses explícitos). O **telefone fica vazio** até a verificação
  just-in-time (spec 10).
- **Interesses:** vocabulário de categorias/subcategorias é um dado de referência
  compartilhado com a recomendação (spec 02) e com a criação de evento (spec 09) — mesma
  taxonomia. Multi-seleção, mínimo sugerido (não bloqueante) para ter sinal inicial.
- **Vetor de perfil inicial:** ao concluir, dispara a composição do vetor de perfil a
  partir dos interesses (contrato com o serviço de recomendação, spec 02). Onboarding não
  calcula embedding — apenas emite o evento/chamada ao serviço.
- **Localização:** permissão nativa; se negada, captura textual cidade/bairro → geocode
  aproximado. Guardar sempre em nível aproximado (coerente com privacidade do resto do
  app).
- **Consentimento em duas camadas:** o aceite de ToS/Privacidade (com divulgação
  acadêmica) é **obrigatório** e vive aqui. O TCLE da coorte é **opt-in separado**, fora
  deste fluxo (spec 11) — não os acople.
- **Roteamento:** um "guard" decide onboarding vs Home com base em (sessão válida) ∧
  (ToS aceito) ∧ (perfil mínimo existente).
- **Seam de teste:** contrato da API de auth/perfil (criar usuário, gravar aceite,
  gravar interesses/localização, ler estado de onboarding).

## Testing Decisions

- Testar **comportamento externo** no seam de API, não a UI pixel a pixel nem detalhes do
  SDK do Google.
- Casos-chave: (a) novo usuário completa o fluxo → existe `Usuário`+`Perfil`, ToS com
  timestamp/versão, interesses e localização persistidos; (b) prosseguir bloqueado sem
  aceite de ToS; (c) localização negada → caminho por cidade/bairro grava localização
  aproximada; (d) usuário já onboarded → guard roteia para Home; (e) TCLE **não** é gravado
  neste fluxo (garante separação); (f) falha de login Google → estado de erro, nenhum
  usuário parcial persistido.
- Prior art: primeira spec — estabelece o padrão de teste de contrato de API para as
  demais.

## Out of Scope

- Verificação por telefone/SMS (spec 10, just-in-time).
- Login Apple/e-mail-senha (design mostra, mas fora do MVP).
- Opt-in da coorte de pesquisa / TCLE (spec 11).
- Edição avançada de perfil e fotos (spec 06).
- Recuperação de conta, exclusão de conta/LGPD-erasure (pós-MVP; anotar como dívida).

## Further Notes

- O design correspondente está nas seções "01 Autenticação" e "02 Onboarding" do protótipo
  (ver `docs/design/rodada-1-roda-e-proximos.md`), incluindo a etapa "Termos &
  consentimento (com uso em pesquisa acadêmica)".
- Divulgação acadêmica no ToS é **requisito ético não-negociável** (ticket 08): tratar como
  critério de aceite, não como texto boilerplate.
