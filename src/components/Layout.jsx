import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

function Layout() {
  const location = useLocation();

  return (
    <div className="app-shell">
      <Navbar />
      <main className="route-shell" key={location.pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
