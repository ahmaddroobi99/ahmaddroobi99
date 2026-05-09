export const navigationItems = [
  { label: "Home", path: "/", title: "Portfolio" },
  { label: "About", path: "/about", title: "About" },
  { label: "Experience", path: "/experience", title: "Experience" },
  { label: "Projects", path: "/projects", title: "Projects" },
  { label: "Education", path: "/education", title: "Education" },
  { label: "Publications", path: "/publications", title: "Publications" },
  { label: "Awards", path: "/awards", title: "Awards" },
  { label: "Advising", path: "/advising", title: "Advising" },
  { label: "Gallery", path: "/gallery", title: "Photos" },
  { label: "Dashboard", path: "/dashboard", title: "Live Dashboard" },
  { label: "Contact", path: "/contact", title: "Contact" }
];

export function getRouteTitle(pathname) {
  const aliases = {
    "/repository": "Projects",
    "/philosophy": "Philosophy"
  };
  if (aliases[pathname]) return aliases[pathname];

  const item = navigationItems
    .filter((entry) => entry.path === "/" ? pathname === "/" : pathname.startsWith(entry.path))
    .sort((a, b) => b.path.length - a.path.length)[0];

  return item?.title || "Portfolio";
}
