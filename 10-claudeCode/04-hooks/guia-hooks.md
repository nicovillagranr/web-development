# Hooks en Claude Code

## 1. Que son los hooks

Los hooks son comandos de shell que se ejecutan automaticamente en respuesta a eventos de Claude Code. Permiten automatizar acciones, validar comportamientos o enriquecer el flujo de trabajo sin intervenir manualmente.

El feedback de un hook se trata como si viniera del usuario: Claude lo lee y puede ajustar su comportamiento en respuesta.

## 2. Eventos disponibles

| Evento | Cuando se dispara |
|---|---|
| `pre-tool-call` | Antes de que Claude ejecute una herramienta |
| `post-tool-call` | Despues de que Claude ejecuta una herramienta |
| `user-prompt-submit` | Cuando el usuario envia un mensaje |
| `session-start` | Al iniciar una sesion de Claude Code |

## 3. Donde se configuran

Los hooks se definen en la configuracion de Claude Code, generalmente en:

```
~/.claude/settings.json
```

o en un archivo local del proyecto:

```
.claude/settings.json
```

La configuracion local tiene precedencia sobre la global.

## 4. Estructura de un hook

```json
{
  "hooks": {
    "post-tool-call": [
      {
        "matcher": "Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npm run lint"
          }
        ]
      }
    ]
  }
}
```

Este ejemplo ejecuta `npm run lint` cada vez que Claude edita un archivo.

## 5. Casos de uso practicos

### Linting automatico
Despues de cada edicion, verificar que el codigo sigue las reglas del proyecto:

```json
{
  "matcher": "Edit",
  "hooks": [{ "type": "command", "command": "eslint --fix {{file}}" }]
}
```

### Formateo automatico
Formatear con Prettier despues de escribir o editar:

```json
{
  "matcher": "Write",
  "hooks": [{ "type": "command", "command": "prettier --write {{file}}" }]
}
```

### Validacion antes de commits
Antes de ejecutar un commit, correr los tests:

```json
{
  "matcher": "Bash",
  "hooks": [{ "type": "command", "command": "npm test" }]
}
```

### Logs de sesion
Registrar cuando empieza una sesion:

```json
{
  "event": "session-start",
  "hooks": [{ "type": "command", "command": "echo 'Session started' >> ~/.claude/sessions.log" }]
}
```

## 6. Si un hook falla

Si un hook bloquea una accion de Claude, Claude:

1. Recibe el mensaje de error del hook
2. Evalua si puede ajustar su accion
3. Si no puede, informa al usuario y sugiere revisar la configuracion de hooks

## 7. Buenas practicas

- Empieza con hooks simples (lint, format) antes de agregar logica compleja
- Usa hooks locales por proyecto para no afectar otros repos
- Evita hooks que tarden mucho: bloquean el flujo de Claude
- Testea el comando del hook manualmente antes de configurarlo

## 8. Ejercicio

1. Crea `.claude/settings.json` en un proyecto que use Prettier.
2. Agrega un hook `post-tool-call` en `Edit` que ejecute `prettier --write` sobre el archivo modificado.
3. Pide a Claude que edite un archivo y observa como se formatea automaticamente.
