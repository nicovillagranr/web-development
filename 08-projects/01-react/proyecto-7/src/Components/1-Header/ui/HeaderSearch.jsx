import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { FiSearch, FiX } from "react-icons/fi"
import { ROUTES } from "../../../utils/constants"

export const HeaderSearch = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")
    const navigate = useNavigate()
    const inputRef = useRef(null)

    const handleOpen = () => {
        setOpen(true)
        setTimeout(() => inputRef.current?.focus(), 0)
    }

    const handleClose = () => {
        setOpen(false)
        setValue("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value.trim()) {
            navigate(`${ROUTES.SEARCH}?q=${encodeURIComponent(value)}`)
            handleClose()
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === "Escape") handleClose()
    }

    return open ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <input
                ref={inputRef}
                type="text"
                placeholder="Buscar..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-0 border-b border-ink dark:border-paper px-1 py-1 text-small text-ink dark:text-paper placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-camel transition-colors duration-200 w-48"
            />
            <button type="submit" aria-label="Buscar" className="text-ink dark:text-paper hover:text-camel transition-colors duration-200 cursor-pointer flex-shrink-0">
                <FiSearch size={18} />
            </button>
            <button type="button" onClick={handleClose} aria-label="Cerrar búsqueda" className="text-ink dark:text-paper hover:text-camel transition-colors duration-200 cursor-pointer flex-shrink-0">
                <FiX size={18} />
            </button>
        </form>
    ) : (
        <button type="button" onClick={handleOpen} aria-label="Buscar" className="text-ink dark:text-paper hover:text-camel transition-colors duration-200 cursor-pointer">
            <FiSearch size={18} />
        </button>
    )
}
