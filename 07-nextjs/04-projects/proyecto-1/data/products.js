const categories = [
  {
    slug: "hombre",
    nombre: "Hombre",
    descripcion: "Moda, calzado y accesorios para hombre",
    imagen: "https://picsum.photos/seed/cat-hombre/600/400",
  },
  {
    slug: "mujer",
    nombre: "Mujer",
    descripcion: "Tendencias, calzado y accesorios para mujer",
    imagen: "https://picsum.photos/seed/cat-mujer/600/400",
  },
  {
    slug: "ninos",
    nombre: "Niños",
    descripcion: "Ropa, juguetes y más para los pequeños",
    imagen: "https://picsum.photos/seed/cat-ninos/600/400",
  },
];

const products = [
  // ── Hombre ──
  {
    id: "1",
    nombre: "Zapatillas Running Pro",
    categoria: "hombre",
    precio: 59990,
    precioAnterior: 79990,
    imagen: "https://picsum.photos/seed/prod1/400/400",
    descripcion:
      "Zapatillas deportivas con amortiguación premium y suela antideslizante. Ideales para entrenamiento diario.",
    destacado: true,
  },
  {
    id: "2",
    nombre: "Chaqueta Urbana Slim",
    categoria: "hombre",
    precio: 45990,
    imagen: "https://picsum.photos/seed/prod2/400/400",
    descripcion:
      "Chaqueta liviana con corte slim fit. Resistente al agua y perfecta para entretiempo.",
    destacado: false,
  },
  {
    id: "3",
    nombre: "Polera Algodón Premium",
    categoria: "hombre",
    precio: 14990,
    imagen: "https://picsum.photos/seed/prod3/400/400",
    descripcion:
      "Polera de algodón 100% peinado. Corte regular, suave al tacto y durable.",
    destacado: true,
  },
  {
    id: "4",
    nombre: "Jeans Straight Fit",
    categoria: "hombre",
    precio: 34990,
    precioAnterior: 44990,
    imagen: "https://picsum.photos/seed/prod4/400/400",
    descripcion:
      "Jeans clásicos de corte recto con tela stretch para mayor comodidad.",
    destacado: false,
  },
  {
    id: "5",
    nombre: "Reloj Digital Sport",
    categoria: "hombre",
    precio: 29990,
    imagen: "https://picsum.photos/seed/prod5/400/400",
    descripcion:
      "Reloj deportivo resistente al agua con cronómetro, alarma y luz LED.",
    destacado: false,
  },
  // ── Mujer ──
  {
    id: "6",
    nombre: "Vestido Midi Floral",
    categoria: "mujer",
    precio: 39990,
    imagen: "https://picsum.photos/seed/prod6/400/400",
    descripcion:
      "Vestido midi con estampado floral y cintura ajustable. Tela ligera y fresca.",
    destacado: true,
  },
  {
    id: "7",
    nombre: "Botines Cuero Chelsea",
    categoria: "mujer",
    precio: 69990,
    precioAnterior: 89990,
    imagen: "https://picsum.photos/seed/prod7/400/400",
    descripcion:
      "Botines de cuero genuino estilo Chelsea. Suela de goma y elástico lateral.",
    destacado: true,
  },
  {
    id: "8",
    nombre: "Blazer Oversize",
    categoria: "mujer",
    precio: 54990,
    imagen: "https://picsum.photos/seed/prod8/400/400",
    descripcion:
      "Blazer de corte oversize con forro interior. Ideal para looks formales o casuales.",
    destacado: false,
  },
  {
    id: "9",
    nombre: "Cartera Crossbody",
    categoria: "mujer",
    precio: 24990,
    imagen: "https://picsum.photos/seed/prod9/400/400",
    descripcion:
      "Cartera compacta con correa ajustable y cierre magnético. Tres compartimentos internos.",
    destacado: false,
  },
  {
    id: "10",
    nombre: "Lentes de Sol Cat Eye",
    categoria: "mujer",
    precio: 19990,
    precioAnterior: 27990,
    imagen: "https://picsum.photos/seed/prod10/400/400",
    descripcion:
      "Lentes de sol con montura cat eye y protección UV400. Incluye estuche rígido.",
    destacado: false,
  },
  // ── Niños ──
  {
    id: "11",
    nombre: "Set Dinosaurios x6",
    categoria: "ninos",
    precio: 12990,
    imagen: "https://picsum.photos/seed/prod11/400/400",
    descripcion:
      "Set de 6 dinosaurios de goma con detalles realistas. Para niños desde 3 años.",
    destacado: true,
  },
  {
    id: "12",
    nombre: "Zapatillas LED Infantiles",
    categoria: "ninos",
    precio: 24990,
    precioAnterior: 32990,
    imagen: "https://picsum.photos/seed/prod12/400/400",
    descripcion:
      "Zapatillas con luces LED en la suela. Velcro para fácil calce. Recargables por USB.",
    destacado: true,
  },
  {
    id: "13",
    nombre: "Mochila Escolar Espacial",
    categoria: "ninos",
    precio: 18990,
    imagen: "https://picsum.photos/seed/prod13/400/400",
    descripcion:
      "Mochila con diseño espacial, bolsillo frontal y compartimento para botella.",
    destacado: false,
  },
  {
    id: "14",
    nombre: "Pijama Polar Estrellas",
    categoria: "ninos",
    precio: 15990,
    imagen: "https://picsum.photos/seed/prod14/400/400",
    descripcion:
      "Pijama de polar suave con estampado de estrellas. Puños y tobillos elásticos.",
    destacado: false,
  },
];

// ── Helpers ──

export function getCategories() {
  return categories;
}

export function getProducts() {
  return products;
}

export function getProductsByCategory(categoria) {
  return products.filter((p) => p.categoria === categoria);
}

export function getProductById(id) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.destacado);
}
