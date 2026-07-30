// CLOUDINARY CONFIG
// Set this to your Cloudinary "Cloud name" (found on your Cloudinary dashboard home page).
// This is a public identifier, not a secret — safe to commit and ship to the browser.
window.CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME_HERE";

/**
 * Build an auto-optimized image URL from a Cloudinary public ID.
 * f_auto  -> Cloudinary picks the best format for the visitor's browser (WebP/AVIF/etc.)
 * q_auto  -> Cloudinary picks the best quality/size tradeoff automatically
 * w_WIDTH -> resizes server-side so you never ship a bigger image than the layout needs
 */
function cldImg(publicId, width) {
  const cloud = window.CLOUDINARY_CLOUD_NAME;
  const w = width ? `,w_${width}` : "";
  return `https://res.cloudinary.com/${cloud}/image/upload/f_auto,q_auto${w}/${publicId}`;
}

/** Auto-optimized video URL (transcodes to the best format/bitrate for the visitor). */
function cldVideo(publicId) {
  const cloud = window.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloud}/video/upload/f_auto,q_auto/${publicId}`;
}

/** A poster/thumbnail frame auto-extracted from a video, so we don't have to store a separate cover image for it. */
function cldVideoPoster(publicId) {
  const cloud = window.CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloud}/video/upload/f_auto,q_auto,so_0/${publicId}.jpg`;
}
