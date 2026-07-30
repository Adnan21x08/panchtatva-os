function initials(name) {
  return name.split(" ").map(p => p[0]).slice(0, 2).join("").toUpperCase();
}

function renderTeam() {
  const grid = document.getElementById("teamGrid");
  grid.innerHTML = DATA.team.map(m => `
    <div class="team-card">
      <div class="team-avatar">${initials(m.name)}</div>
      <div class="team-name">${m.name}</div>
      <div class="team-role">${m.role}</div>
    </div>`).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  mountLayout("team");
  renderTeam();
});
