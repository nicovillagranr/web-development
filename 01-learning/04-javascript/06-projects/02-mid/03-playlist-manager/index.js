const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const duration = document.querySelector('#duration');
const addSong = document.querySelector('#addSong');
const search = document.querySelector('#search');
const total = document.querySelector('#total');
const songs = document.querySelector('#songs');

let playlist = [];

function render() {
  const query = search.value.toLowerCase().trim();
  const filtered = playlist.filter((song) => {
    return `${song.title} ${song.artist}`.toLowerCase().includes(query);
  });

  songs.innerHTML = '';
  filtered.forEach((song) => {
    const li = document.createElement('li');
    li.className = 'item';
    li.innerHTML = `
      <div class="row" style="justify-content:space-between;">
        <span><strong>${song.title}</strong> - ${song.artist}</span>
        <span>${song.duration} min</span>
      </div>
    `;
    songs.appendChild(li);
  });

  const sum = playlist.reduce((acc, song) => acc + song.duration, 0);
  total.textContent = `Duracion total: ${sum} min`;
}

addSong.addEventListener('click', () => {
  const t = title.value.trim();
  const a = artist.value.trim();
  const d = Number(duration.value);
  if (!t || !a || !d) return;

  playlist.unshift({ id: crypto.randomUUID(), title: t, artist: a, duration: d });
  title.value = '';
  artist.value = '';
  duration.value = '';
  render();
});

search.addEventListener('input', render);

render();
