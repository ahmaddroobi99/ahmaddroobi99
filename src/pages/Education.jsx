import ExperienceCard from "../components/ExperienceCard.jsx";
import Section from "../components/Section.jsx";
import { education } from "../data/experienceData.js";

function Education() {
  return (
    <Section
      kicker="Education"
      title="Education in computer engineering, applied mathematics, and computational modeling."
      intro="Relevant coursework and research foundations include algorithms, programming, databases, numerical methods, machine learning, and software design."
    >
      <div className="timeline">
        {education.map((item) => (
          <ExperienceCard key={`${item.title}-${item.date}`} item={item} />
        ))}
      </div>
    </Section>
  );
}

export default Education;
