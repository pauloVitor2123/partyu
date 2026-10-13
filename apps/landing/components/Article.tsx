import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/Chrome";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ARTICLES, SITE_NAME, SITE_URL } from "@/lib/site";

export type ArticleMeta = {
  path: string;
  title: string; // <title> e H1
  description: string;
  published: string; // ISO
};

export function articleMetadata(meta: ArticleMeta): Metadata {
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.path },
    openGraph: { type: "article", title: meta.title, description: meta.description, url: meta.path },
  };
}

export function Article({ meta, intro, children }: { meta: ArticleMeta; intro: string; children: React.ReactNode }) {
  const outros = ARTICLES.filter((a) => a.path !== meta.path);
  return (
    <main className="artigo">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: meta.title,
          description: meta.description,
          datePublished: meta.published,
          dateModified: meta.published,
          inLanguage: "pt-BR",
          mainEntityOfPage: `${SITE_URL}${meta.path}`,
          author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
          publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        }}
      />
      <div className="container container-texto">
        <nav className="migalha" aria-label="Você está em">
          <Link href="/">Partyu</Link> <span aria-hidden="true">›</span> <span>Guias</span>
        </nav>
        <h1>{meta.title}</h1>
        <p className="artigo-intro">{intro}</p>
        <div className="artigo-corpo">{children}</div>

        <aside className="artigo-cta" id="lista">
          <p className="artigo-cta-titulo">O Partyu está chegando</p>
          <p>
            Um app que mostra eventos reais perto de você e te ajuda a ir junto: com seus amigos ou com gente que
            curte o mesmo que você, começando pelos eventos do Rio. Entre na lista e seja chamado para a versão de testes.
          </p>
          <WaitlistForm titulo={false} />
        </aside>

        <nav className="relacionados" aria-label="Leia também">
          <p className="rodape-titulo">Leia também</p>
          <ul>
            {outros.map((a) => (
              <li key={a.path}>
                <Link href={a.path}>{a.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
