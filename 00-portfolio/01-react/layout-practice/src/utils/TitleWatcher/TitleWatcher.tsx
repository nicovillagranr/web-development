import { useEffect } from "react";

function TitleWatcher() {
    useEffect(() => {
        const defaultTitle = "Glossy Touch";
        const hiddenTitle = "Te fuiste?";
        // TODO(tipos): anota explícitamente qué puede guardar esta variable.
        //
        // Aquí salen 5 errores de golpe (TS7034 y TS7005) y merece la pena saber
        // por qué. Normalmente TS te deja escribir `let x = null` sin anotar: usa
        // el "evolving any", o sea, va deduciendo el tipo de lo que le asignes
        // después. Pero eso solo funciona si puede seguirle la pista de arriba a
        // abajo. Aquí `timeoutId` se lee y se escribe dentro de DOS closures
        // (`handler` y la función de limpieza), que se ejecutarán vete a saber
        // cuándo, así que TS se rinde y te lo exige explícito.
        //
        // Para saber el tipo, mira qué devuelve `window.setTimeout` unas líneas
        // más abajo (pasa el ratón por encima). Aviso: en el navegador NO es lo
        // mismo que en Node — te dije que sería `ReturnType<typeof setTimeout>`
        // y con `lib: ["DOM"]` es bastante más simple que eso.
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
