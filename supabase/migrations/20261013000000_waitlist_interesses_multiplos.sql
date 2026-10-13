-- A lista de espera passa a aceitar mais de um interesse por pessoa (checkbox em vez de radio).
-- Converte a coluna `interesse` (uma opção) em `interesses` (lista), preservando as inscrições existentes.

alter table public.waitlist add column interesses text[];

update public.waitlist set interesses = array[interesse];

alter table public.waitlist
  alter column interesses set not null,
  add constraint waitlist_interesses_validos check (
    cardinality(interesses) > 0
    and interesses <@ array['organizar_grupo', 'achar_companhia', 'criar_evento']::text[]
  );

drop view public.waitlist_resumo;
alter table public.waitlist drop column interesse;

-- Resumo: uma linha por interesse marcado (quem marca 2 opções conta nas 2).
create view public.waitlist_resumo
with (security_invoker = true) as
select
  date_trunc('day', w.created_at at time zone 'America/Sao_Paulo')::date as dia,
  i.interesse,
  coalesce(w.pagina, '(sem página)')         as pagina,
  coalesce(w.utm_source, '(direto/orgânico)') as origem,
  count(*)                                    as inscritos
from public.waitlist w
cross join lateral unnest(w.interesses) as i(interesse)
group by 1, 2, 3, 4
order by 1 desc, 5 desc;

revoke all on public.waitlist_resumo from anon, authenticated;
