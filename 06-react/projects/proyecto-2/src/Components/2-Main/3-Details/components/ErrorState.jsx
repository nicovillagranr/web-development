export const ErrorState = ({ message }) => {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1 className="font-heading text-title font-semibold text-red-600 mb-2">Error</h1>
                <p className="font-body text-small text-gray-600">{message}</p>
            </div>
        </div>
    )
}
