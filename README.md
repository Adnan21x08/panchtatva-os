# Panchtatva OS v1.0 — Freshers Launch (Working Prototype)

This is a **working, static build** of Panchtatva OS — every page runs in a browser right now, with no build step, no server, no API keys required. It implements the sitemap, wireframes, design system, and content rules from the approved planning document (`Panchtatva_OS_v1_Planning_Doc.md`).

## How to open it

**Easiest:** double-click `index.html` — it opens directly in any browser. All data is embedded in `js/data.js`, so nothing needs to load over the network.

**Or, run a local server** (recommended, avoids any browser file:// quirks):
```
cd panchtatva-os
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

## What's real vs. what's a placeholder

**Real, straight from your archive — nothing invented:**
- All 60 events, parsed field-by-field from the archive's own "Detailed Event Archive" section (theme, category, date, venue, objective, collaborators, sponsors, competitions, etc.)
- The 2025–26 Core Team roster (23 named people, real roles)
- Achievements (Best Green Technology College Award, National Lightning Conference, Annual Day)
- All statistics (60 events, 22 collaborations, 349 posts, 86 reels, etc.)
- The Instagram handle (`@panchtatvazhdce`, verified via search, not guessed)
- The real logo, cropped cleanly from your WhatsApp screenshot into `assets/logo-circle-256.png`

**Placeholder, by necessity (flagged in the planning doc's Open Items):**
- **Photos/videos** — hosted on Cloudinary (see `LAUNCH_GUIDE.md` Parts A–B). `js/media-manifest.js` maps each event slug to its Cloudinary public IDs; `js/cloudinary.js` builds auto-optimized delivery URLs (`f_auto,q_auto` — right format, right size, per visitor, automatically). Events with nothing uploaded yet show a styled placeholder instead of a broken image. `fetch-cloudinary-manifest.py` auto-populates the manifest from whatever you've uploaded to Cloudinary, so you never hand-type a path.
- **2026–27 Core Council** — only the 2025–26 team is named individually in the archive; the Team page says so explicitly rather than guessing names.
- **Prakriti AI** — connected to Google's Gemini API via a secure Netlify serverless function (`netlify/functions/ask-prakriti.js`). The browser never sees your API key — it lives only as a Netlify environment variable. Each question is grounded in a small, relevant slice of the real archive (built client-side in `buildGeminiContext()`), and Gemini is instructed to answer only from that context, saying so honestly when it can't. If the backend isn't reachable (key not set yet, network issue), it falls back automatically to a built-in keyword-matching engine so the chat never breaks — see `LAUNCH_GUIDE.md` Part E to activate Gemini.
- **Notify Me** button and event registration are explicitly non-functional placeholders per the v1 scope in your brief.

## Architecture (why plain HTML/CSS/JS, not Next.js, for this pass)

The original tech stack (Next.js, Firebase, Cloudinary, Gemini, Vercel) needs real accounts, API keys, and a build/deploy pipeline that only you can provision. Rather than hand you a repo that can't run until all of that is wired up, this build is a **dependency-free static site** using the exact same design tokens, component boundaries, and data shape the planning doc specified — so it:
1. Works right now, in any browser, with zero setup.
2. Is a faithful visual/interaction preview of the real product.
3. Migrates cleanly into Next.js later: `js/data.js`'s shape maps directly onto the Firestore schema in the planning doc, `css/tokens.css` maps directly onto Tailwind theme config, and each `/js/*.js` file maps roughly 1:1 onto a React component.

## File structure
```
panchtatva-os/
  index.html, about.html, journey.html, events.html, event.html,
  gallery.html, gallery-album.html, achievements.html, team.html,
  assistant.html, join.html
  css/
    tokens.css       — design system variables (colors, type, spacing, motion)
    base.css         — reset + typography
    components.css   — buttons, cards, nav, footer, timeline, chat, etc.
    hero.css         — hero-specific animation
    pages.css        — per-page layout rules
  js/
    data.js           — auto-generated from the archive (do not hand-edit; regenerate from source)
    icons.js           — dependency-free inline SVG icon set
    layout.js           — shared header/footer, mounted on every page
    render-helpers.js  — shared card/cover-art rendering used across Home/Events/Journey/Gallery
    main.js            — scroll reveal, counters, hero leaf animation
    assistant.js       — Prakriti AI logic (archive-grounded Q&A)
    chat-widget.js      — sitewide floating chat launcher
    [page].js           — one file per page's specific rendering logic
  assets/
    logo-circle-256.png — cropped, transparent official logo
```

## Known gaps to close before a real launch
1. Upload event photos/videos to Cloudinary and run `fetch-cloudinary-manifest.py` (see `LAUNCH_GUIDE.md`).
2. Set `GEMINI_API_KEY` in Netlify's environment variables to activate real Gemini-backed answers (see `LAUNCH_GUIDE.md` Part E) — works with a simpler built-in fallback until then.
2. Confirm and add 2026–27 Core Council names to `js/data.js`'s `team` array.
3. Wire Prakriti AI to the Gemini API for richer natural-language answers (optional — current version already answers correctly for the example questions in your brief).
4. Replace the "Notify Me" placeholder with real email capture if desired.
5. Get a native, non-screenshot export of the logo for a sharper hero image at large sizes.
