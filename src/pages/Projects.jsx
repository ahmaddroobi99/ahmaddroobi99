import PageHero from "../components/PageHero.jsx";
import ProjectCard from "../components/ProjectCard.jsx";
import Section from "../components/Section.jsx";
import { projects } from "../data/projectsData.js";

function Projects() {
  return (
    <>
      <PageHero
        kicker="Repository / Projects"
        title="Projects organized around implementation, data flow, and system design."
        intro="Selected work from the repository, reporting, ML notes, and capstone pages, rewritten to show engineering decisions and measurable responsibilities."
        path="/projects"
      />
      <Section className="compact-section">
        <div className="publication-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Projects;
