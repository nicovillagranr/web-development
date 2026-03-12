// ================= CONTEXTO MODULO =================
// Hook para obtener imagen de receta desde Unsplash.
// Cachea resultados por título para evitar re-fetches innecesarios.

import { useEffect, useState } from "react";

const imageCache = new Map();
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export function useRecipeImage(recipeTitle) {
    const [imageUrl, setImageUrl] = useState(() => imageCache.get(recipeTitle) ?? null);

    useEffect(() => {
        if (!recipeTitle || !ACCESS_KEY || ACCESS_KEY === "tu_access_key_aqui") return;
        if (imageCache.has(recipeTitle)) {
            setImageUrl(imageCache.get(recipeTitle));
            return;
        }

        let cancelled = false;
        const query = encodeURIComponent(recipeTitle);

        fetch(`https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${ACCESS_KEY}`)
            .then((res) => res.json())
            .then((data) => {
                if (cancelled) return;
                const url = data?.urls?.regular ?? null;
                imageCache.set(recipeTitle, url);
                setImageUrl(url);
            })
            .catch(() => {
                if (!cancelled) setImageUrl(null);
            });

        return () => { cancelled = true; };
    }, [recipeTitle]);

    return imageUrl;
}
