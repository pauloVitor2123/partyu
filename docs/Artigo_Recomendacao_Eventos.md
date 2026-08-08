**Para Além da Personalização: Recomendação de Eventos Baseada em Compatibilidade Social e Cultural entre Perfis Diversos**

*Autor: Paulo Vitor de Souza*

***Resumo.** Em meio à hiperconexão digital, observa-se um paradoxo de isolamento social e dificuldade de articulação de experiências presenciais significativas, sobretudo em grandes centros urbanos. Este artigo propõe avançar além da personalização individual de eventos, explorando como sistemas de recomendação podem identificar compatibilidades sociais e culturais entre indivíduos de perfis diversos, a partir de dados explícitos (categorias de interesse declaradas) e implícitos (interações de uso) de comportamento. Apresenta-se a arquitetura de um módulo de recomendação baseado em embeddings semânticos e similaridade de cosseno, validado por um estudo piloto com 163 participantes que evidenciou a relevância do problema (72,1% relatam dificuldade em encontrar eventos relevantes; 97,5% manifestaram interesse em recomendação personalizada). A partir desses resultados preliminares, delineia-se uma agenda de pesquisa mais ampla — a ser conduzida no município do Rio de Janeiro entre 2026 e 2027 — voltada à identificação de compatibilidade social entre perfis diversos, com potenciais contribuições sociais, de política pública e econômicas.*

***Abstract.** Amid digital hyperconnectivity, a paradox emerges: social isolation and difficulty articulating meaningful in-person experiences, particularly in large urban centers. This paper proposes moving beyond individual event personalization to explore how recommendation systems can identify social and cultural compatibility among individuals with diverse profiles, using explicit (declared interest categories) and implicit (usage interaction) behavioral data. We present the architecture of a recommendation module based on semantic embeddings and cosine similarity, validated through a pilot study with 163 participants that evidenced the relevance of the problem (72.1% report difficulty finding relevant events; 97.5% expressed interest in personalized recommendations). Building on these preliminary results, we outline a broader research agenda — to be conducted in the city of Rio de Janeiro between 2026 and 2027 — aimed at identifying social compatibility among diverse profiles, with potential social, public policy, and economic contributions.*

# **1\. Introdução**

Vive-se uma era de hiperconexão digital marcada, paradoxalmente, por isolamento social crescente e dificuldade na articulação de experiências presenciais significativas, sobretudo em grandes centros urbanos. Plataformas de descoberta de eventos costumam tratar a recomendação como um problema estritamente individual — aproximar um usuário de itens que correspondam a seu próprio histórico de interesse —, deixando em segundo plano uma questão mais ampla: como tecnologias de recomendação podem também aproximar pessoas entre si, identificando compatibilidades sociais e culturais que favoreçam interações humanas autênticas em contextos de lazer compartilhado.

Este artigo parte de um sistema de recomendação de eventos já implementado, baseado em embeddings semânticos e similaridade de cosseno, e de um estudo piloto que evidenciou a relevância do problema de descoberta de eventos relevantes junto a um público diverso. A partir dessa base técnica e empírica, propõe-se uma agenda de pesquisa mais ampla, cujo tema é o desenvolvimento de um sistema de recomendação de experiências e eventos urbanos fundamentado em perfis comportamentais diversos, utilizando técnicas de ciência de dados aplicadas ao comportamento social para promover conexões significativas entre pessoas com interesses distintos.

O problema de pesquisa que orienta este trabalho pode ser formulado da seguinte maneira: como sistemas de recomendação de eventos baseados em perfis comportamentais explícitos e implícitos podem identificar compatibilidades sociais e culturais entre indivíduos diversos para promover experiências de lazer mais relevantes em grupo?

O objetivo geral é desenvolver e avaliar um sistema de recomendação de eventos e experiências de lazer capaz de identificar compatibilidades sociais e culturais entre indivíduos com perfis diversos, utilizando dados explícitos e implícitos de comportamento, com vistas a promover interações sociais significativas em contextos urbanos. Como objetivos específicos, busca-se: (i) descrever a arquitetura técnica de um sistema de recomendação baseado em embeddings semânticos, já implementado em estágio piloto; (ii) caracterizar, por meio de pesquisa de campo, a demanda do público-alvo por recomendações personalizadas; (iii) delinear uma metodologia para identificação de compatibilidade social e cultural entre perfis diversos de usuários; e (iv) discutir as implicações sociais, políticas e econômicas dessa abordagem.

