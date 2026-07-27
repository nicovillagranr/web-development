"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/tienda", label: "Tienda" },
    { href: "/posts", label: "Posts" },
]

export default function NavBar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`bg-nav-bg px-6 md:px-8 transition-all duration-200 ${scrolled ? 'py-2 shadow-md' : 'py-4'}`}>
            <div className="flex items-center justify-between max-w-240 mx-auto">
                {/* Links — desktop */}
                <ul className="hidden md:flex gap-8 list-none">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                className="text-nav-text no-underline font-medium text-[0.95rem] tracking-wide py-1 border-b-2 border-transparent transition-all hover:text-accent hover:border-accent"
                                href={href}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger button — mobile */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-nav-text p-1"
                    aria-label={open ? "Cerrar menú" : "Abrir menú"}
                >
                    <img
                        src={open ? "/xmark-solid-full.svg" : "/bars-staggered-solid-full.svg"}
                        alt=""
                        className="w-6 h-6 invert"
                    />
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <ul className="md:hidden flex flex-col gap-2 mt-4 list-none">
                    {navLinks.map(({ href, label }) => (
                        <li key={href}>
                            <Link
                                className="block text-nav-text no-underline font-medium text-[0.95rem] tracking-wide py-2 px-2 rounded-lg transition-colors hover:bg-white/10"
                                href={href}
                                onClick={() => setOpen(false)}
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}
