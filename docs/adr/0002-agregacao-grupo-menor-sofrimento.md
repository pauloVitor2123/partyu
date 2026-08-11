# Agregação de grupo por "menor sofrimento", não por média

Para recomendar um evento a um grupo (pessoa↔grupo↔evento — "eu + amigos, o que agrada todos?"), o
caminho óbvio seria **mediar** os perfis/notas do grupo. Rejeitamos: a média de gostos opostos produz um
"meio-termo morno" que não agrada ninguém, e um evento que uma pessoa **detesta** pode ter média
aceitável e mesmo assim arruinar a experiência dela.

Decidimos usar **menor sofrimento** (*least-misery*): pontuar cada evento por membro e escolher aquele
cuja **menor** nota individual é a mais alta — ou seja, "ninguém detesta" em vez de "a média gosta".
Para um programa social em grupo, evitar o desgosto de alguém vale mais que maximizar a empolgação de
um. É uma estratégia de agregação reconhecida na literatura de *group recommendation*. Ver
`docs/motor-de-recomendacao.md`.
