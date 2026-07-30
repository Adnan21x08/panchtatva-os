let lightboxIndex = 0;
let albumItems = []; // [{type:'photo'|'video', src}]

function renderAlbumPage() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const ev = getEventBySlug(slug);
  const root = document.getElementById("albumRoot");

  if (!ev) {
    root.innerHTML = `<div class="section"><div class="container empty-state">
      ${icon('leaf')}<h2>Album not found</h2>
      <a href="gallery.html" class="btn btn-primary">Back to Gallery</a>
    </div></div>`;
    return;
  }

  document.title = `${ev.title} — Gallery — Panchtatva`;
  const media = getMedia(ev.slug);
  const hasCloudinary = !!(media.cover || (media.photos && media.photos.length) || (media.videos && media.videos.length));
  const hasInstagram = !hasCloudinary && !!(media.instagramPosts && media.instagramPosts.length);

  if (hasInstagram) {
    root.innerHTML = `
    <section class="page-hero">
      <div class="container">
        <a href="gallery.html" class="btn-ghost" style="color:var(--gold-300);margin-bottom:var(--sp-3);display:inline-block;">← All Albums</a>
        <p class="eyebrow">${ev.category}</p>
        <h1>${ev.title}</h1>
        <p>${ev.story || ''}</p>
      </div>
    </section>
    <section class="section">
      <div class="container" style="max-width:640px;">
        <div id="igEmbedWrap">${media.instagramPosts.map(instagramEmbedHTML).join('')}</div>
        <div style="text-align:center;margin-top:var(--sp-5);">
          <a href="event.html?slug=${ev.slug}" class="btn btn-outline">View Full Event Page</a>
        </div>
      </div>
    </section>`;
    return;
  }

  albumItems = [];
  if (hasCloudinary) {
    if (media.cover) albumItems.push({ type: "photo", publicId: media.cover });
    (media.photos || []).forEach(publicId => albumItems.push({ type: "photo", publicId }));
    (media.videos || []).forEach(publicId => albumItems.push({ type: "video", publicId }));
  } else {
    const photoCount = Number(ev.numPosts) || 8;
    const tileCount = Math.min(Math.max(photoCount, 6), 24);
    albumItems = Array.from({ length: tileCount }).map(() => ({ type: "placeholder" }));
  }

  const photoCountDisplay = hasCloudinary ? albumItems.filter(i => i.type === "photo").length : (Number(ev.numPosts) || albumItems.length);
  const videoCountDisplay = hasCloudinary ? albumItems.filter(i => i.type === "video").length : (ev.numReels || 0);

  root.innerHTML = `
  <section class="page-hero">
    <div class="container">
      <a href="gallery.html" class="btn-ghost" style="color:var(--gold-300);margin-bottom:var(--sp-3);display:inline-block;">← All Albums</a>
      <p class="eyebrow">${ev.category}</p>
      <h1>${ev.title}</h1>
      <p>${ev.story || ''}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="card-meta" style="margin-bottom:var(--sp-4);">
        <span>${icon('camera')} ${photoCountDisplay} Photos</span>
        <span>${icon('video')} ${videoCountDisplay} Videos</span>
      </div>
      <div class="media-grid" id="mediaGrid">
        ${albumItems.map((item, i) => {
          if (item.type === "photo") {
            return `<button class="media-tile" data-i="${i}"><img src="${cldImg(item.publicId, 400)}" alt="${ev.title} photo ${i+1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></button>`;
          }
          if (item.type === "video") {
            return `<button class="media-tile" data-i="${i}" style="position:relative;background:#000;">
              <img src="${cldVideoPoster(item.publicId)}" alt="${ev.title} video ${i+1}" loading="lazy" style="width:100%;height:100%;object-fit:cover;">
              <span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;">${icon('play')}</span>
            </button>`;
          }
          return `<button class="media-tile" data-i="${i}">${coverArt(ev, `Frame ${i+1}`)}</button>`;
        }).join('')}
      </div>
      ${hasCloudinary ? '' : `<p class="confidence-note" style="margin-top:var(--sp-5);">This album shows placeholder frames — upload photos to Cloudinary and list the public IDs in <code>js/media-manifest.js</code> to replace these. See LAUNCH_GUIDE.md.</p>`}
      <div style="margin-top:var(--sp-6);">
        <a href="event.html?slug=${ev.slug}" class="btn btn-outline">View Full Event Page</a>
      </div>
    </div>
  </section>
  <div class="lightbox-overlay" id="lightbox" role="dialog" aria-modal="true" aria-label="Media viewer">
    <div class="lightbox-content" id="lightboxContent"></div>
    <button class="lightbox-close" id="lbClose" aria-label="Close">${icon('x')}</button>
    <button class="lightbox-prev" id="lbPrev" aria-label="Previous">${icon('chevron-left')}</button>
    <button class="lightbox-next" id="lbNext" aria-label="Next">${icon('chevron-right')}</button>
  </div>`;

  document.querySelectorAll(".media-tile").forEach(t =>
    t.addEventListener("click", () => openLightbox(parseInt(t.dataset.i, 10), ev)));
  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lbPrev").addEventListener("click", () => step(-1, ev));
  document.getElementById("lbNext").addEventListener("click", () => step(1, ev));
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    const lb = document.getElementById("lightbox");
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1, ev);
    if (e.key === "ArrowRight") step(1, ev);
  });

  // Swipe support
  let touchStartX = null;
  const lb = document.getElementById("lightbox");
  lb.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; });
  lb.addEventListener("touchend", (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) step(dx > 0 ? -1 : 1, ev);
    touchStartX = null;
  });
}

function openLightbox(i, ev) {
  lightboxIndex = i;
  renderLightboxFrame(ev);
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function step(dir, ev) {
  lightboxIndex = (lightboxIndex + dir + albumItems.length) % albumItems.length;
  renderLightboxFrame(ev);
}
function renderLightboxFrame(ev) {
  const item = albumItems[lightboxIndex];
  const box = document.getElementById("lightboxContent");
  if (item.type === "photo") {
    box.innerHTML = `<img src="${cldImg(item.publicId, 1400)}" alt="${ev.title}" style="max-width:90vw;max-height:82vh;border-radius:12px;display:block;">`;
  } else if (item.type === "video") {
    box.innerHTML = `<video src="${cldVideo(item.publicId)}" poster="${cldVideoPoster(item.publicId)}" controls autoplay style="max-width:90vw;max-height:82vh;border-radius:12px;display:block;"></video>`;
  } else {
    box.innerHTML = `<div style="width:70vw;max-width:640px;aspect-ratio:4/3;border-radius:16px;overflow:hidden;">${coverArt(ev, `Frame ${lightboxIndex+1} of ${albumItems.length}`)}</div>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("gallery");
  renderAlbumPage();
  processInstagramEmbeds();
});
