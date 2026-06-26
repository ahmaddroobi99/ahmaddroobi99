import { Images, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
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
  { value: "newest", label: "Newest first" }
];

function buildItems() {
  const map = new Map();
  categoryOrder.forEach((category) => {
    galleryGroups[category].forEach((name) => {
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
  const items = useMemo(buildItems, []);
  const categories = useMemo(() => ["All", ...categoryOrder], []);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("oldest");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const albumCounts = useMemo(() => {
    const counts = { All: items.length };
    categoryOrder.forEach((category) => {
      counts[category] = items.filter((item) => item.categories.includes(category)).length;
    });
    return counts;
  }, [items]);

  const { sections, visible } = useMemo(() => {
    const search = query.trim().toLowerCase();
    const matches = (item) => {
      if (!search) return true;
      const text = `${item.title} ${item.categories.join(" ")} ${item.description}`.toLowerCase();
      return text.includes(search);
    };

    const sortItems = (nextItems) => [...nextItems].sort((a, b) => {
      const direction = sortOrder === "newest" ? -1 : 1;
      return (photoNumber(a.name) - photoNumber(b.name)) * direction;
    });

    let groups;
    if (filter === "All") {
      // Classify each photo once, under its primary album.
      groups = categoryOrder
        .map((category) => ({
          category,
          description: galleryDescriptions[category],
          items: sortItems(items.filter((item) => item.primaryCategory === category && matches(item)))
        }))
        .filter((group) => group.items.length);
    } else {
      groups = [
        {
          category: filter,
          description: galleryDescriptions[filter],
          items: sortItems(items.filter((item) => item.categories.includes(filter) && matches(item)))
        }
      ].filter((group) => group.items.length);
    }

    // Flat list (in render order) so the lightbox can navigate across sections.
    let cursor = 0;
    const sectionsWithOffset = groups.map((group) => {
      const startIndex = cursor;
      cursor += group.items.length;
      return { ...group, startIndex };
    });

    return { sections: sectionsWithOffset, visible: groups.flatMap((group) => group.items) };
  }, [filter, items, query, sortOrder]);

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
        title="Field log & photo archive."
        intro="Academic, professional, and personal images, classified into albums with instant search and fast, lazy-loaded viewing."
        path="/gallery"
      />
      <Section className="compact-section">
        <div className="gallery-app">
          <aside className="gallery-rail-panel" aria-label="Gallery albums">
            <div className="gallery-stats">
              <span><strong>{items.length}</strong> Photos</span>
              <span><strong>{categoryOrder.length}</strong> Albums</span>
              <span><strong>{visible.length}</strong> Showing</span>
            </div>
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
          </aside>
          <div className="gallery-stage">
            <div className="gallery-toolbar" aria-label="Gallery controls">
              <div className="gallery-search-wrap">
                <Search size={17} aria-hidden="true" />
                <label className="sr-only" htmlFor="gallery-search">Search gallery</label>
                <input
                  id="gallery-search"
                  type="search"
                  value={query}
                  placeholder="Search albums, places, moments"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <label className="gallery-sort">
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
            <p className="gallery-result-note" aria-live="polite">
              Showing {visible.length} of {items.length} photos{filter !== "All" ? ` in ${filter}` : ""}{query.trim() ? ` for "${query.trim()}"` : ""}.
            </p>
            {sections.map((group) => (
              <section className="gallery-album" key={group.category}>
                <header className="gallery-album-head">
                  <div>
                    <h2>{group.category}</h2>
                    <p>{group.description}</p>
                  </div>
                  <span className="gallery-album-count">{group.items.length}</span>
                </header>
                <GalleryGrid items={group.items} onSelect={setSelectedIndex} startIndex={group.startIndex} />
              </section>
            ))}
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
