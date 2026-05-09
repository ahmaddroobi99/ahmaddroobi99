import AwardCard from "../components/AwardCard.jsx";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { awards } from "../data/profileData.js";

function Awards() {
  return (
    <>
      <PageHero
        kicker="Awards"
        title="Recognition for engineering, AI/ML work, research potential, and academic performance."
        intro="Scholarships, fellowships, research awards, and academic honors preserved from the original portfolio."
        path="/awards"
      />
      <Section className="compact-section">
        <div className="award-grid">
          {awards.map(([title, subtitle, date]) => (
            <AwardCard key={`${title}-${date}`} title={title} subtitle={subtitle} date={date} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default Awards;
