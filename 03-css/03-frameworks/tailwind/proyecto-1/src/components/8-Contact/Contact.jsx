import locationIcon from "../../assets/icons/4-Contact/location.svg"
import phoneIcon from "../../assets/icons/4-Contact/phone.svg"

function Contact() {
    return (
        <section className="w-full min-h-[75vh] py-5 bg-[#E8E8E8] flex flex-col items-center justify-center">

            {/* Title */}
            <h2 className="text-xl font-semibold text-center md:text-3xl">Contact Us</h2>
            <div className="flex items-center gap-3 mt-4">
                <span className="w-24 h-px bg-gray-400 md:w-40" />
                <span className="w-2 h-2 bg-gray-400 rounded-full" />
                <span className="w-24 h-px bg-gray-400 md:w-40" />
            </div>

            {/* Contact Form */}
            <div className="w-full flex flex-col px-5 md:px-0 mt-10 md:flex-row md:px-60 gap-10">

                <section className="w-full md:w-[50%]">
                    <form className="flex flex-col gap-4" id="contact-form">
                        <input type="text" placeholder="Nombre" className="w-full p-3 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5959] text-md md:text-lg" />

                        <input type="email" placeholder="Email" className="w-full p-3 font-bold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5959] text-md md:text-lg" />

                        <textarea placeholder="Mensaje" rows={6} className="w-full p-3 border font-bold border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ff5959] text-md md:text-lg"></textarea>
                    </form>
                </section>

                {/* Contact Info */}
                <section className="w-full md:w-[50%] flex flex-col justify-between">
                    <h3 className="text-2xl">Information</h3>
                    <p className="text-[.8rem] font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iure vel eveniet. Asperiores rerum pariatur laboriosam enim sunt repellendus in nulla, nam fuga iste voluptate dolorem amet aliquid, eum ut nisi quibusdam quidem esse facilis. Modi non, consequatur doloremque consequuntur nostrum repellat eveniet voluptas nulla ab perferendis ipsam, quo assumenda error ex est! Omnis quo nisi consequuntur vitae, esse quam.</p>

                    <p className="flex items-center gap-2">
                        <img src={locationIcon} alt="Location Icon" className="w-5 h-5" />Alonso de Córdova 1234, Vitacura, Santiago
                    </p>

                    <p className="flex items-center gap-2">
                        <img src={phoneIcon} alt="Phone Icon" className="w-5 h-5" />(+56) 9 1234 5678
                    </p>

                    <div className="flex flex-row gap-5">
                        <button
                            form="contact-form"
                            type="submit"
                            className="w-full py-3 border-2 border-[#ff5959]  bg-[#ff5959] text-white font-bold rounded-md hover:transition-all hover:duration-300 hover:bg-transparent hover:text-black">Send Message</button>

                        <button
                            form="contact-form"
                            type="submit"
                            className="w-full py-3 border-2 border-[#ff5959] text-black font-bold rounded-md hover:transition-all hover:duration-300 hover:bg-[#ff5959] hover:text-white">View Map</button>
                    </div>
                </section>

            </div>

        </section>

    )
}
export default Contact