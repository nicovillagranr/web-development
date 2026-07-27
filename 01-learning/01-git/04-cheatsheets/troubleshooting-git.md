# Troubleshooting Git

Problemas comunes y solucion rapida.

## 1. "fatal: not a git repository"

Causa:

- estas fuera de un repo.

Solucion:

```bash
cd <ruta-del-repo>
git status
```

## 2. Commit bloqueado por cambios sin stage

Causa:

- olvidaste hacer `git add`.

Solucion:

```bash
git add .
git commit -m "mensaje"
```

## 3. Push rechazado (non-fast-forward)

Causa:

- remoto tiene commits que no tienes localmente.

Solucion segura:

```bash
git pull --rebase origin main
git push origin main
```

## 4. Merge conflict

Solucion:

```bash
git status
# editar archivos en conflicto
git add <archivo>
git merge --continue
```

Si estabas en rebase:

```bash
git rebase --continue
```

## 5. Commite en rama equivocada

Caso comun: hiciste commit en `main` por error.

Solucion:

```bash
git branch feature/rescate
git switch feature/rescate
```

Luego vuelve a `main` y resetea solo si ese commit no fue publicado:

```bash
git switch main
git reset --hard HEAD~1
```

Si ya lo publicaste, usa `revert` en lugar de reset.

## 6. Quiero recuperar trabajo sin commitear

Usa stash:

```bash
git stash
git switch otra-rama
git stash pop
```

## 7. Borre algo por error

Si estaba en Git:

```bash
git restore <archivo>
```

Si ya habia commit:

```bash
git log --oneline
git checkout <hash> -- <archivo>
```

## 8. Push con credenciales falla

Recomendado:

- usa token personal (PAT)
- revisa helper de credenciales

Comando util:

```bash
git config --global credential.helper manager
```

## 9. Historial confuso por muchos merges

Solucion:

- usa ramas pequenas
- integra cambios seguido
- considera `rebase` en ramas locales no compartidas

## 10. Checklist de emergencia antes de acciones riesgosas

1. `git status`
2. `git branch --show-current`
3. `git log --oneline -n 5`
4. backup rapido si hay dudas (`git stash` o rama temporal)
