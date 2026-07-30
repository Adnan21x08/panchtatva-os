// MEDIA MANIFEST — this is the ONLY file you need to edit to add your real photos and videos.
// Media is hosted on Cloudinary. This file just maps each event to its Cloudinary "public IDs"
// (Cloudinary's term for a file's path/name once uploaded) — the actual image/video bytes
// live on Cloudinary's CDN, not in this repo, so the site stays small and fast to load.
//
// HOW TO USE (see LAUNCH_GUIDE.md Part A for the full walkthrough):
// 1. Upload your photos/videos to Cloudinary, into a folder named:
//      panchtatva/events/<slug>/
//    using the exact slug shown in the comment next to each line below.
// 2. Either run `python3 fetch-cloudinary-manifest.py` to fill this file in automatically,
//    OR fill an entry in by hand using the public ID Cloudinary shows after upload, e.g.:
//
//   "01-core-team-introduction-series-session-202526": {
//     cover: "panchtatva/events/01-core-team-introduction-series-session-202526/cover",
//     photos: [
//       "panchtatva/events/01-core-team-introduction-series-session-202526/photo-1",
//       "panchtatva/events/01-core-team-introduction-series-session-202526/photo-2"
//     ],
//     videos: [
//       "panchtatva/events/01-core-team-introduction-series-session-202526/clip-1"
//     ]
//   },
//
// 3. Events left as {} keep showing the styled placeholder — totally fine to launch with
//    only your flagship events filled in first.
//
// OPTIONAL FALLBACK: for an event where you only have an Instagram post link and no
// downloaded photo, you can add `instagramPosts: ["https://www.instagram.com/p/XXXX/"]`
// instead of cover/photos — it renders as an official Instagram embed. Cloudinary media
// always takes priority over this when both are present on the same event.

