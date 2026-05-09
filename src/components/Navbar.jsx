import { Download, Wifi } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profile } from "../data/profileData.js";

function formatClock(date) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

function Navbar({ title }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="topbar mac-menu-bar">
      <Link className="brand-mark" to="/">
        <span>AD</span>
        <strong>{profile.name}</strong>
      </Link>
      <div className="mac-menu-title" aria-live="polite">
        <strong>{title}</strong>
        <span>Window</span>
        <span>View</span>
        <span>Share</span>
      </div>
      <div className="mac-menu-status">
        <Wifi size={16} aria-hidden="true" />
        <span>{formatClock(now)}</span>
      </div>
      <a className="topbar-cta" href={profile.cvPdf} target="_blank" rel="noreferrer" aria-label="Open Ahmad Droobi CV">
        <Download size={17} />
        CV
      </a>
    </header>
  );
}

export default Navbar;
