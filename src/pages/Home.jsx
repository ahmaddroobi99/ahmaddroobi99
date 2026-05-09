import { ArrowUpRight, CloudSun, Github, LayoutDashboard, MapPinned } from "lucide-react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Section from "../components/Section.jsx";
import SkillCard from "../components/SkillCard.jsx";
import { aboutCopy, profile } from "../data/profileData.js";
import { projects } from "../data/projectsData.js";
import { skills } from "../data/skillsData.js";

function Home() {
  return (
    <>
      <Hero />
      <Section kicker="About" title="Engineering software for data-heavy AI and perception workflows.">
        <div className="feature-strip">
          <img src={profile.heroImg} alt="Computational and engineering work" width="1600" height="900" loading="lazy" decoding="async" />
          <div>
            <p>{aboutCopy.intro}</p>
            <Link to="/about">
              Read about my work <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </Section>
      <Section kicker="Skills" title="Core skills for backend systems, ML workflows, and perception data.">
        <div className="focus-grid">
          {skills.slice(0, 3).map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </Section>
      <Section kicker="Live Hub" title="A macOS dashboard for public signals and context.">
        <div className="live-preview-grid">
          <article>
            <Github size={24} />
            <h3>Code activity</h3>
            <p>GitHub repositories, languages, and recent updates.</p>
          </article>
          <article>
            <CloudSun size={24} />
            <h3>Vancouver weather</h3>
            <p>Open-Meteo temperature and precipitation charts.</p>
          </article>
          <article>
            <MapPinned size={24} />
            <h3>Place context</h3>
            <p>Map-style widget centered on Vancouver.</p>
          </article>
          <Link className="live-preview-action" to="/dashboard">
            <LayoutDashboard size={22} />
            Open Dashboard <ArrowUpRight size={16} />
          </Link>
        </div>
      </Section>
      <Section kicker="Featured Projects" title="Selected work with implementation details and engineering context.">
        <div className="publication-grid">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Home;
