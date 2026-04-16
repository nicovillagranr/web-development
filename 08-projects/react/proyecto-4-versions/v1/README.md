# Versión 1: Rediseño UI Obsidian Premium

## 📌 Información del Commit

**Hash:** `012ba`  
**Mensaje:** `feat: rediseña UI del proyecto 4 con estética Obsidian Premium`  
**Rama:** master  

---

## 🎨 ¿Qué expone esta versión?

Esta es la **etapa inicial con enfoque visual**. Demuestra:

✅ **Paleta de colores profesional**
- Colores oscuros inspirados en Obsidian
- Contraste y legibilidad optimizados
- Estética moderna y premium

✅ **Diseño de UI completo**
- Dashboard funcional con estética
- Pantallas principales diseñadas
- Componentes visuales pulidos

✅ **Atención al detalle visual**
- Espaciados consistentes
- Tipografía clara
- Jerarquía visual

---

## ❌ Lo que NO tiene esta versión

- ❌ Arquitectura escalable (estructura plana)
- ❌ Documentación (CLAUDE.md)
- ❌ CSS Modules (estilos globales)
- ❌ Tests unitarios
- ❌ Aliases de Vite

---

## 📊 Estadísticas

- **Archivos:** ~20
- **Features:** 3 (inventory, time, weather)
- **Estructura:** Plana (todo en src/components, src/hooks, etc.)
- **Estilos:** CSS vanilla global
- **Tests:** No

---

## 🚀 Cómo ejecutar

```bash
cd v1
npm install
npm run dev
```

Abre `http://localhost:5173/proyecto-4`

---

## 🔍 Archivos importantes

```
v1/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── App.css          ← Estilos principales (paleta Obsidian)
│   ├── components/              ← Todos los componentes aquí (plano)
│   │   ├── InventoryMainForm.jsx
│   │   ├── TimeEditorModal.jsx
│   │   ├── WeatherSettings.jsx
│   │   └── ...
│   └── hooks/                   ← Todos los hooks aquí
│       ├── useInventory.jsx
│       ├── useDateTime.jsx
│       └── ...
├── package.json
└── vite.config.js
```

---

## 💡 Lo que aprendes de esta versión

1. **Importancia del diseño visual** — UI atractiva es parte del 50% del proyecto
2. **Cómo estructurar estilos globales** — aunque después verás por qué no escala
3. **Paleta de colores profesional** — qué hace que un dashboard se vea "premium"
4. **Componentes sin arquitectura** — código que funciona pero no escala

---

## 🔄 Próxima versión

En **v2** verás cómo esta estructura plana se convierte en **feature-first**, que es mucho más escalable.

---

*Versión histórica guardada: 14 de abril de 2026*
