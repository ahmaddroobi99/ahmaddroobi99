import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project }) {
  return (
    <article className="publication-card project-card">
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
      {project.href && (
        <a href={project.href} target="_blank" rel="noreferrer">
          Open project <ArrowUpRight size={16} />
        </a>
      )}
    </article>
  );
}

export default ProjectCard;
