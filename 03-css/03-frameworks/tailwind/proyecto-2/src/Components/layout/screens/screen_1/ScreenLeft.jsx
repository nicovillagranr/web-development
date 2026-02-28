// ================= COMPONENT =================
function ScreenLeft() {
    // Render/retorno del bloque actual
    return (
        <div className="h-full px-4 py-3 text-white flex flex-col gap-3">
            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <p className="text-xs uppercase tracking-wide text-white/70">Panel izquierdo</p>
                <h3 className="text-lg font-medium mt-1">Espacio para widgets</h3>
                <p className="text-sm text-white/75 mt-2">
                    Aqui puedes agregar atajos rapidos, notas o estado del hogar.
                </p>
            </article>

            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <p className="text-sm text-white/80">
                    Desliza horizontalmente para volver al inicio.
                </p>
            </article>
        </div>
    );
}

export default ScreenLeft;
