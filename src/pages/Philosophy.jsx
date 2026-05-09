import Section from "../components/Section.jsx";

function Philosophy() {
  return (
    <Section
      kicker="Philosophy"
      title="Engineering principles for reliable AI and data systems."
      intro="A concise view of how I approach software quality, model workflows, perception data, and technical communication."
    >
      <div className="repo-board">
        <article>
          <h3>Implementation over buzzwords</h3>
          <p>I prioritize software that runs reliably, handles real inputs, and exposes clear behavior under edge cases.</p>
        </article>
        <article>
          <h3>Models need workflows</h3>
          <p>AI/ML work depends on preprocessing, evaluation, versioning, documentation, and integration, not only model selection.</p>
        </article>
        <article>
          <h3>Perception starts with data quality</h3>
          <p>LiDAR, spatial data, and sensor applications require reliable data handling before detection or mapping algorithms can be trusted.</p>
        </article>
        <article>
          <h3>Readable systems scale</h3>
          <p>Maintainable code, clear interfaces, and technical documentation reduce review time and make systems easier to extend.</p>
        </article>
      </div>
    </Section>
  );
}

export default Philosophy;
