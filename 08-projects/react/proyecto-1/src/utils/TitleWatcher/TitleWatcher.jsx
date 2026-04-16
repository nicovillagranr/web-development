import { useEffect } from "react";

function TitleWatcher() {
    useEffect(() => {
        const defaultTitle = "Glossy Touch";
        const hiddenTitle = "Te fuiste?";
        let timeoutId = null;

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
