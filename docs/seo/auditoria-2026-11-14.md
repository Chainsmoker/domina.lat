# SEO audit: domina.lat

> Fecha: 2026-11-14. Reporte generado por auditoría automatizada (IA), guardado tal cual.
> El plan de clusters citado al final se copió a `docs/seo/cluster-plan.json` (el original vivía en un directorio temporal).

SEO Health Score: **66/100**. The technical foundation is solid: pages are server-rendered, the sitemap is clean and the homepage is fast. The biggest risk is trust. The site is 3 months old and shows patterns Google's spam and quality systems are built to catch: star ratings with no real reviews behind them, 150 templated guides published on a fixed schedule, and nobody named behind the content.

| Category               | Weight | Score |
|------------------------|--------|-------|
| Technical SEO          | 22%    | 72    |
| Content quality        | 23%    | 48    |
| On-page SEO            | 20%    | 66    |
| Schema                 | 10%    | 66    |
| Performance (lab only) | 10%    | 90    |
| AI search readiness    | 10%    | 57    |
| Images                 | 5%     | 84    |

**What the site is:** a Spanish-language affiliate site for Latin America that recommends online courses and ebooks. It runs on Astro behind Cloudflare and has 180 URLs: 150 guides, 15 courses and 7 categories. The domain was registered on 2026-08-11. Google treats affiliate sites, and money and business advice, with extra scrutiny for trust.

---

## Critical

### 1. Star ratings aren't backed by real reviews

- **Evidence:**
  - Every course card shows 4.8 to 5 stars, with no review counts.
  - The 200-prompts page marks up an AggregateRating based on one review. That review is by "Miguel", dated the page's own publish date, and the instructor is named Miguel.
  - The site's own disclosure page says "No publicaremos testimonios falsos."
- **Why it matters:** this is the textbook trigger for a structured-data manual action, and it damages trust with readers.
- **Fix:** remove the card stars and the AggregateRating markup until you have verified buyer reviews. Keep the editorial score of 8.5 only if you publish how it's calculated.
- **How you'd know it failed:** a review-snippet manual action appears in Search Console, or rich-result impressions drop.

### 2. The guides look like scaled content

- **Evidence:**
  - I counted the dates in the sitemap: 2 to 3 guides went up almost every day starting 2026-08-12, the day after the domain was registered.
  - The guides share stock phrasing ("Guarda esta checklist", "criterios verificables") and a byline of "Equipo Domina.lat" with no named person.
  - Every guide shows the same unrelated "related guides". For example, the paint guide links to an ice-cream ebook.
  - Some topics overlap closely: several "calcular precio de…" guides, two product-photography guides, and an odd hybrid called aerografo-vs-pinceles-decoracion-unas-reposteria.
  - This is a risk pattern, not a confirmed penalty. Without Search Console I can't see the indexing data.
- **Fix:**
  - Stop the fixed daily publishing schedule.
  - Sort the 150 guides into three groups: improve the best 20 to 30 with worked numeric examples, cited sources and a named author; merge the near-duplicates and redirect them with 301s; delete or noindex the thinnest.
  - Pick related links by topic, not from a fixed list.
- **How you'd know it failed:** a large and growing share of /guias/ lands in "Crawled – currently not indexed" in Search Console, or guide impressions fall across the board after a core update.
- Do this before the cluster plan below, which should be built from existing guides rather than new ones.

## High

