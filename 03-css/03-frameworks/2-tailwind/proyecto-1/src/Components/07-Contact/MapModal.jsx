// MapModal.jsx
function MapModal({ onClose }) {
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            role="dialog"
            aria-modal="true"
        >
            <div className="relative w-[90%] max-w-lg rounded-lg bg-white overflow-hidden">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-3 top-3 font-bold text-xl"
                    aria-label="Close map"
                >
                    ✕
                </button>

                <iframe
                    title="Location map"
                    src="https://www.google.com/maps?q=Alonso%20de%20Córdova%201234%20Vitacura%20Santiago&output=embed"
                    className="w-full h-80"
                    loading="lazy"
                />
            </div>
        </div>
    )
}

export default MapModal
