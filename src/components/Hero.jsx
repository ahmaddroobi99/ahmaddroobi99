import { BookOpen, BriefcaseBusiness, Download, Mail, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "./SEO.jsx";
import { profile } from "../data/profileData.js";

function Hero() {
  return (
    <>
      <SEO path="/" />
      <section className="hero section">
        <div className="hero-copy">
          <span className="eyebrow"><Sparkles size={14} /> Robotics - Perception - Estimation &amp; Controls</span>
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
              Experience
            </Link>
            <Link className="button secondary" to="/contact">
              <Mail size={18} />
              Contact
            </Link>
            <a className="button accent" href={profile.resumePdf} target="_blank" rel="noreferrer">
              <Download size={18} />
              Download Resume
            </a>
          </div>
          <div className="hero-metrics" aria-label="Portfolio focus areas">
            <span><strong>Estimation</strong> Filters &amp; sensor fusion</span>
            <span><strong>Perception</strong> LiDAR &amp; vision</span>
            <span><strong>Autonomy</strong> Reliable robot software</span>
          </div>
        </div>
        <div className="hero-panel" aria-label="Profile summary">
          <div className="portrait-frame">
            <img src={profile.profileImg} alt={profile.name} width="720" height="900" fetchPriority="high" />
          </div>
          <div className="signal-card">
            <span>Role focus</span>
            <strong>Robotics, perception, state estimation, controls, and autonomy software.</strong>
          </div>
          <div className="signature">
            <img src={profile.signatureImg} alt={`${profile.name} signature`} width="520" height="220" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
