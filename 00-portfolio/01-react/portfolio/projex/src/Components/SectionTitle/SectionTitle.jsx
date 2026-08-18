function SectionTitle({ title, level = 2, className = "" }) {
    const HeadingTag = `h${level}`
    return (
        <>
            <HeadingTag className={`text-xl md:text-2xl font-medium ${className}`}>{title}</HeadingTag>
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block w-25 md:w-32 h-px bg-gray-400"></span>
                <span className="block w-2 h-2 rounded-full bg-gray-400"></span>
                <span className="block w-22 md:w-32 h-px bg-gray-400"></span>
            </div >
        </>
    )
}

export default SectionTitle
