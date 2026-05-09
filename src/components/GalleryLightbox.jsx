import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";

function GalleryLightbox({ items, index, onClose, onNavigate }) {
  const closeRef = useRef(null);
  const item = items[index];

  useEffect(() => {
    const previousActive = document.activeElement;
    closeRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onNavigate(index - 1);
      if (event.key === "ArrowRight") onNavigate(index + 1);
      if (event.key === "Tab") {
        const focusable = Array.from(
          document.querySelectorAll(".lightbox button, .lightbox a, .lightbox [tabindex]:not([tabindex='-1'])")
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      previousActive?.focus?.();
    };
  }, [index, onClose, onNavigate]);

  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${item.title} preview`}>
      <button className="lightbox-backdrop" type="button" onClick={onClose} aria-label="Close preview" />
      <figure>
        <button ref={closeRef} className="icon-button lightbox-close" type="button" onClick={onClose} aria-label="Close preview">
          <X size={20} />
        </button>
        <button className="icon-button lightbox-prev" type="button" onClick={() => onNavigate(index - 1)} aria-label="Previous image">
          <ChevronLeft size={22} />
        </button>
        <img src={item.src} alt={`${item.title} preview`} width={item.width} height={item.height} decoding="async" />
        <button className="icon-button lightbox-next" type="button" onClick={() => onNavigate(index + 1)} aria-label="Next image">
          <ChevronRight size={22} />
        </button>
        <figcaption>
          <span>{item.categories.join(" / ")}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </figcaption>
      </figure>
    </div>
  );
}

export default GalleryLightbox;
