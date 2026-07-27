# Git Cheatsheet Rapido

Referencia de comandos por escenario.

## Setup inicial

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
git config --list
```

## Crear y clonar repos

```bash
git init
git clone <url>
git remote -v
```

## Estado y cambios

```bash
git status
git add <archivo>
git add .
git restore <archivo>
git restore --staged <archivo>
git diff
git diff --staged
```

## Commits e historial

```bash
git commit -m "tipo: mensaje"
git commit --amend
git log
git log --oneline --graph --decorate --all
git show <hash>
```

## Ramas

```bash
git branch
git branch -a
git switch -c feature/x
git switch main
git merge feature/x
git branch -d feature/x
```

## Remotos

```bash
git fetch origin
git pull origin main
git push origin main
git push -u origin feature/x
```

## Rebase

```bash
git rebase main
git rebase --continue
git rebase --abort
```

## Stash

```bash
git stash
git stash list
git stash pop
git stash apply
git stash drop
```

## Undo seguro

```bash
git revert <hash>
git reset --soft HEAD~1
git reset --mixed HEAD~1
```

Nota:

- evita `git reset --hard` en trabajo no respaldado
- evita `push --force` en ramas compartidas

## Tags

```bash
git tag
git tag -a v1.0.0 -m "release 1.0.0"
git push origin v1.0.0
```

## Limpieza

```bash
git clean -n
git clean -fd
git gc
```

`git clean -fd` borra archivos no trackeados. Usalo con cuidado.
