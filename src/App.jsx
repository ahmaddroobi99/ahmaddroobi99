import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";

const About = lazy(() => import("./pages/About.jsx"));
const Advising = lazy(() => import("./pages/Advising.jsx"));
const Awards = lazy(() => import("./pages/Awards.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Education = lazy(() => import("./pages/Education.jsx"));
const Experience = lazy(() => import("./pages/Experience.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Philosophy = lazy(() => import("./pages/Philosophy.jsx"));
const Projects = lazy(() => import("./pages/Projects.jsx"));
const Publications = lazy(() => import("./pages/Publications.jsx"));

const legacyRedirects = [
  ["index.html", "/"],
  ["advising.html", "/advising"],
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
      <Suspense fallback={<div className="route-loader" role="status">Loading portfolio...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="advising" element={<Advising />} />
            <Route path="experience" element={<Experience />} />
            <Route path="education" element={<Education />} />
            <Route path="projects" element={<Projects />} />
            <Route path="repository" element={<Projects />} />
            <Route path="publications" element={<Publications />} />
            <Route path="awards" element={<Awards />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="philosophy" element={<Philosophy />} />
            <Route path="contact" element={<Contact />} />
            {legacyRedirects.map(([from, to]) => (
              <Route key={from} path={from} element={<Navigate to={to} replace />} />
            ))}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
