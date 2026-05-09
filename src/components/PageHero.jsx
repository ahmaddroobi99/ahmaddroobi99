import SEO from "./SEO.jsx";

function PageHero({ kicker, title, intro, seoTitle, seoDescription, path }) {
  return (
    <>
      <SEO title={seoTitle || kicker} description={seoDescription || intro} path={path} />
      <section className="page-hero" aria-labelledby="page-title">
        {kicker && <span className="eyebrow">{kicker}</span>}
        <h1 id="page-title">{title}</h1>
        {intro && <p>{intro}</p>}
      </section>
    </>
  );
}

export default PageHero;
