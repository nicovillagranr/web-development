# Fundamentos de Docker

Esta guia cubre la base minima para entender Docker y trabajar con seguridad.

## 1. Que es Docker

Docker es una plataforma para empaquetar aplicaciones con sus dependencias en **imagenes** que corren como **contenedores**.

Sirve para:

- ejecutar tu app igual en cualquier maquina
- evitar el "en mi computador funciona"
- aislar servicios por proyecto
- versionar entornos de desarrollo y despliegue

## 2. Modelo mental rapido

Docker trabaja con estos bloques:

1. **Dockerfile**: receta para construir una imagen.
2. **Imagen**: plantilla inmutable lista para ejecutarse.
3. **Contenedor**: instancia viva de una imagen.
4. **Registry**: repositorio remoto de imagenes (Docker Hub, GHCR).

Flujo base:

```bash
docker build -t mi-app:1.0 .
docker run -d -p 3000:3000 mi-app:1.0
```

## 3. Verificar instalacion

Comandos utiles al instalar Docker Desktop/Engine:

```bash
docker version
docker info
docker run hello-world
```

Si `hello-world` falla, primero revisa que el daemon de Docker este levantado.

## 4. Primer contenedor util

Ejecutar Nginx y exponerlo en local:

```bash
docker run --name web-nginx -d -p 8080:80 nginx:alpine
```

Luego abre `http://localhost:8080`.

Detener y eliminar:

```bash
docker stop web-nginx
docker rm web-nginx
```

## 5. Ciclo de vida de contenedores

Crear y ejecutar:

```bash
docker run -d --name api-local node:20-alpine sleep 3600
```

Inspeccionar:

```bash
docker ps
docker ps -a
docker logs api-local
docker inspect api-local
```

Reiniciar / detener / borrar:

```bash
docker restart api-local
docker stop api-local
docker rm api-local
```

## 6. Puertos, volumenes y variables de entorno

Mapeo de puertos:

```bash
docker run -p 5173:5173 mi-app:dev
```

Volumen para persistencia:

```bash
docker volume create datos-postgres
docker run -d --name db -v datos-postgres:/var/lib/postgresql/data postgres:16-alpine
```

Variables de entorno:

```bash
docker run -e NODE_ENV=production -e PORT=3000 mi-app:1.0
```

## 7. Redes en Docker

Por defecto, los contenedores comparten la red `bridge`.

Crear red dedicada para proyecto:

```bash
docker network create app-net
docker run -d --name api --network app-net mi-api:1.0
docker run -d --name web --network app-net mi-web:1.0
```

Esto permite que `web` se conecte a `api` usando el nombre del contenedor.

## 8. Dockerfile base recomendado

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]
```

Buenas practicas iniciales:

- usa imagenes oficiales y versiones fijas cuando sea posible
- agrega `.dockerignore`
- separa dependencias de build y runtime
- no guardes secretos dentro de la imagen

## 9. Comandos de limpieza utiles

Ver uso de espacio:

```bash
docker system df
```

Eliminar recursos no usados:

```bash
docker container prune
docker image prune
docker volume prune
docker system prune
```

Usa `prune` con criterio: puede borrar recursos que aun te sirven.

## 10. Mini rutina diaria

```bash
# construir imagen local
docker build -t mi-app:dev .

# levantar contenedor
docker run --rm -p 3000:3000 --name mi-app-local mi-app:dev

# revisar estado
docker ps
docker logs mi-app-local

# entrar al contenedor si hace falta
docker exec -it mi-app-local sh
```

## 11. Ejercicio recomendado

1. Crea una carpeta con un `index.html` simple.
2. Crea un `Dockerfile` usando `nginx:alpine`.
3. Construye la imagen y levantala en `localhost:8080`.
4. Cambia el HTML, reconstruye y prueba nuevamente.
5. Explica la diferencia entre imagen y contenedor usando tu propio ejemplo.
