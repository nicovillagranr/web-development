import type { ReactNode } from "react";

/* Las piezas que comparten todos los bloques del banco: el chip de estado, la
 * `Tarjeta` que enmarca cada drill y la `Seccion` que separa un archivo del siguiente.
 * Un bloque nuevo solo las importa; aquí no se toca nada al añadirlo. */

export type Estado = "starter" | "casi" | "resuelto" | "demo";

const CHIP: Record<Estado, { texto: string; punto: string; color: string }> = {
  starter: { texto: "Sin resolver", punto: "bg-[#ff9f0a]", color: "text-[#ff9f0a]" },
  casi: { texto: "Verde, con tipos rotos", punto: "bg-[#ff453a]", color: "text-[#ff453a]" },
  resuelto: { texto: "Resuelto", punto: "bg-[#30d158]", color: "text-[#30d158]" },
  demo: { texto: "Demo, ya funciona", punto: "bg-[#0071e3]", color: "text-[#2997ff]" },
};

type TarjetaProps = {
  n: number | string;
  nombre: string;
  /* qué tiene que pasar cuando el drill está bien */
  mirar: string;
  /* qué se ve en la tarjeta, de arriba abajo */
  campos: string;
  estado?: Estado;
  children: ReactNode;
};

export function Tarjeta({ n, nombre, mirar, campos, estado = "starter", children }: TarjetaProps) {
  const chip = CHIP[estado];

  return (
    <section className="mb-4 overflow-hidden rounded-[20px] bg-[#1d1d1f]">
      <div className="px-7 pt-7 pb-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-[13px] font-medium text-[#6e6e73] tabular-nums">
            {String(n).padStart(2, "0")}
          </span>
          <h3 className="text-[19px] font-semibold tracking-[-0.01em] text-[#f5f5f7]">{nombre}</h3>
          <span className={`ml-auto flex items-center gap-1.5 text-[12px] ${chip.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${chip.punto}`} />
            {chip.texto}
          </span>
        </div>

        <p className="max-w-xl text-[15px] leading-[1.5] text-[#86868b]">{mirar}</p>

        <p className="mt-3 font-mono text-[12px] text-[#6e6e73]">{campos}</p>
      </div>

      {/* El componente vivo. Las reglas que importan en este bloque:
       *   [&_p]      → los textos que pinta el drill: el número, el aviso, el estado.
       *                Solo los <p> SIN className ni role="alert": un selector como
       *                [&_p] pesa más que una clase suelta (.text-red-600), así que
       *                sin ese :not() pisaba los estilos que el componente se pone solo
       *   [role=alert] → los errores por defecto, en rojo y más pequeños
       *   [aria-invalid=true] → el campo con error, con el borde en rojo
       *   [&_button] → todo se dispara pulsando; varios drills tienen más de uno
       *   [&_ul_li]  → las listas de ListaTareas, RegistroDoble, PanelConHistorial,
       *                ListaCompra y PanelNotas
       *   [&_input]  → GuardarNombre y los campos de FormContacto, FormReserva y FormRegistro
       *   [&_form]   → FormContacto y FormRegistro: apilan campos, errores, botones y estado */}
      <div
        className="flex scheme-dark flex-col items-start gap-4 border-t border-white/[0.06]
          bg-black/40 px-7 py-7
          [&_p:not([class],[role=alert])]:text-[17px] [&_p:not([class],[role=alert])]:font-medium
          [&_p:not([class],[role=alert])]:tracking-[-0.01em] [&_p:not([class],[role=alert])]:text-[#f5f5f7]
          [&_[role=alert]]:text-[14px] [&_[role=alert]]:text-[#ff453a]
          [&_[aria-invalid=true]]:border-[#ff453a]
          [&_input]:w-72 [&_input]:rounded-xl [&_input]:border [&_input]:border-white/10
          [&_input]:bg-white/[0.04] [&_input]:px-4 [&_input]:py-2.5 [&_input]:text-[15px]
          [&_input]:text-[#f5f5f7] [&_input]:outline-none
          [&_input::placeholder]:text-[#6e6e73]
          [&_input:focus]:border-[#0071e3]
          [&_textarea]:w-72 [&_textarea]:rounded-xl [&_textarea]:border [&_textarea]:border-white/10
          [&_textarea]:bg-white/[0.04] [&_textarea]:px-4 [&_textarea]:py-2.5 [&_textarea]:text-[15px]
          [&_textarea]:text-[#f5f5f7] [&_textarea]:outline-none [&_textarea:focus]:border-[#0071e3]
          [&_label]:mb-1.5 [&_label]:block [&_label]:text-[13px] [&_label]:text-[#86868b]
          [&_:disabled]:opacity-50
          [&_form]:flex [&_form]:flex-col [&_form]:items-start [&_form]:gap-3
          [&_button]:mr-2 [&_button]:cursor-pointer [&_button]:rounded-full
          [&_button]:bg-[#0071e3] [&_button]:px-5 [&_button]:py-2 [&_button]:text-[15px]
          [&_button]:font-normal [&_button]:text-white [&_button]:transition-colors
          [&_button:hover]:bg-[#0077ed]
          [&_ul]:w-72 [&_ul]:list-none [&_ul]:space-y-px [&_ul]:rounded-xl
          [&_ul]:bg-white/[0.04] [&_ul]:p-1.5
          [&_li]:rounded-lg [&_li]:px-3 [&_li]:py-2 [&_li]:text-[14px] [&_li]:text-[#f5f5f7]
          [&_li]:odd:bg-white/[0.03]"
      >
        {children}
      </div>
    </section>
  );
}

export function Seccion({ archivo, titulo }: { archivo: string; titulo: string }) {
  return (
    <div className="mt-20 mb-8 first:mt-0">
      <p className="mb-2 font-mono text-[13px] text-[#0071e3]">{archivo}</p>
      <h2 className="max-w-2xl text-[32px] leading-[1.15] font-semibold tracking-[-0.02em] text-[#f5f5f7]">
        {titulo}
      </h2>
    </div>
  );
}