O restante deste artigo está organizado da seguinte forma: a Seção 2 discute trabalhos relacionados sobre sistemas de recomendação, embeddings e compatibilidade social; a Seção 3 apresenta a justificativa e a relevância da pesquisa sob as óticas social, política e econômica; a Seção 4 descreve a arquitetura técnica já implementada; a Seção 5 apresenta o estudo piloto conduzido; a Seção 6 delineia a delimitação e o desenho metodológico da pesquisa proposta para o biênio 2026-2027; a Seção 7 discute limitações; e a Seção 8 conclui o trabalho.

# **2\. Trabalhos Relacionados**

Sistemas de recomendação constituem uma subárea consolidada de Inteligência Artificial e Aprendizado de Máquina, cujo propósito é filtrar informações e sugerir itens de potencial interesse ao usuário (RICCI; ROKACH; SHAPIRA, 2011). Lamego (2011) caracteriza a estrutura básica desses sistemas em quatro etapas: identificação do usuário, coleta de informações, estratégia de recomendação e apresentação dos resultados — estrutura adotada como referência neste trabalho.

No campo de representação textual, Almeida e Xexéo (2019) descrevem embeddings como representações vetoriais de comprimento fixo que capturam relações semânticas entre palavras e sentenças, sendo aplicáveis a tarefas de classificação, busca por similaridade e recomendação. A similaridade de cosseno é amplamente empregada como métrica de proximidade entre tais vetores, permitindo comparar o grau de afinidade semântica entre itens distintos.

Mana e Sasiprabha (2021) discutem modelos de recomendação de produtos e serviços baseados em aprendizado de máquina, reforçando a tendência de uso de técnicas de similaridade semântica em detrimento de abordagens puramente colaborativas ou baseadas em regras fixas, sobretudo em domínios com forte componente textual, como descrições de eventos.

Distinta da recomendação centrada no indivíduo, a literatura de formação de grupos (group recommendation) e de sistemas de compatibilidade social ainda é incipiente quando aplicada a eventos urbanos de lazer, concentrando-se historicamente em domínios como aplicativos de relacionamento ou times de trabalho. Este trabalho posiciona-se nessa lacuna, propondo estender técnicas de recomendação baseadas em conteúdo — já validadas tecnicamente neste artigo — para a identificação de compatibilidade entre múltiplos perfis, e não apenas entre um perfil e um item.

# **3\. Justificativa e Relevância da Pesquisa**

A justificativa para esta agenda de pesquisa apoia-se em três dimensões complementares: social, política e econômica.

## **3.1 Dimensão Social**

A pesquisa contribui para a inclusão e integração de pessoas com diferentes origens, interesses e faixas etárias, promovendo o encontro entre indivíduos com afinidades compatíveis mesmo em grupos heterogêneos. Espera-se, com isso, fortalecer vínculos sociais, reduzir o sentimento de solidão em grandes centros urbanos e democratizar o acesso a experiências culturais e de lazer.

## **3.2 Dimensão Política**

A pesquisa pode oferecer subsídios para a formulação de políticas públicas voltadas à cultura, à juventude e à ocupação do espaço urbano. Ao gerar dados sobre preferências coletivas e barreiras de acesso a eventos, o sistema proposto pode apoiar gestores públicos na tomada de decisões mais eficazes e inclusivas, promovendo o direito à cidade e à cultura.

## **3.3 Dimensão Econômica**

O incentivo a experiências compartilhadas e a personalização de eventos com base em dados pode movimentar setores como turismo local, economia criativa e produção cultural. O modelo proposto pode ainda ser utilizado por plataformas privadas para impulsionar vendas, engajamento e retenção, contribuindo para a economia digital e para a geração de empregos em tecnologia e entretenimento.

