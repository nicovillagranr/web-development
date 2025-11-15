# Flexbox: Guía Teórica Completa

## 1. Qué es Flexbox
Flexbox es un módulo de CSS diseñado para crear layouts más ágiles y controlados. Su propósito principal es facilitar la distribución del espacio y la alineación de elementos dentro de un contenedor, incluso cuando su tamaño es dinámico.

## 2. Conceptos Fundamentales
### **Ejes principales**
- **Eje principal (main axis):** dirección en la que se colocan los ítems.
- **Eje secundario (cross axis):** perpendicular al eje principal.

### **Flex container**
Un elemento se convierte en contenedor flex al aplicar:
```css
display: flex;
```

### **Flex items**
Son los elementos hijos directos de un contenedor flex.

---
## 3. Propiedades del Contenedor
### **display**
```css
display: flex;    /* bloque */
display: inline-flex; /* en línea */
```

### **flex-direction**
Define la dirección del eje principal.
```css
flex-direction: row;
flex-direction: row-reverse;
flex-direction: column;
flex-direction: column-reverse;
```

### **flex-wrap**
Controla si los ítems pueden saltar de línea.
```css
flex-wrap: nowrap;
flex-wrap: wrap;
flex-wrap: wrap-reverse;
```

### **flex-flow**
Shorthand de `flex-direction` + `flex-wrap`.
```css
flex-flow: row wrap;
```

### **justify-content**
Alinea los ítems en el eje principal.
```css
justify-content: flex-start;
justify-content: flex-end;
justify-content: center;
justify-content: space-between;
justify-content: space-around;
justify-content: space-evenly;
```

### **align-items**
Alinea ítems en el eje secundario.
```css
align-items: stretch;
align-items: flex-start;
align-items: flex-end;
align-items: center;
align-items: baseline;
```

### **align-content**
Alinea múltiples líneas (solo si hay wrap).
```css
align-content: flex-start;
align-content: flex-end;
align-content: center;
align-content: space-between;
align-content: space-around;
align-content: stretch;
```

---
## 4. Propiedades de los Items
### **order**
Cambia el orden visual de un ítem.
```css
order: 1;
```

### **flex-grow**
Controla cuánto crece un ítem respecto al espacio sobrante.
```css
flex-grow: 1;
```

### **flex-shrink**
Define si un ítem puede encogerse.
```css
flex-shrink: 1;
```

### **flex-basis**
Tamaño base del ítem.
```css
flex-basis: 200px;
```

### **flex (shorthand)**
```css
flex: 1 1 auto;
```

### **align-self**
Alineación individual en el eje secundario.
```css
align-self: center;
```

---
## 5. Patrones Comunes con Flexbox
### **Centrar un elemento en ambas direcciones**
```css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

### **Distribución en columnas o filas fluidas**
```css
.container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
```

### **Layout de navbar simple**
```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

---
## 6. Buenas Prácticas
- Usar `gap` en vez de margin manual entre ítems.
- Evitar abusar de `order` para no romper accesibilidad.
- Combinar con media queries para responsive.
- Usar `flex` shorthand para layouts escalables.

---
## 7. Ejemplos Avanzados
### **Holy Grail Layout con Flexbox**
```css
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.header { }
.content {
  display: flex;
  flex: 1;
}
.main { flex: 1; }
.aside-left { width: 200px; }
.aside-right { width: 200px; }
.footer { }
```

---
## 8. Checklist Rápido
- [ ] ¿Definiste dirección con `flex-direction`?
- [ ] ¿Necesitas wrap?
- [ ] ¿Ya revisaste `justify-content` y `align-items`?
- [ ] ¿Tus items requieren `flex` para distribución avanzada?
- [ ] ¿Agregaste `gap` si quieres separación?

---
## 9. Para Practicar
- Navbar responsive
- Cards alineadas automáticamente
- Sidebar + contenido principal
- Grid de productos autoajustable con `flex-wrap`

---
## 10. Objetivo
Con este archivo tienes la referencia teórica completa de Flexbox para poder desarrollar tus layouts de forma escalable, limpia y profesional.

