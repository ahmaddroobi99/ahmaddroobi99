import GalleryImageCard from "./GalleryImageCard.jsx";

function GalleryGrid({ items, onSelect, startIndex = 0 }) {
  return (
    <div className="modern-gallery" aria-live="polite">
      {items.map((item, index) => {
        const globalIndex = startIndex + index;
        return (
          <GalleryImageCard
            key={item.name}
            item={item}
            index={globalIndex}
            onSelect={() => onSelect(globalIndex)}
          />
        );
      })}
    </div>
  );
}

export default GalleryGrid;
