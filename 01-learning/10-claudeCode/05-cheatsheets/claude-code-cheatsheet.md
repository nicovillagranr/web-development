# Claude Code - Cheatsheet Rapido

Referencia de comandos, atajos y patrones por escenario.

## Iniciar sesion

```bash
claude                        # sesion interactiva en el repo actual
claude "mensaje directo"      # respuesta rapida sin sesion abierta
claude --version              # verificar version instalada
```

## Comandos slash de sesion

```
/help          # ayuda general
/clear         # limpiar contexto de conversacion
/compact       # comprimir historial (libera tokens)
/exit          # salir de la sesion
/plan          # modo planificacion sin ejecutar cambios
/fast          # modo rapido (misma calidad, salida mas veloz)
/permissions   # ver y cambiar modo de permisos
/model         # cambiar modelo de Claude
```

## Skills (slash commands)

```
/commit              # commit con buenas practicas automatico
/review-pr <num>     # revisar un PR de GitHub
/simplify            # limpiar y simplificar codigo reciente
/loop <intervalo>    # repetir comando en intervalos
/keybindings-help    # personalizar atajos de teclado
/claude-api          # modo para construir con la API de Anthropic
```

## Atajos de teclado

| Atajo | Accion |
|---|---|
| `Ctrl+C` | Interrumpir respuesta en curso |
| `Ctrl+L` | Limpiar pantalla |
| `Escape` | Cancelar accion actual |
| Flecha arriba | Navegar historial de mensajes |

## Herramientas que Claude usa internamente

| Herramienta | Para que sirve |
|---|---|
| `Read` | Leer archivos |
| `Edit` | Editar partes de archivos (diff exacto) |
| `Write` | Crear o reescribir archivos completos |
| `Bash` | Ejecutar comandos de terminal |
| `Grep` | Buscar contenido por patron en archivos |
| `Glob` | Buscar archivos por patron de nombre |
| `Agent` | Lanzar sub-agentes especializados |

## Modos de permission

| Modo | Comportamiento |
|---|---|
| default | Pide confirmacion para acciones de alto impacto |
| auto-approve | Aprueba automaticamente herramientas de bajo riesgo |
| full-auto | Maxima autonomia, minimas interrupciones |

## Agentes disponibles

| Agente | Especialidad |
|---|---|
| `general-purpose` | Tareas multistep generales |
| `Explore` | Exploracion rapida de codebases |
| `Plan` | Planes de implementacion arquitectonica |
| `claude-code-guide` | Preguntas sobre Claude Code y la API |

## Configuracion de hooks (settings.json)

```json
{
  "hooks": {
    "post-tool-call": [
      {
        "matcher": "Edit",
        "hooks": [{ "type": "command", "command": "npm run lint" }]
      }
    ]
  }
}
```

Archivo global: `~/.claude/settings.json`
Archivo local: `.claude/settings.json` (tiene precedencia)

## Patrones de uso frecuente

```
# Revisar el proyecto rapidamente
"dame un resumen de este repo"

# Buscar algo en el codebase
"encuentra todos los archivos donde se usa useEffect"

# Refactor controlado
/plan → revisar → aprobar → ejecutar

# Commit limpio
/commit

# Limpiar lo que escribiste
/simplify

# Tarea larga sin bloquear
"usa un agente en background para encontrar todos los TODOs"

# Planificar antes de ejecutar
/plan agrega autenticacion con JWT al proyecto
```

## Senales de que algo no va bien

- Claude repite el mismo error → pide que diagnosti antes de reintentar
- La sesion se pone lenta → usa `/compact`
- Claude hace algo inesperado → usa `Ctrl+C` y reformula la instruccion
- Un hook bloquea el flujo → revisa `.claude/settings.json`
