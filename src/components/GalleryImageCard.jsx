function GalleryImageCard({ item, index, onSelect }) {
  const isPriority = index < 3;

  return (
    <button
      className="gallery-tile"
      type="button"
      onClick={onSelect}
      aria-label={`Open ${item.title}: ${item.description}`}
      style={{ "--tile-ratio": `${item.width} / ${item.height}` }}
    >
      <picture>
        <source srcSet={`${item.thumbSmall} 640w, ${item.thumbLarge} 1200w`} sizes="(min-width: 1080px) 25vw, (min-width: 760px) 50vw, 100vw" />
        <img
          src={item.thumbSmall}
          srcSet={`${item.thumbSmall} 640w, ${item.thumbLarge} 1200w`}
          sizes="(min-width: 1080px) 25vw, (min-width: 760px) 50vw, 100vw"
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
