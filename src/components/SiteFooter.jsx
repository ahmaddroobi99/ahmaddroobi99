import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/profileData.js";

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>{profile.name}</strong>
        <p>Software, data, and ML work presented with the rough edges left honest.</p>
      </div>
      <nav aria-label="Footer navigation">
        <Link to="/projects">Projects</Link>
        <Link to="/gallery">Gallery</Link>
        <Link to="/contact">Contact</Link>
        <a href={profile.cvPdf} target="_blank" rel="noreferrer">
          CV <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </nav>
    </footer>
  );
}

export default SiteFooter;
