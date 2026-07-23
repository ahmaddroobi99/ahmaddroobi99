import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project }) {
  return (
    <article className="publication-card project-card">
      <div className="project-card-heading">
        <h3>{project.title}</h3>
        {project.category && <span className="project-type">{project.category}</span>}
      </div>
      <p>{project.summary}</p>
      <div className="project-detail">
        <strong>Challenge</strong>
        <p>{project.problem}</p>
      </div>
      <div className="project-detail">
        <strong>Impact</strong>
        <p>{project.impact}</p>
      </div>
      <ul className="tag-list">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="project-links">
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer">
            Open project <ArrowUpRight size={16} />
          </a>
        )}
        {project.secondaryHref && (
          <a className="button secondary" href={project.secondaryHref} target="_blank" rel="noreferrer">
            View notes
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
