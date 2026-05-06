import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";

function LogoSection() {
    return (
        <div className="flex items-center flex-1">
            <div className="flex flex-col">
                <NavLink to="/" end className="flex items-center justify-center text-white text-xl tracking-widest">
                    <FaHome className="w-5 h-5" aria-hidden="true" />
                    <span>Projex</span>
                </NavLink>
                <span className="text-white font-medium text-xs md:text-sm">Scalable Web Products</span>
            </div>
        </div>
    );
}

export default LogoSection;
