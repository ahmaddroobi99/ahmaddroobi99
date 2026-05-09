import ExperienceCard from "../components/ExperienceCard.jsx";
import Section from "../components/Section.jsx";
import { experience } from "../data/experienceData.js";

function Experience() {
  return (
    <Section
      kicker="Experience"
      title="Experience across backend engineering, AI/ML integration, computer vision, and research software."
      intro="Each entry emphasizes implementation, data handling, model evaluation, and production-relevant engineering responsibilities."
    >
      <div className="timeline">
        {experience.map((item) => (
          <ExperienceCard key={`${item.title}-${item.date}`} item={item} />
        ))}
      </div>
    </Section>
  );
}

export default Experience;
