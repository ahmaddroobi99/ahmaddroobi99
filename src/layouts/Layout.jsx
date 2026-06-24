import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer.jsx";
import FloatingCopilot from "../components/FloatingCopilot.jsx";
import MacDock from "../components/MacDock.jsx";
import MacWindow from "../components/MacWindow.jsx";
import Navbar from "../components/Navbar.jsx";
import { getRouteTitle } from "../data/navigationData.js";

function Layout() {
  const location = useLocation();
  const title = getRouteTitle(location.pathname);

  return (
    <div className="app-shell mac-desktop">
      <Navbar title={title} />
      <main className="route-shell" key={location.pathname}>
        <MacWindow title={title}>
          <Outlet />
        </MacWindow>
      </main>
      <MacDock />
      <Footer />
      <FloatingCopilot />
    </div>
  );
}

export default Layout;
