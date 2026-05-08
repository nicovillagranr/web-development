import { HeaderPromoBar } from "./features/HeaderPromoBar"
import { HeaderLogo } from "./ui/HeaderLogo"
import { HeaderNavBar } from "./features/HeaderNavBar"
import { HeaderSearch } from "./ui/HeaderSearch"
import { HeaderCart } from "./features/HeaderCart"
import { HeaderThemeToggle } from "./ui/HeaderThemeToggle"

export const Header = () => {
    return (
        <>
            <HeaderPromoBar />
            <header className="flex items-center px-4 sm:px-6 lg:px-10 py-2 bg-paper dark:bg-ink border-b border-stone-200 sticky top-0 z-50 gap-4">
                <HeaderLogo />
                <div className="ml-auto flex items-center gap-4 sm:gap-6">
                    <HeaderNavBar />
                    <HeaderSearch />
                    <HeaderCart />
                    <HeaderThemeToggle />
                </div>
            </header>
        </>
    )
}
