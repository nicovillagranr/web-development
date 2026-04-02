// 03 — Playlist Manager
// TS: interfaz Song con todos los campos tipados.
const titleEl = document.querySelector("#title");
const artistEl = document.querySelector("#artist");
const durationEl = document.querySelector("#duration");
const addSong = document.querySelector("#addSong");
const search = document.querySelector("#search");
const total = document.querySelector("#total");
const songs = document.querySelector("#songs");
let playlist = [];
function render() {
    const query = search.value.toLowerCase().trim();
    const filtered = playlist.filter((song) => `${song.title} ${song.artist}`.toLowerCase().includes(query));
    songs.innerHTML = "";
    filtered.forEach((song) => {
        const li = document.createElement("li");
        li.className = "item";
        li.innerHTML = `
      <div class="row" style="justify-content:space-between;">
        <span><strong>${song.title}</strong> - ${song.artist}</span>
        <span>${song.duration} min</span>
      </div>
    `;
        songs.appendChild(li);
    });
    const sum = playlist.reduce((acc, song) => acc + song.duration, 0);
    total.textContent = `Duración total: ${sum} min`;
}
addSong.addEventListener("click", () => {
    const t = titleEl.value.trim();
    const a = artistEl.value.trim();
    const d = Number(durationEl.value);
    if (!t || !a || !d)
        return;
    playlist.unshift({ id: crypto.randomUUID(), title: t, artist: a, duration: d });
    titleEl.value = "";
    artistEl.value = "";
    durationEl.value = "";
    render();
});
search.addEventListener("input", render);
render();
export {};
//# sourceMappingURL=index.js.map