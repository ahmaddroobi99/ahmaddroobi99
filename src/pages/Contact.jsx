import { FileText, Github, Linkedin, Mail } from "lucide-react";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { profile } from "../data/profileData.js";

function Contact() {
  return (
    <>
      <PageHero
        kicker="Contact"
        title="Open to software engineering, AI/ML, backend, data, and perception software roles."
        intro="Best-fit teams include AI platforms, ML infrastructure, robotics, perception, LiDAR applications, developer tools, and data-intensive product engineering."
        path="/contact"
      />
      <Section className="compact-section">
        <div className="contact-section">
          <div>
            <h3>{profile.name}</h3>
            <p>{profile.title}</p>
          </div>
          <div className="contact-actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              <Mail size={18} />
              Email
            </a>
            <a className="button secondary" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a className="button secondary" href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a className="button secondary" href={profile.cvPdf} target="_blank" rel="noreferrer">
              <FileText size={18} />
              CV
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

export default Contact;
