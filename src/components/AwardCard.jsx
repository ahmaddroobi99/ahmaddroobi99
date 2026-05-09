import { Award } from "lucide-react";

function AwardCard({ title, subtitle, date }) {
  return (
    <article className="award-card">
      <div className="award-icon">
        <Award size={22} />
      </div>
      <div>
        <span>{date}</span>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </article>
  );
}

export default AwardCard;
