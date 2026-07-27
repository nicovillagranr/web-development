# Agentes en Claude Code

## 1. Que es un agente

Un agente es una instancia especializada de Claude que se lanza para resolver una tarea concreta de forma autonoma. Trabaja con su propio conjunto de herramientas y devuelve un resultado al agente principal.

Los agentes permiten:

- Paralelizar tareas independientes
- Proteger el contexto principal de resultados voluminosos
- Delegar busquedas, exploraciones o ejecuciones sin interrumpir el flujo

## 2. Tipos de agentes disponibles

### general-purpose
Agente de proposito general. Puede buscar codigo, investigar preguntas complejas y ejecutar tareas de varios pasos.

Herramientas: todas.

### Explore
Especializado en explorar codebases rapidamente. Busca archivos por patrones, analiza keywords, responde preguntas sobre la estructura del proyecto.

Niveles de profundidad: `quick`, `medium`, `very thorough`.

No puede editar archivos (solo lectura y busqueda).

### Plan
Arquitecto de software. Disenha planes de implementacion, identifica archivos criticos y evalua trade-offs. Devuelve pasos concretos.

No puede editar archivos.

### claude-code-guide
Especializado en responder preguntas sobre Claude Code, la CLI, el SDK de agentes y la API de Anthropic.

## 3. Como se invocan

Claude los lanza internamente cuando los necesita. Tu no los llamas directamente con un comando, pero puedes guiar a Claude para que los use:

```
"usa un agente para explorar todos los archivos de componentes React en este proyecto"
"lanza un agente en background para buscar todos los TODOs mientras yo sigo trabajando"
```

## 4. Agentes en paralelo

Claude puede lanzar varios agentes al mismo tiempo si las tareas son independientes. Esto acelera el trabajo en repositorios grandes.

Ejemplo de uso:
```
"en paralelo: uno que explore los tests, otro que revise los componentes"
```

## 5. Agentes en background

Un agente puede correr en background mientras el agente principal sigue respondiendo. Cuando termina, notifica automaticamente.

Casos de uso tipicos:
- Busquedas largas en repos grandes
- Validaciones que no bloquean el flujo principal

## 6. Isolation: worktree

Un agente puede trabajar en una copia aislada del repositorio (git worktree temporal). Si no hace cambios, se limpia solo. Si hace cambios, devuelve la ruta del worktree.

Util para experimentos o cambios riesgosos sin tocar el repo principal.

## 7. Cuando NO usar agentes

- Para leer un archivo concreto (usa Read directamente)
- Para buscar una clase o funcion especifica (usa Grep o Glob)
- Para tareas simples de 1-2 pasos

Los agentes tienen overhead: usarlos en exceso ralentiza el flujo.

## 8. Ejercicio

Pide a Claude:

```
"Usa un agente Explore para encontrar todos los archivos de configuracion en este proyecto y listarlos con su proposito"
```

Observa como Claude delega la busqueda, recibe el resultado y lo sintetiza para ti.
