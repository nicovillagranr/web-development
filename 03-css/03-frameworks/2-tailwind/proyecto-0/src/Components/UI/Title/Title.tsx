interface Props {
    title: string
}

export const Title = ({ title }: Props) => {
    return (
        <h1 className="text-2xl text-white font-bold uppercase">{title}</h1>
    )
}