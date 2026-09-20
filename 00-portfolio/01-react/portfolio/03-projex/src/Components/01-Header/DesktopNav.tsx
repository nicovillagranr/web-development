// Components
import NavItem from "./NavItem.tsx";
import type { NavItemData } from "./navItems.ts";

// Types
type DesktopNavProps = {
    navItems: NavItemData[]
}

function DesktopNav({ navItems }: DesktopNavProps) {
    return (
        <ul className="hidden md:flex gap-6 lg:gap-10 text-white text-sm font-medium">
            {navItems.map((item) => (
                <NavItem
                    key={item.to}
                    to={item.to}
                    text={item.text}
                />
            ))}
        </ul>
    );
}
export default DesktopNav;
