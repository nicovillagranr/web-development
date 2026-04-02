// 03 — Playlist Manager
// TS: interfaz Song con todos los campos tipados.

const titleEl = document.querySelector<HTMLInputElement>("#title")!;
const artistEl = document.querySelector<HTMLInputElement>("#artist")!;
const durationEl = document.querySelector<HTMLInputElement>("#duration")!;
const addSong = document.querySelector<HTMLButtonElement>("#addSong")!;
const search = document.querySelector<HTMLInputElement>("#search")!;
const total = document.querySelector<HTMLSpanElement>("#total")!;
const songs = document.querySelector<HTMLUListElement>("#songs")!;

interface Song {
  id: string;
  title: string;
  artist: string;
  duration: number; // en minutos
}

let playlist: Song[] = [];

function render(): void {
  const query: string = search.value.toLowerCase().trim();
  const filtered: Song[] = playlist.filter((song: Song): boolean =>
    `${song.title} ${song.artist}`.toLowerCase().includes(query)
  );

  songs.innerHTML = "";
  filtered.forEach((song: Song): void => {
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

  const sum: number = playlist.reduce((acc: number, song: Song) => acc + song.duration, 0);
  total.textContent = `Duración total: ${sum} min`;
}

addSong.addEventListener("click", (): void => {
  const t: string = titleEl.value.trim();
  const a: string = artistEl.value.trim();
  const d: number = Number(durationEl.value);
  if (!t || !a || !d) return;

  playlist.unshift({ id: crypto.randomUUID(), title: t, artist: a, duration: d });
  titleEl.value = "";
  artistEl.value = "";
  durationEl.value = "";
  render();
});

search.addEventListener("input", render);

render();
