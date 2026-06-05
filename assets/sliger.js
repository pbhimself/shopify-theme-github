(() => {
  function closeHeader(header) {
    const toggle = header.querySelector("[data-sliger-menu-toggle]");
    header.dataset.sligerMenu = "closed";
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest("[data-sliger-menu-toggle]");
    if (toggle) {
      const header = toggle.closest("[data-sliger-header]");
      const isOpen = header?.dataset.sligerMenu === "open";
      if (!header) return;
      header.dataset.sligerMenu = isOpen ? "closed" : "open";
      toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
      return;
    }

    document.querySelectorAll("[data-sliger-header][data-sliger-menu='open']").forEach((header) => {
      if (!header.contains(event.target)) closeHeader(header);
    });

    const navLink = event.target.closest("[data-sliger-header] .sliger-nav a");
    if (navLink) {
      const header = navLink.closest("[data-sliger-header]");
      if (header) closeHeader(header);
    }

    const filter = event.target.closest("[data-sliger-filter]");
    if (!filter) return;

    const group = filter.closest("[data-sliger-filter-group]");
    const target = filter.dataset.sligerFilter;
    if (!group || !target) return;

    group.querySelectorAll("[data-sliger-filter]").forEach((button) => {
      const active = button === filter;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    document.querySelectorAll("[data-sliger-product]").forEach((card) => {
      const categories = (card.dataset.sligerProduct || "").split(" ");
      const shouldShow = target === "all" || categories.includes(target);
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });
})();
