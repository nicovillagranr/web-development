function NavItem({ href, text }) {
    return (
        <li>
            <a className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5 after:bg-white after:transition-all after:duration-300 hover:after:w-full" href={href} >{text}</a>
        </li>
    )
}
export default NavItem