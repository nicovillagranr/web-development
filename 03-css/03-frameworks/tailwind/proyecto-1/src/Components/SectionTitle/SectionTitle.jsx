function SectionTitle({ title, className = "" }) {
    return (
        <>
            <h2 className={`text-xl md:text-2xl cursor-pointer ${className}`}>{title}</h2>

            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block w-40 h-px bg-gray-400"></span>
                <span className="block w-2 h-2 rounded-full bg-gray-400"></span>
                <span className="block w-40 h-px bg-gray-400"></span>
            </div>
        </>
    )
}

export default SectionTitle
