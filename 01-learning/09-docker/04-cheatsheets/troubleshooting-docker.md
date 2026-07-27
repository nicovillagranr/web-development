# Troubleshooting Docker

Problemas comunes y solucion rapida.

## 1. "Cannot connect to the Docker daemon"

Causa:

- Docker daemon detenido.

Solucion:

```bash
docker info
```

Si falla, inicia Docker Desktop/Engine y vuelve a probar.

## 2. Puerto en uso (`bind: address already in use`)

Causa:

- otro proceso usa ese puerto.

Solucion:

- cambia el mapeo (`-p 8081:80`) o libera el puerto.
- revisa contenedores activos:

```bash
docker ps
```

## 3. Contenedor se cae al iniciar

Causa:

- comando de arranque incorrecto o app rompiendo al boot.

Solucion:

```bash
docker logs <contenedor>
docker inspect <contenedor>
```

Corrige `CMD/ENTRYPOINT`, variables de entorno o archivos faltantes.

## 4. Cambios de codigo no se reflejan

Causa:

- no reconstruiste imagen o no montaste volumen.

Solucion:

```bash
docker compose up -d --build
```

En desarrollo, usa bind mounts para hot reload.

## 5. Error de permisos en archivos/volumenes

Causa:

- diferencias de UID/GID entre host y contenedor.

Solucion:

- ajusta usuario en Dockerfile (`USER`)
- corrige permisos del volumen/directorio montado

## 6. Imagen demasiado pesada

Causa:

- base grande, capas innecesarias, contexto enorme.

Solucion:

- usa imagen base mas liviana
- agrega `.dockerignore`
- usa multi-stage build
- revisa capas con:

```bash
docker history <imagen>
```

## 7. Compose no encuentra variables `.env`

Causa:

- `.env` en ruta incorrecta o variable mal escrita.

Solucion:

- coloca `.env` junto a `compose.yaml`
- valida nombres `${VARIABLE}`

## 8. Error al conectar API con DB en Compose

Causa:

- host incorrecto (usar `localhost` dentro de contenedor).

Solucion:

- usa el nombre del servicio como host (ej: `db`)
- valida red y orden de arranque

## 9. Build lento

Causa:

- cache invalidada por copiar todo muy pronto.

Solucion:

- copia primero `package*.json` y ejecuta `npm ci`
- copia codigo despues
- evita archivos grandes en contexto

## 10. Checklist de emergencia

1. `docker ps -a`
2. `docker logs <contenedor>`
3. `docker inspect <contenedor>`
4. `docker compose ps` (si aplica)
5. `docker system df` para revisar espacio
