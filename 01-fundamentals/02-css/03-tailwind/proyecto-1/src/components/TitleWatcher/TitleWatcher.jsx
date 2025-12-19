import { useEffect } from "react";

function TitleWatcher() {
    useEffect(() => {
        const handler = () => {
            if (document.hidden) {
                setTimeout(() => {
                    document.title = "👀 ¿Te fuiste?";
                }, 1500);
            } else {
                document.title = "Proyecto 1";
            }
        };

        document.addEventListener("visibilitychange", handler);

        return () => {
            document.removeEventListener("visibilitychange", handler);
        };
    }, []);

    return null; // No pinta nada, su rol es lógico
}

export default TitleWatcher;
