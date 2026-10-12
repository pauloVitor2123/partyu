-- Lista de espera da landing page (spec 15).
-- Gravada só pela rota de servidor da landing (chave secreta); RLS ligado e sem políticas, então
-- nenhuma chave pública (anon/publishable) consegue ler nem escrever.

create table if not exists public.waitlist (
  id              bigint generated always as identity primary key,
  email           text not null unique check (email = lower(email)),
  interesse       text not null check (interesse in ('organizar_grupo', 'achar_companhia', 'criar_evento')),
  bairro          text,
  pagina          text,
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  referrer        text,
  consent_version text not null,
  created_at      timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Painel mínimo: inscrições por dia, interesse, página e origem.
create or replace view public.waitlist_resumo
with (security_invoker = true) as
select
  date_trunc('day', created_at at time zone 'America/Sao_Paulo')::date as dia,
  interesse,
  coalesce(pagina, '(sem página)')       as pagina,
  coalesce(utm_source, '(direto/orgânico)') as origem,
  count(*)                               as inscritos
from public.waitlist
group by 1, 2, 3, 4
order by 1 desc, 5 desc;