# **4\. Arquitetura Técnica do Sistema Piloto**

Como base técnica desta agenda de pesquisa, foi desenvolvido um aplicativo móvel multiplataforma, com frontend em React Native e backend como serviço (BaaS) implementado em Supabase, utilizando banco de dados relacional PostgreSQL para persistência. Um serviço auxiliar em Python é responsável pela geração e comparação dos embeddings, comunicando-se com o restante do sistema por meio de API REST.

## **4.1 Geração de Embeddings**

Cada evento cadastrado na plataforma tem seu título, descrição e categorias (tags) concatenados e submetidos ao modelo de embeddings pré-treinado text-embedding-ada-002, da OpenAI, gerando uma representação vetorial de comprimento fixo (OPENAI, 2023). O mesmo processo é aplicado ao histórico de interações do usuário — eventos visualizados, favoritados e confirmados —, compondo um vetor de perfil de interesse individual, que constitui a base sobre a qual a futura análise de compatibilidade entre perfis será construída.

## **4.2 Cálculo de Similaridade**

A relevância de cada evento para um usuário é estimada por meio da similaridade de cosseno entre o vetor de perfil do usuário e o vetor do evento, métrica amplamente utilizada em tarefas de recuperação de informação por modelar o ângulo entre vetores de termos, independentemente de sua magnitude (OPENAI, 2023). A mesma métrica de similaridade, aplicada entre dois ou mais vetores de perfil de usuário — e não apenas entre perfil e evento —, é a base proposta para a identificação de compatibilidade social e cultural descrita na Seção 6\.

# **5\. Estudo Piloto**

Para caracterizar a demanda do público-alvo e validar a relevância do problema de descoberta de eventos, foi conduzida uma pesquisa de opinião entre outubro e novembro de 2023, com 163 respondentes, predominantemente na faixa etária de 17 a 25 anos (55,2%) e do gênero feminino (65,7%).

Os resultados indicam que 72,1% dos participantes relatam dificuldade em encontrar eventos relevantes ao seu interesse, e 97,5% manifestaram interesse em uma solução que recomendasse eventos com base em seu perfil. Quanto aos canais de descoberta de eventos atualmente utilizados, redes sociais (95,7% das menções) e recomendações de amigos (76,1%) dominam, evidenciando a baixa penetração de aplicativos dedicados (11%) nesse processo. Esse último dado é particularmente relevante para a agenda de pesquisa proposta: a forte presença de recomendações por amigos sugere que o componente social já é, informalmente, o principal mecanismo de descoberta de eventos — o que reforça a pertinência de formalizá-lo computacionalmente por meio de compatibilidade entre perfis.

A Tabela 1 sintetiza os principais indicadores levantados nesse estudo piloto.

| Indicador | % |
| :---- | :---- |
| Dificuldade em encontrar eventos relevantes | 72,1% |
| Interesse em recomendação personalizada | 97,5% |
| Descobrem eventos por redes sociais | 95,7% |

*Tabela 1\. Indicadores do estudo piloto (n=163).*

# **6\. Delimitação e Desenho Metodológico da Pesquisa Proposta**

A partir da base técnica e dos achados do estudo piloto, propõe-se uma segunda fase de pesquisa, delimitada temporal e espacialmente, voltada especificamente à identificação de compatibilidade social e cultural entre perfis diversos de usuários.

A pesquisa será realizada no município do Rio de Janeiro entre os anos de 2026 e 2027, com no mínimo 20 participantes selecionados por conveniência e diversidade intencional, abrangendo diferentes faixas etárias, origens culturais e interesses. Os participantes deverão apresentar algumas similaridades pontuais que permitam a análise de compatibilidade social entre perfis distintos.

A coleta de dados será realizada por meio de APIs públicas de eventos e experiências urbanas — como Eventbrite, Sympla e Google Places —, além das interações já registradas na plataforma piloto descrita na Seção 4\. Os perfis comportamentais e culturais dos usuários serão construídos a partir de duas fontes complementares: (i) informações explícitas, coletadas no processo de onboarding inicial, por meio da seleção de categorias e subcategorias de interesse; e (ii) dados implícitos de comportamento, como curtidas, tempo de visualização e interações com eventos sugeridos.

