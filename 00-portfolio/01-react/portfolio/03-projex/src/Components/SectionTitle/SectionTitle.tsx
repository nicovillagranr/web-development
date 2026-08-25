type SectionTitleProps = {
    title: string;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
};

function SectionTitle({ title, level = 2, className = "", }: SectionTitleProps) {
    const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
        <>
            <HeadingTag className={`text-xl md:text-2xl font-medium ${className}`}>
                {title}
            </HeadingTag>
            <div className="flex items-center justify-center gap-3 mt-4">
                <span className="block w-25 md:w-32 h-px bg-gray-400" />
                <span className="block w-2 h-2 rounded-full bg-gray-400" />
                <span className="block w-22 md:w-32 h-px bg-gray-400" />
            </div>
        </>
    );
}
export default SectionTitle;