| # | Issue | Evidence | Fix |
|---|-------|----------|-----|
| 3 | Duplicate hosts. No redirect to the main domain. | I confirmed http://, http://www. and https://www. all return 200 with no redirect. | Turn on Cloudflare "Always Use HTTPS", and add a Redirect Rule sending www to the apex domain with a 301. |
| 4 | Trailing-slash conflict on 7 pages: /sobre, /contacto, /privacidad, /terminos, /emprender, /categorias, /aviso-afiliados. | Each one sends a temporary 307 redirect to /x/, but the canonical tag and the sitemap both point to /x. | Make Astro use one style everywhere (trailingSlash: 'never'), serve /x directly with a 200, and look for a stray rule in _redirects. |
| 5 | Nobody named behind the site. | No author pages, Person schema used for a team, and /sobre names no founder, company or country. | Add named authors with credentials and author pages, a subject reviewer for each topic, and the owner or legal entity on /sobre. |
| 6 | Course pages are vendor copy, and affiliate links aren't labelled where they appear. | No first-hand testing shown, an empty "Sobre el instructor" section, and only a footer disclosure near the "Ver oferta oficial" button. | Add screenshots, a sample, the test date and the reviewer's name. Put an "Enlace de afiliado" label next to every buy button, which your own disclosure page promises. |
| 7 | Course pages are slow on mobile. | The main hero image takes 5.3s to appear (Google's target is under 2.5s). It's a 1400px PNG from Sanity with no fetchpriority, no width and height, and no srcset. | Add fetchpriority="high", width and height, srcset at 480 and 800, AVIF or WebP, and optionally a preload. |
| 8 | PerplexityBot is probably blocked by Cloudflare. | robots.txt allows it, but it gets a 403 while a faked Googlebot gets a 200. That points to the "Block AI bots" setting. This was tested with faked user-agents only. | Set PerplexityBot to Allow in Cloudflare AI Crawl Control, then check the firewall log for real Perplexity requests. |
| 9 | /emprender is the wrong kind of page for its search. | Searches for "cursos para emprender desde casa" mostly show long roundup lists. Your page is 421 words, and the homepage's meta description targets the same phrase. | Rebuild it as a dated roundup of about 2,000 words with a comparison table and a "cómo elegimos" section, and take the phrase out of the homepage meta. |
| 10 | Course schema names the wrong provider. | provider is set to Domina, but third parties sell these courses. | Name the real creator or seller, or drop the field. |

## Medium

- **Brand identity:**
  - The Organization schema has no sameAs, @id or contact details, and there are no social profiles anywhere.
  - "Domina" is a common Spanish word, so use "Domina.lat" consistently, both on the site and off it.
- **Titles and meta descriptions:**
  - Guide titles run 69 to 105 characters, and meta descriptions are cut mid-word at 155 characters.
  - The homepage H1 renders as "Aprende habilidades.Emprende.Domina." with no spaces, and the /cursos H1 has no keyword.
- **Guides lead nowhere.** No guide body links to a course. For example, the WhatsApp guide doesn't link to /cursos/whatsapp-letal….
- **Google Analytics slows interaction:**
  - About 75 KB of unused gtag JavaScript loads on every page.
  - Main-thread blocking reaches 350ms on course pages.
  - Load gtag after the page finishes loading, or use Cloudflare Zaraz.
- **Inconsistent headers:**
  - Security headers differ by route, and there's no CSP or Permissions-Policy.
  - The homepage HTML has max-age=0.
  - The image cache headers are duplicated and contradict each other.
- **Sitemap:** 31 URLs have no lastmod, including all course and category pages. The guides' dateModified is always the same as datePublished.
- **/cursos:** no JSON-LD, and the search box and price slider have no labels.
- **IndexNow** isn't set up. It would help get new and changed pages picked up by Bing and Copilot.
- **robots.txt:** add ai-input=yes if you want to be cited in AI answers, and merge the two User-agent: * groups.

## Low

- Remove changefreq and priority from the sitemap; Google ignores them.
- The logo PNG is 86 KB but displayed 38px tall. Use an SVG or a small WebP.
- The hero WebP needs srcset. Make image alt text descriptive rather than just the course title.
- llms.txt is optional and has no effect on Google.
- The SearchAction works, but Google no longer shows the sitelinks search box, so it has no value in results.

---

## Action plan, in order

1. **Day 1 (Cloudflare and config):** #3 host redirects, #4 trailing slash, #8 PerplexityBot. These are quick fixes with no dependencies.
2. **Week 1 (trust):** #1 remove the ratings, #6 inline affiliate labels, #10 fix the schema provider, then #5 named authors and owner details. #5 has to come before the guide improvements, because those need a real author.
3. **Weeks 1–2 (performance):** #7 course hero image, then defer gtag and fix the cache headers.
4. **Weeks 2–6 (content):** #2 sort the 150 guides, then #9 rebuild /emprender, then add internal links from guides to courses.
5. **After the sort:** build out the topic clusters, starting with /emprender as the hub and pillars for pastelería and uñas.
   - Correction to the cluster agent's plan: I told it the site had only 3 guides, which was wrong.
   - Many of its proposed "new" pages already exist in some form, such as costos-negocio-reposteria-inversion-inicial, cursos-de-reposteria-para-emprender, fijar-precios-retiro-esmaltado-manicura and cursos-unas-manicura-como-elegir. Build the pillars by merging those, not by writing new articles.
   - The real gaps it found are worth new content: permits for selling food from home in each LatAm country, and nail-service prices by country.
   - The full plan is in `docs/seo/cluster-plan.json`.

### Numbers to watch

- In Search Console: the indexed share of /guias/, with a target of above 70% after the sort.
- In Search Console: Manual Actions should stay empty.
- Course-page mobile LCP under 2.5s in PageSpeed.
- Perplexity requests getting 200 in the Cloudflare firewall log.
- Referring domains showing up in Search Console and Bing Webmaster Tools.

### What this audit couldn't measure

- No real-user speed data. PageSpeed was over its quota, so performance is lab data only, and the Lighthouse agentic score didn't run.
- No Google Search Console or GA4 access, so I couldn't see indexing status, traffic or manual actions.
- No backlink data. The domain isn't in Common Crawl yet, and no Moz or Bing keys are set up.
- Search results came from a US index, not Google results for Latin America, so the page-type mix is approximate.
