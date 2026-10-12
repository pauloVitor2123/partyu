import { Article, articleMetadata, type ArticleMeta } from "@/components/Article";

const meta: ArticleMeta = {
  path: "/como-fazer-amigos-no-rio",
  title: "Como fazer amigos no Rio de Janeiro: guia para recém-chegados",
  description:
    "Mudou para o Rio e ainda não tem turma? Veja onde e como fazer amigos no Rio de Janeiro: atividades em grupo, eventos de nicho, esportes, voluntariado e hábitos que ajudam.",
  published: "2026-10-12",
};

export const metadata = articleMetadata(meta);

export default function Page() {
  return (
    <Article
      meta={meta}
      intro="Chegar a uma cidade nova é empolgante até o primeiro fim de semana sem plano. Fazer amigos depois dos vinte e poucos dá trabalho em qualquer lugar, mas o Rio tem uma vantagem: a vida acontece na rua. Aqui vai um caminho prático."
    >
      <h2>Por que é difícil fazer amigos depois de adulto</h2>
      <p>
        Na escola e na faculdade, a amizade acontece quase sozinha: você vê as mesmas pessoas várias vezes, sem
        precisar marcar nada. Depois, a rotina vira trabalho, casa e celular. Amizades novas dependem de três coisas:{" "}
        <strong>encontros repetidos</strong>, <strong>interesses em comum</strong> e <strong>um contexto</strong> que dê
        assunto. A boa notícia é que dá para criar as três de propósito.
      </p>

      <h2>1. Repita o mesmo lugar</h2>
      <p>
        Um evento solto raramente vira amizade. Prefira atividades com encontros regulares: um grupo de corrida que
        sai toda semana, uma aula de dança, um curso, a mesma roda de samba no mesmo dia. Na terceira vez, você já é
        &quot;da turma&quot;.
      </p>

      <h2>2. Vá atrás de nichos, não de multidões</h2>
      <p>
        Uma festa enorme é ótima para dançar e péssima para conhecer alguém. Eventos de nicho, como clube do livro,
        noite de jogos de tabuleiro, show de uma banda específica ou feira de quadrinhos, reúnem gente que já tem algo
        em comum com você. A conversa começa sozinha.
      </p>

      <h2>3. Use o esporte ao ar livre</h2>
      <p>
        Vôlei, futevôlei, beach tennis, corrida na orla, remo na Lagoa, trilhas em grupo: o Rio tem esporte coletivo
        o ano inteiro, e grupos abertos costumam receber iniciantes. Depois do treino sempre tem um açaí ou uma água de
        coco, que é onde a amizade começa.
      </p>

      <h2>4. Aprenda alguma coisa</h2>
      <p>
        Oficinas e cursos curtos, como cerâmica, fotografia, idiomas e culinária, colocam você ao lado das mesmas
        pessoas por semanas, com tarefa em comum. É o mais perto que um adulto chega da sala de aula.
      </p>

      <h2>5. Faça voluntariado</h2>
      <p>
        Projetos sociais, mutirões e ONGs juntam gente com valores parecidos, e trabalhar lado a lado cria vínculo
        rápido.
      </p>

      <h2>6. Não espere ser chamado</h2>
      <p>
        Quem acabou de chegar costuma esperar convite. Inverta: depois de conhecer alguém num evento, proponha o
        próximo programa. &quot;Vai ter um show disso no sábado, bora?&quot; é o passo que transforma conhecido em
        amigo.
      </p>

      <h2>7. Cuide da segurança ao conhecer gente pela internet</h2>
      <ul>
        <li>Marque os primeiros encontros em lugares públicos e movimentados.</li>
        <li>Avise alguém de confiança onde vai estar.</li>
        <li>Prefira conhecer pessoas em grupo antes de encontros um a um.</li>
        <li>Desconfie de pressa e de pedidos de dinheiro ou dados pessoais.</li>
      </ul>

      <h2>O atalho: eventos com gente compatível</h2>
      <p>
        A parte mais difícil é a primeira vez: chegar a um lugar onde você não conhece ninguém. O Partyu foi pensado
        para isso. Você conta do que gosta, vê eventos reais do Rio perto de você e, em cada evento, entra numa
        comunidade aberta com as pessoas que também vão. O app mostra quantas delas têm afinidade com você e quais
        interesses vocês têm em comum. Dá para conversar antes e chegar com alguém para encontrar.
      </p>
    </Article>
  );
}
