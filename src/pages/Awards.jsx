import { Award } from "lucide-react";
import Section from "../components/Section.jsx";
import { awards } from "../data/profileData.js";

function Awards() {
  return (
    <Section
      kicker="Awards"
      title="Recognition for engineering, AI/ML work, research potential, and academic performance."
    >
      <div className="award-grid">
        {awards.map(([title, subtitle, date]) => (
          <article className="award-card" key={`${title}-${date}`}>
            <div className="award-icon">
              <Award size={24} />
            </div>
            <div>
              <span>{date}</span>
              <h3>{title}</h3>
              <p>{subtitle}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

export default Awards;
