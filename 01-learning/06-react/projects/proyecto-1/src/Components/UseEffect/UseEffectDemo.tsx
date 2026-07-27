import { useFetch } from "../../hooks"

const url = "https://api.example.com/data"

interface Data{
    name: string
    lastName: string
    age: number
}

export const UseEffectDemo = () => {
    // El Fetch no es parte de la App. Es parte del Hook.
    // Por eso lo creamos afuera
    const {data, error, loading} = useFetch<Data>(url)
    if(loading){
        return(
            <div>Cargando...</div>
        )
    }

    if(error){
        return(
            <div>Ups. Hay un error: {error.message}</div>
        )
    }

    return (
        <div className="text-gray-400 text-sm">
        {JSON.stringify(data)}
        </div>
    )
}
