# Comandos Slash en Claude Code

Los comandos slash son atajos de texto que activan funciones especiales dentro de la sesion.

## Comandos de sesion

| Comando | Descripcion |
|---|---|
| `/help` | Muestra ayuda general de Claude Code |
| `/clear` | Limpia el contexto de la conversacion actual |
| `/compact` | Comprime el historial para liberar contexto |
| `/exit` | Sale de la sesion |

## Comandos de configuracion

| Comando | Descripcion |
|---|---|
| `/permissions` | Ver y cambiar el modo de permisos |
| `/model` | Cambiar el modelo de Claude que se usa |
| `/config` | Ver configuracion activa |

## Comandos de herramientas y modos

| Comando | Descripcion |
|---|---|
| `/plan` | Entra en modo planificacion (sin ejecutar cambios) |
| `/fast` | Activa el modo rapido (mismo modelo, salida mas veloz) |

## Skills como comandos slash

Los skills se invocan con `/nombre-del-skill`. Ejemplos:

```
/commit          → hace un commit siguiendo buenas practicas
/review-pr       → revisa un PR de GitHub
/simplify        → revisa y simplifica el codigo cambiado
```

Ver todos los skills disponibles en `03-skills/guia-skills.md`.

## Atajos de teclado en la sesion

| Atajo | Accion |
|---|---|
| `Ctrl+C` | Interrumpe la respuesta actual |
| `Ctrl+L` | Limpia la pantalla |
| `Escape` | Cancela la accion en curso |
| Flecha arriba | Historial de mensajes anteriores |

## Modo plan

El modo plan es especialmente util antes de cambios grandes:

```
/plan
```

En este modo Claude describe lo que haria sin ejecutar nada. Ideal para revisar antes de aprobar.

## Tips de uso

- Combina comandos slash con lenguaje natural: `/plan refactoriza el modulo de autenticacion`
- Usa `/compact` cuando la sesion se alarga para mantener el contexto limpio
- Usa `/clear` para empezar una tarea nueva sin contexto anterior que confunda

## Ejercicio

1. Abre Claude Code en tu proyecto.
2. Escribe `/help` y lee las opciones.
3. Prueba `/plan` con una tarea concreta.
4. Usa `/compact` y observa como cambia el contexto.
