function Card({ as: Component = "article", className = "", children }) {
  return <Component className={`card ${className}`}>{children}</Component>;
}

export default Card;
