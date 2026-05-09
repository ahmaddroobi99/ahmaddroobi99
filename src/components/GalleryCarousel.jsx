import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import GalleryImageCard from "./GalleryImageCard.jsx";

function GalleryCarousel({ items, onSelect }) {
  const railRef = useRef(null);
  const featured = items.slice(0, 8);

  function slide(direction) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.82, behavior: "smooth" });
  }

  return (
    <section className="gallery-carousel" aria-label="Featured gallery images">
      <div className="gallery-carousel-header">
        <div>
          <span className="eyebrow">Curated Visual Archive</span>
          <h2>Featured moments, built for browsing.</h2>
        </div>
        <div className="gallery-carousel-controls">
          <button className="icon-button" type="button" onClick={() => slide(-1)} aria-label="Slide gallery left">
            <ArrowLeft size={18} />
          </button>
          <button className="icon-button" type="button" onClick={() => slide(1)} aria-label="Slide gallery right">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
      <div className="gallery-rail" ref={railRef}>
        {featured.map((item, index) => (
          <div className="gallery-rail-item" key={item.name}>
            <GalleryImageCard item={item} index={index} onSelect={() => onSelect(index)} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default GalleryCarousel;
