import PageHero from "../components/PageHero.jsx";
import PublicationCard from "../components/PublicationCard.jsx";
import Section from "../components/Section.jsx";
import { publications } from "../data/profileData.js";

function Publications() {
  return (
    <>
      <PageHero
        kicker="Publications"
        title="Research and technical work connected to ML systems, data processing, and applied computing."
        intro="These items preserve the original facts while highlighting software implementation, experiment design, and technical communication."
        path="/publications"
      />
      <Section className="compact-section">
        <div className="publication-grid">
          {publications.map((pub) => (
            <PublicationCard key={pub.title} publication={pub} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Publications;
