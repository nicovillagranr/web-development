import NavItem from "./NavItem.tsx";

function DesktopNav({ navItems }) {
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
