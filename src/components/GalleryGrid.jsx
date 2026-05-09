import GalleryImageCard from "./GalleryImageCard.jsx";

function GalleryGrid({ items, onSelect }) {
  return (
    <div className="modern-gallery" aria-live="polite">
      {items.map((item, index) => (
        <GalleryImageCard key={item.name} item={item} index={index} onSelect={() => onSelect(index)} />
      ))}
    </div>
  );
}

export default GalleryGrid;
