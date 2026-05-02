export const ProductGallery = ({ image, nombre }) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                <img
                    src={image}
                    alt={nombre}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                    <img
                        src={image}
                        alt={`${nombre} vista 1`}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                    <img
                        src={image}
                        alt={`${nombre} vista 2`}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
                    <img
                        src={image}
                        alt={`${nombre} vista 3`}
                        className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>
        </div>
    )
}
