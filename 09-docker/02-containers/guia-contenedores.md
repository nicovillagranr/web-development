# Guia de Contenedores Docker

Este documento explica como ejecutar y operar contenedores de forma segura.

## 1. Concepto clave

Un contenedor es una instancia en ejecucion de una imagen.

Puedes tener varios contenedores de la misma imagen con configuraciones distintas.

## 2. Ejecutar contenedores

Modo interactivo:

```bash
docker run --rm -it node:20-alpine sh
```

Modo detached (fondo):

```bash
docker run -d --name web -p 8080:80 nginx:alpine
```

Con variables de entorno:

```bash
docker run -d --name api -e NODE_ENV=production -e PORT=3000 mi-api:1.0
```

Con volumen:

```bash
docker run -d --name db -v datos-db:/var/lib/postgresql/data postgres:16-alpine
```

## 3. Comandos operativos diarios

Ver contenedores activos:

```bash
docker ps
```

Ver todos (incluye detenidos):

```bash
docker ps -a
```

Ver logs:

```bash
docker logs web
docker logs -f web
```

Entrar al contenedor:

```bash
docker exec -it web sh
```

Copiar archivos desde/hacia contenedor:

```bash
docker cp web:/etc/nginx/nginx.conf ./nginx.conf
docker cp ./nginx.conf web:/etc/nginx/nginx.conf
```

## 4. Estado y recursos

Procesos dentro del contenedor:

```bash
docker top web
```

Consumo de CPU/RAM:

```bash
docker stats
```

Inspeccion completa:

```bash
docker inspect web
```

## 5. Reinicio y recuperacion

Politicas de restart:

```bash
docker run -d --restart unless-stopped --name api mi-api:1.0
```

Opciones utiles:

- `no` (default)
- `on-failure`
- `unless-stopped`
- `always`

## 6. Healthcheck basico

Definir chequeo de salud en Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1
```

Ver estado:

```bash
docker ps
```

Columna `STATUS` mostrara `healthy` o `unhealthy`.

## 7. Volumenes y persistencia

Listar volumenes:

```bash
docker volume ls
```

Inspeccionar volumen:

```bash
docker volume inspect datos-db
```

Eliminar volumen (con cuidado):

```bash
docker volume rm datos-db
```

## 8. Redes entre contenedores

Crear red dedicada:

```bash
docker network create app-net
```

Levantar servicios en la misma red:

```bash
docker run -d --name db --network app-net postgres:16-alpine
docker run -d --name api --network app-net mi-api:1.0
```

La API se puede conectar a Postgres usando host `db`.

## 9. Limpieza segura

Borrar contenedores detenidos:

```bash
docker container prune
```

Borrar solo un contenedor:

```bash
docker rm <container-id>
```

Forzar borrado si sigue corriendo:

```bash
docker rm -f <container-id>
```

## 10. Buenas practicas

- usa nombres claros (`--name`)
- evita correr como root cuando sea posible
- expone solo puertos necesarios
- usa volumenes para datos persistentes
- no metas secretos como texto plano en comandos

## 11. Ejercicio recomendado

1. Levanta `nginx:alpine` en `8080`.
2. Revisa logs y entra al contenedor con `exec`.
3. Crea un contenedor `postgres` con volumen.
4. Crea una red `app-net` y conecta 2 contenedores.
5. Simula una caida y recupera el servicio con `restart`.
