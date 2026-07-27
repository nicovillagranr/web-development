interface Props{
    label: string;
    parentMethod: () => void
}

export const ChildrenButton = ({label}: Omit<Props, "parentMethod">) => {
    return(
        <div>{label}</div>
    )
}

export const Button = ( {label, parentMethod}: Props ) => {
    return(
        <button className="bg-blue-500 text-white p-2 rounded-md" onClick={parentMethod}>
            <ChildrenButton label={label}/>
        </button>
    )
}