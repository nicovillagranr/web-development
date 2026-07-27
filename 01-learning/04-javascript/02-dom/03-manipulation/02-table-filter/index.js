const search = document.querySelector('#search');
const rows = document.querySelector('#rows');

const people = [
  { name: 'Ana', role: 'Frontend', city: 'Santiago' },
  { name: 'Luis', role: 'Backend', city: 'Valparaiso' },
  { name: 'Cami', role: 'QA', city: 'Concepcion' },
  { name: 'Nico', role: 'PM', city: 'Santiago' }
];

function render(items) {
  rows.innerHTML = '';
  items.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.name}</td><td>${item.role}</td><td>${item.city}</td>`;
    rows.appendChild(tr);
  });
}

search.addEventListener('input', () => {
  const query = search.value.toLowerCase().trim();
  const filtered = people.filter((item) => {
    return `${item.name} ${item.role} ${item.city}`.toLowerCase().includes(query);
  });
  render(filtered);
});

render(people);
