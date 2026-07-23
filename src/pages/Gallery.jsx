import { Grid3X3, Images, RotateCcw, Search, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

const categoryOrder = Object.keys(galleryGroups);

const sortOptions = [
  { value: "oldest", label: "Oldest first" },
  { value: "newest", label: "Newest first" },
  { value: "portrait", label: "Portraits first" },
  { value: "landscape", label: "Landscapes first" }
];

function photoNameFromPath(path) {
  return path.split("/").pop()?.replace(/\.(jpe?g|png)$/i, "");
}

function categoriesForName(name) {
  const categories = categoryOrder.filter((category) => galleryGroups[category].includes(name));
  return categories.length ? categories : ["Archive"];
}

function buildItems() {
  return Object.keys(imageModules)
    .map(photoNameFromPath)
    .filter(Boolean)
    .sort((a, b) => photoNumber(a) - photoNumber(b))
    .map((name) => {
      const categories = categoriesForName(name);
      const width = galleryImageMeta[name]?.width || 1200;
      const height = galleryImageMeta[name]?.height || 900;

      return {
        name,
        title: name.replace("_", " "),
        categories,
        src: getImage(name),
        thumbSmall: getThumb(name, 640),
        thumbLarge: getThumb(name, 1200),
        width,
        height,
        orientation: width >= height ? "landscape" : "portrait",
        primaryCategory: categories[0],
        description: galleryDescriptions[categories[0]] || "Photo archive image."
      };
    })
    .filter((item) => item.src && item.thumbSmall && item.thumbLarge);
}

function sortGalleryItems(nextItems, sortOrder) {
  return [...nextItems].sort((a, b) => {
    if (sortOrder === "newest") return photoNumber(b.name) - photoNumber(a.name);
    if (sortOrder === "portrait") {
      const orientation = Number(b.orientation === "portrait") - Number(a.orientation === "portrait");
      return orientation || photoNumber(a.name) - photoNumber(b.name);
    }
    if (sortOrder === "landscape") {
      const orientation = Number(b.orientation === "landscape") - Number(a.orientation === "landscape");
      return orientation || photoNumber(a.name) - photoNumber(b.name);
    }
    return photoNumber(a.name) - photoNumber(b.name);
  });
}

function Gallery() {
  const items = useMemo(buildItems, []);
  const categories = useMemo(() => ["All", ...categoryOrder], []);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const orientationCounts = useMemo(() => ({
    portrait: items.filter((item) => item.orientation === "portrait").length,
    landscape: items.filter((item) => item.orientation === "landscape").length
  }), [items]);

  const albumCounts = useMemo(() => {
    const counts = { All: items.length };
    categoryOrder.forEach((category) => {
      counts[category] = items.filter((item) => item.categories.includes(category)).length;
    });
    return counts;
  }, [items]);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matches = (item) => {
      if (!search) return true;
      const text = `${item.title} ${item.categories.join(" ")} ${item.description}`.toLowerCase();
      return text.includes(search);
    };

    const filtered = items.filter((item) => (filter === "All" || item.categories.includes(filter)) && matches(item));
    return sortGalleryItems(filtered, sortOrder);
  }, [filter, items, query, sortOrder]);

  useEffect(() => {
    if (selectedIndex !== null && selectedIndex >= visible.length) setSelectedIndex(null);
  }, [selectedIndex, visible.length]);

  const hasActiveControls = filter !== "All" || query.trim() || sortOrder !== "oldest";

  function resetControls() {
    setFilter("All");
    setQuery("");
    setSortOrder("oldest");
  }

  function navigateLightbox(nextIndex) {
    if (!visible.length) return;
    setSelectedIndex((nextIndex + visible.length) % visible.length);
  }

  return (
    <>
      <PageHero
        kicker="Gallery"
        title="Photo archive, rebuilt for fast browsing."
        intro="A complete visual archive with repaired thumbnails, album filters, quick search, and a cleaner full-screen viewer."
        path="/gallery"
      />
      <Section className="compact-section">
        <div className="gallery-app">
          <header className="gallery-command" aria-label="Gallery overview and filters">
            <div className="gallery-command-copy">
              <span className="eyebrow"><Sparkles size={14} aria-hidden="true" /> Complete archive</span>
              <h2>Every photo loads from real responsive thumbnails.</h2>
              <p>Browse the whole collection first, then narrow it by album, search text, or image shape.</p>
            </div>
            <div className="gallery-stats" aria-label="Gallery statistics">
              <span><strong>{items.length}</strong> Photos</span>
              <span><strong>{categoryOrder.length}</strong> Albums</span>
              <span><strong>{orientationCounts.portrait}</strong> Portrait</span>
              <span><strong>{orientationCounts.landscape}</strong> Wide</span>
            </div>
          </header>

          <div className="gallery-controls" aria-label="Gallery controls">
            <div className="gallery-filters" aria-label="Filter by album">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={filter === category ? "active" : ""}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  <span>{category}</span>
                  <strong>{albumCounts[category]}</strong>
                </button>
              ))}
            </div>

            <div className="gallery-toolbar">
              <div className="gallery-search-wrap">
                <Search size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="gallery-search">Search gallery</label>
                <input
                  id="gallery-search"
                  type="search"
                  value={query}
                  placeholder="Search album, place, photo number"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <label className="gallery-sort">
                <Grid3X3 size={16} aria-hidden="true" />
                <span>Sort</span>
                <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </label>
              <button className="gallery-reset" type="button" onClick={resetControls} disabled={!hasActiveControls}>
                <RotateCcw size={16} aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>

          <div className="gallery-stage">
            <div className="gallery-result-bar" aria-live="polite">
              <span>Showing {visible.length} of {items.length}</span>
              <strong>{filter === "All" ? "All albums" : filter}</strong>
              {query.trim() && <em>Search: {query.trim()}</em>}
            </div>
            {visible.length > 0 && <GalleryGrid items={visible} onSelect={setSelectedIndex} />}
            {!visible.length && (
              <div className="gallery-empty">
                <Images size={28} />
                <h3>No matching photos</h3>
                <p>Try a broader search term or choose another album.</p>
              </div>
            )}
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
