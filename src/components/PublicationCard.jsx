import { ArrowUpRight } from "lucide-react";

function PublicationCard({ publication }) {
  return (
    <article className="publication-card">
      <span>{publication.meta}</span>
      <h3>{publication.title}</h3>
      <p>{publication.summary}</p>
      <a href={publication.href} target="_blank" rel="noreferrer">
        Open resource <ArrowUpRight size={16} />
      </a>
    </article>
  );
}

export default PublicationCard;
