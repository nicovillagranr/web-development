import Link from 'next/link'
export default function NavBar() {
    return (
        <nav className="bg-nav-bg px-8 py-4">
            <ul className="flex gap-8 max-w-240 mx-auto list-none">
                <li><Link className="text-nav-text no-underline font-medium text-[0.95rem] tracking-wide py-1 border-b-2 border-transparent transition-all hover:text-accent hover:border-accent" href="/">Home</Link></li>
                <li><Link className="text-nav-text no-underline font-medium text-[0.95rem] tracking-wide py-1 border-b-2 border-transparent transition-all hover:text-accent hover:border-accent" href="/about">About</Link></li>
                <li><Link className="text-nav-text no-underline font-medium text-[0.95rem] tracking-wide py-1 border-b-2 border-transparent transition-all hover:text-accent hover:border-accent" href="/tienda">Tienda</Link></li>
                <li><Link className="text-nav-text no-underline font-medium text-[0.95rem] tracking-wide py-1 border-b-2 border-transparent transition-all hover:text-accent hover:border-accent" href="/posts">Posts</Link></li>
            </ul>
        </nav>
    )
}
