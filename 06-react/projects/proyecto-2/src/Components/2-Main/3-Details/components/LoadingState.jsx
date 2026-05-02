export const LoadingState = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block mb-4">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin"></div>
                </div>
                <p className="font-body text-small text-gray-600">Cargando producto...</p>
            </div>
        </div>
    )
}
