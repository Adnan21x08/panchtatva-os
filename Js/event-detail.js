function getSlugFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("slug");
}

function renderEventPage() {
  const slug = getSlugFromQuery();
  const ev = getEventBySlug(slug);
  const root = document.getElementById("eventRoot");

  if (!ev) {
    root.innerHTML = `<div class="section"><div class="container empty-state">
      ${icon('leaf')}
      <h2>Event not found</h2>
      <p>This event may have moved. Browse all events instead.</p>
      <a href="events.html" class="btn btn-primary">Back to Events</a>
    </div></div>`;
    return;
  }

  document.title = `${ev.title} — Panchtatva`;

  const related = relatedEvents(ev, 3);

  root.innerHTML = `
  <section class="page-hero">
    <div class="container">
      <a href="events.html" class="btn-ghost" style="color:var(--gold-300);margin-bottom:var(--sp-3);display:inline-block;">← All Events</a>
      <div class="event-meta-row">
        <span class="tag ${ev.isFlagship ? 'tag-gold' : ''}">${ev.category}</span>
        ${ev.edition ? `<span class="tag tag-outline" style="color:var(--cream-100);border-color:rgba(255,255,255,0.4);">Edition ${ev.edition}</span>` : ''}
        <span style="color:var(--leaf-200);font-size:0.9rem;">${icon('calendar')} ${ev.dateDisplay}</span>
      </div>
      <h1>${ev.title}</h1>
      ${ev.theme ? `<p style="color:var(--gold-300);font-style:italic;">${ev.theme}</p>` : ''}
      <div class="event-hero-media">${coverArt(ev, ev.dateDisplay)}</div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="event-body-grid">
        <div>
          <div class="event-block">
            <h3>${icon('book-open')} Story</h3>
            <p>${ev.story || 'A detailed narrative for this event is being compiled.'}</p>
          </div>

          ${ev.objective ? `
          <div class="event-block">
            <h3>${icon('sprout')} Objective</h3>
            <p>${ev.objective}</p>
          </div>` : ''}

          ${ev.highlights && ev.highlights.length ? `
          <div class="event-block">
            <h3>${icon('sparkles')} Key Highlights</h3>
            <ul style="padding-left:20px;list-style:disc;">
              ${ev.highlights.map(h => `<li style="margin-bottom:8px;color:var(--grey-700);">${h}</li>`).join('')}
            </ul>
          </div>` : ''}

          ${ev.impact && ev.impact.length ? `
          <div class="event-block">
            <h3>${icon('zap')} Impact</h3>
            <div class="impact-grid">
              ${ev.impact.map(i => `<div class="impact-item"><div class="num">${i.value}</div><div class="lbl">${i.label}</div></div>`).join('')}
            </div>
          </div>` : ''}

          <div class="event-block">
            <h3>${icon('camera')} Gallery</h3>
            ${(() => {
              const media = getMedia(ev.slug);
              const items = [];
              if (media.cover) items.push(media.cover);
              (media.photos || []).forEach(p => items.push(p));
              if (items.length) {
                return `<div class="media-grid">${items.slice(0, 8).map((publicId, i) =>
                  `<a class="media-tile" href="gallery-album.html?slug=${ev.slug}"><img src="${cldImg(publicId, 400)}" alt="${ev.title} photo ${i+1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></a>`
                ).join('')}</div>
                <div style="margin-top:var(--sp-3);"><a href="gallery-album.html?slug=${ev.slug}" class="btn-ghost">View full album</a></div>`;
              }
              if (media.instagramPosts && media.instagramPosts.length) {
                return `<div id="igEmbedWrap">${media.instagramPosts.map(instagramEmbedHTML).join('')}</div>`;
              }
              return `<div class="media-grid">${Array.from({length: 6}).map(() => `<div class="media-tile">${coverArt(ev, '')}</div>`).join('')}</div>
              <p class="confidence-note">Real photos and videos for this event will appear here once uploaded to Cloudinary and listed in <code>js/media-manifest.js</code> — see LAUNCH_GUIDE.md.</p>`;
            })()}
          </div>

          ${related.length ? `
          <div class="event-block">
            <h3>${icon('compass')} Related Events</h3>
            <div class="grid grid-3">${related.map(eventCard).join('')}</div>
          </div>` : ''}

          <div class="share-row">
            <button class="btn btn-outline btn-sm" onclick="navigator.share ? navigator.share({title: document.title, url: location.href}) : copyLink()">Share this event</button>
          </div>
        </div>

        <aside>
          <div class="sidebar-card">
            <h4>At a Glance</h4>
            <ul class="sidebar-list">
              <li><strong>Date:</strong> ${ev.dateDisplay}</li>
              ${ev.duration ? `<li><strong>Duration:</strong> ${ev.duration}</li>` : ''}
              ${ev.venue ? `<li><strong>Venue:</strong> ${ev.venue}</li>` : ''}
              <li><strong>Category:</strong> ${ev.categoryFull}</li>
            </ul>
          </div>

          ${ev.collaborators.length || ev.sponsors.length || ev.mediaPartners.length ? `
          <div class="sidebar-card">
            <h4>Collaborators & Sponsors</h4>
            <ul class="sidebar-list">
              ${ev.collaborators.map(c => `<li>${icon('handshake')} ${c}</li>`).join('')}
              ${ev.sponsors.map(c => `<li>${icon('award')} ${c} (Sponsor)</li>`).join('')}
              ${ev.mediaPartners.map(c => `<li>${icon('megaphone')} ${c} (Media Partner)</li>`).join('')}
            </ul>
          </div>` : ''}

          ${ev.chiefGuests || ev.speakers ? `
          <div class="sidebar-card">
            <h4>Guests & Speakers</h4>
            <ul class="sidebar-list">
              ${ev.chiefGuests ? `<li>${ev.chiefGuests}</li>` : ''}
              ${ev.speakers ? `<li>${ev.speakers}</li>` : ''}
            </ul>
          </div>` : ''}

          <p class="confidence-note">Source confidence: ${ev.confidence || 'Derived from the Panchtatva Instagram archive.'}</p>
        </aside>
      </div>
    </div>
  </section>`;
}

function copyLink() {
  navigator.clipboard?.writeText(location.href);
  alert("Link copied");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("events");
  renderEventPage();
  processInstagramEmbeds();
});
