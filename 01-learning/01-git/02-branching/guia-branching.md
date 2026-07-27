# Guia de Branching en Git

Este documento explica como usar ramas para trabajar en paralelo sin romper `main`.

## 1. Concepto clave

Una rama es un puntero a una linea de trabajo. Permite:

- desarrollar features aisladas
- corregir bugs sin bloquear al equipo
- experimentar cambios con riesgo controlado

## 2. Comandos base de ramas

Listar ramas:

```bash
git branch
git branch -a
```

Crear rama:

```bash
git branch feature/login-form
```

Crear y cambiar en un paso:

```bash
git switch -c feature/login-form
```

Cambiar de rama:

```bash
git switch main
```

Borrar rama local fusionada:

```bash
git branch -d feature/login-form
```

Forzar borrado (si no esta fusionada):

```bash
git branch -D feature/login-form
```

## 3. Convencion de nombres recomendada

Usa nombres cortos y descriptivos:

- `feature/<descripcion>`
- `fix/<descripcion>`
- `refactor/<descripcion>`
- `chore/<descripcion>`

Ejemplos:

- `feature/profile-edit`
- `fix/navbar-overlap-mobile`
- `refactor/api-client`

## 4. Flujo simple recomendado

1. Actualiza `main`.
2. Crea rama nueva desde `main`.
3. Haz commits pequenos.
4. Sube rama a remoto.
5. Abre Pull Request.
6. Fusiona y elimina rama.

Comandos:

```bash
git switch main
git pull origin main
git switch -c feature/nuevo-componente
# cambios
git add .
git commit -m "feat: add nuevo componente"
git push -u origin feature/nuevo-componente
```

## 5. Merge vs Rebase

### Merge

- Une historias con un commit de merge.
- Mantiene trazabilidad explicita.
- Bueno para equipos que priorizan contexto.

```bash
git switch main
git merge feature/nuevo-componente
```

### Rebase

- Reescribe commits para dejar historia lineal.
- Produce log mas limpio.
- No usar sobre ramas ya compartidas sin acuerdo.

```bash
git switch feature/nuevo-componente
git rebase main
```

Regla practica:

- ramas publicadas: preferir merge
- ramas locales privadas: se puede rebase sin riesgo

## 6. Resolver conflictos

Conflictos ocurren cuando 2 ramas tocan la misma zona del archivo.

Proceso seguro:

1. Lee los marcadores `<<<<<<<`, `=======`, `>>>>>>>`.
2. Elige o combina cambios.
3. Guarda archivo.
4. Marca resuelto con `git add`.
5. Continua flujo (`commit`, `merge --continue` o `rebase --continue`).

Comandos utiles:

```bash
git status
git add <archivo>
git merge --continue
git rebase --continue
git rebase --abort
```

## 7. Estrategias de trabajo en equipo

### Trunk-based (simple)

- rama principal `main`
- ramas cortas de feature
- integracion frecuente

Ideal para equipos pequenos o ciclos rapidos.

### GitFlow (mas formal)

- `main`, `develop`, `feature/*`, `release/*`, `hotfix/*`
- mayor control de releases
- mayor complejidad operativa

Ideal para productos con versiones formales y muchos entornos.

## 8. Checklist antes de abrir PR

- rama actualizada con `main`
- pruebas locales ejecutadas
- commits claros
- sin archivos basura
- cambios acotados al objetivo

## 9. Errores frecuentes

- trabajar directo en `main`
- ramas demasiado largas
- mezclar varios objetivos en una misma rama
- borrar ramas sin fusionar por accidente

## 10. Ejercicio recomendado

1. Crea rama `feature/pagina-contacto`.
2. Haz 2 commits pequenos.
3. Simula conflicto editando mismo archivo desde `main` y la feature.
4. Resuelve conflicto y finaliza merge.
5. Borra rama local y remota.
