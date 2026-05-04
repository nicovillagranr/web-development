import { PromoBar } from "./PromoBar"
import { Logo } from "./Logo"
import { NavBar } from "./NavBar"
import { Search } from "./Search"
import { Cart } from "./Cart"
import { ThemeToggle } from "./ThemeToggle"

export const Header = () => {
    return (
        <>
            <PromoBar />
            <header className="flex items-center px-4 sm:px-6 lg:px-10 py-2 bg-paper dark:bg-ink border-b border-stone-200 sticky top-0 z-50 gap-4">
                <Logo />
                <div className="ml-auto flex items-center gap-4 sm:gap-6">
                    <NavBar />
                    <Search />
                    <Cart />
                    <ThemeToggle />
                </div>
            </header>
        </>
    )
}
