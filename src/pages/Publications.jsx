import { ArrowUpRight } from "lucide-react";
import Section from "../components/Section.jsx";
import { publications } from "../data/profileData.js";

function Publications() {
  return (
    <Section
      kicker="Publications"
      title="Research and technical work connected to ML systems, data processing, and applied computing."
      intro="These items preserve the original facts while highlighting software implementation, experiment design, and technical communication."
    >
      <div className="publication-grid">
        {publications.map((pub) => (
          <article className="publication-card" key={pub.title}>
            <span>{pub.meta}</span>
            <h3>{pub.title}</h3>
            <p>{pub.summary}</p>
            <a href={pub.href} target="_blank" rel="noreferrer">
              Open resource <ArrowUpRight size={16} />
            </a>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Publications;
