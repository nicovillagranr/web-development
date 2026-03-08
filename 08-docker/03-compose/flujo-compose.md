# Flujo de Trabajo con Docker Compose

Esta guia cubre como orquestar multiples servicios localmente usando `docker compose`.

## 1. Por que Compose

Compose permite definir toda tu aplicacion en un archivo `compose.yaml`:

- servicios
- puertos
- variables de entorno
- volumenes
- redes

Con un solo comando levantas o bajas todo el stack.

## 2. Estructura base de `compose.yaml`

```yaml
services:
  web:
    build: ./web
    ports:
      - "5173:5173"

  api:
    build: ./api
    ports:
      - "3000:3000"

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: app
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
```

## 3. Comandos base de compose

Levantar stack:

```bash
docker compose up -d
```

Ver estado:

```bash
docker compose ps
```

Ver logs de todos:

```bash
docker compose logs -f
```

Ver logs de un servicio:

```bash
docker compose logs -f api
```

Apagar stack:

```bash
docker compose down
```

Apagar y borrar volumenes:

```bash
docker compose down -v
```

## 4. Build y rebuild

Construir servicios:

```bash
docker compose build
```

Rebuild y levantar:

```bash
docker compose up -d --build
```

Forzar recreacion:

```bash
docker compose up -d --force-recreate
```

## 5. Ejecutar comandos dentro de servicios

Shell dentro de `api`:

```bash
docker compose exec api sh
```

Ejecutar migracion:

```bash
docker compose exec api npm run migrate
```

## 6. Dependencias entre servicios

`depends_on` controla orden de arranque, pero no garantiza que un servicio ya este listo.

Ejemplo:

```yaml
services:
  api:
    depends_on:
      - db
```

Para readiness real, usa healthchecks y retry logic en la app.

## 7. Perfiles de entorno

Activar servicios opcionales (ej. observabilidad):

```yaml
services:
  adminer:
    image: adminer
    profiles: ["tools"]
```

Levantar perfil:

```bash
docker compose --profile tools up -d
```

## 8. Variables de entorno con `.env`

Compose carga `.env` automaticamente en la raiz del proyecto.

Ejemplo `.env`:

```env
POSTGRES_DB=app
POSTGRES_USER=app
POSTGRES_PASSWORD=app
API_PORT=3000
```

Usar variables en `compose.yaml`:

```yaml
environment:
  POSTGRES_DB: ${POSTGRES_DB}
```

No subas secretos reales al repo.

## 9. Flujo diario recomendado

```bash
docker compose up -d
docker compose ps
docker compose logs -f api
# desarrollo...
docker compose down
```

## 10. Errores comunes

- mapear puertos duplicados
- olvidar `down -v` al resetear base de datos
- no reconstruir imagen tras cambios de dependencias
- mezclar demasiadas responsabilidades en un solo servicio

## 11. Ejercicio recomendado

1. Crea un stack con `frontend`, `api` y `db`.
2. Agrega volumen persistente para DB.
3. Agrega `depends_on` entre `api` y `db`.
4. Levanta con `up -d`, revisa logs y prueba conectividad.
5. Baja todo con `down -v` y vuelve a levantar desde cero.
