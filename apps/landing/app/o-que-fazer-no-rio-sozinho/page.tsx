import { Article, articleMetadata, type ArticleMeta } from "@/components/Article";

const meta: ArticleMeta = {
  path: "/o-que-fazer-no-rio-sozinho",
  title: "O que fazer no Rio sozinho: 11 programas para curtir sem companhia",
  description:
    "Ideias de programas para fazer sozinho no Rio de Janeiro: museus, praias, trilhas, feiras, samba e cinema. Dicas para aproveitar e, se quiser, conhecer gente no caminho.",
  published: "2026-10-12",
};

export const metadata = articleMetadata(meta);

export default function Page() {
  return (
    <Article
      meta={meta}
      intro="Sair sozinho no Rio é muito mais comum do que parece. A cidade tem programas que funcionam melhor no seu ritmo e outros em que é fácil puxar conversa. Separamos ideias para os dois casos."
    >
      <h2>Programas que são ótimos sozinho</h2>
      <p>
        Alguns passeios ficam até melhores sem ninguém para combinar horário: você para onde quiser, pelo tempo que
        quiser.
      </p>
      <h3>1. Museus e centros culturais do Centro</h3>
      <p>
        O Centro concentra boa parte da vida cultural da cidade. Dá para montar um roteiro a pé entre o Museu do
        Amanhã e o MAR, na Praça Mauá, e o CCBB, perto da Candelária. Exposições, cinema, teatro e programação gratuita
        aparecem com frequência. Confira a agenda no site de cada espaço antes de ir.
      </p>
      <h3>2. Parque Lage e Jardim Botânico</h3>
      <p>
        Dois lugares para andar sem pressa, com o Cristo ao fundo. O Parque Lage tem trilhas curtas e um café no
        palacete; o Jardim Botânico é perfeito para um livro e um banco à sombra.
      </p>
      <h3>3. Pôr do sol no Arpoador</h3>
      <p>
        Um clássico que não precisa de companhia: muita gente vai sozinha, e o aplauso coletivo quando o sol se põe
        faz você se sentir parte de algo.
      </p>
      <h3>4. Pedalar ou correr no Aterro do Flamengo e na orla</h3>
      <p>
        A ciclovia liga o Centro à Zona Sul pela beira da Baía. Com bicicleta compartilhada, dá para ir e voltar sem
        planejamento.
      </p>
      <h3>5. Trilhas fáceis e movimentadas</h3>
      <p>
        A Pista Cláudio Coutinho, na Urca, é plana e cheia de gente. Para trilhas mais longas, prefira ir acompanhado
        ou em grupos organizados e avise alguém do seu trajeto.
      </p>
      <h3>6. Cinema de rua</h3>
      <p>
        Botafogo e o Centro têm salas com programação de festival e filmes independentes. Cinema sozinho é um dos
        programas mais subestimados da cidade.
      </p>

      <h2>Programas em que é fácil conhecer gente</h2>
      <p>
        Se a ideia é sair sozinho mas não ficar sozinho, escolha lugares onde a conversa acontece naturalmente.
      </p>
      <h3>7. Rodas de samba e chorinho</h3>
      <p>
        Rodas na rua, como as da região da Pedra do Sal, da Lapa e de praças como a São Salvador, em Laranjeiras,
        reúnem gente de todo canto, e cantar junto aproxima rápido.
      </p>
      <h3>8. Feiras de rua</h3>
      <p>
        A Feira Hippie de Ipanema, aos domingos, a Feira da Glória e a Feira de São Cristóvão, de tradições
        nordestinas, são boas para circular, comer e puxar papo com quem está na fila ao lado.
      </p>
      <h3>9. Aulas abertas e eventos esportivos</h3>
      <p>
        Grupos de corrida, aulas de dança, vôlei e futevôlei na praia costumam receber gente nova. Ir sozinho é o
        normal.
      </p>
      <h3>10. Oficinas e cursos de curta duração</h3>
      <p>
        Fotografia, cerâmica, culinária, idiomas: atividades com começo, meio e fim dão assunto pronto para conversar.
      </p>
      <h3>11. Shows e festas com público fiel</h3>
      <p>
        Eventos de nicho, como o show de uma banda específica ou uma festa temática, juntam gente que já tem algo em
        comum com você.
      </p>

      <h2>Dicas para aproveitar (e ir com segurança)</h2>
      <ul>
        <li>
          <strong>Escolha pelo interesse, não pela localização.</strong> É mais fácil se sentir à vontade num evento
          sobre algo que você ama.
        </li>
        <li>
          <strong>Chegue no começo.</strong> As pessoas estão mais abertas a conversar antes do evento encher.
        </li>
        <li>
          <strong>Prefira lugares públicos</strong> para encontrar alguém que você conheceu pela internet, e avise
          alguém de confiança onde vai estar.
        </li>
        <li>
          <strong>Planeje a volta.</strong> Saiba como volta para casa antes de sair, principalmente à noite.
        </li>
        <li>
          <strong>Dê uma chance ao desconforto.</strong> Os primeiros minutos sozinho são os mais estranhos; depois
          passa.
        </li>
      </ul>

      <h2>E se você não quiser ir sozinho?</h2>
      <p>
        Às vezes o que falta não é coragem, é companhia com o mesmo gosto. É para isso que o Partyu existe: cada
        evento do Rio vai ter uma comunidade aberta, onde você vê quem mais vai, quantas pessoas ali têm afinidade com
        você, e conversa antes de ir. Assim você chega conhecendo alguém.
      </p>
    </Article>
  );
}
