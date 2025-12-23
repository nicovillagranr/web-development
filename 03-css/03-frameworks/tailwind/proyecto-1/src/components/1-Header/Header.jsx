// Import de Icons
import HouseIcon from "../../assets/icons/house-solid-full.svg"

// Import de Components
import NavItem from "./NavItem.jsx"

function Header() {
    return (
        <>
            <header className="min-h-[10vh] w-full bg-[#ff5959] flex items-center justify-center">

                <nav className=" flex items-center justify-between min-h-[5vh] w-[85%] lg:w-[75%]">
                    <div className="flex flex-col">
                        <a className="flex items-center text-center text-2xl text-white px-6 tracking-widest" href="#hero">
                            <img src={HouseIcon} alt="Home" className="w-5 h-5" />
                            Projex
                        </a>
                        <a className="text-white font-bold text-sm" href="#hero">
                            One Page Business Team
                        </a>
                    </div>

                    <ul className="text-white flex gap-15 lg:gap-10">
                        <NavItem href="#hero" text="Home" />
                        <NavItem href="#services" text="Services" />
                        <NavItem href="#portfolio" text="Portfolio" />
                        <NavItem href="#team" text="Our Team" />
                        <NavItem href="#blog" text="Blog" />
                        <NavItem href="#contact" text="Contact Us" />
                    </ul>
                </nav>

            </header>
        </>
    )
}

export default Header
