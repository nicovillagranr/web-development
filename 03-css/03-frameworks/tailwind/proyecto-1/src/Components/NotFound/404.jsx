import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="min-h-[75vh] flex flex-col items-center justify-center gap-5 not-found bg-surface">
            <h1 className="text-6xl md:text-8xl">404</h1>
            <p className="text-center text-xl px-2 md:text-4xl">The page you are looking for does not exist or has been moved.</p>
            <Link to="/" className="text-lg md:text-2xl underline text-blue-600 hover:text-blue-800">
                Back to Home
            </Link>
        </section>
    )
}
export default NotFound;