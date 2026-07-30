function renderAlbums() {
  const events = eventsSorted(true).filter(e => (Number(e.numPosts) || 0) > 0 || e.isFlagship);
  const grid = document.getElementById("albumGrid");
  document.getElementById("albumCount").textContent = `${events.length} albums`;
  grid.innerHTML = events.map(albumTile).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("gallery");
  renderAlbums();
});
