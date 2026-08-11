# Roda: matchmaker como sugestão, não formador puro

O matchmaker perfil↔perfil poderia **formar** rodas sozinho (o sistema escolhe os membros e a pessoa só
aceita) — o experimento mais limpo para a tese acadêmica, porque isolaria a variável "compatibilidade
formou o grupo". Decidimos o contrário: o sistema **cutuca** e **sugere** membros, mas **o usuário cria
a roda, é seu admin e pode adicionar/remover gente**. O matchmaker vira um **motor de sugestão** de um
grupo que o usuário possui.

Trade-off aceito conscientemente: ganha-se agência e uma UX mais natural (a pessoa "puxa a roda" para o
evento com quem tem a ver), ao custo de a pesquisa passar a medir "a compatibilidade **sugeriu bem** e o
humano ajustou", e não "a compatibilidade **formou** o grupo". Mitigação: a telemetria distingue rodas
**propostas pelo sistema** de rodas **pedidas pelo usuário**, preservando um recorte mais próximo do
experimento puro. Ver `wayfinder/tickets/10-companhia-roda-matchmaker.md` (D2, D8, D9).
