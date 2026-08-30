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
          <span className="eyebrow"><Sparkles size={14} /> Robotics · Perception · Estimation</span>
          <h1>{profile.name}</h1>
          <h2 className="hero-title">{profile.title}</h2>
          <p>{profile.tagline}</p>
          <div className="hero-actions">
            <Link className="button primary" to="/projects">
              <BookOpen size={18} />
              Explore projects
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
              Download resume
            </a>
          </div>
          <div className="hero-metrics" aria-label="Portfolio focus areas">
            <span><strong>Sensor fusion</strong> for robust state estimates</span>
            <span><strong>Perception</strong> using LiDAR, vision, and spatial data</span>
            <span><strong>Autonomy</strong> with reliable software and controls</span>
          </div>
        </div>
        <div className="hero-panel" aria-label="Profile summary">
          <div className="portrait-frame">
            <img src={profile.profileImg} alt={profile.name} width="720" height="900" fetchPriority="high" />
          </div>
          <div className="signal-card">
            <span>Focus area</span>
            <strong>Building dependable autonomy systems with perception, estimation, and data-driven software.</strong>
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
