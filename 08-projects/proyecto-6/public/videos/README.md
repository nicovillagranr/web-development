# Videos del Sitio

## Archivo Requerido

### services-bg.mp4
- **Ubicación:** `public/videos/services-bg.mp4`
- **Uso:** Video de fondo en la sección "Servicios"
- **Formato:** MP4 (H.264 codec)
- **Duración recomendada:** 5-15 segundos (con loop)
- **Resolución:** Mínimo 1920x1080px (Full HD)
- **Tamaño archivo:** < 5MB (usa compresión)
- **Tema recomendado:** 
  - Maquinaria minera en operación
  - Paisaje minero industrial
  - Trabajadores en sitio con EPP
  - Equipamiento pesado en acción
  - Cualquier video relacionado con industria/minería

## Características del Video

El video tiene automáticamente:
- ✅ **Auto-play**: Se reproduce solo al cargar
- ✅ **Muted**: Sin audio
- ✅ **Loop**: Se repite continuamente
- ✅ **Blur**: Efecto blur de 8px para fondo
- ✅ **Dark Overlay**: Capa oscura para mejor legibilidad del texto
- ✅ **Responsive**: Funciona en desktop y mobile

## Cómo Agregar el Video

1. **Prepara tu video en MP4**
   - Duración: 5-15 segundos (para loop suave)
   - Resolución: 1920x1080px o mayor
   - Tamaño: < 5MB (comprime con herramientas como FFmpeg o HandBrake)

2. **Coloca el archivo en esta carpeta**
   - Nombra el archivo: `services-bg.mp4`
   - Ruta completa: `public/videos/services-bg.mp4`

3. **Recarga el navegador**
   - Ctrl+F5 para limpiar cache
   - El video debería aparecer como fondo

## Herramientas para Comprimir Videos

- **FFmpeg** (línea de comando, muy potente):
  ```bash
  ffmpeg -i input.mp4 -c:v libx264 -crf 28 -s 1920x1080 output.mp4
  ```

- **HandBrake** (interfaz gráfica, fácil)
  - Descarga: https://handbrake.fr/

- **CloudConvert** (en línea)
  - https://cloudconvert.com/mp4-to-mp4

## Fallback

Si el video no carga, se mostrará un gradiente de color automáticamente (del código CSS), así que el sitio seguirá funcionando.

## Optimización

- Más corto = mejor performance
- Menos de 10 segundos es ideal para loops
- Mantén la resolución mínima en 1280x720px
- El blur automático ayuda a ocultar imperfecciones del video
