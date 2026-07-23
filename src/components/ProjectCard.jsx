import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, onOpen }) {
  return (
    <article className="publication-card project-card">
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
