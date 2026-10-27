/* =============================================================================
 * EJERCICIO 10 — capstone: un árbol de componentes tipado de arriba abajo · bloque 09
 *
 * 📌 RECORDATORIO — Pick<Usuario, 'id' | 'nombre'> se queda con esas claves, Omit
 * las quita, Partial las vuelve opcionales y Usuario['email'] saca el tipo de una.
 * Omit no avisa si escribes mal la clave (compila y no quita nada); Pick sí protesta.
 *
 * 🎯 OBJETIVOS
 * · Montar una pantalla real con las herramientas del 01 al 09, cada una donde toca.
 * · Derivar el tipo de una propiedad con el acceso indexado.
 * · Hacer que los datos bajen por props y los avisos suban por callbacks.
 *
 * 🟢 CONTEXTO — es el examen de la carpeta, sin concepto nuevo salvo una pieza
 * pequeña. Un componente aislado es un ejercicio; un árbol es un programa: los
 * datos bajan por las props, los avisos suben por los callbacks, y cada nivel
 * decide qué sabe y qué no. Eso es lo que se escribe en el trabajo.
 *
 * 🗺️ MAPA — de la hoja a la raíz, en ese orden
 * TEORÍA · el acceso indexado; EtiquetaEstado, la hoja → drills 1–2
 * LA OTRA HOJA · Dinero: props nativas + rest (07) → drill 3
 * LA FILA · FilaPedido: Pick + callback con el id (06 y 09) → drill 4
 * LA LISTA · TablaPedidos: map + key + estado vacío (03 y 04) → drill 5
 * EL MARCO · Panel: slots titulo, acciones y children (05) → drills 6–7
 * EL ESTADO · Contenido: unión discriminada + never (08) → drill 8
 * LA RAÍZ · resumen y PaginaPedidos, que junta todo → drills 9–10
 *
 * ▸ 10 drills en escalera, en orden. Prohibidos any y as.
 * pnpm test:run src/exercises/09-react-props/exercise-10.test.tsx
 * pnpm typecheck
 *
 * 📝 El trazado en .tsx es un ejemplo de uso comentado con //.
 * ============================================================================= */

import type { ComponentProps, ReactNode } from "react";

/* ▸ EL DOMINIO — la fuente de la verdad. No se copia: se deriva de aquí. */

export type Pedido = {
  id: number;
  cliente: string;
  total: number;
  estado: "pendiente" | "enviado" | "entregado";
};

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ TEORÍA — la única pieza nueva: el acceso indexado a tipos
 *
 * DEFINICIÓN
 * Pedido['estado'] es «el tipo de la propiedad estado de Pedido». Es el hermano
 * pequeño de Pick: Pick te devuelve un objeto recortado; el acceso indexado, el
 * tipo de una propiedad, suelto. Misma regla de siempre: derivar, no copiar.
 *
 * SINTAXIS
 * Pedido['estado'] // 'pendiente' | 'enviado' | 'entregado'
 *
 * 💡 Si mañana Pedido admite un cuarto estado, todo lo que dependa de
 * Pedido['estado'] se entera solo.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 1) Define y exporta el tipo EstadoPedido como el tipo de la propiedad
 * estado de Pedido. Una línea, con acceso indexado. ❌ No lo copies a mano.
 */
export type EstadoPedido = Pedido["estado"];

/* 2) EtiquetaEstado (hoja) — recibe estado (EstadoPedido). Retorna un <span>
 * con className = el estado y, dentro, el texto en castellano:
 *   'pendiente' → "Pendiente"   'enviado' → "Enviado"   'entregado' → "Entregado"
 * Usa switch con guardia never (exercise-08): si mañana el dominio gana un
 * cuarto estado, quieres que te lo diga el compilador, no un hueco en blanco.
 * <EtiquetaEstado estado="enviado" />  →  <span class="enviado">Enviado</span>
 */
export function EtiquetaEstado({ estado }: { estado: EstadoPedido }) {
  switch (estado) {
    case "pendiente":
      return <span className="pendiente">Pendiente</span>;
    case "enviado":
      return <span className="enviado">Enviado</span>;
    case "entregado":
      return <span className="entregado">Entregado</span>;
    default: {
      const _exhaustive: never = estado;
      return _exhaustive;
    }
  }
}

/* ▸ LA OTRA HOJA — props nativas + rest (exercise-07) */

/* 3) Define y exporta la interface DineroProps que extienda las props nativas
 * de <span> y añada:
 *   · cantidad number
 */
