// ================= CONTEXTO MODULO =================
// Hook para obtener imagen de receta desde Unsplash.
// Cachea resultados por título para evitar re-fetches innecesarios.

import { useEffect, useState } from "react";

const imageCache = new Map();
const inflightCache = new Map();
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// recipeTitle: clave de caché y display.
// searchQuery: término enviado a Unsplash (puede ser en inglés para mejor relevancia).
//              Si no se pasa, se usa recipeTitle como fallback.
export function useRecipeImage(recipeTitle, searchQuery = recipeTitle) {
    const [imageUrl, setImageUrl] = useState(() => imageCache.get(recipeTitle) ?? null);

    useEffect(() => {
        if (!recipeTitle || !ACCESS_KEY || ACCESS_KEY === "tu_access_key_aqui") return;

        // Cache hit: sincroniza estado sin fetch.
        if (imageCache.has(recipeTitle)) {
            setImageUrl(imageCache.get(recipeTitle));
            return;
        }

        // Cache miss: limpia imagen anterior mientras se carga la nueva.
        setImageUrl(null);

        let cancelled = false;

        // Si ya hay un fetch en vuelo para este título, reutilizarlo.
        // Evita que CardRecipe y RecipeSettings hagan fetches simultáneos
        // y reciban imágenes distintas de photos/random.
        if (!inflightCache.has(recipeTitle)) {
            const query = encodeURIComponent(searchQuery ?? recipeTitle);
            const promise = fetch(`https://api.unsplash.com/photos/random?query=${query}&orientation=landscape&client_id=${ACCESS_KEY}`)
                .then((res) => res.json())
                .then((data) => {
                    const url = data?.urls?.regular ?? null;
                    imageCache.set(recipeTitle, url);
                    inflightCache.delete(recipeTitle);
                    return url;
                })
                .catch(() => {
                    inflightCache.delete(recipeTitle);
                    return null;
                });
            inflightCache.set(recipeTitle, promise);
        }

        inflightCache.get(recipeTitle).then((url) => {
            if (!cancelled) setImageUrl(url);
        });

        return () => { cancelled = true; };
    }, [recipeTitle]);

    return imageUrl;
}
