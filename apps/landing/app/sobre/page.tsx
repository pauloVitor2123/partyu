import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre o Partyu e a pesquisa",
  description:
    "O Partyu é um app de eventos com foco social nascido de uma pesquisa acadêmica sobre recomendação de eventos e compatibilidade em grupos, no Rio de Janeiro.",
  alternates: { canonical: "/sobre" },
};

export default function Sobre() {
  return (
    <main className="artigo">
      <div className="container container-texto">
        <h1>Sobre o Partyu</h1>
        <p className="artigo-intro">
          Um app para trocar a tela por experiências reais, sem o trabalho de organizar e sem precisar ir sozinho.
        </p>
        <div className="artigo-corpo">
          <h2>O problema</h2>
          <p>
            Encontrar o que fazer na cidade já é difícil. Mas a parte mais difícil vem depois: convencer o grupo,
            alinhar a data, correr atrás de confirmação, ou simplesmente não ter com quem ir. Os apps de eventos
            resolvem o ingresso; nenhum resolve o &quot;com quem&quot;.
          </p>

          <h2>A ideia</h2>
          <p>O Partyu recomenda o evento e a companhia juntos, de duas formas:</p>
          <ul>
            <li>
              <strong>Para quem tem grupo:</strong> eventos recomendados para o grupo todo, priorizando o que ninguém
              detesta, com chat para combinar.
            </li>
            <li>
              <strong>Para quem não tem com quem ir:</strong> cada evento tem uma comunidade aberta, com um sinal de
              afinidade entre as pessoas, para conversar antes e chegar conhecendo alguém.
            </li>
          </ul>

          <h2>A pesquisa por trás</h2>
          <p>
            O Partyu nasceu de um trabalho acadêmico sobre sistemas de recomendação de eventos. Um estudo piloto com
            163 participantes (out–nov/2023, maioria entre 17 e 25 anos) mostrou que 72,1% têm dificuldade para
            encontrar eventos do seu interesse e 97,5% têm interesse em recomendações personalizadas. Os principais
            canais de descoberta são as redes sociais (95,7%) e a indicação de amigos (76,1%); apps dedicados aparecem
            em só 11% das respostas.
          </p>
          <p>
            A conclusão: descobrir eventos já é uma atividade social, só que feita no improviso. A próxima etapa da
            pesquisa estuda como a compatibilidade entre pessoas pode ajudar a formar grupos para viver experiências
            presenciais.
          </p>
          <p>
            Participar da pesquisa será sempre opcional. Dentro do app, quem quiser poderá aderir com um termo de
            consentimento próprio, separado do cadastro, e sair quando quiser. A lista de espera deste site{" "}
            <strong>não</strong> faz parte da pesquisa.
          </p>

          <h2>Onde estamos</h2>
          <p>
            O app está em construção e vai começar pelo Rio de Janeiro, com uma versão de testes para um grupo pequeno
            da lista de espera. <Link href="/#lista">Entre na lista</Link> para ser chamado.
          </p>

          <h2>Contato</h2>
          <p>
            Projeto criado por Paulo Vitor. Fale com a gente em <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
