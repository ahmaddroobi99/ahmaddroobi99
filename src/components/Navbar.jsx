import { NavLink } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { useState } from "react";
import { profile } from "../data/profileData.js";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Experience", "/experience"],
  ["Projects", "/projects"],
  ["Education", "/education"],
  ["Publications", "/publications"],
  ["Awards", "/awards"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"]
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" onClick={() => setOpen(true)} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <NavLink className="brand-mark" to="/">
        <span>AD</span>
        <strong>{profile.name}</strong>
      </NavLink>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.slice(0, 7).map(([label, to]) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? "active" : "")}>
            {label}
          </NavLink>
        ))}
      </nav>
      <a className="topbar-cta" href={profile.cvPdf} target="_blank" rel="noreferrer">
        <Download size={17} />
        CV
      </a>

      <aside className={`drawer ${open ? "open" : ""}`} aria-label="Mobile navigation">
        <button className="icon-button drawer-close" onClick={() => setOpen(false)} aria-label="Close menu">
          <X size={20} />
        </button>
        <div className="drawer-profile">
          <img src={profile.profileImg} alt={profile.name} />
          <strong>{profile.name}</strong>
          <span>{profile.title}</span>
        </div>
        {links.map(([label, to]) => (
          <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({ isActive }) => (isActive ? "active" : "")}>
            {label}
          </NavLink>
        ))}
      </aside>
    </header>
  );
}

export default Navbar;
