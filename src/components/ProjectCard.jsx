import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, onOpen }) {
  return (
    <article className="publication-card project-card">
      {project.category && <span className="project-category">{project.category}</span>}
      <h3>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-detail">
        <strong>Problem solved</strong>
        <p>{project.problem}</p>
      </div>
      <div className="project-detail">
        <strong>Why it matters</strong>
        <p>{project.impact}</p>
      </div>
      <ul className="tag-list">
        {project.technologies.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="project-actions">
        {onOpen && (
          <button className="text-action" type="button" onClick={() => onOpen(project)}>
            View details <ArrowUpRight size={16} />
          </button>
        )}
        {project.href && (
          <a href={project.href} target="_blank" rel="noreferrer">
            Open project <ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
