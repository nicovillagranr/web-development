// Pasar estilos via props es una funcionalidad de React, no de Tailwind.
// Se puede usar CSS inline con style={{ }} o pasar clases de Tailwind via className.
// Las variables de @theme (ej: var(--color-primary)) se pueden usar en ambos casos.

interface CustomProps {
    text: string;
    color: string;
}

export const CustomPropsComponent = (props: CustomProps) => {
    return (
        <div style={{ color: props.color }}>
            {props.text}
        </div>
    )
}