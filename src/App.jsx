import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import About from "./pages/About.jsx";
import Awards from "./pages/Awards.jsx";
import Contact from "./pages/Contact.jsx";
import Education from "./pages/Education.jsx";
import Experience from "./pages/Experience.jsx";
import Gallery from "./pages/Gallery.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Philosophy from "./pages/Philosophy.jsx";
import Projects from "./pages/Projects.jsx";
import Publications from "./pages/Publications.jsx";

const legacyRedirects = [
  ["index.html", "/"],
  ["advising.html", "/about"],
  ["awards.html", "/awards"],
  ["editor.html", "/projects"],
  ["education.html", "/education"],
  ["experience.html", "/experience"],
  ["gallary.html", "/gallery"],
  ["gallery.html", "/gallery"],
  ["math_review.html", "/projects"],
  ["philosophy.html", "/philosophy"],
  ["publications.html", "/publications"],
  ["reporting_system.html", "/projects"],
  ["repository.html", "/projects"],
  ["repository_table.html", "/projects"]
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="experience" element={<Experience />} />
          <Route path="education" element={<Education />} />
          <Route path="projects" element={<Projects />} />
          <Route path="publications" element={<Publications />} />
          <Route path="awards" element={<Awards />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="philosophy" element={<Philosophy />} />
          <Route path="contact" element={<Contact />} />
          {legacyRedirects.map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
