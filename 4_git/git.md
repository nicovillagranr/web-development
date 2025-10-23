<!-- Guía Completa de Git
Por Nico
Introducción a Git
Git es una herramienta de control de versiones ampliamente utilizada en el área de TI. Permite:

Gestionar y registrar cambios en el código fuente de un proyecto.
Facilitar el trabajo colaborativo entre desarrolladores.
Controlar versiones del software, evitar errores en producción y mantener un historial completo de modificaciones.


1. Las Tres Áreas Principales en Git
Directorio de Trabajo (Working Directory / Working Tree)

Carpeta del proyecto donde editas los archivos directamente.
Aquí realizas cambios que puedes guardar, probar o descartar.

Área de Stage (Staging Area / Index)

Zona de preparación para el próximo commit.
Los archivos se añaden con git add y solo los incluidos aquí se confirmarán con git commit.

Repositorio Local (Local Repository)

Almacena la historia completa del proyecto (todos los commits).
Cada commit representa un estado seguro al que puedes volver cuando desees.


2. Configuración Inicial de Git (git config)
Antes de usar Git, configura tu información de usuario y preferencias:

git config --global user.name "Tu Nombre"
Define el nombre asociado a tus commits.
git config --global user.email "tuemail@dominio.com"
Define el correo asociado a tus commits.
git config --global color.ui auto
Activa colores en la terminal para mejorar la legibilidad.
git config --list
Muestra la configuración actual de Git.

Nota:

--global aplica la configuración a todos los repositorios en tu computadora.
Sin --global, la configuración solo afecta al repositorio actual.


3. Comandos Básicos de Terminal (No Git)

cd carpeta
Navega entre carpetas.

ls
Muestra los archivos y carpetas del directorio actual.

pwd
Muestra la ruta del directorio actual.

mkdir nombre_carpeta
Crea un nuevo directorio.

touch nombre_archivo.extensión
Crea un archivo vacío (ejemplo: touch index.html).

rm nombre_archivo
Elimina un archivo.

rmdir nombre_carpeta
Elimina una carpeta vacía.

clear
Limpia la pantalla de la terminal.

echo "texto" > archivo
Crea un archivo con contenido o sobrescribe el existente.

echo "texto" >> archivo
Agrega texto al final de un archivo sin sobrescribir.

mv archivo_original nueva_ruta_o_nombre
Mueve o renombra un archivo en el sistema de archivos (no rastreado automáticamente por Git).

Ejemplo:
bashmv index.html main.html

git status
Git mostrará index.html como eliminado y main.html como no rastreado. Debes usar git add main.html para registrar el cambio.

4. Comandos Principales de Git

git init
Convierte una carpeta local en un repositorio Git.

git add archivo
Prepara un archivo específico para el próximo commit.

git add .
Prepara todos los archivos modificados o nuevos.

git commit -m "mensaje"
Guarda los cambios preparados con un mensaje descriptivo.

git status
Muestra el estado del repositorio (archivos modificados, preparados o sin seguimiento).

git status -s
Muestra el estado de forma resumida y compacta.

??: Archivo no rastreado (nuevo, Git no lo sigue).
A: Archivo agregado al stage, listo para commit.
M: Archivo modificado, rastreado, pero cambios no confirmados.
D: Archivo eliminado del stage o del disco.


git rm archivo
Elimina un archivo del repositorio y del sistema de archivos.
git rm --cached archivo
Elimina un archivo del control de Git, pero lo conserva en el disco.
git mv archivo_original nuevo_nombre_o_ruta
Mueve o renombra un archivo y lo registra en Git para el próximo commit.
Ejemplo:
bashgit mv index.html main.html
git commit -m "Renombrado index.html a main.html"
Git registra esto como un renombrado, no como eliminación + creación.
git restore archivo
Revierte cambios en el directorio de trabajo o los quita del stage sin afectar commits previos.
git checkout nombre_rama_o_commit
Cambia a otra rama o commit. Útil para revisar versiones antiguas o crear ramas.
git show commit_id
Muestra detalles de un commit: autor, fecha, mensaje y cambios realizados.
git diff
Muestra diferencias entre archivos y commits:

Sin argumentos: Cambios no añadidos al stage (working directory vs. staging area).
git diff --staged o git diff --cached: Cambios preparados para el próximo commit.
git diff commit1 commit2: Compara dos commits específicos.
git diff archivo: Muestra diferencias en un archivo específico.


git log
Muestra el historial de commits.
git push
Envía los cambios locales al repositorio remoto.
git pull
Descarga y aplica los cambios del repositorio remoto.
git clone URL
Clona un repositorio remoto en tu computadora.


5. Eliminar un Commit Reciente
Si el commit está solo en local (sin push):

Manteniendo los cambios (para corregirlos):
bashgit reset --soft HEAD~1

Eliminando el commit y los cambios:
bashgit reset --hard HEAD~1


Si ya hiciste push al repositorio remoto:

Forzar eliminación (cuidado, solo si nadie más trabaja en el repositorio):
bashgit reset --hard HEAD~1
git push origin main --force



6. Comando para Arreglar Errores Graves
bashrm -rf .git
Elimina toda la configuración y el historial de Git en la carpeta, como si nunca se hubiera iniciado un repositorio. -->