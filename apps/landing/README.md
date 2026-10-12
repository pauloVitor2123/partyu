# Partyu — Landing page

Landing de validação do Partyu (Fase 0). Spec: [`docs/specs/15-landing-page.md`](../../docs/specs/15-landing-page.md).

## Rodar localmente

```bash
cp .env.example .env.local   # preencha o Supabase para testar a lista de espera
npm install
npm run dev                  # http://localhost:3000
npm test                     # testes da validação da waitlist
npm run build                # build de produção
```

Sem `SUPABASE_URL`/`SUPABASE_SECRET_KEY`, o site funciona e o formulário responde
"lista de espera ainda não configurada".

## Variáveis de ambiente

Ver [`.env.example`](.env.example). Em resumo:

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (ex. `https://partyu.com.br`). Vazio na Vercel = domínio de produção do projeto. |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` só com o domínio definitivo. Fora disso: `noindex` + `robots.txt` bloqueando. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail exibido no site e na Política de Privacidade. |
| `SUPABASE_URL` / `SUPABASE_SECRET_KEY` | Gravação da lista de espera (chave secreta, só no servidor). |

## Banco

A tabela `waitlist` e a visão `waitlist_resumo` estão em
[`supabase/migrations/20261012000000_waitlist.sql`](../../supabase/migrations/20261012000000_waitlist.sql).

## Deploy (Vercel)

Importar o repositório na Vercel com **Root Directory = `apps/landing`** (framework Next.js detectado
automaticamente), configurar as variáveis acima e ativar **Web Analytics** no painel do projeto.
