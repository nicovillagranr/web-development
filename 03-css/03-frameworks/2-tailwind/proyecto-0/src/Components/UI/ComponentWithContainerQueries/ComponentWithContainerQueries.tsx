export const ComponentWithContainerQueries = () => {
    return (
        <div className="@container resize-x overflow-auto border border-gray-400 w-96 min-w-32 max-w-2xl">
            <div className="bg-red-500 @sm:bg-green-500 @lg:bg-blue-500 p-4 rounded text-white text-center text-sm">
                Rojo (@sm) · Verde (@sm) · Azul (@lg)
            </div>
        </div>
    )
}