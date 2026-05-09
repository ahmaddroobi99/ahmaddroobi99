import { Images, Search } from "lucide-react";
import { useMemo, useState } from "react";
import GalleryCarousel from "../components/GalleryCarousel.jsx";
import GalleryGrid from "../components/GalleryGrid.jsx";
import GalleryLightbox from "../components/GalleryLightbox.jsx";
import PageHero from "../components/PageHero.jsx";
import Section from "../components/Section.jsx";
import { galleryDescriptions, galleryGroups, galleryImageMeta } from "../data/galleryData.js";

const imageModules = import.meta.glob("../../gallery/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default"
});

const thumbModules = import.meta.glob("../../gallery/thumbs/*.jpg", {
  eager: true,
  query: "?url",
  import: "default"
});

function getImage(name) {
  const entry = Object.entries(imageModules).find(([path]) => path.includes(`${name}.`));
  return entry?.[1];
}

function getThumb(name, width) {
  const entry = Object.entries(thumbModules).find(([path]) => path.includes(`${name}-${width}.jpg`));
  return entry?.[1];
}

function photoNumber(name) {
  const match = name.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function buildItems() {
  const map = new Map();
  Object.entries(galleryGroups).forEach(([category, names]) => {
    names.forEach((name) => {
      const item = map.get(name) || { name, title: name.replace("_", " "), categories: [] };
      if (!item.categories.includes(category)) item.categories.push(category);
      map.set(name, item);
    });
  });

  return [...map.values()]
    .map((item) => ({
      ...item,
      src: getImage(item.name),
      thumbSmall: getThumb(item.name, 640),
      thumbLarge: getThumb(item.name, 1200),
      width: galleryImageMeta[item.name]?.width || 1200,
      height: galleryImageMeta[item.name]?.height || 900,
      primaryCategory: item.categories[0],
      description: galleryDescriptions[item.categories[0]]
    }))
    .filter((item) => item.src && item.thumbSmall && item.thumbLarge)
    .sort((a, b) => photoNumber(a.name) - photoNumber(b.name));
}

function Gallery() {
  const items = useMemo(() => buildItems(), []);
  const categories = useMemo(() => ["All", ...Object.keys(galleryGroups)], []);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch = filter === "All" || item.categories.includes(filter);
      const text = `${item.title} ${item.categories.join(" ")} ${item.description}`.toLowerCase();
      return categoryMatch && (!search || text.includes(search));
    });
  }, [filter, items, query]);

  function navigateLightbox(nextIndex) {
    if (!visible.length) return;
    setSelectedIndex((nextIndex + visible.length) % visible.length);
  }

  return (
    <>
      <PageHero
        kicker="Gallery"
        title="Photo archive."
        intro="Selected academic, professional, and personal images preserved from the original site with search, filtering, and responsive viewing."
        path="/gallery"
      />
      <Section className="compact-section">
        <div className="mac-gallery-desktop">
          <div className="desktop-menubar" aria-hidden="true">
            <span className="apple-dot" />
            <strong>Photos</strong>
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Window</span>
          </div>
          <div className="photos-window">
            <aside className="photos-sidebar" aria-label="Gallery summary">
              <div className="window-controls" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="gallery-stats">
                <span><strong>{items.length}</strong> Photos</span>
                <span><strong>{Object.keys(galleryGroups).length}</strong> Albums</span>
                <span><strong>{visible.length}</strong> Showing</span>
              </div>
              <div className="gallery-filters" aria-label="Filter by category">
                {categories.map((category) => (
                  <button key={category} type="button" className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
                    {category}
                  </button>
                ))}
              </div>
            </aside>
            <div className="photos-stage">
              <div className="gallery-toolbar" aria-label="Gallery controls">
                <label>
                  <Search size={17} aria-hidden="true" />
                  <input type="search" value={query} placeholder="Search gallery" onChange={(event) => setQuery(event.target.value)} />
                </label>
              </div>
              <GalleryCarousel items={visible} onSelect={setSelectedIndex} />
              <GalleryGrid items={visible} onSelect={setSelectedIndex} />
              {!visible.length && (
                <div className="gallery-empty">
                  <Images size={28} />
                  <h3>No matching photos</h3>
                  <p>Try a broader search term or choose another category.</p>
                </div>
              )}
            </div>
          </div>
          <div className="desktop-dock" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </Section>
      {selectedIndex !== null && (
        <GalleryLightbox
          items={visible}
          index={selectedIndex}
          onClose={() => setSelectedIndex(null)}
          onNavigate={navigateLightbox}
        />
      )}
    </>
  );
}

export default Gallery;
