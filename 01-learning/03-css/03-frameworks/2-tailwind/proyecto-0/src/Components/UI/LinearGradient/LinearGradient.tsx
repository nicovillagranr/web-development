export const LinearGradient = () => {
    return (
        <>
            <div className="h-50 max-w-150 bg-linear-45 from-indigo-50 to-indigo-700">Soy un Linear Gradient!</div>
            <div className="h-50 max-w-150 bg-linear-to-r  /srgb from-indigo-500 to-real-400">Interpolación!</div>
            <div className="h-50 max-w-150 bg-linear-to-b  /oklch from-red-500 to-blue-500">Otra interpolación!</div>
            <div className="bg-conic/[in_hsl_longer_hue] from-red-600 to-red-500 size-24 rounded-full">Conic</div>
            <div className="bg-radial/[at_25%_25%] from-red-600 to-red-500 size-24 rounded-full">Radial</div>
        </>
    )
}