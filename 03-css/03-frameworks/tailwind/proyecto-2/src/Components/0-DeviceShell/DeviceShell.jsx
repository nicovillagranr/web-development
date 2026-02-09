// DeviceShell tiene como función imitar el HardWare del dispositivo de salida, que en este caso será un refrigerador en un modelo 3D en Three.js
// Este refrigerador será uno de los varios proyecto FrontEnd de mi portafolio.
// Incluirá uso de APIs y manejo de inventario para gestionar el stock de productos.

// Imports de Componentes
import Header from "../1-Header/Header.jsx"

function Device() {
    return (
        <section className="w-120 h-190 rounded-md bg-[#D9D9D9]">
            <Header />
        </section>

    )
}
export default Device