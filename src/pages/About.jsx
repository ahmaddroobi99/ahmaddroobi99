import { Compass, Download, FileText, Radar, SatelliteDish, Sigma } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import SkillCard from "../components/SkillCard.jsx";
import { aboutCopy, profile } from "../data/profileData.js";
import { skills } from "../data/skillsData.js";

const scienceContext = [
  {
    icon: Sigma,
    title: "Bayesian state estimation",
    body: "Kalman, extended/unscented, and particle filters recover hidden state from noisy measurements \u2014 the statistical backbone of localization and tracking."
  },
  {
    icon: SatelliteDish,
    title: "Sensor fusion",
    body: "Combining LiDAR, vision, IMU, and odometry under a probabilistic model produces estimates more accurate and robust than any single sensor."
  },
  {
    icon: Compass,
    title: "SLAM & mapping",
    body: "Simultaneous localization and mapping jointly solves 'where am I' and 'what does the world look like' as a single optimization problem."
  },
  {
    icon: Radar,
    title: "Uncertainty quantification",
    body: "Carrying covariance and confidence through the pipeline lets an autonomous system know not just its estimate, but how much to trust it."
  }
];

function About() {
  return (
    <>
      <PageHero
        kicker="About"
        title="Robotics & perception engineer turning sensor data into dependable autonomy."
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
      <Section kicker="Scientific Foundations" title="The mathematics that makes autonomy reliable.">
        <div className="focus-grid">
          {scienceContext.map(({ icon: Icon, title, body }) => (
            <article className="focus-card" key={title}>
              <span><Icon size={18} aria-hidden="true" /> Concept</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section kicker="Technical Skills" title="Tools and fundamentals for building reliable robot software.">
        <div className="focus-grid skill-grid">
          {skills.map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </Section>
      <Section className="compact-section">
        <div className="resume-callout">
          <div className="resume-callout-copy">
            <span className="eyebrow"><FileText size={14} /> Resume</span>
            <h2>Full resume, one click away.</h2>
            <p>Education, experience, robotics projects, publications, and awards in a single up-to-date PDF.</p>
          </div>
          <div className="resume-callout-actions">
            <a className="button accent" href={profile.resumePdf} target="_blank" rel="noreferrer">
              <Download size={18} />
              Download Resume (PDF)
            </a>
            <a className="button secondary" href={profile.resumePdf} target="_blank" rel="noreferrer">
              <FileText size={18} />
              View in browser
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

export default About;
