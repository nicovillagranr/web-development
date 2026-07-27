# Docker Cheatsheet Rapido

Referencia de comandos por escenario.

## Setup y diagnostico

```bash
docker version
docker info
docker context ls
```

## Imagenes

```bash
docker pull <imagen:tag>
docker images
docker build -t mi-app:dev .
docker tag mi-app:dev usuario/mi-app:1.0.0
docker rmi <imagen>
```

## Contenedores

```bash
docker run -d --name app -p 3000:3000 mi-app:dev
docker ps
docker ps -a
docker stop app
docker start app
docker restart app
docker rm app
docker rm -f app
```

## Logs y depuracion

```bash
docker logs app
docker logs -f app
docker exec -it app sh
docker inspect app
docker top app
docker stats
```

## Volumenes

```bash
docker volume ls
docker volume create datos
docker volume inspect datos
docker volume rm datos
```

## Redes

```bash
docker network ls
docker network create app-net
docker network inspect app-net
docker network rm app-net
```

## Compose

```bash
docker compose up -d
docker compose up -d --build
docker compose ps
docker compose logs -f
docker compose exec api sh
docker compose down
docker compose down -v
```

## Limpieza

```bash
docker container prune
docker image prune
docker volume prune
docker system prune
docker system df
```

## Publicacion en registry

```bash
docker login
docker push usuario/mi-app:1.0.0
docker pull usuario/mi-app:1.0.0
```

## Nota de seguridad

- evita secretos en Dockerfile o comandos
- evita `latest` como unico tag de produccion
- revisa que puertos expuestos sean los minimos necesarios
