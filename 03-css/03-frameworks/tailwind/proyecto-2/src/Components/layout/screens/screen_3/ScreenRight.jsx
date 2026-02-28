// ================= COMPONENT =================
function ScreenRight() {
    // Render/retorno del bloque actual
    return (
        <div className="h-full px-4 py-3 text-white flex flex-col gap-3">
            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <p className="text-xs uppercase tracking-wide text-white/70">Panel derecho</p>
                <h3 className="text-lg font-medium mt-1">Espacio secundario</h3>
                <p className="text-sm text-white/75 mt-2">
                    Puedes usar esta pantalla para calendario, tareas o controles del hogar.
                </p>
            </article>

            <article className="rounded-2xl bg-black/20 backdrop-blur-md p-4">
                <p className="text-sm text-white/80">
                    El punto activo inferior indica la pantalla actual.
                </p>
            </article>
        </div>
    );
}
export default ScreenRight;