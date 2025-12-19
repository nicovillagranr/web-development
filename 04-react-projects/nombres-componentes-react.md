# Naming Guide for Main Components in React

Cuando un proyecto de React ya incluye un `main.jsx`, es buena práctica
evitar nombres ambiguos o repetidos para tus componentes principales.
Esta guía te ofrece una convención clara y escalable para nombrar tu
componente "main" sin generar conflictos.

------------------------------------------------------------------------

## 1. Page-Level Components

Cuando el componente representa una página completa.

-   `HomePage.jsx`
-   `Landing.jsx`
-   `Dashboard.jsx`

------------------------------------------------------------------------

## 2. Layout-Level Components

Cuando el componente define estructura, distribución u orden visual del
contenido.

-   `MainLayout.jsx`
-   `AppLayout.jsx`
-   `RootLayout.jsx`

------------------------------------------------------------------------

## 3. Feature-Level Components

Cuando el componente define una sección específica o un área de
responsabilidad dentro de la aplicación.

-   `MainView.jsx`
-   `MainSection.jsx`
-   `PrimarySection.jsx`
-   `ContentArea.jsx`

------------------------------------------------------------------------

## Recomendación General

-   Si organiza la estructura, usa **Layout**.
-   Si define una parte del contenido, usa **Section** o **View**.
-   Si es una página completa, usa **Page**.

Esta estrategia mantiene tu arquitectura clara, evita conflictos con
archivos base como `main.jsx` y permite que tu proyecto escale con orden
y consistencia.
