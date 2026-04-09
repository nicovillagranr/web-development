# Que es Claude Code

## 1. Definicion

Claude Code es la CLI oficial de Anthropic para interactuar con Claude desde la terminal. No es un chatbot: es un agente de software capaz de leer archivos, editar codigo, ejecutar comandos y navegar tu repositorio.

Funciona en tu entorno real: ve tus archivos, conoce tu proyecto y actua sobre el.

## 2. Para que sirve

- Explicar, refactorizar o escribir codigo directamente en tu repo
- Hacer commits, abrir PRs y gestionar Git
- Buscar en el codebase por patrones o funciones
- Ejecutar comandos de terminal con supervision
- Automatizar tareas con agentes, skills y hooks

## 3. Instalacion

Requiere Node.js >= 18.

```bash
npm install -g @anthropic-ai/claude-code
```

Verificar instalacion:

```bash
claude --version
```

## 4. Primer uso

Desde cualquier carpeta de un proyecto:

```bash
claude
```

Esto abre una sesion interactiva. Claude lee el contexto de tu repositorio y esta listo para ayudarte.

Tambien puedes pasar un mensaje directo:

```bash
claude "explica que hace este repo"
```

## 5. Modelo mental

Claude Code no es un asistente de chat. Es un agente que:

1. Lee el contexto de tu proyecto (archivos, git, estructura)
2. Razona sobre la tarea
3. Usa herramientas: Read, Edit, Write, Bash, Grep, Glob
4. Pide permiso antes de acciones destructivas
5. Reporta lo que hizo y por que

Piensalo como un colega que trabaja en tu mismo repo, pero te consulta antes de borrar o pushear.

## 6. Modos de permission

Claude Code tiene tres modos que controlan cuanto puede hacer sin pedirte permiso:

- **default**: pide confirmacion para acciones de alto impacto
- **auto-approve**: aprueba automaticamente herramientas de bajo riesgo
- **full-auto**: maxima autonomia, minimas interrupciones

Puedes cambiar el modo en la sesion con `/permissions`.

## 7. Que NO es Claude Code

- No reemplaza tu editor (es complementario a VSCode, Neovim, etc.)
- No tiene acceso a internet en tiempo real (salvo herramientas especificas)
- No actua sin tu repositorio como contexto
