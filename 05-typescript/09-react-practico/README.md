# 09 — TypeScript en React (aplicación práctica)

Cuando tengas claros los temas 01–08, aquí es donde TS cobra sentido real para ti como frontend dev.

## 1. Crear un proyecto React + TS

```bash
npm create vite@latest proyecto-ts -- --template react-ts
cd proyecto-ts
npm install
npm run dev
```

La diferencia con un proyecto JS normal: los archivos son `.tsx` (JSX + TypeScript) y tienes un `tsconfig.json` preconfigurado.

## 2. Patrones esenciales que vas a usar TODOS LOS DÍAS

### 2.1 Tipar props de un componente

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary"; // literal union (ver tema 05)
  disabled?: boolean;
}

export function Button({ label, onClick, variant = "primary", disabled }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}
```

### 2.2 useState con tipo explícito

```tsx
const [count, setCount] = useState<number>(0);           // explícito
const [user, setUser] = useState<User | null>(null);     // necesario si empieza en null
const [items, setItems] = useState<Product[]>([]);       // array tipado
```

TS infiere el tipo del valor inicial, pero cuando el estado puede ser `null` o `undefined` tienes que ser explícito.

### 2.3 Eventos

```tsx
function Form() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e.currentTarget);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={handleClick}>OK</button>
    </form>
  );
}
```

Truco: escribe el handler inline primero (`onChange={(e) => ...}`) y deja que TS infiera. Luego, si lo extraes, copia el tipo que TS mostró.

### 2.4 children y composición

```tsx
interface CardProps {
  title: string;
  children: React.ReactNode; // cualquier cosa renderizable
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

### 2.5 Fetch tipado con discriminated union (patrón estrella)

Combinando generics (tema 06) y discriminated unions (tema 05):

```tsx
type FetchState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

interface User {
  id: number;
  name: string;
}

function UserList() {
  const [state, setState] = useState<FetchState<User[]>>({ status: "idle" });

  useEffect(() => {
    setState({ status: "loading" });
    fetch("/api/users")
      .then((r) => r.json() as Promise<User[]>)
      .then((data) => setState({ status: "success", data }))
      .catch((err) => setState({ status: "error", error: err.message }));
  }, []);

  if (state.status === "loading") return <p>Cargando...</p>;
  if (state.status === "error") return <p>Error: {state.error}</p>;
  if (state.status === "success") {
    return (
      <ul>
        {state.data.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    );
  }
  return null;
}
```

Este patrón hace imposible renderizar "data" cuando todavía está cargando. TS no te deja compilar si lo intentas.

### 2.6 Custom hooks tipados

```tsx
function useCounter(initial: number = 0) {
  const [count, setCount] = useState(initial);
  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => c - 1);
  const reset = () => setCount(initial);
  return { count, increment, decrement, reset } as const;
  //                                            ^^^^^^^^
  // `as const` hace que TS infiera los tipos más estrictos posibles.
}
```

## 3. Migrar `proyecto-3` a TypeScript (tu siguiente paso natural)

Tu `proyecto-3` (Projex Landing) está en JS. El camino para migrarlo:

1. Instala: `npm i -D typescript @types/react @types/react-dom`
2. Crea `tsconfig.json` con `npx tsc --init` (o copia el de un template vite-react-ts)
3. Renombra componentes uno por uno: `.jsx` → `.tsx`, `.js` → `.ts`
4. Arranca por los más simples (Button, Header) y termina por los complejos
5. Centraliza tipos compartidos en `src/types/`

**Qué ganas:**
- El autocompletado te dice qué props espera cada componente
- Si renombras una prop, TS te marca todos los lugares a actualizar
- No más `props.onClikc` en silencio

## 4. Dónde practicar más

- [React + TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/) — la referencia
- [Total TypeScript (Matt Pocock)](https://www.totaltypescript.com/) — tutoriales gratis
- El repo [type-challenges](https://github.com/type-challenges/type-challenges) para los más masoquistas

## Regla de oro

Cuando no sepas qué tipo poner, escribe el código y **pasá el mouse sobre la variable** en VS Code. TS te dice el tipo inferido. Copia eso. 90 % de las veces no necesitas escribir tipos a mano.
