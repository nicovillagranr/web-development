import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="min-h-[75vh] flex flex-col items-center justify-center gap-5 not-found">
            <h1 className="text-6xl md:text-8xl">404</h1>
            <p className="text-center text-xl px-2 md:text-4xl">La página que buscas no existe o fue movida.</p>
            <Link to="/" className="text-lg md:text-2xl underline text-blue-600 hover:text-blue-800">
                Volver al inicio
            </Link>
        </section>
    )
}
export default NotFound;