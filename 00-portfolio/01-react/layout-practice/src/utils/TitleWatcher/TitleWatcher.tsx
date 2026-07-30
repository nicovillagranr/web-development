import { useEffect } from "react";

function TitleWatcher() {
    useEffect(() => {
        const defaultTitle = "Glossy Touch";
        const hiddenTitle = "Te fuiste?";
        // El tipo va anotado a mano y no inferido, por dos motivos.
        //
        // Normalmente TS acepta `let x = null` sin anotación: usa el "evolving
        // any" e infiere el tipo de lo que se le asigne después. Pero eso solo
        // funciona si puede seguir el rastro de arriba abajo. Aquí `timeoutId`
        // se lee y se escribe dentro de DOS closures (`handler` y la función de
        // limpieza), que se ejecutan en un momento indeterminado, así que TS
        // renuncia a inferirlo y lo exige explícito.
        //
        // Y es `number` porque en el navegador `window.setTimeout` devuelve un
        // número; en Node el tipo sería distinto (`NodeJS.Timeout`).
        let timeoutId: number | null = null;

        const handler = () => {
            if (document.hidden) {
                timeoutId = window.setTimeout(() => {
                    document.title = hiddenTitle;
                }, 1500);
                return;
            }

            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
                timeoutId = null;
            }
            document.title = defaultTitle;
        };

        document.title = defaultTitle;
        document.addEventListener("visibilitychange", handler);

        return () => {
            if (timeoutId !== null) {
                window.clearTimeout(timeoutId);
            }
            document.removeEventListener("visibilitychange", handler);
        };
    }, []);

    return null;
}

export default TitleWatcher;
