// Configuração central do site. A URL e a indexação vêm do ambiente para que o deploy de teste
// (*.vercel.app) não seja indexado pelo Google antes do domínio definitivo (partyu.com.br).

export const SITE_NAME = "Partyu";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

// Só libera o Google quando o domínio final estiver configurado.
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "contato@partyu.com.br";

export const SITE_DESCRIPTION =
  "O Partyu mostra eventos reais do Rio de Janeiro e te ajuda a ir junto: com seus amigos ou com gente que curte o mesmo que você. Entre na lista de espera.";

export type PageEntry = { path: string; title: string; priority: number };

// Fonte única para o sitemap e para os links internos.
export const PAGES: PageEntry[] = [
  { path: "/", title: "Início", priority: 1 },
  { path: "/o-que-fazer-no-rio-sozinho", title: "O que fazer no Rio sozinho", priority: 0.8 },
  { path: "/como-fazer-amigos-no-rio", title: "Como fazer amigos no Rio", priority: 0.8 },
  { path: "/como-organizar-role-com-amigos", title: "Como organizar um rolê com os amigos", priority: 0.8 },
  { path: "/sobre", title: "Sobre o Partyu e a pesquisa", priority: 0.5 },
  { path: "/privacidade", title: "Política de Privacidade", priority: 0.3 },
];

export const ARTICLES = PAGES.filter((p) =>
  ["/o-que-fazer-no-rio-sozinho", "/como-fazer-amigos-no-rio", "/como-organizar-role-com-amigos"].includes(p.path),
);
