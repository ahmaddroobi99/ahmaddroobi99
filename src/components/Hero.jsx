import { BookOpen, BriefcaseBusiness, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profileData.js";

function Hero() {
  return (
    <section className="hero section">
      <div className="hero-copy">
        <span className="eyebrow">Software Engineering - AI/ML - Perception Systems</span>
        <h1>{profile.name}</h1>
        <h2 className="hero-title">{profile.title}</h2>
        <p>{profile.tagline}</p>
        <div className="hero-actions">
          <Link className="button primary" to="/projects">
            <BookOpen size={18} />
            View Projects
          </Link>
          <Link className="button secondary" to="/experience">
            <BriefcaseBusiness size={18} />
            View Experience
          </Link>
          <Link className="button secondary" to="/contact">
            <Mail size={18} />
            Contact Me
          </Link>
          <a className="button secondary" href={profile.cvPdf} target="_blank" rel="noreferrer">
            <Download size={18} />
            CV
          </a>
        </div>
      </div>
      <div className="hero-panel" aria-label="Profile summary">
        <div className="portrait-frame">
          <img src={profile.profileImg} alt={profile.name} />
        </div>
        <div className="signal-card">
          <span>Role focus</span>
          <strong>Backend, full-stack, AI/ML, data pipelines, and perception software.</strong>
        </div>
        <div className="signature">
          <img src={profile.signatureImg} alt={`${profile.name} signature`} />
        </div>
      </div>
    </section>
  );
}

export default Hero;
