// Scroll reveal
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || !els.length) {
    els.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  els.forEach(el => io.observe(el));
}

// Animated counters
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = target.toLocaleString(); return; }
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => io.observe(el));
}

// Hero drifting leaves — lightweight CSS-driven particles, skipped under reduced motion
function initHeroLeaves() {
  const field = document.getElementById('heroLeaves');
  if (!field) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count = window.innerWidth < 640 ? 8 : 14;
  for (let i = 0; i < count; i++) {
    const leaf = document.createElement('span');
    leaf.className = 'hero-leaf';
    leaf.innerHTML = icon('leaf');
    const left = Math.random() * 100;
    const delay = Math.random() * 12;
    const dur = 14 + Math.random() * 10;
    const scale = 0.5 + Math.random() * 0.8;
    const hueSet = ['var(--leaf-300)', 'var(--gold-400)', 'var(--leaf-200)'];
    leaf.style.cssText = `left:${left}%; animation-delay:-${delay}s; animation-duration:${dur}s; --scale:${scale}; color:${hueSet[i % hueSet.length]}`;
    field.appendChild(leaf);
  }
}

function initFooterInstagram() {
  const els = document.querySelectorAll('#footerInstagram, [data-instagram]');
  els.forEach(el => { el.href = 'https://www.instagram.com/panchtatvazhdce/'; });
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initCounters();
  initHeroLeaves();
  initFooterInstagram();
});
