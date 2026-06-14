import { Activity, ArrowUpRight, Github, LayoutDashboard, Satellite } from "lucide-react";
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
      <Section kicker="About" title="Software that helps machines sense, estimate, and act.">
        <div className="feature-strip">
          <img src={profile.heroImg} alt="Robotics and computational engineering work" width="1600" height="900" loading="lazy" decoding="async" />
          <div>
            <p>{aboutCopy.intro}</p>
            <Link to="/about">
              Read about my work <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </Section>
      <Section kicker="Skills" title="Core skills across robotics, perception, and estimation.">
        <div className="focus-grid">
          {skills.slice(0, 3).map((skill) => (
            <SkillCard key={skill.category} skill={skill} />
          ))}
        </div>
      </Section>
      <Section kicker="Live Mission Control" title="A real-time dashboard wired to public science &amp; engineering APIs.">
        <div className="live-preview-grid">
          <article>
            <Github size={24} />
            <h3>Code activity</h3>
            <p>GitHub repositories, languages, and recent commits.</p>
          </article>
          <article>
            <Satellite size={24} />
            <h3>ISS live track</h3>
            <p>Real-time orbital position of the Space Station.</p>
          </article>
          <article>
            <Activity size={24} />
            <h3>Earth &amp; space feeds</h3>
            <p>Live seismic events and spaceflight headlines.</p>
          </article>
          <Link className="live-preview-action" to="/dashboard">
            <LayoutDashboard size={22} />
            Open Mission Control <ArrowUpRight size={16} />
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
