import { ChevronRight } from "lucide-react";

function ExperienceCard({ item }) {
  return (
    <article className="timeline-item">
      <img src={item.img} alt="" />
      <div>
        <span>{item.date}</span>
        <h3>{item.title}</h3>
        <p className="place">{item.place}</p>
        <ul>
          {item.points.map((point) => (
            <li key={point}>
              <ChevronRight size={15} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default ExperienceCard;
