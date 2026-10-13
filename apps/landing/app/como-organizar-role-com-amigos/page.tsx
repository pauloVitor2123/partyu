import { Article, articleMetadata, type ArticleMeta } from "@/components/Article";

const meta: ArticleMeta = {
  path: "/como-organizar-role-com-amigos",
  title: "Como organizar um rolê com os amigos (sem enquete infinita no WhatsApp)",
  description:
    "Passo a passo para organizar um rolê com o grupo de amigos: como escolher o programa que agrada todo mundo, definir data, confirmar presença e evitar a desistência em cima da hora.",
  published: "2026-10-12",
};

export const metadata = articleMetadata(meta);

export default function Page() {
  return (
    <Article
      meta={meta}
      intro="Todo grupo tem aquela pessoa que sempre propõe o rolê, faz a enquete, cola os links e corre atrás de confirmação. Se essa pessoa é você, este guia é para deixar o trabalho mais leve, e o rolê acontecer de verdade."
    >
      <h2>Por que organizar um rolê cansa tanto</h2>
      <p>
        &quot;Vamos fazer algo no fim de semana?&quot; solto no grupo quase nunca dá em nada. Ninguém quer decidir,
        todo mundo responde &quot;por mim tanto faz&quot; e, quando você finalmente propõe algo, aparece a objeção. O
        problema não é falta de vontade: é que <strong>decidir em grupo é difícil</strong> e ninguém quer carregar a
        responsabilidade de escolher errado.
      </p>

      <h2>1. Proponha opções concretas, não perguntas abertas</h2>
      <p>
        Troque &quot;o que vocês querem fazer?&quot; por &quot;sábado tem a feira X à tarde ou o show Y à noite, qual
        vocês preferem?&quot;. Duas ou três opções reais, com data, lugar e link, aceleram a decisão.
      </p>

      <h2>2. Escolha o que ninguém detesta, não o que a maioria ama</h2>
      <p>
        Esse é o segredo menos óbvio. Se três amigos dão nota 9, 8 e 2 para um show de funk, e 7, 7 e 6 para uma feira
        gastronômica, a média favorece o show, mas um amigo vai sofrer a noite inteira. A feira deixa todo mundo
        satisfeito. Em grupo, <strong>evitar que alguém odeie vale mais do que maximizar a empolgação de um</strong>. Na
        pesquisa de recomendação para grupos, essa estratégia se chama &quot;menor sofrimento&quot;.
      </p>

      <h2>3. Defina data antes de definir o programa</h2>
      <p>
        Muitas vezes o rolê morre porque cada um só pode num dia. Feche primeiro o dia (ou o turno) e depois escolha o
        que fazer dentro dele.
      </p>

      <h2>4. Fixe o plano num lugar visível</h2>
      <p>
        Decidido, deixe o plano fixado: nome do evento, horário, lugar, link do ingresso e ponto de encontro. Quem
        chegar atrasado na conversa entende tudo sem perguntar de novo.
      </p>

      <h2>5. Peça confirmação com prazo</h2>
      <p>
        &quot;Quem vai confirma até quinta&quot; funciona melhor que confirmação aberta. Se o evento tem ingresso,
        combine que cada um compra o seu até o prazo: compromisso pago desmarca menos.
      </p>

      <h2>6. Divida as tarefas</h2>
      <p>
        Organizar não precisa ser trabalho de uma pessoa só. Uma pessoa vê o transporte, outra reserva a mesa do
        depois. Dividir também deixa todo mundo mais comprometido.
      </p>

      <h2>7. Aceite que nem todo mundo vai</h2>
      <p>
        Rolê com quatro pessoas animadas é melhor que rolê adiado esperando os dez. Marque com quem pode e mantenha o
        convite aberto para a próxima.
      </p>

      <h2>Checklist rápido</h2>
      <ol>
        <li>Duas ou três opções concretas, com link.</li>
        <li>Data fechada antes do programa.</li>
        <li>Escolha pelo que ninguém detesta.</li>
        <li>Plano fixado num lugar visível.</li>
        <li>Confirmação com prazo.</li>
        <li>Tarefas divididas.</li>
      </ol>

      <h2>Quer que alguém faça esse trabalho por você?</h2>
      <p>
        O Partyu nasceu dessa dor. No app, você cria um grupo, convida a galera pelo WhatsApp e vê eventos reais do
        Rio recomendados para o grupo todo, já priorizando o que ninguém detesta. Escolheu? Fixa o evento no topo do
        chat e todo mundo combina ali mesmo.
      </p>
    </Article>
  );
}
