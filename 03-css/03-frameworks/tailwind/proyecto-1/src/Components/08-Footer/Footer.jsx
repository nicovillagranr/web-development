import { Link } from "react-router-dom"

// Importamos íconos
import HouseIcon from "../../assets/icons/1-Header/house.svg"

function Footer() {
    return (
        <footer className="w-full min-h-[15vh] bg-dark flex flex-col items-center justify-around sm:flex-row">

            {/*Logo*/}
            <div className="flex flex-col items-center">
                <Link to="/" className="flex items-center text-white text-xl tracking-widest">
                    <img src={HouseIcon} alt="Home" className="w-5 h-5" />
                    <span className="text-md">Projex</span>
                </Link>
                <span className="text-white text-xs cursor-pointer">
                    Building scalable web products
                </span>
            </div>


            {/* Copyright */}
            <div className="text-white text-xs">
                &copy; {new Date().getFullYear()} Nico Villagran. All rights reserved.
            </div>

        </footer>
    )
}
export default Footer