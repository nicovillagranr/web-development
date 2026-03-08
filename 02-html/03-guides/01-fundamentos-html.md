# Guia 01: Fundamentos de HTML

## Objetivo

Dominar la base tecnica del documento HTML antes de escalar a estructuras mas complejas.

## Estructura minima de produccion

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Descripcion breve de la pagina">
  <title>Titulo de pagina</title>
</head>
<body>
  <main>
    <h1>Titulo principal</h1>
  </main>
</body>
</html>
```

## Reglas base

- Un solo `h1` por pagina.
- `main` representa el contenido principal unico.
- `title` y `meta description` deben describir la pagina real.
- Evita usar etiquetas solo por estilo visual.

## Errores frecuentes

- Saltar niveles de titulos sin razon.
- Usar `div` donde existe etiqueta semantica.
- Omitir `lang`, `charset` o `viewport`.
- Dejar textos genericos como "Lorem ipsum" en entregas finales.

## Checklist rapido

- [ ] Documento valido HTML5.
- [ ] `lang="es"` correcto.
- [ ] Head completo con metadatos minimos.
- [ ] `h1` claro y unico.
- [ ] Contenido principal dentro de `main`.
