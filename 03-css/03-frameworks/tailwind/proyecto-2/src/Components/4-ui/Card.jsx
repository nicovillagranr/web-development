function Card({ children, className = "", as = "button", ...props }) {
    const Component = as; // permite usar <div>, <button>, etc.
    return (
        <Component className={`flex justify-center items-center rounded-lg shadow-md active:scale-98 transition-transform duration-100 ${className}`} {...props}>
            {children}
        </Component>
    );
}
export default Card;