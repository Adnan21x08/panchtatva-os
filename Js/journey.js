let activeYear = "all";
let activeCategory = "all";
let searchTerm = "";

function renderFilters() {
  const yearChips = ["all", ...DATA.years].map(y =>
    `<button class="chip ${activeYear == y ? 'active' : ''}" data-year="${y}">${y === "all" ? "All Years" : y}</button>`
  ).join("");
  document.getElementById("yearChips").innerHTML = yearChips;

  const catChips = ["all", ...DATA.categories].map(c =>
    `<button class="chip ${activeCategory === c ? 'active' : ''}" data-cat="${c}">${c === "all" ? "All Categories" : c}</button>`
  ).join("");
  document.getElementById("catChips").innerHTML = catChips;

  document.querySelectorAll("[data-year]").forEach(btn =>
    btn.addEventListener("click", () => { activeYear = btn.dataset.year; renderFilters(); renderTimeline(); }));
  document.querySelectorAll("[data-cat]").forEach(btn =>
    btn.addEventListener("click", () => { activeCategory = btn.dataset.cat; renderFilters(); renderTimeline(); }));
}

function renderTimeline() {
  let events = eventsSorted(true);
  if (activeYear !== "all") events = events.filter(e => String(e.year) === String(activeYear));
  if (activeCategory !== "all") events = events.filter(e => e.category === activeCategory);
  if (searchTerm) {
    const t = searchTerm.toLowerCase();
    events = events.filter(e => (e.title + " " + (e.story||"") + " " + e.category).toLowerCase().includes(t));
  }

  const countEl = document.getElementById("resultCount");
  countEl.textContent = `${events.length} event${events.length === 1 ? "" : "s"}`;

  const wrap = document.getElementById("timelineWrap");
  if (!events.length) {
    wrap.innerHTML = `<div class="empty-state">${icon('leaf')}<p>No events match these filters. Try a different year or category.</p></div>`;
    return;
  }

  wrap.innerHTML = events.map((ev, i) => `
    <div class="timeline-node ${ev.isFlagship ? 'flagship' : ''} reveal in" style="--i:${i % 10}">
      <span class="timeline-dot"></span>
      <a class="timeline-card" href="event.html?slug=${ev.slug}">
        <div class="timeline-date">${ev.dateDisplay}${ev.isFlagship ? ' · Flagship' : ''}</div>
        <h4 style="margin:0 0 6px;">${ev.title}</h4>
        <p style="font-size:0.88rem;margin:0 0 8px;color:var(--grey-700);">${truncate(ev.story || ev.objective || '', 130)}</p>
        <span class="tag">${ev.category}</span>
      </a>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("journey");
  renderFilters();
  renderTimeline();
  document.getElementById("searchInput").addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderTimeline();
  });
});
