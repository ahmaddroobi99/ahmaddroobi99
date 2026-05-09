import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import SkillCard from "../components/SkillCard.jsx";
import { aboutCopy, profile } from "../data/profileData.js";
import { skills } from "../data/skillsData.js";

function About() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Software engineer focused on AI/ML systems, data pipelines, and perception software."
        intro={aboutCopy.intro}
        path="/about"
      />
      <Section className="compact-section">
        <div className="about-panel">
          <div>
            <p>{aboutCopy.body}</p>
          </div>
          <img src={profile.profileImg} alt={profile.name} width="720" height="900" loading="lazy" decoding="async" />
        </div>
        <div className="repo-board">
          {aboutCopy.highlights.map((highlight) => (
            <article key={highlight}>
              <h3>{highlight}</h3>
            </article>
          ))}
        </div>
      </Section>
      <Section kicker="Technical Skills" title="Tools and fundamentals for building reliable software systems.">
        <div className="focus-grid skill-grid">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default About;
