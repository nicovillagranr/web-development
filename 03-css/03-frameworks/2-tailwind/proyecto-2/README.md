# Smart-cooler

If my lifestyle demands speed, my home ecosystem keeps up.

---

## ES - Descripcion

`Smart-cooler` es una interfaz Front-end para la pantalla de un refrigerador inteligente.
Permite revisar informacion clave del dia (hora, fecha y clima) con pocos clics, sin depender del smartphone.

Este proyecto es parte de mi portfolio 3D (Three.js): un departamento virtual donde cada pantalla del hogar muestra un producto distinto para evaluacion tecnica de reclutadores.
`Smart-cooler` representa el modulo de cocina/refrigerador.

## ES - Problema que resuelve

Pensado para personas con ritmo de vida rapido: si sales con prisa y con las manos ocupadas, puedes revisar tu contexto diario en segundos desde el refrigerador.

## ES - Motivacion y enfoque

- Diseno minimalista y bajo ruido visual.
- Mejoras reales de productividad con interacciones rapidas.
- Benchmark de UX en refrigeradores inteligentes reales.
- Referencia visual para clima inspirada en HyperOS de Xiaomi.

## ES - Funcionalidades actuales (v1)

- Panel de fecha y hora.
- Ajustes de formato horario.
- Clima actual en tiempo real.
- Pronostico diario y por hora.
- Grid de metricas: UV, humedad, sensacion termica, presion, AQI y UV diario.
- Ajustes mobile (dvh + safe-area).

## ES - Proximas versiones

- Calendario con agendamiento de tareas/eventos.
- Inventario de alimentos del refrigerador.
- Integracion completa en el portfolio 3D.

## ES - Stack

- React
- Vite
- Tailwind CSS
- React Icons
- ESLint
- Open-Meteo APIs (Weather + Air Quality)

## ES - Demo

- Demo dentro del portfolio 3D: Proximamente
- Demo en portfolio basico (sin 3D): Proximamente

## ES - Instalacion y uso local

Requisito minimo:

- Node.js instalado (LTS recomendado)

Pasos:

1. `npm install`
2. `npm run dev`
3. `npm run build`
4. `npm run preview`

## ES - Arquitectura (resumen)

```txt
src/
  features/
    weather/
    time/
  Components/
    layout/
    ui/
  assets/
```

## EN - Overview

`Smart-cooler` is a Front-end interface built for a smart refrigerator display.
It helps users check essential daily info (time, date, weather) with minimal interaction and without relying on a smartphone.

This project is part of my 3D portfolio apartment (Three.js), where each home display hosts a different product for recruiter evaluation.
`Smart-cooler` is the kitchen/refrigerator module.

## EN - Current Features (v1)

- Time and date settings panel.
- 12/24h format handling.
- Real-time weather data.
- Daily and hourly forecast.
- Metrics grid: UV, humidity, feels-like, pressure, AQI, and daily UV score.
- Mobile viewport fixes (dvh + safe-area).

## EN - Roadmap

- Calendar with event/task scheduling.
- Refrigerator food inventory module.
- Full integration into the 3D portfolio.

## EN - Local Setup

Minimum requirement:

- Node.js installed (LTS recommended)

Commands:

1. `npm install`
2. `npm run dev`
3. `npm run build`
4. `npm run preview`

## Screenshots

Store capture versions in:

```txt
capturas/
  v1/
  v2/
```

## Author

- LinkedIn: https://www.linkedin.com/in/nico-villagran/
