function GalleryImageCard({ item, index, onSelect }) {
  const isPriority = index < 8;
  const isFeatured = index % 13 === 0;

  return (
    <button
      className={`gallery-tile ${item.orientation} ${isFeatured ? "is-featured" : ""}`}
      type="button"
      onClick={onSelect}
      aria-label={`Open ${item.title}: ${item.description}`}
      style={{ "--tile-ratio": `${item.width} / ${item.height}` }}
    >
      <picture>
        <source srcSet={`${item.thumbSmall} 640w, ${item.thumbLarge} 1200w`} sizes="(min-width: 1180px) 18vw, (min-width: 820px) 28vw, 50vw" />
        <img
          src={item.thumbSmall}
          srcSet={`${item.thumbSmall} 640w, ${item.thumbLarge} 1200w`}
          sizes="(min-width: 1180px) 18vw, (min-width: 820px) 28vw, 50vw"
          width={item.width}
          height={item.height}
          alt={`${item.title} from the ${item.primaryCategory.toLowerCase()} collection`}
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          decoding="async"
        />
      </picture>
      <span>{item.categories.join(" / ")}</span>
      <strong>{item.title}</strong>
    </button>
  );
}

export default GalleryImageCard;
