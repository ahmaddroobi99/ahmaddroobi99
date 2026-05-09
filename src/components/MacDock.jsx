import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Home,
  Images,
  LayoutDashboard,
  Mail,
  NotebookTabs,
  ScrollText,
  UserRound,
  UsersRound
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { navigationItems } from "../data/navigationData.js";

const icons = {
  Home,
  About: UserRound,
  Experience: BriefcaseBusiness,
  Projects: NotebookTabs,
  Education: GraduationCap,
  Publications: ScrollText,
  Awards: Award,
  Advising: UsersRound,
  Gallery: Images,
  Dashboard: LayoutDashboard,
  Contact: Mail
};

function MacDock() {
  return (
    <nav className="mac-dock" aria-label="Application dock">
      {navigationItems.map((item) => {
        const Icon = icons[item.label] || Home;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) => `dock-item${isActive ? " active" : ""}`}
            aria-label={item.label}
            title={item.label}
          >
            <Icon size={22} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default MacDock;
