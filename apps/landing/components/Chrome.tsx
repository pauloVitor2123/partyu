import Link from "next/link";
import { ARTICLES, CONTACT_EMAIL } from "@/lib/site";

export function Header() {
  return (
    <header className="topo">
      <div className="container topo-inner">
        <Link href="/" className="logo" aria-label="Partyu — início">
          partyu<span className="logo-ponto">.</span>
        </Link>
        <Link href="/#lista" className="botao botao-pequeno">
          Entrar na lista
        </Link>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="rodape">
      <div className="container rodape-inner">
        <div>
          <p className="logo">
            partyu<span className="logo-ponto">.</span>
          </p>
          <p className="rodape-texto">Eventos reais do Rio, com a galera certa. App em construção.</p>
        </div>
        <nav aria-label="Guias">
          <p className="rodape-titulo">Guias</p>
          <ul>
            {ARTICLES.map((a) => (
              <li key={a.path}>
                <Link href={a.path}>{a.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Institucional">
          <p className="rodape-titulo">Partyu</p>
          <ul>
            <li>
              <Link href="/sobre">Sobre e pesquisa</Link>
            </li>
            <li>
              <Link href="/privacidade">Privacidade</Link>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </li>
          </ul>
        </nav>
      </div>
      <p className="container rodape-copy">© 2026 Partyu · Rio de Janeiro</p>
    </footer>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON gerado no servidor a partir de objetos nossos, sem entrada de usuário.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
