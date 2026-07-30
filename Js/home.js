function renderStatStrip() {
  const s = DATA.stats;
  const items = [
    { n: s.totalEvents, l: "Events Documented" },
    { n: s.totalCollaborations, l: "Collaborations" },
    { n: s.totalRecruitmentDrives, l: "Recruitment Drives" },
    { n: s.totalPosts, l: "Instagram Posts" },
  ];
  document.getElementById("statStrip").innerHTML = items.map(i => `
    <div class="stat-item">
      <div class="stat-num" data-count="${i.n}">0</div>
      <div class="stat-label">${i.l}</div>
    </div>`).join("");
}

const WHY_JOIN = [
  { icon: "users", title: "Leadership", body: "Step into real roles — the 2025–26 team ran a full President-to-Heads structure, not a title with no responsibility." },
  { icon: "briefcase", title: "Event Management", body: "Help run multi-day fests like Nature Nexus and Eco Splash from planning to prize distribution." },
  { icon: "monitor", title: "Technical Experience", body: "Own the digital front — a dedicated Technical Head role has shaped how the club shows up online." },
  { icon: "camera", title: "Photography & Design", body: "349 posts and 86 reels didn't make themselves — Creative and Content Heads built that output." },
  { icon: "mic", title: "Public Speaking", body: "Compete in real inter-college speech and extempore rounds held under Wildlife Week and Nature Nexus." },
  { icon: "handshake", title: "Networking", body: "22 external collaborations and 8 media partners across one session alone." },
  { icon: "award", title: "Recognition", body: "Office bearers and core team are publicly felicitated at flagship events — your work gets seen." },
  { icon: "sprout", title: "Real Projects", body: "Plantation drives, awareness campaigns, and field visits with real, documented outcomes." },
];

function renderWhyJoin() {
  document.getElementById("whyJoinGrid").innerHTML = WHY_JOIN.map((w, i) => `
    <div class="why-card reveal" style="--i:${i}">
      <div class="why-icon">${icon(w.icon)}</div>
      <h4>${w.title}</h4>
      <p>${w.body}</p>
    </div>`).join("");
}

function renderFeaturedEvents() {
  const flagship = eventsSorted(true).filter(e => e.isFlagship).slice(0, 4);
  const fallback = flagship.length >= 3 ? flagship : eventsSorted(true).slice(0, 4);
  document.getElementById("featuredRail").innerHTML = fallback.map(eventCard).join("");
}

function renderJourneyPreview() {
  const recent = eventsSorted(true).slice(0, 4);
  document.getElementById("journeyPreview").innerHTML = recent.map((ev, i) => `
    <div class="timeline-node ${ev.isFlagship ? 'flagship' : ''} reveal" style="--i:${i}">
      <span class="timeline-dot"></span>
      <a class="timeline-card" href="event.html?slug=${ev.slug}">
        <div class="timeline-date">${ev.dateDisplay}</div>
        <h4 style="margin:0 0 4px;">${ev.title}</h4>
        <span class="tag">${ev.category}</span>
      </a>
    </div>`).join("");
}

function renderGalleryPreview() {
  const picks = eventsSorted(true).filter(e => e.isFlagship).slice(0, 3);
  const arr = picks.length >= 3 ? picks : eventsSorted(true).slice(0, 3);
  document.getElementById("galleryPreview").innerHTML = arr.map(albumTile).join("");
}

function renderAchievements() {
  document.getElementById("achievementsRail").innerHTML = DATA.achievements.map((a, i) => `
    <div class="achievement-card reveal" style="--i:${i}">
      <div class="achievement-icon">${icon('award')}</div>
      <div class="tag tag-gold" style="margin-bottom:8px;">${a.date}</div>
      <h4>${a.title}</h4>
      <p style="font-size:0.88rem;color:var(--grey-500);margin-bottom:6px;">${a.organization}</p>
      <p style="font-size:0.9rem;">${a.description}</p>
    </div>`).join("");
}

function renderLatestUpdates() {
  const sorted = [...DATA.announcements].sort((a,b) => (b.pinned - a.pinned) || b.date.localeCompare(a.date));
  document.getElementById("latestUpdates").innerHTML = sorted.map(a => `
    <div class="update-row">
      <div class="update-date">${a.date}</div>
      <div>
        <strong>${a.title}</strong>
        <p style="margin:2px 0 0;font-size:0.9rem;">${a.summary}</p>
      </div>
      ${a.pinned ? '<span class="tag tag-gold">New</span>' : ''}
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("home");
  renderStatStrip();
  renderWhyJoin();
  renderFeaturedEvents();
  renderJourneyPreview();
  renderGalleryPreview();
  renderAchievements();
  renderLatestUpdates();
  initReveal();
  initCounters();
});
