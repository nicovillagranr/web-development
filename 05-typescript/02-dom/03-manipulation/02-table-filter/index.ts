// 02 — Table Filter
// TS: definimos una interfaz para el tipo de datos de la tabla.
// Esto evita errores de typo en nombres de propiedades.

const search = document.querySelector<HTMLInputElement>("#search")!;
const rows = document.querySelector<HTMLTableSectionElement>("#rows")!;

interface Person {
  name: string;
  role: string;
  city: string;
}

const people: Person[] = [
  { name: "Ana", role: "Frontend", city: "Santiago" },
  { name: "Luis", role: "Backend", city: "Valparaiso" },
  { name: "Cami", role: "QA", city: "Concepcion" },
  { name: "Nico", role: "PM", city: "Santiago" },
];

// render recibe Person[] — TS verifica que solo accedamos a propiedades existentes
function render(items: Person[]): void {
  rows.innerHTML = "";
  items.forEach((item: Person): void => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${item.name}</td><td>${item.role}</td><td>${item.city}</td>`;
    rows.appendChild(tr);
  });
}

search.addEventListener("input", (): void => {
  const query: string = search.value.toLowerCase().trim();
  const filtered: Person[] = people.filter((item: Person): boolean => {
    return `${item.name} ${item.role} ${item.city}`.toLowerCase().includes(query);
  });
  render(filtered);
});

render(people);
