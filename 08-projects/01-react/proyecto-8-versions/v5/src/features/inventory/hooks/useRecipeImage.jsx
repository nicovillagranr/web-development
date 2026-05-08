// ================= CONTEXTO MODULO =================
// Hook para obtener imagen de receta desde Unsplash.
// Cachea resultados por título para evitar re-fetches innecesarios.

import { useEffect, useState } from "react";

const STORAGE_KEY = "smart-cooler:image-cache";
const imageCache = new Map();
const inflightCache = new Map();
const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

// Rehidratar cache desde localStorage al cargar el módulo.
try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    for (const [k, v] of Object.entries(stored)) imageCache.set(k, v);
} catch { /* localStorage vacío o corrupto — arrancamos limpio */ }

function persistCache() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Object.fromEntries(imageCache)));
    } catch { /* quota excedida — silenciar */ }
}

// recipeTitle: clave de caché y display (en español).
// searchQuery: término enviado a Unsplash (en inglés para mejor relevancia).
//              Viene del campo imageQuery de cada receta en recipeSuggestions.js.
//              Si no se pasa, se usa recipeTitle como fallback.
//              Unsplash tokeniza el query por espacios (búsqueda por palabras, no literal).
export function useRecipeImage(recipeTitle, searchQuery = recipeTitle) {
    const cached = imageCache.get(recipeTitle) ?? null;
    const [fetchedUrl, setFetchedUrl] = useState(null);

    // Si hay cache, usarlo directo. Si no, mostrar lo que el fetch resolvió.
    const imageUrl = cached ?? fetchedUrl;

    useEffect(() => {
        if (!recipeTitle || !ACCESS_KEY || ACCESS_KEY === "tu_access_key_aqui") return;

        // Cache hit: no necesita fetch.
        if (imageCache.has(recipeTitle)) return;

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
                    persistCache();
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
            if (!cancelled) setFetchedUrl(url);
        });

        return () => { cancelled = true; };
    }, [recipeTitle, searchQuery]);

    return imageUrl;
}