export interface DineroProps extends ComponentProps<"span"> {
  cantidad: number;
}

/* Dinero — usa DineroProps. Saca cantidad, deja el resto. Retorna un
 * <span> con el resto derramado y, dentro, la cantidad con dos decimales
 * seguida de " €"  (cantidad.toFixed(2)).
 * ⚠️ El derrame va de forma que quien llame pueda ponerle su className.
 * <Dinero cantidad={12} className="precio" />  →  <span class="precio">12.00 €</span>
 */
export function Dinero({ cantidad, ...props }: DineroProps) {
  return <span {...props}>{cantidad.toFixed(2)} €</span>;
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ LA FILA — props derivadas del dominio + callback con argumento
 *
 * La fila no necesita el Pedido entero para pintar, pero sí el id, para poder
 * avisar de cuál se pulsó. Recorta lo justo (06) y añade lo que es asunto de la
 * UI (09).
 * ───────────────────────────────────────────────────────────────────────────── */

/* 4) Define y exporta la interface FilaPedidoProps que extienda el recorte de
 * Pedido con id, cliente, total y estado (usa Pick en el
 * extends), y añada:
 *   · onVer función que recibe un number (el id) y no devuelve nada
 */

export interface FilaPedidoProps extends Pick<Pedido, "id" | "cliente" | "total" | "estado"> {
  onVer: (id: number) => void;
}

/* FilaPedido — usa FilaPedidoProps. Retorna un <tr> con tres <td>, en
 * este orden:
 *   · el cliente
 *   · un Dinero con el total y className="total"
 *   · un EtiquetaEstado con el estado, y después un <button> con el texto
 *     "Ver" que al clic llame a onVer con el id
 * <FilaPedido id={1} cliente="Ana" total={12} estado="enviado" onVer={ver} />
 */
export function FilaPedido(props: FilaPedidoProps) {
  return (
    <tr>
      <td>{props.cliente}</td>
      <td>
        <Dinero cantidad={props.total} className="total" />
      </td>
      <td>
        <EtiquetaEstado estado={props.estado} />
        <button onClick={() => props.onVer(props.id)}>Ver</button>
      </td>
    </tr>
  );
}

/* ▸ LA LISTA — map + key + estado vacío (exercises 03 y 04) */

/* 5) TablaPedidos — recibe pedidos (Pedido[]) y onVer (la misma función
 * del drill 4). Si la lista está vacía, early return de un
 * <p>No hay pedidos</p>. Si no, retorna una <table> con un <tbody> dentro que
 * contenga un FilaPedido por pedido (key = el id), pasándole sus campos.
 * 💡 Aquí onVer se entrega pelado: el id lo mete cada fila, no la tabla.
 * <TablaPedidos pedidos={[]} onVer={ver} />  →  <p>No hay pedidos</p>
 */
export function TablaPedidos({
  pedidos,
  onVer,
}: {
  pedidos: Pedido[];
  onVer: (id: number) => void;
}) {
  if (pedidos.length === 0) {
    return <p>No hay pedidos</p>;
  }
  return (
    <table>
      <tbody>
        {pedidos.map((p) => (
          <FilaPedido key={p.id} {...p} onVer={onVer} />
        ))}
      </tbody>
    </table>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ EL MARCO — slots (exercise-05)
 *
 * Panel no sabe nada de pedidos, y ese es el punto: es un marco reutilizable. Todo
 * lo que pinta se lo dan hecho por props.
 * ───────────────────────────────────────────────────────────────────────────── */

/* 6) Define y exporta el tipo PanelProps con:
 * · titulo   string, obligatoria
 * · acciones ReactNode, opcional     ← slot con nombre
 * · children ReactNode, obligatoria  ← slot por posición
 */
export type PanelProps = {
  titulo: string;
  acciones?: ReactNode;
  children: ReactNode;
};

/* 7) Panel — usa PanelProps. Retorna una <section> que contenga:
 *   · un <header> con un <h2> con el titulo dentro y, solo si hay
 *     acciones, un <div> con className="acciones" que las contenga
 *   · un <div> con className="cuerpo" que contenga el children
 * <Panel titulo="Pedidos"><p>Hola</p></Panel>
 *   →  <section><header><h2>Pedidos</h2></header>
 *       <div class="cuerpo"><p>Hola</p></div></section>
 */
export function Panel({ titulo, acciones, children }: PanelProps) {
  return (
    <section>
      <header>
        <h2>{titulo}</h2>
        {acciones && <div className="acciones">{acciones}</div>}
      </header>
      <div className="cuerpo">{children}</div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * ▸ EL ESTADO DE LA PETICIÓN — unión discriminada (exercise-08)
 *
 * Los datos de una pantalla real no están ahí sin más: se están cargando, o
 * fallaron, o llegaron. Tres estados con equipajes distintos: el caso de libro de
 * la unión discriminada, y el que evita el clásico «spinner infinito porque datos
 * era undefined y nadie lo miró».
 * ───────────────────────────────────────────────────────────────────────────── */

/* 8) Define y exporta EstadoCarga como la unión de estas tres formas:
 * · { fase: 'cargando' }
 * · { fase: 'error';  mensaje: string }
 * · { fase: 'listo';  pedidos: Pedido[] }
 */
export type EstadoCarga =
  { fase: "cargando" } | { fase: "error"; mensaje: string } | { fase: "listo"; pedidos: Pedido[] };

/* Contenido — recibe estado (EstadoCarga) y onVer (función que recibe
 * un number y no devuelve nada). switch sobre estado.fase, con guardia
 * never:
 *   · 'cargando' → <p>Cargando…</p>
 *   · 'error'    → <p className="error"> con el mensaje
 *   · 'listo'    → un TablaPedidos con los pedidos y el onVer
 * ⚠️ Recibe estado como un objeto para poder interrogarlo: no desestructures
 *    la unión en la firma (la trampa nº1 del exercise-08).
 */
export function Contenido({ estado, onVer }: { estado: EstadoCarga; onVer: (id: number) => void }) {
  switch (estado.fase) {
    case "cargando":
      return <p>Cargando…</p>;
    case "error":
      return <p className="error">{estado.mensaje}</p>;
    case "listo":
      return <TablaPedidos pedidos={estado.pedidos} onVer={onVer} />;
    default: {
      const _exhaustiveCheck: never = estado;
      return _exhaustiveCheck;
    }
  }
}

/* ▸ LA RAÍZ */

/* 9) resumen — recibe pedidos (Pedido[]) y retorna un string. No hay JSX
 * aquí: es FASE 1 pura, y sigue siendo tu trabajo.
 *   · con lista vacía → "Sin pedidos"
 *   · si no           → nº de pedidos + " pedidos · " + suma de totales + "€"
 * ⚠️ Anota el tipo de retorno.
 * resumen([])  →  'Sin pedidos'
 * resumen([{…total:10}, {…total:5}])  →  '2 pedidos · 15€'
 */
export function resumen(pedidos: Pedido[]): string {
  if (pedidos.length === 0) {
    return "Sin pedidos";
  }
  return `${pedidos.length} pedidos · ${pedidos.reduce((total, pedido) => total + pedido.total, 0)}€`;
}

/* 10) Define y exporta el tipo PaginaPedidosProps con:
 * · titulo   string
 * · estado   EstadoCarga
 * · onVer    función que recibe un number y no devuelve nada
 * · acciones ReactNode, opcional
 */
export type PaginaPedidosProps = {
  titulo: string;
  estado: EstadoCarga;
  onVer: (id: number) => void;
  acciones?: ReactNode;
};

/* PaginaPedidos — usa PaginaPedidosProps. Retorna un Panel con el
 * titulo y las acciones que le llegaron y, como children, en este orden:
 *   · un Contenido con el estado y el onVer
 *   · solo si la fase es 'listo', un <footer> con el resumen de esos pedidos
 * ⚠️ Ese «solo si» vuelve a necesitar preguntar por el discriminante: el
 *    resumen necesita los pedidos, y los pedidos solo existen en 'listo'.
 * ⚠️ acciones es opcional aquí y en PanelProps. Con
 *    exactOptionalPropertyTypes (tu tsconfig), pasarla de largo tal cual
 *    es lo correcto: acciones={acciones}.
 * <PaginaPedidos titulo="Pedidos" estado={{ fase: 'cargando' }} onVer={ver} />
 */
export function PaginaPedidos({ titulo, estado, onVer, acciones }: PaginaPedidosProps) {
  if (estado.fase === "listo") {
    return (
      <Panel titulo={titulo} acciones={acciones}>
        <Contenido estado={estado} onVer={onVer} />
        <footer>{resumen(estado.pedidos)}</footer>
      </Panel>
    );
  }
  return (
    <Panel titulo={titulo} acciones={acciones}>
      <Contenido estado={estado} onVer={onVer} />
    </Panel>
  );
}
