# Flujo de Trabajo con GitHub

Esta guia cubre el trabajo remoto con GitHub para colaboracion profesional.

## 1. Remotos: origen y destino

Ver remotos:

```bash
git remote -v
```

Agregar remoto:

```bash
git remote add origin <url>
```

Cambiar URL de remoto:

```bash
git remote set-url origin <nueva-url>
```

## 2. Publicar una rama

Primera vez:

```bash
git push -u origin feature/nueva-seccion
```

Luego solo:

```bash
git push
```

## 3. Mantenerte al dia

Traer cambios remotos:

```bash
git fetch origin
```

Actualizar rama actual:

```bash
git pull origin main
```

Sin mezclar automaticamente:

```bash
git fetch origin
git log --oneline --graph --decorate --all
```

## 4. Pull Requests (PR)

Flujo recomendado:

1. Push de tu rama.
2. Abre PR hacia `main`.
3. Describe objetivo, alcance y testing.
4. Pide review.
5. Corrige feedback con commits pequenos.
6. Merge cuando aprueben.

Plantilla sugerida para descripcion de PR:

```md
## Objetivo
Breve descripcion del cambio.

## Cambios
- Cambio 1
- Cambio 2

## Validacion
- [ ] Pruebas locales
- [ ] Capturas (si aplica)
- [ ] Riesgos conocidos
```

## 5. Code review util

Como autor:

- PR pequeno (idealmente menor a 400 lineas efectivas)
- contexto claro
- respuestas concretas a comentarios

Como reviewer:

- enfocar en bugs, seguridad, mantenibilidad
- diferenciar obligatorio vs sugerencia
- ser especifico en observaciones

## 6. Trabajar con forks

Escenario comun en open source.

Config inicial:

```bash
git remote add upstream <url-repo-original>
git fetch upstream
```

Sincronizar tu fork:

```bash
git switch main
git fetch upstream
git merge upstream/main
git push origin main
```

## 7. Releases y tags

Crear tag anotado:

```bash
git tag -a v1.2.0 -m "release 1.2.0"
git push origin v1.2.0
```

Listar tags:

```bash
git tag
```

Buenas practicas:

- usa versionado semantico (`MAJOR.MINOR.PATCH`)
- crea release notes breves con cambios clave

## 8. Seguridad minima

- activa 2FA en GitHub
- usa token/pat en lugar de password
- no subas secretos (`.env`, claves privadas)
- rota credenciales si fueron expuestas

## 9. Errores comunes

- hacer `push --force` en ramas compartidas sin aviso
- abrir PRs gigantes
- no actualizar rama antes de merge
- mezclar cambios no relacionados en un PR

## 10. Rutina recomendada de colaboracion

```bash
git switch main
git pull origin main
git switch -c feature/tarea
# trabajo...
git add .
git commit -m "feat: implementa tarea"
git push -u origin feature/tarea
# abrir PR en GitHub
```
