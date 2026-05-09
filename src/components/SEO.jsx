import { useEffect } from "react";

const siteTitle = "Ahmad Droobi | Software Engineer & AI/ML Developer";
const defaultDescription =
  "Portfolio of Ahmad Droobi, a software engineer and AI/ML developer focused on backend systems, data pipelines, research software, and perception-oriented applications.";

function setMeta(selector, attribute, value) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

function SEO({ title, description = defaultDescription, path = "/" }) {
  useEffect(() => {
    const pageTitle = title ? `${title} | Ahmad Droobi` : siteTitle;
    const canonical = `${window.location.origin}${path}`;

    document.title = pageTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", pageTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[name="twitter:title"]', "content", pageTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[property="og:url"]', "content", canonical);

    let canonicalLink = document.head.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.rel = "canonical";
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical;
  }, [description, path, title]);

  return null;
}

export default SEO;
