import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";
import { CONSENT_VERSION } from "@/lib/waitlist";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Partyu trata os dados da lista de espera do site, conforme a LGPD.",
  alternates: { canonical: "/privacidade" },
};

export default function Privacidade() {
  return (
    <main className="artigo">
      <div className="container container-texto">
        <h1>Política de Privacidade</h1>
        <p className="artigo-intro">
          Esta política vale para este site e para a lista de espera do Partyu. O app terá termos próprios quando for
          lançado. Versão de {CONSENT_VERSION.split("-").reverse().join("/")}.
        </p>
        <div className="artigo-corpo">
          <h2>Quem é responsável</h2>
          <p>
            O Partyu é um projeto em desenvolvimento criado por Paulo Vitor, responsável pelo tratamento dos dados
            descritos aqui. Contato: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>

          <h2>Quais dados coletamos</h2>
          <p>Quando você entra na lista de espera, guardamos:</p>
          <ul>
            <li>seu e-mail;</li>
            <li>o que você mais quer do Partyu (as opções marcadas no formulário);</li>
            <li>seu bairro, se você informar (é opcional);</li>
            <li>
              de onde veio a visita: a página em que você se inscreveu, o site de origem e parâmetros de campanha do
              link (como utm_source);
            </li>
            <li>a data da inscrição e a versão do texto de consentimento que você aceitou.</li>
          </ul>
          <p>Não pedimos nome, telefone, documento nem qualquer dado sensível.</p>

          <h2>Para que usamos</h2>
          <ul>
            <li>convidar você para a versão de testes do app e mandar novidades do Partyu;</li>
            <li>
              entender, de forma agregada, o interesse pelo projeto (quantas pessoas, de quais bairros e canais, e o
              que mais querem) para decidir o que construir primeiro.
            </li>
          </ul>
          <p>
            Não vendemos nem compartilhamos seus dados para publicidade. A lista de espera não é usada como dado da
            pesquisa acadêmica do projeto.
          </p>

          <h2>Base legal</h2>
          <p>
            O tratamento se baseia no seu consentimento (art. 7º, I, da LGPD), dado ao marcar a caixa de aceite no
            formulário. Você pode retirá-lo a qualquer momento.
          </p>

          <h2>Com quem os dados ficam</h2>
          <p>
            Usamos prestadores de serviço que processam os dados em nosso nome: a hospedagem do site (Vercel) e o
            banco de dados (Supabase). Eles podem armazenar dados fora do Brasil, com as garantias previstas na LGPD.
          </p>

          <h2>Cookies e métricas</h2>
          <p>
            Este site não usa cookies de rastreamento nem de publicidade. Medimos as visitas de forma agregada e
            anônima (páginas vistas, origem e tipo de dispositivo), sem identificar você.
          </p>

          <h2>Por quanto tempo</h2>
          <p>
            Guardamos seus dados enquanto a lista de espera estiver ativa e até a abertura do app para o público, ou
            até você pedir a exclusão, o que vier primeiro.
          </p>

          <h2>Seus direitos</h2>
          <p>
            Você pode pedir a qualquer momento acesso, correção ou exclusão dos seus dados, ou retirar o
            consentimento, escrevendo para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Respondemos em até
            15 dias. Você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).
          </p>

          <h2>Mudanças</h2>
          <p>Se esta política mudar, a nova versão e a data serão publicadas nesta página.</p>
        </div>
      </div>
    </main>
  );
}
