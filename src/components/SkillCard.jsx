function SkillCard({ skill }) {
  return (
    <article className="focus-card">
      <div className="stat">{skill.category.split(" ")[0]}</div>
      <h3>{skill.category}</h3>
      <ul className="tag-list">
        {skill.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default SkillCard;
