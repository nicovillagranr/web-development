/**
 * CardRecipe
 *
 * Tarjeta de recetas / inventario rápido.
 * Solo muestra contenido estático, sin gradientes dinámicos.
 */
function CardRecipe({ children }) {
    return (
        <div className="col-span-1 row-span-2 flex flex-col items-center justify-center text-center p-4 bg-white rounded-lg shadow-md active:scale-98
            transition-transform duration-100">
            {children}
        </div>
    );
}

export default CardRecipe;
