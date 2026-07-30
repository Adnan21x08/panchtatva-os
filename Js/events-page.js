let evActiveCategory = "all";

function renderEventFilters() {
  const chips = ["all", ...DATA.categories].map(c =>
    `<button class="chip ${evActiveCategory === c ? 'active' : ''}" data-cat="${c}">${c === "all" ? "All" : c}</button>`
  ).join("");
  document.getElementById("evCatChips").innerHTML = chips;
  document.querySelectorAll("#evCatChips [data-cat]").forEach(btn =>
    btn.addEventListener("click", () => { evActiveCategory = btn.dataset.cat; renderEventFilters(); renderEventsGrid(); }));
}

function renderEventsGrid() {
  let events = eventsSorted(true);
  if (evActiveCategory !== "all") events = events.filter(e => e.category === evActiveCategory);
  document.getElementById("eventsCount").textContent = `${events.length} event${events.length === 1 ? "" : "s"}`;
  const grid = document.getElementById("eventsGrid");
  if (!events.length) {
    grid.innerHTML = `<div class="empty-state">${icon('leaf')}<p>No events in this category.</p></div>`;
    return;
  }
  grid.innerHTML = events.map(eventCard).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("events");
  renderEventFilters();
  renderEventsGrid();
});
