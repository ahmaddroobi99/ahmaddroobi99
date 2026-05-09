import { Images, X } from "lucide-react";
import { useMemo, useState } from "react";
import Section from "../components/Section.jsx";

const galleryData = {
  Nature: ["Photo_6", "Photo_7", "Photo_16", "Photo_24", "Photo_26", "Photo_41", "Photo_47", "Photo_48", "Photo_54"],
  Events: ["Photo_10", "Photo_11", "Photo_12", "Photo_13", "Photo_27", "Photo_42", "Photo_43", "Photo_44"],
  Personal: [
    "Photo_1", "Photo_2", "Photo_3", "Photo_4", "Photo_5", "Photo_8", "Photo_9", "Photo_14", "Photo_15",
    "Photo_17", "Photo_18", "Photo_19", "Photo_20", "Photo_21", "Photo_22", "Photo_23", "Photo_25", "Photo_28",
    "Photo_29", "Photo_30", "Photo_31", "Photo_32", "Photo_33", "Photo_34", "Photo_35", "Photo_36", "Photo_37",
    "Photo_38", "Photo_39", "Photo_40", "Photo_45", "Photo_46", "Photo_49", "Photo_50", "Photo_51", "Photo_52",
    "Photo_53", "Photo_55", "Photo_56", "Photo_57", "Photo_58"
  ],
  Academic: ["Photo_12", "Photo_29", "Photo_30", "Photo_41", "Photo_43", "Photo_44", "Photo_47"],
  Travel: ["Photo_6", "Photo_7", "Photo_41", "Photo_47", "Photo_48", "Photo_58"]
};

const categoryDescriptions = {
  Nature: "Outdoor scenes and quiet visual details from the photo archive.",
  Events: "Conference, gathering, and community moments.",
  Personal: "Personal highlights and portraits from the collection.",
  Academic: "Research, teaching, and academic-life snapshots.",
  Travel: "Places, visits, and travel memories."
};

const imageModules = import.meta.glob("../../gallery/*.{jpg,jpeg,png}", {
  eager: true,
  query: "?url",
  import: "default"
});

function getImage(name) {
  const entry = Object.entries(imageModules).find(([path]) => path.includes(`${name}.`));
  return entry?.[1];
}

function photoNumber(name) {
  const match = name.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function buildItems() {
  const map = new Map();
  Object.entries(galleryData).forEach(([category, names]) => {
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
      primaryCategory: item.categories[0],
      description: categoryDescriptions[item.categories[0]]
    }))
    .filter((item) => item.src)
    .sort((a, b) => photoNumber(a.name) - photoNumber(b.name));
}

function Gallery() {
  const items = useMemo(() => buildItems(), []);
  const categories = useMemo(() => ["All", ...Object.keys(galleryData)], []);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return items.filter((item) => {
      const categoryMatch = filter === "All" || item.categories.includes(filter);
      const text = `${item.title} ${item.categories.join(" ")} ${item.description}`.toLowerCase();
      return categoryMatch && (!search || text.includes(search));
    });
  }, [filter, items, query]);

  return (
    <>
      <Section
        kicker="Gallery"
        title="Photo archive."
        intro="Selected academic, professional, and personal images preserved from the original site with search, filtering, and responsive viewing."
      >
        <div className="gallery-stats" aria-label="Gallery summary">
          <span><strong>{items.length}</strong> Photos</span>
          <span><strong>{Object.keys(galleryData).length}</strong> Categories</span>
          <span><strong>{visible.length}</strong> Showing</span>
        </div>
        <div className="gallery-toolbar" aria-label="Gallery controls">
          <label>
            <span>Search gallery</span>
            <input type="search" value={query} placeholder="Search title, category, or description" onChange={(event) => setQuery(event.target.value)} />
          </label>
          <div className="gallery-filters" aria-label="Filter by category">
            {categories.map((category) => (
              <button key={category} type="button" className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="modern-gallery" aria-live="polite">
          {visible.map((item, index) => (
            <button className="gallery-tile" key={item.name} type="button" onClick={() => setSelected(item)} aria-label={`Open ${item.title}`}>
              <img src={item.src} alt={`${item.title} from the ${item.primaryCategory.toLowerCase()} collection`} loading={index < 8 ? "eager" : "lazy"} />
              <span>{item.categories.join(" / ")}</span>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>
        {!visible.length && (
          <div className="gallery-empty">
            <Images size={28} />
            <h3>No matching photos</h3>
            <p>Try a broader search term or choose another category.</p>
          </div>
        )}
      </Section>
      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${selected.title} preview`}>
          <button className="lightbox-backdrop" type="button" onClick={() => setSelected(null)} aria-label="Close preview" />
          <figure>
            <button className="icon-button lightbox-close" type="button" onClick={() => setSelected(null)} aria-label="Close preview">
              <X size={20} />
            </button>
            <img src={selected.src} alt={`${selected.title} preview`} />
            <figcaption>
              <span>{selected.categories.join(" / ")}</span>
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

export default Gallery;
