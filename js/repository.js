function initRepository() {
  const cards = [...document.querySelectorAll(".resource-card")];
  const search = document.getElementById("repositorySearch");
  const filters = document.querySelector(".repository-toolbar .filter-group");
  const empty = document.getElementById("repositoryEmpty");
  const resourceCount = document.getElementById("resourceCount");
  const resourceTypeCount = document.getElementById("resourceTypeCount");
  const resourceVisibleCount = document.getElementById("resourceVisibleCount");
  let activeFilter = "all";

  function update() {
    const query = search.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const type = card.dataset.type || "";
      const searchText = `${card.dataset.search || ""} ${card.textContent}`.toLowerCase();
      const matchesType = activeFilter === "all" || type.split(" ").includes(activeFilter);
      const matchesSearch = !query || searchText.includes(query);
      const isVisible = matchesType && matchesSearch;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    empty.hidden = visibleCount > 0;
    resourceVisibleCount.textContent = visibleCount;
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-btn");
    if (!button) return;
    activeFilter = button.dataset.filter;
    filters.querySelectorAll(".filter-btn").forEach((filterButton) => {
      filterButton.classList.toggle("is-active", filterButton === button);
    });
    update();
  });

  search.addEventListener("input", update);

  const mobileToggle = document.querySelector(".mobile-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.toggle("is-open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  const uniqueTypes = new Set(cards.flatMap((card) => (card.dataset.type || "").split(" ").filter(Boolean)));
  resourceCount.textContent = cards.length;
  resourceTypeCount.textContent = uniqueTypes.size;
  update();
}

document.addEventListener("DOMContentLoaded", initRepository);