Metodologicamente, propõe-se estender o cálculo de similaridade de cosseno já validado entre perfil de usuário e evento (Seção 4.2) para o cálculo de similaridade entre múltiplos perfis de usuário, permitindo identificar grupos de indivíduos com compatibilidade social e cultural suficiente para a recomendação conjunta de experiências de lazer, mesmo entre pessoas que não se conheciam previamente.

# **7\. Discussão e Limitações**

Os resultados do estudo piloto corroboram a relevância do problema de descoberta de eventos personalizados e sustentam a motivação para a extensão da abordagem rumo à identificação de compatibilidade social entre perfis diversos. A arquitetura já implementada demonstrou viabilidade técnica, integrando-se de forma desacoplada ao restante do sistema por meio de um serviço dedicado de geração e comparação de embeddings, o que facilita sua extensão para o cálculo de similaridade entre perfis múltiplos.

Como limitação central, este trabalho não apresenta, até o momento, uma avaliação quantitativa formal da qualidade das recomendações individuais geradas, tampouco da eficácia da futura métrica de compatibilidade social entre perfis — etapa que constitui o núcleo metodológico da pesquisa delineada na Seção 6 e ainda não executada. A amostra mínima de 20 participantes prevista para essa fase, embora adequada a um estudo qualitativo exploratório de compatibilidade social, é reduzida para generalizações estatísticas robustas, devendo a pesquisa ser tratada como exploratória nesse estágio.

Adicionalmente, a dependência de APIs públicas de terceiros (Eventbrite, Sympla, Google Places) introduz riscos relacionados à disponibilidade, à cobertura geográfica e a eventuais mudanças nos termos de uso dessas plataformas, fatores que deverão ser monitorados ao longo da condução da pesquisa.

# **8\. Conclusão e Trabalhos Futuros**

Este artigo apresentou a arquitetura de um sistema de recomendação de eventos baseado em embeddings semânticos e similaridade de cosseno, os resultados de um estudo piloto que evidencia a relevância do problema de descoberta de eventos junto a um público diverso, e delineou uma agenda de pesquisa voltada à identificação de compatibilidade social e cultural entre perfis distintos de usuários, com potenciais contribuições nas dimensões social, política e econômica.

Como trabalhos futuros, propõe-se: (i) a execução da pesquisa delimitada na Seção 6, com coleta de dados junto a, no mínimo, 20 participantes no município do Rio de Janeiro entre 2026 e 2027; (ii) o desenvolvimento e a validação de uma métrica de compatibilidade social e cultural entre perfis, a partir da extensão do cálculo de similaridade de cosseno; (iii) a avaliação quantitativa, com métricas de precisão e revocação, tanto da recomendação individual quanto da recomendação em grupo; e (iv) a investigação de potenciais aplicações dos resultados para a formulação de políticas públicas de cultura e ocupação do espaço urbano.

# **Referências**

ALMEIDA, F.; XEXÉO, G. Word embeddings: A survey. arXiv preprint arXiv:1901.09069, 2019\.

LAMEGO, L. M. O uso de algoritmos de recomendação na seleção de disciplinas: um estudo de caso. 2011\. Trabalho de Conclusão de Curso — Universidade de Brasília, Brasília, 2011\.

MANA, S. C.; SASIPRABHA, T. A machine learning based implementation of product and service recommendation models. In: 7TH INTERNATIONAL CONFERENCE ON ELECTRICAL ENERGY SYSTEMS (ICEES). Anais \[...\]. IEEE, 2021\. p. 543-547.

OPENAI. Documentation – Embeddings. 2023\. Disponível em: https://platform.openai.com/docs/guides/embeddings. Acesso em: 4 dez. 2023\.

RICCI, F.; ROKACH, L.; SHAPIRA, B. Introduction to recommender systems handbook. In: RICCI, F. et al. (Eds.). Recommender Systems Handbook. Boston, MA: Springer, 2011\.