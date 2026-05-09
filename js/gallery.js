const galleryData = {
  Nature: ["Photo_6", "Photo_7", "Photo_16", "Photo_24", "Photo_26", "Photo_41", "Photo_47", "Photo_48", "Photo_54"],
  Events: ["Photo_10", "Photo_11", "Photo_12", "Photo_13", "Photo_27", "Photo_42", "Photo_43", "Photo_44"],
  Personal: ["Photo_1", "Photo_2", "Photo_3", "Photo_4", "Photo_5", "Photo_8", "Photo_9", "Photo_14", "Photo_15", "Photo_17", "Photo_18", "Photo_19", "Photo_20", "Photo_21", "Photo_22", "Photo_23", "Photo_25", "Photo_28", "Photo_29", "Photo_30", "Photo_31", "Photo_32", "Photo_33", "Photo_34", "Photo_35", "Photo_36", "Photo_37", "Photo_38", "Photo_39", "Photo_40", "Photo_45", "Photo_46", "Photo_49", "Photo_50", "Photo_51", "Photo_52", "Photo_53", "Photo_55", "Photo_56", "Photo_57", "Photo_58"],
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

const state = {
  items: [],
  filter: "all",
  query: ""
};

const els = {};

function getPhotoNumber(name) {
  const match = name.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function titleFromName(name) {
  return name.replace("_", " ");
}

function imageCandidates(name) {
  const base = `gallery/${name}`;
  return [`${base}.jpg`, `${base}.jpeg`, `${base}.png`];
}

function buildItems() {
  const map = new Map();

  Object.entries(galleryData).forEach(([category, names]) => {
    names.forEach((name) => {
      const item = map.get(name) || {
        name,
        title: titleFromName(name),
        categories: [],
        description: ""
      };

      if (!item.categories.includes(category)) {
        item.categories.push(category);
      }

      map.set(name, item);
    });
  });

  state.items = [...map.values()]
    .map((item) => ({
      ...item,
      primaryCategory: item.categories[0],
      description: categoryDescriptions[item.categories[0]]
    }))
    .sort((a, b) => getPhotoNumber(a.name) - getPhotoNumber(b.name));
}

function setImageWithFallback(img, name) {
  const candidates = imageCandidates(name);

  function tryNext() {
    const src = candidates.shift();
    if (!src) return;
    img.onerror = tryNext;
    img.onload = () => {
      img.onerror = null;
    };
    img.src = src;
  }

  tryNext();
}

function createCard(item, index) {
  const article = document.createElement("article");
  article.className = "gallery-card";
  article.dataset.categories = item.categories.join(" ").toLowerCase();

  const button = document.createElement("button");
  button.type = "button";
  button.className = "image-button";
  button.dataset.index = index;
  button.setAttribute("aria-label", `Open ${item.title}`);

  const img = document.createElement("img");
  img.alt = `${item.title} from the ${item.primaryCategory.toLowerCase()} collection`;
  img.width = 900;
  img.height = 650;
  img.loading = index < 6 ? "eager" : "lazy";
  img.decoding = "async";
  setImageWithFallback(img, item.name);

  const body = document.createElement("div");
  body.className = "card-body";

  const meta = document.createElement("p");
  meta.className = "card-meta";
  meta.textContent = item.categories.join(" / ");

  const title = document.createElement("h2");
  title.textContent = item.title;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  button.append(img);
  body.append(meta, title, desc);
  article.append(button, body);

  return article;
}

function filteredItems() {
  const query = state.query.trim().toLowerCase();

  return state.items.filter((item) => {
    const matchesCategory = state.filter === "all" || item.categories.some((category) => category.toLowerCase() === state.filter);
    const searchable = `${item.title} ${item.categories.join(" ")} ${item.description}`.toLowerCase();
    return matchesCategory && (!query || searchable.includes(query));
  });
}

function renderFilters() {
  Object.keys(galleryData).forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-btn";
    button.dataset.filter = category.toLowerCase();
    button.textContent = category;
    els.filterGroup.append(button);
  });
}

function renderGallery() {
  const visible = filteredItems();
  els.grid.innerHTML = "";
  const fragment = document.createDocumentFragment();

  visible.forEach((item, index) => {
    fragment.append(createCard(item, state.items.indexOf(item)));
  });

  els.grid.append(fragment);
  els.empty.hidden = visible.length > 0;
  els.visibleCount.textContent = visible.length;
}

function setActiveFilter(nextFilter) {
  state.filter = nextFilter;
  els.filterGroup.querySelectorAll(".filter-btn").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === nextFilter);
  });
  renderGallery();
}

function openLightbox(item) {
  els.lightboxTitle.textContent = item.title;
  els.lightboxMeta.textContent = `${item.categories.join(" / ")} - ${item.description}`;
  els.lightboxImage.alt = `${item.title} preview`;
  setImageWithFallback(els.lightboxImage, item.name);

  if (typeof els.lightbox.showModal === "function") {
    els.lightbox.showModal();
  } else {
    els.lightbox.setAttribute("open", "");
  }

  els.lightboxClose.focus();
}

function closeLightbox() {
  if (els.lightbox.open && typeof els.lightbox.close === "function") {
    els.lightbox.close();
  } else {
    els.lightbox.removeAttribute("open");
  }
}

function bindEvents() {
  els.filterGroup.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    setActiveFilter(button.dataset.filter);
  });

  els.search.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderGallery();
  });

  els.grid.addEventListener("click", (event) => {
    const button = event.target.closest(".image-button");
    if (!button) return;
    openLightbox(state.items[Number(button.dataset.index)]);
  });

  els.lightboxClose.addEventListener("click", closeLightbox);

  els.lightbox.addEventListener("click", (event) => {
    if (event.target === els.lightbox) {
      closeLightbox();
    }
  });

  const mobileToggle = document.querySelector(".mobile-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("is-open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

function init() {
  els.grid = document.getElementById("galleryGrid");
  els.empty = document.getElementById("emptyState");
  els.search = document.getElementById("gallerySearch");
  els.filterGroup = document.querySelector(".filter-group");
  els.galleryCount = document.getElementById("galleryCount");
  els.categoryCount = document.getElementById("categoryCount");
  els.visibleCount = document.getElementById("visibleCount");
  els.lightbox = document.getElementById("lightbox");
  els.lightboxClose = document.getElementById("lightboxClose");
  els.lightboxImage = document.getElementById("lightboxImage");
  els.lightboxTitle = document.getElementById("lightboxTitle");
  els.lightboxMeta = document.getElementById("lightboxMeta");

  buildItems();
  renderFilters();
  els.galleryCount.textContent = state.items.length;
  els.categoryCount.textContent = Object.keys(galleryData).length;
  renderGallery();
  bindEvents();
}

document.addEventListener("DOMContentLoaded", init);
