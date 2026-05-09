import Card from "../components/Card.jsx";
import PageHero from "../components/PageHero.jsx";

const advising = [
  {
    title: "Research Direction",
    text: "I enjoy helping students turn broad AI, software, or applied-math interests into focused questions, practical experiments, and readable technical plans."
  },
  {
    title: "Portfolio and Project Review",
    text: "I can review project structure, implementation clarity, writeups, and how well a portfolio communicates engineering judgment."
  },
  {
    title: "ML Workflow Guidance",
    text: "I emphasize data preparation, baselines, evaluation, reproducibility, and honest interpretation before model complexity."
  },
  {
    title: "Academic Communication",
    text: "I help shape abstracts, technical summaries, presentations, and documentation so the core contribution is easy to understand."
  }
];

function Advising() {
  return (
    <>
      <PageHero
        kicker="Advising"
        title="Practical guidance for research, projects, and early technical direction."
        intro="A concise advising page for students and collaborators interested in software engineering, AI/ML workflows, applied mathematics, and portfolio-quality project communication."
        path="/advising"
      />
      <section className="section compact-section">
        <div className="repo-board">
          {advising.map((item) => (
            <Card key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

export default Advising;
