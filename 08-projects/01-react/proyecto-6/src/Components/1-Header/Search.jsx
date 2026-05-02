import searchIcon from '../../assets/icons/search.svg'
export const Search = () => {
    return (
        <button type="button" aria-label="Buscar" className="text-ink hover:text-camel transition-colors duration-200 cursor-pointer">
            <img src={searchIcon} alt="" className="h-5" />
        </button>
    )
}