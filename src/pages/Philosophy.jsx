import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";

function Philosophy() {
  return (
    <>
      <PageHero
        kicker="Philosophy"
        title="Engineering principles for reliable robots and autonomy."
        intro="A concise view of how I approach estimation, perception, controls, and the software discipline that keeps autonomous systems trustworthy."
        path="/philosophy"
      />
      <Section className="compact-section">
        <div className="repo-board">
          <article>
            <h3>Estimate before you act</h3>
            <p>A robot is only as good as its belief about the world. I treat state estimation and uncertainty as first-class, not an afterthought.</p>
          </article>
          <article>
            <h3>Perception starts with data quality</h3>
            <p>LiDAR, vision, and sensor data need calibration, cleaning, and honest preprocessing before detection, mapping, or planning can be trusted.</p>
          </article>
          <article>
            <h3>The loop must close safely</h3>
            <p>Sensing, estimation, planning, and control form one feedback loop. I design for latency, failure modes, and graceful degradation across all of it.</p>
          </article>
          <article>
            <h3>Readable systems scale</h3>
            <p>Maintainable code, clear interfaces, tests, and documentation reduce review time and make autonomy stacks safe to extend.</p>
          </article>
        </div>
      </Section>
    </>
  );
}

export default Philosophy;
