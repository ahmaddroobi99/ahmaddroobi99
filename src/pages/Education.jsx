import ExperienceCard from "../components/ExperienceCard.jsx";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { education } from "../data/experienceData.js";

function Education() {
  return (
    <>
      <PageHero
        kicker="Education"
        title="Education in computer engineering, applied mathematics, and computational modeling."
        intro="Relevant coursework and research foundations include algorithms, programming, databases, numerical methods, machine learning, and software design."
        path="/education"
      />
      <Section className="compact-section">
        <div className="timeline">
          {education.map((item) => (
            <ExperienceCard key={`${item.title}-${item.date}`} item={item} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Education;
