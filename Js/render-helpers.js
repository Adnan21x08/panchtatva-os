// Shared rendering helpers — one implementation, reused everywhere a card/cover appears.
const DATA = window.PANCHTATVA_DATA;

function hueForEvent(ev) {
  const n = (ev.id || 0) % 5;
  return `hue-${n === 0 ? 5 : n}`;
}

function getMedia(slug) {
  return (window.MEDIA_MANIFEST && window.MEDIA_MANIFEST[slug]) || {};
}

function coverArt(ev, label) {
  const media = getMedia(ev.slug);
  if (media.cover) {
    return `
    <div class="cover-art cover-photo">
      <img src="${cldImg(media.cover, 640)}" alt="${ev.title}" loading="lazy">
    </div>`;
  }
  return `
  <div class="cover-art ${hueForEvent(ev)}">
    ${icon(ev.icon, '')}
    <span class="cover-label">${label || ev.categoryFull}</span>
  </div>`;
}

function eventCard(ev, opts) {
  opts = opts || {};
  const impactBits = ev.impact && ev.impact.length
    ? `<span>${icon('camera')} ${ev.impact.map(i => `${i.value} ${i.label}`).join(' · ')}</span>` : '';
  return `
  <a class="card" href="event.html?slug=${ev.slug}">
    <div class="card-media">${coverArt(ev)}</div>
    <div class="card-body">
      <div class="card-meta">
        <span class="tag ${ev.isFlagship ? 'tag-gold' : ''}">${ev.category}</span>
        <span>${ev.dateDisplay}</span>
      </div>
      <h3 class="card-title">${ev.title}</h3>
      <p class="card-summary">${truncate(ev.story || ev.objective || '', 110)}</p>
      <div class="card-footer">
        <span class="btn-ghost" style="padding:0;font-size:0.88rem;">Explore</span>
      </div>
    </div>
  </a>`;
}

function albumTile(ev) {
  const media = getMedia(ev.slug);
  let photos, reels;
  if (media.instagramPosts && media.instagramPosts.length) {
    photos = media.instagramPosts.filter(u => u.includes('/p/')).length || media.instagramPosts.length;
    reels = media.instagramPosts.filter(u => u.includes('/reel/')).length;
  } else if (media.photos || media.videos) {
    photos = (media.photos || []).length + (media.cover ? 1 : 0);
    reels = (media.videos || []).length;
  } else {
    photos = ev.numPosts ? Number(ev.numPosts) : (ev.impact.find(i=>i.label==='Instagram Posts')?.value || '—');
    reels = ev.numReels || '0';
  }
  return `
  <a class="card" href="gallery-album.html?slug=${ev.slug}">
    <div class="card-media">${coverArt(ev)}</div>
    <div class="card-body">
      <span class="tag">${ev.category}</span>
      <h3 class="card-title">${ev.title}</h3>
      <p class="card-summary">${truncate(ev.story || 'A memory captured in photos and reels.', 90)}</p>
      <div class="card-meta card-footer">
        <span>${icon('camera')} ${photos} Photos</span>
        <span>${icon('video')} ${reels} Videos</span>
      </div>
    </div>
  </a>`;
}

function truncate(str, len) {
  if (!str) return '';
  return str.length > len ? str.slice(0, len).trim() + '…' : str;
}

function fmtList(arr) {
  if (!arr || !arr.length) return null;
  return arr.join(', ');
}

function eventsSorted(desc) {
  const arr = [...DATA.events];
  arr.sort((a, b) => (a.dateSort || '').localeCompare(b.dateSort || ''));
  return desc ? arr.reverse() : arr;
}

function getEventBySlug(slug) {
  return DATA.events.find(e => e.slug === slug);
}

function relatedEvents(ev, count) {
  const ids = ev.relatedEventIds || [];
  return ids.map(id => DATA.events.find(e => e.id === id)).filter(Boolean).slice(0, count || 3);
}