window.MEDIA_MANIFEST = {
  "03-world-biodiversity-day-webinar-virtual-visit-tughlakabad-bio": {}, // World Biodiversity Day Webinar & Virtual Visit – Tughlakabad Biodiversity Park (May 22, 2025)
  "04-world-environment-day-2025-137-pens-1-planet-plastic-pen-col": {}, // World Environment Day 2025 – "137 Pens, 1 Planet" Plastic Pen Collection Drive (June 5, 2025)
  "06-van-mahotsav-week-2025": {}, // Van Mahotsav Week 2025 (July 7, 2025)
  "07-whispers-of-garden-20-nature-biodiversity-walk": {}, // Whispers of Garden 2.0 – Nature & Biodiversity Walk (August 13, 2025)
  "01-core-team-introduction-series-session-202526": {}, // Core Team Introduction Series – Session 2025–26 (September 20, 2025)
  "09-visit-to-amrit-udyan-rashtrapati-bhavan": {}, // Visit to Amrit Udyan, Rashtrapati Bhavan (September 20, 2025)
  "05-world-environment-week-2025-with-bit-sindri-collaboration-ev": {}, // World Environment Week 2025 (with BIT Sindri collaboration) & Everyday Sustainability Tips (September 21, 2025)
  "08-recruitment-drive-202526": {}, // Recruitment Drive 2025–26 (September 21, 2025)
  "10-orientation-program-2025": {}, // Orientation Program 2025 (September 22, 2025)
  "02-know-the-bee-workshop": {}, // Know the Bee Workshop (September 24, 2025)
  "11-cleanliness-drive-swachhata-hi-seva-2025-swachhotsav": {}, // Cleanliness Drive – Swachhata Hi Seva 2025 (Swachhotsav) (September 29, 2025)
  "14-tughlakabad-biodiversity-park-nature-walk-60-students": {}, // Tughlakabad Biodiversity Park Nature Walk (60+ students) (October 6, 2025)
  "12-national-wildlife-week-2025-incl-inter-college-speech-compet": {}, // National Wildlife Week 2025 (incl. Inter-College Speech Competition) (October 8, 2025)
  "13-vasundhara-ecotsav-30-diwali-mela-2025": {}, // Vasundhara Ecotsav 3.0 – Diwali Mela 2025 (October 15, 2025)
  "15-international-snow-leopard-day-awareness-post": {}, // International Snow Leopard Day Awareness Post (October 23, 2025)
  "16-international-lemur-day-awareness-post": {}, // International Lemur Day Awareness Post (October 24, 2025)
  "17-international-gibbon-day-awareness-post": {}, // International Gibbon Day Awareness Post (October 24, 2025)
  "23-educational-visit-44th-india-international-trade-fair": {}, // Educational Visit – 44th India International Trade Fair (November 1, 2025)
  "18-re-recruitment-drive-2025": {}, // Re-Recruitment Drive 2025 (November 2, 2025)
  "20-vande-mataram-150-years-celebration": {}, // Vande Mataram 150 Years Celebration (November 7, 2025)
  "19-educational-visit-to-pradhan-mantri-sangrahalaya": {}, // Educational Visit to Pradhan Mantri Sangrahalaya (November 10, 2025)
  "21-health-mela-2025-incl-thalassemia-ayurveda-awareness-session": {}, // Health Mela 2025 (incl. Thalassemia & Ayurveda Awareness Session) (November 26, 2025)
  "22-air-pollution-protection-awareness-reel": {}, // Air Pollution Protection Awareness Reel (November 27, 2025)
  "24-van-mahotsav-winter-plantation-plant-today-breathe-tomorrow-": {}, // Van Mahotsav (Winter Plantation) – 'Plant Today, Breathe Tomorrow' (70 Saplings) (December 1, 2025)
  "25-samvidhan-mahotsav-20": {}, // Samvidhan Mahotsav 2.0 (December 1, 2025)
  "26-bhumitra-quiz-world-soil-day-quiz-competition": {}, // Bhūmitra Quiz – World Soil Day Quiz Competition (December 5, 2025)
  "27-session-wrap-reel-closing-the-book-for-now": {}, // Session Wrap Reel — 'Closing the Book for Now' (December 7, 2025)
  "28-international-mountain-day-awareness-post": {}, // International Mountain Day Awareness Post (December 11, 2025)
  "29-goodbye-2025-year-end-reel": {}, // Goodbye 2025 / Year-End Reel (December 12, 2025)
  "30-hornbill-festival-2025-awareness-post": {}, // Hornbill Festival 2025 Awareness Post (December 16, 2025)
  "31-air-pollution-policy-awareness-posts-dec-2025": {}, // Air Pollution Policy Awareness Posts (Dec 2025) (December 20, 2025)
  "32-9th-national-lightning-conference": {}, // 9th National Lightning Conference (December 22, 2025)
  "33-know-your-leader-participation-of-youth-lok-sabha-pride-prog": {}, // 'Know Your Leader – Participation of Youth' (Lok Sabha PRIDE Programme) (December 25, 2025)
  "38-youth-dialogue-on-delhis-air-pollution": {}, // Youth Dialogue on Delhi's Air Pollution (January 1, 2026)
  "34-member-felicitation-announcement-pre-annual-event": {}, // Member Felicitation Announcement (Pre-Annual Event) (January 2, 2026)
  "35-sustainable-fashion-fusion-post": {}, // Sustainable Fashion Fusion Post (January 3, 2026)
  "36-e-waste-awareness-workshop": {}, // E-Waste Awareness Workshop (January 12, 2026)
  "37-excursion-to-national-zoological-park-jan-2026": {}, // Excursion to National Zoological Park (Jan 2026) (January 18, 2026)
  "39-vasant-panchami-greeting-post": {}, // Vasant Panchami Greeting Post (January 22, 2026)
  "40-republic-day-flag-hoisting-ceremony-plantation-drive": {}, // Republic Day Flag Hoisting Ceremony & Plantation Drive (January 26, 2026)
  "41-eco-splash-26-annual-event-flagship-cultural-environmental-f": {}, // Eco Splash '26 — Annual Event / Flagship Cultural-Environmental Fest (February 16, 2026)
  "43-rangveda-eco-friendly-holi-colour-making-workshop": {}, // RāngVedā — Eco-Friendly Holi Colour-Making Workshop (February 27, 2026)
  "47-international-film-festival-of-india-delhi-road-safety-sessi": {}, // International Film Festival of India, Delhi — Road Safety Session (March 1, 2026)
  "44-world-wildlife-day-national-zoological-park-excursion": {}, // World Wildlife Day — National Zoological Park Excursion (March 3, 2026)
  "42-harit-2026-holistic-action-for-rejuvenating-indigenous-tradi": {}, // HARIT 2026 — Holistic Action for Rejuvenating Indigenous Traditions (March 7, 2026)
  "45-chai-pe-charcha-laal-qila-with-psg-sabhyata-foundation": {}, // Chai Pe Charcha @ Laal Qila (with PSG & Sabhyata Foundation) (March 9, 2026)
  "48-spring-picnic": {}, // Spring Picnic (March 30, 2026)
  "46-nature-nexus-50-annual-eco-fest": {}, // Nature Nexus 5.0 — Annual Eco Fest (April 22, 2026)
  "49-session-sign-off-202526-scribble-farewell": {}, // Session Sign-Off 2025–26 & 'Scribble' Farewell (April 27, 2026)
  "51-64th-annual-day-prize-distribution-ceremony-college-level": {}, // 64th Annual Day & Prize Distribution Ceremony (College-Level) (May 1, 2026)
  "50-met-galathemed-environmental-post": {}, // Met Gala–Themed Environmental Post (May 9, 2026)
  "52-international-day-for-biological-diversity-2026": {}, // International Day for Biological Diversity 2026 (May 22, 2026)
  "53-signing-off-series-outgoing-office-bearers-202526": {}, // Signing-Off Series — Outgoing Office Bearers (2025–26) (May 29, 2026)
  "54-best-green-technology-college-award-blue-economy-summit-2026": {}, // Best Green Technology College Award — Blue Economy Summit 2026 (June 1, 2026)
  "55-core-team-recruitment-202627": {}, // Core Team Recruitment 2026–27 (June 14, 2026)
  "56-annual-report-happy-ending-session-retrospective-202526": {}, // Annual Report / 'Happy Ending' Session Retrospective (2025–26) (June 16, 2026)
  "57-core-council-unveiling-session-202627": {}, // Core Council Unveiling — Session 2026–27 (July 1, 2026)
  "58-van-mahotsav-week-2026": {}, // Van Mahotsav Week 2026 (July 7, 2026)
  "59-the-legacy-continues-202627-season-teaser": {}, // 'The Legacy Continues' — 2026–27 Season Teaser (July 15, 2026)
  "60-freshers-help-desk-welcome-batch-202627": {}, // Freshers Help Desk & Welcome — Batch 2026–27 (July 19, 2026)
};
