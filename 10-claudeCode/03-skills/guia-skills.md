# Skills en Claude Code

## 1. Que es un skill

Un skill es un prompt especializado que se invoca con un comando slash (`/nombre-skill`). Cuando lo ejecutas, el skill se expande en instrucciones completas que Claude sigue para realizar una tarea estandarizada.

Los skills son reutilizables, consistentes y estan disenados para tareas comunes de desarrollo.

## 2. Skills disponibles por defecto

### /commit
Crea un commit siguiendo buenas practicas:

- Revisa `git status` y `git diff`
- Analiza los cambios
- Redacta un mensaje claro y conciso
- Agrega archivos relevantes
- Ejecuta el commit con co-autoria de Claude

```
/commit
/commit -m "descripcion opcional"
```

### /review-pr
Revisa un Pull Request de GitHub:

- Analiza los commits y cambios del PR
- Evalua calidad, seguridad y consistencia
- Sugiere mejoras concretas

```
/review-pr 123
```

### /simplify
Revisa el codigo cambiado en busca de:

- Oportunidades de reutilizacion
- Mejoras de calidad y eficiencia
- Codigo innecesariamente complejo

Util despues de escribir una feature o fix.

### /loop
Ejecuta un comando en intervalos regulares:

```
/loop 5m /commit      → hace commit cada 5 minutos
/loop                  → usa intervalo default de 10 minutos
```

### /keybindings-help
Te ayuda a personalizar los atajos de teclado de Claude Code.

### /claude-api
Activa un modo especializado para construir apps con la API de Anthropic o el SDK de Claude.

## 3. Como invocar un skill

Escribe el slash command en la sesion:

```
/commit
```

Claude detecta el skill, lo carga y ejecuta la logica asociada.

Puedes pasar argumentos adicionales:

```
/review-pr 42
/loop 10m /simplify
```

## 4. Skills vs comandos slash normales

| Slash command normal | Skill |
|---|---|
| `/help`, `/clear`, `/plan` | `/commit`, `/review-pr`, `/simplify` |
| Funcion interna de Claude Code | Prompt especializado expandido |
| No tiene logica propia compleja | Sigue un flujo de instrucciones detallado |

## 5. Buenas practicas

- Usa `/commit` en lugar de hacer commits manualmente: asegura mensajes consistentes
- Usa `/simplify` despues de resolver un bug para limpiar lo que escribiste
- Usa `/plan` antes de usar `/commit` en cambios grandes para revisar que todo tiene sentido

## 6. Ejercicio

1. Haz algun cambio en un archivo de tu proyecto.
2. Ejecuta `/commit` en Claude Code.
3. Observa como Claude analiza los cambios, redacta el mensaje y ejecuta el commit.
4. Compara con tu flujo de commits manual.
