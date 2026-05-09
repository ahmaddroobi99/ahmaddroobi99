function Section({ kicker, title, intro, children, className = "" }) {
  return (
    <section className={`section ${className}`}>
      <div className="section-heading">
        {kicker && <span className="eyebrow">{kicker}</span>}
        {title && <h2>{title}</h2>}
        {intro && <p className="section-intro">{intro}</p>}
      </div>
      {children}
    </section>
  );
}

export default Section;
