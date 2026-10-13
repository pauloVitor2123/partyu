import { BadgeCheck, Flag, Handshake, MapPin, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";
import { JsonLd } from "@/components/Chrome";
import { PhoneMockup } from "@/components/PhoneMockup";
import { WaitlistForm } from "@/components/WaitlistForm";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const FAQ = [
  {
    q: "O Partyu já está disponível?",
    a: "Ainda não. O app está em construção e a primeira versão de testes vai abrir no Rio de Janeiro para quem estiver na lista de espera. Entrando na lista, você é avisado por e-mail.",
  },
  {
    q: "Vai custar alguma coisa?",
    a: "A versão de testes será gratuita. O objetivo agora é aprender com quem usa, não cobrar.",
  },
  {
    q: "Funciona fora do Rio?",
    a: "Sim, o app vai funcionar em todo o Brasil. No começo, os eventos vêm de plataformas de eventos do Rio de Janeiro, então é lá que você vai encontrar mais opções. Outras cidades entram em seguida.",
  },
  {
    q: "É um app de namoro?",
    a: "Não. O Partyu é sobre sair de casa e viver experiências: ir a eventos com seus amigos ou com pessoas que curtem as mesmas coisas que você.",
  },
  {
    q: "De onde vêm os eventos?",
    a: "De plataformas de eventos, começando pelo Rio de Janeiro, sempre com link para a página oficial, e de pessoas que criam seus próprios rolês dentro do app.",
  },
  {
    q: "E a segurança para conhecer gente nova?",
    a: "Para conversar com quem você ainda não conhece, é preciso verificar o telefone por SMS. Dá para denunciar e bloquear qualquer pessoa, e o app lembra cuidados básicos antes do primeiro encontro, como preferir lugares públicos.",
  },
  {
    q: "Como meus dados são usados?",
    a: "Na lista de espera guardamos só o seu e-mail, o que você mais quer do app e, se quiser, seu bairro, para te convidar e entender o interesse. Detalhes na Política de Privacidade.",
  },
];

export default function Home() {
  return (
    <main>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/icon.svg`,
            description: SITE_DESCRIPTION,
            areaServed: { "@type": "Country", name: "Brasil" },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "pt-BR",
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="etiqueta">Em breve · começando pelo Rio de Janeiro</span>
            <h1>
              O rolê certo, <span className="destaque">já com a galera certa.</span>
            </h1>
            <p className="hero-sub">
              O Partyu mostra eventos reais perto de você e tira de você o trabalho de organizar: vá com seus amigos
              ou com gente que curte o mesmo que você.
            </p>
            <div className="hero-acoes">
              <Link href="#lista" className="botao">
                Quero ser avisado
              </Link>
              <Link href="#como-funciona" className="botao botao-secundario">
                Como funciona
              </Link>
            </div>
            <p className="hero-nota">App em construção · lista de espera aberta · gratuito na versão de testes</p>
          </div>

          <PhoneMockup />
        </div>
      </section>

      <section className="secao secao-clara" aria-labelledby="frentes">
        <div className="container">
          <h2 id="frentes">Tem grupo ou não tem, ninguém fica em casa</h2>
          <p className="secao-intro">
            O problema quase nunca é falta de evento. É organizar a galera, ou não ter com quem ir. O Partyu resolve
            os dois.
          </p>
          <div className="grade grade-3">
            <article className="cartao">
              <span className="cartao-icone" aria-hidden="true">
                <Users size={24} />
              </span>
              <h3>Tem grupo? A gente organiza.</h3>
              <p>
                Crie um grupo, convide a galera pelo WhatsApp e veja eventos que agradam todo mundo, priorizando o que
                ninguém detesta, e não a média morna. Fixe o evento e combinem no chat.
              </p>
            </article>
            <article className="cartao cartao-destaque">
              <span className="cartao-icone" aria-hidden="true">
                <Handshake size={24} />
              </span>
              <h3>Não tem com quem ir? Tem quem vá.</h3>
              <p>
                Cada evento tem uma comunidade aberta. Veja quantas pessoas ali têm afinidade com você, converse antes
                e chegue conhecendo alguém.
              </p>
            </article>
            <article className="cartao">
              <span className="cartao-icone" aria-hidden="true">
                <MapPin size={24} />
              </span>
              <h3>Quer puxar um rolê? Crie o seu.</h3>
              <p>
                Um jantar, uma trilha, um sarau: publique seu próprio evento em poucos segundos. No mapa aparece só o
                bairro, nunca o endereço exato.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="secao" id="como-funciona" aria-labelledby="como">
        <div className="container">
          <h2 id="como">Como funciona</h2>
          <ol className="passos">
            <li>
              <h3>Conte do que você curte</h3>
              <p>Escolha seus interesses em poucos toques: música, gastronomia, arte, esporte, festa…</p>
            </li>
            <li>
              <h3>Veja eventos reais perto de você</h3>
              <p>No mapa ou em lista, na ordem do que mais combina com você, com link para a página oficial.</p>
            </li>
            <li>
              <h3>Escolha com quem ir</h3>
              <p>Chame seu grupo de amigos ou entre na comunidade do evento e conheça quem também vai.</p>
            </li>
            <li>
              <h3>Vá junto</h3>
              <p>Combinem tudo no chat e troquem a tela por uma experiência de verdade.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="secao secao-clara" aria-labelledby="seguranca">
        <div className="container">
          <h2 id="seguranca">Segurança em primeiro lugar</h2>
          <div className="grade grade-3">
            <div className="cartao">
              <span className="cartao-icone" aria-hidden="true">
                <BadgeCheck size={24} />
              </span>
              <h3>Verificação por SMS</h3>
              <p>Só conversa com estranhos quem verificou o telefone. Perfis verificados ganham um selo.</p>
            </div>
            <div className="cartao">
              <span className="cartao-icone" aria-hidden="true">
                <Flag size={24} />
              </span>
              <h3>Denunciar e bloquear</h3>
              <p>Em qualquer conversa ou perfil. Casos graves vão direto para revisão da equipe.</p>
            </div>
            <div className="cartao">
              <span className="cartao-icone" aria-hidden="true">
                <ShieldCheck size={24} />
              </span>
              <h3>Dicas de primeiro encontro</h3>
              <p>Antes de confirmar presença, o app lembra o básico: prefira lugares públicos e avise alguém.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="secao" aria-labelledby="pesquisa">
        <div className="container container-texto">
          <h2 id="pesquisa">Nascido de uma pesquisa</h2>
          <p>
            O Partyu começou como pesquisa acadêmica sobre recomendação de eventos e compatibilidade em grupos. No
            estudo piloto, com 163 participantes:
          </p>
          <div className="numeros">
            <p>
              <span className="numero">72,1%</span> têm dificuldade para encontrar eventos do seu interesse
            </p>
            <p>
              <span className="numero">95,7%</span> descobrem eventos pelas redes sociais
            </p>
            <p>
              <span className="numero">76,1%</span> descobrem por indicação de amigos
            </p>
          </div>
          <p>
            Ou seja: descobrir o que fazer já é uma atividade social, só que feita no improviso. O Partyu organiza
            isso. <Link href="/sobre">Saiba mais sobre o projeto</Link>.
          </p>
        </div>
      </section>

      <section className="lista secao-clara" id="lista" aria-labelledby="lista-titulo">
        <div className="container lista-grid">
          <div>
            <h2 id="lista-titulo">Seja dos primeiros a usar</h2>
            <p className="secao-intro">
              A versão de testes vai abrir para um grupo pequeno. Deixe seu e-mail e conte o que você mais quer (pode
              marcar mais de uma opção): isso decide o que construímos primeiro.
            </p>
          </div>
          <WaitlistForm titulo={false} />
        </div>
      </section>

      <section className="secao faq" aria-labelledby="faq">
        <div className="container container-texto">
          <h2 id="faq">Perguntas frequentes</h2>
          {FAQ.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
