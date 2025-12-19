# Guía de Orden de Imports en React

Este documento define un estándar claro para ordenar los imports dentro
de componentes React, especialmente en `App.jsx`. Seguir esta convención
mejora la mantenibilidad, la escalabilidad y la legibilidad del código.

------------------------------------------------------------------------

## 🧩 Orden recomendado de imports

Los imports deben organizarse de arriba hacia abajo según este orden:

------------------------------------------------------------------------

### 1. **Librerías externas**

Incluye todo lo que provenga de `node_modules`: React, React Router,
state managers, librerías utilitarias, etc.

``` jsx
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
```

------------------------------------------------------------------------

### 2. **Estilos globales**

Cualquier hoja de estilo que afecte a toda la aplicación: resets,
normalizaciones, Tailwind, variables, estilos base, etc.

``` jsx
import "./index.css";
import "./App.css";
```

------------------------------------------------------------------------

### 3. **Lógica compartida**

Hooks personalizados, utils, constantes globales, stores, funciones de
ayuda y módulos de negocio.

``` jsx
import useAuth from "./hooks/useAuth";
import { formatDate } from "./utils/formatDate";
```

------------------------------------------------------------------------

### 4. **Componentes**

Componentes creados dentro del proyecto. Opcionalmente pueden ordenarse
desde componentes más generales a más específicos.

``` jsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
```

------------------------------------------------------------------------

### 5. **Assets**

Imágenes, íconos importados como módulos, fuentes locales u otros
archivos estáticos.

``` jsx
import Logo from "./assets/logo.svg";
```

------------------------------------------------------------------------

## 📌 Ejemplo completo

``` jsx
// 1. Librerías externas
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";

// 2. Estilos globales
import "./index.css";
import "./App.css";

// 3. Lógica compartida
import useAuth from "./hooks/useAuth";
import { formatDate } from "./utils/formatDate";

// 4. Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// 5. Assets
import Logo from "./assets/logo.svg";
```

------------------------------------------------------------------------

## ✔️ Beneficios de esta estructura

-   Facilita el mantenimiento del proyecto.
-   Reduce conflictos y duplicaciones.
-   Alinea el código con convenciones utilizadas en equipos
    profesionales.
-   Mejora la experiencia de lectura y el onboarding de nuevos
    colaboradores.

------------------------------------------------------------------------

## 📚 Recomendación final

Aplica este estándar en todos los archivos del proyecto para mantener un
código consistente y fácil de navegar.
