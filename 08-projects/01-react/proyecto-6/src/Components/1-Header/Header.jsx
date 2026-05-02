import { Logo } from "./Logo"
import { NavBar } from "./NavBar"
import { Search } from "./Search"
import { Cart } from "./Cart"
import { ThemeToggle } from "./ThemeToggle"

export const Header = () => {
    return (
        <header className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-2 bg-paper dark:bg-ink border-b border-stone-200 sticky top-0 z-50 gap-4">
            <Logo />
            <NavBar />
            <Search />
            <Cart />
            <ThemeToggle />
        </header>
    )
}
