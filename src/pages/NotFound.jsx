import { Link } from "react-router-dom";
import Section from "../components/Section.jsx";

function NotFound() {
  return (
    <Section kicker="404" title="This page is not available.">
      <Link className="button primary" to="/">
        Back to Home
      </Link>
    </Section>
  );
}

export default NotFound;
