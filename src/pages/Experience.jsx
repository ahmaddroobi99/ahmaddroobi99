import ExperienceCard from "../components/ExperienceCard.jsx";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { experience } from "../data/experienceData.js";

function Experience() {
  return (
    <>
      <PageHero
        kicker="Experience"
        title="Experience across backend engineering, AI/ML integration, computer vision, and research software."
        intro="Each entry emphasizes implementation, data handling, model evaluation, and production-relevant engineering responsibilities."
        path="/experience"
      />
      <Section className="compact-section">
        <div className="timeline">
          {experience.map((item) => (
            <ExperienceCard key={`${item.title}-${item.date}`} item={item} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Experience;
