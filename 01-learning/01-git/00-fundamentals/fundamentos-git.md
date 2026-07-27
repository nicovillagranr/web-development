# Fundamentos de Git

Esta guia cubre la base minima para entender Git y trabajar con seguridad.

## 1. Que es Git

Git es un sistema de control de versiones distribuido. Sirve para:

- guardar versiones de tu codigo
- comparar cambios en el tiempo
- colaborar sin pisar trabajo de otras personas
- volver atras cuando algo se rompe

## 2. Modelo mental rapido

Git trabaja con 3 zonas:

1. Working directory: tus archivos editados.
2. Staging area (index): cambios preparados para el proximo commit.
3. Repository (.git): historial confirmado con commits.

Flujo base:

```bash
editas archivos
git add ...
git commit -m "mensaje"
```

## 3. Configuracion inicial

Configura identidad y defaults:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

Revisar configuracion:

```bash
git config --list
```

## 4. Crear o clonar repositorios

Crear repo local:

```bash
mkdir mi-proyecto
cd mi-proyecto
git init
```

Clonar repo remoto:

```bash
git clone <url-del-repo>
cd <nombre-del-repo>
```

## 5. Estados de archivos

Ver estado:

```bash
git status
```

Estados comunes:

- untracked: archivo nuevo que Git aun no sigue
- modified: archivo trackeado con cambios sin stage
- staged: cambio listo para commit
- committed: cambio guardado en historial

## 6. Historial y comparaciones

Historial compacto:

```bash
git log --oneline --graph --decorate --all
```

Ver diferencias:

```bash
git diff
git diff --staged
```

## 7. Ignorar archivos

Usa `.gitignore` para excluir artefactos no versionables:

```gitignore
node_modules/
dist/
.env
*.log
```

Si un archivo ya estaba trackeado:

```bash
git rm --cached <archivo>
```

## 8. Deshacer sin panico

Quitar cambios del stage:

```bash
git restore --staged <archivo>
```

Descartar cambios locales en un archivo:

```bash
git restore <archivo>
```

Revertir un commit ya publicado (seguro):

```bash
git revert <hash>
```

## 9. Buenas practicas base

- haz commits pequenos y con una sola intencion
- escribe mensajes claros
- corre pruebas antes de commitear
- evita commitear secretos o archivos generados
- revisa `git status` antes de cada commit

## 10. Mini rutina diaria

```bash
git status
git pull origin main
# trabajar...
git add .
git commit -m "tipo: cambio concreto"
git push origin <rama>
```

## 11. Ejercicio recomendado

1. Crea un repo de practica.
2. Agrega 3 archivos y haz 3 commits diferentes.
3. Modifica uno, revisa `git diff`, y commitea.
4. Crea un `.gitignore` y excluye logs.
5. Haz un `git log --oneline` y explica la historia de cambios.
