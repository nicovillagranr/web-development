// Components
import NavItem from "./NavItem.tsx";

// Types
type DesktopNavProps = {
    navItems: { to: string; text: string }[]
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
