import { useEffect } from "react";

const siteTitle = "Ahmad Droobi | Robotics & Perception Engineer";
const defaultDescription =
  "Portfolio of Ahmad Droobi, a robotics and perception engineer working on state estimation, sensor fusion, LiDAR/vision perception, controls, and reliable autonomy software.";
const defaultImage = "/img/prof.jpg";

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    if (selector.startsWith("meta")) {
      element = document.createElement("meta");
      const attr = selector.match(/\[(.*?)\]/)?.[1]?.split("=")[0];
      if (attr) {
        const [, attrName] = attr.split("=");
        element.setAttribute(attrName.replace(/"/g, ""), attrName.replace(/"/g, ""));
      }
      document.head.appendChild(element);
    }
  }
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
    setMeta('meta[property="og:image"]', "content", defaultImage);
    setMeta('meta[name="twitter:image"]', "content", defaultImage);

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
