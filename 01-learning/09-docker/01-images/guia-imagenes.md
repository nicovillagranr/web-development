# Guia de Imagenes Docker

Este documento explica como construir, versionar y publicar imagenes Docker con criterio profesional.

## 1. Concepto clave

Una imagen es una plantilla inmutable con:

- sistema base
- dependencias
- codigo de la aplicacion
- comando de arranque

Los contenedores nacen desde imagenes.

## 2. Comandos base de imagenes

Buscar imagen en Docker Hub:

```bash
docker search nginx
```

Descargar imagen:

```bash
docker pull nginx:alpine
```

Listar imagenes locales:

```bash
docker images
```

Ver capas e historial:

```bash
docker history nginx:alpine
```

Borrar imagen:

```bash
docker rmi nginx:alpine
```

## 3. Construir imagen con Dockerfile

Build local:

```bash
docker build -t mi-app:dev .
```

Build con Dockerfile alternativo:

```bash
docker build -f Dockerfile.prod -t mi-app:prod .
```

Build sin cache:

```bash
docker build --no-cache -t mi-app:clean .
```

## 4. Etiquetado (tags) recomendado

Convencion practica:

- `mi-app:dev`
- `mi-app:1.0.0`
- `mi-app:latest` (opcional y con cuidado)

Agregar tag adicional:

```bash
docker tag mi-app:1.0.0 usuario/mi-app:1.0.0
docker tag mi-app:1.0.0 usuario/mi-app:latest
```

## 5. Publicar en registry

Login:

```bash
docker login
```

Push:

```bash
docker push usuario/mi-app:1.0.0
docker push usuario/mi-app:latest
```

Si usas GitHub Container Registry (GHCR), cambia el namespace a `ghcr.io/<org>/<repo>`.

## 6. Dockerignore obligatorio

Evita copiar basura al contexto de build.

Ejemplo:

```gitignore
node_modules/
dist/
.git/
.env
npm-debug.log
```

Archivo: `.dockerignore`.

## 7. Multi-stage build (base)

Patron para reducir tamano de imagen final:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
```

Resultado: runtime limpio sin dependencias de build.

## 8. Optimizacion de imagenes

Buenas practicas:

- usa bases `alpine` cuando tenga sentido
- agrupa comandos `RUN` relacionados
- fija versiones importantes
- evita instalar herramientas innecesarias
- revisa tamano con `docker images`

## 9. Errores comunes

- usar `latest` sin control
- copiar `node_modules` al build context
- exponer secretos en capas de imagen
- no fijar versiones de dependencias

## 10. Checklist antes de publicar

- build local exitoso
- imagen corre sin errores
- tag de version correcto
- `.dockerignore` actualizado
- sin secretos en Dockerfile ni layers

## 11. Ejercicio recomendado

1. Crea imagen `mi-web:1.0.0` desde un `Dockerfile` simple.
2. Agrega `.dockerignore` y compara tiempos de build.
3. Etiqueta la imagen como `usuario/mi-web:1.0.0`.
4. Publica en tu registry.
5. Desde otra maquina (o tras borrar imagen local), ejecuta `docker pull` y `docker run`.
