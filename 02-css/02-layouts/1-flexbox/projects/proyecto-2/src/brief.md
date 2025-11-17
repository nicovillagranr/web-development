====================================================
 FLEXBOX PROJECT 02: LANDING PAGE DE PRODUCTO
====================================================

OBJETIVO
Replicar una landing page simple de un producto usando Flexbox para controlar:
- Distribución en columnas
- Alineación vertical
- Espaciados consistentes
- Orden en móvil (sin media queries si es posible)
  
REQUISITOS
[ ] Crear un contenedor principal que use display: flex y flex-direction: column.
[ ] Header con:
    [ ] Logo alineado a la izquierda.
    [ ] Menú alineado a la derecha en forma de fila usando Flexbox.
    [ ] Espaciado interno consistente (padding).
[ ] Hero section con dos columnas:
    [ ] Columna izquierda: Título grande + subtítulo + botón.
    [ ] Columna derecha: Imagen del producto.
    [ ] Ambas columnas deben ser flexibles: usar flex: 1 1 auto.
    [ ] Que las columnas colapsen a vertical de forma natural cuando el viewport sea pequeño (sin media queries).
[ ] Sección de features:
    [ ] Contenedor padre con display: flex y flex-wrap: wrap.
    [ ] Cada feature card debe tener flex: 1 1 250px para lograr auto-resize.
    [ ] Deben mantenerse alineadas arriba y con buena separación entre ellas.
[ ] Sección de testimonios:
    [ ] Contenedor horizontal con display: flex.
    [ ] Cada testimonio debe usar flex: 1.
    [ ] Texto centrado vertical y horizontalmente.
[ ] Footer simple centrado usando Flexbox.
    
EXTRA (OPCIONAL)
[ ] Implementar un botón CTA que mantenga su tamaño usando flex-shrink: 0.
[ ] Reordenar columnas del hero usando order para móvil, pero sin media queries (solo si quieres experimentar).

CRITERIOS DE CALIDAD
[ ] Layout limpio, estable y sin saltos.
[ ] Sin media queries.
[ ] Flex usado estratégicamente.
[ ] Sin usar Grid, únicamente Flexbox.

AL FINAL
Cuando lo termines lo reviso, lo destrozo un poco (con cariño) y te lo dejo redondo.
====================================================

