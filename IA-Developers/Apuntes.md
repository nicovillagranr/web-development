# IA para Desarrolladores

## Contexto personal

Actualmente uso herramientas de IA como Claude Code integradas en mis proyectos y editores.
Tengo conocimientos generales en varias áreas de tecnología, pero sólo estoy profundizando en el desarrollo Frontend.
Objetivo: usar IA como herramienta práctica dentro de aplicaciones reales.

---

## ¿Qué es la IA? (en términos prácticos)

La IA es una herramienta que permite a una aplicación:

- Procesar lenguaje natural (texto)
- Interpretar imágenes, audio o datos
- Generar contenido
- Tomar decisiones probabilísticas

👉 No es magia:
input → modelo → output

---

## Tipos de IA (contexto general)

### ANI (Artificial Narrow Intelligence)

IA especializada en tareas concretas.

Ejemplos:

- Recomendaciones (YouTube, Netflix, Spotify)
- Traductores
- Chatbots
- Reconocimiento facial
- Diagnóstico médico por imágenes

👉 Es el único tipo de IA que existe actualmente en producción.

---

### AGI (Artificial General Intelligence)

- IA capaz de realizar cualquier tarea intelectual humana
- Actualmente no existe
- Es un concepto teórico

---

### ASI (Artificial Super Intelligence)

- IA superior al humano en todos los aspectos
- Concepto hipotético

---

## Programación tradicional vs IA

### Programación tradicional

Reglas + datos → resultado

Tú defines exactamente qué debe pasar.

---

### IA (Machine Learning / Modelos)

Datos → modelo entrenado → resultado probabilístico

👉 No controlas exactamente la salida  
👉 Trabajas con probabilidades, no certezas

---

## Machine Learning (lo mínimo necesario)

Como desarrollador, debes entender:

- Dataset → datos usados para entrenar
- Modelo → algoritmo que aprende patrones
- Entrenamiento → proceso de aprendizaje
- Inferencia → uso del modelo en producción

👉 En la mayoría de los casos:
NO entrenas modelos  
SÍ consumes modelos ya creados (APIs)

---

## Lo que SÍ importa como desarrollador

### 1. Uso de APIs de IA

- Modelos de texto (chat, generación, clasificación)
- Generación de imágenes
- Embeddings (búsqueda semántica)

---

### 2. Prompt Engineering

- Cómo formular instrucciones correctamente
- Cómo estructurar inputs
- Cómo controlar outputs

---

### 3. Casos de uso reales

- Resúmenes automáticos
- Clasificación de texto
- Análisis de sentimiento
- Generación de contenido
- Bots conversacionales
- Sistemas de recomendación simples

---

### 4. Limitaciones (CRÍTICO)

- Alucinaciones (respuestas incorrectas)
- Costos por uso de API
- Latencia (tiempo de respuesta)
- Privacidad de datos

---

## Rol del desarrollador

No necesitas ser experto en Machine Learning.

Tu rol es:

- Integrar modelos en aplicaciones
- Diseñar buenas experiencias de usuario con IA
- Controlar costos y rendimiento
- Manejar errores y outputs inesperados

---

## Regla clave

👉 Si no puedes integrarlo en una app, no lo entiendes realmente.

## ¿Qué es un LLM?

LLM = Large Language Model (Modelo de Lenguaje Grande)

Es un modelo de IA entrenado con enormes cantidades de texto para predecir la siguiente palabra (token) en una secuencia.

👉 En simple:
Recibe texto → predice el siguiente token → repite el proceso

---

## Cómo funciona (nivel práctico)

Un LLM no "piensa" ni "entiende" como un humano.

Funciona así:

1. Recibe un input (prompt)
2. Lo convierte en tokens
3. Calcula probabilidades sobre posibles siguientes tokens
4. Genera una respuesta token por token

👉 Todo es probabilidad, no razonamiento real.

---

## Qué puede hacer un LLM

Gracias a su entrenamiento, puede:

- Responder preguntas
- Resumir texto
- Traducir idiomas
- Generar código
- Clasificar información
- Mantener conversaciones

👉 No porque "entienda", sino porque reconoce patrones.

---

## Conceptos clave que debes entender

### Tokens

- Fragmentos de texto (palabras o partes de palabras)
- Todo input y output se mide en tokens
- Afectan directamente el costo y la longitud de respuesta

---

### Contexto (context window)

- Cantidad máxima de tokens que el modelo puede procesar
- Incluye:
  - tu input
  - historial de conversación
  - respuesta generada

👉 Si te pasas del límite, el modelo "olvida" información

---

### Temperatura

- Controla la creatividad del modelo

- Baja (0.1 - 0.3) → respuestas más precisas
- Alta (0.7 - 1) → respuestas más creativas

👉 Como dev, esto es una palanca clave

---

### Prompt

- Instrucción que le das al modelo
- Define completamente el resultado

👉 Un mal prompt = mal output

---

## Limitaciones reales

- Puede inventar información (alucinaciones)
- No tiene acceso a información en tiempo real (sin herramientas externas)
- No "entiende" contexto como un humano
- Puede ser inconsistente

👉 Nunca confíes ciegamente en la salida

---

## Cómo se usa en desarrollo

Normalmente NO creas un LLM.

Lo usas mediante APIs:

- Chat (input → respuesta)
- Clasificación
- Generación de contenido
- Embeddings (búsqueda semántica)

---

## Ejemplo mental (clave)

Piensa en un LLM como:

👉 Un "autocompletado ultra avanzado"

Pero:

- con contexto
- con memoria limitada
- y con capacidad de generar texto coherente

---

## Regla práctica

👉 No le pidas que "sepa cosas"
👉 Diseña para que "responda bien"

---

## Error común

Creer que el modelo:

- razona como humano ❌
- entiende la verdad ❌
- siempre es correcto ❌

Realidad:

- predice texto probable ✅

---

## Conclusión

Un LLM no es inteligencia real.

Es un sistema de predicción de texto extremadamente avanzado
que puedes usar para construir funcionalidades inteligentes en tus aplicaciones.

Cuando decides interactuar con un LLM se dan esta serie de pasos:

1- Tokenización -> El texto se transforma a números
2- Procesamiento -> El modelo procesa todos los tokens(números) de manera simultánea
3- Predicción -> El modelo calcula las probabilidades para cada token que exsiste dentro de su vocabulario
4- Selección -> El modelo selecciona el token con la mayor probabilidad
5- Repetición -> El token seleccionado se repite en la respuesta

Todo esto ocurre a una velocidad extremadamente alta, lo que hace que los LLMs sean tremendamente eficientes en su tarea.

## ¿Cómo se entrena un LLM?

Entrenar un LLM es un proceso complejo dividido en varias etapas.
Cada etapa agrega capacidades y ajusta el comportamiento del modelo.

---

### ETAPA 1: Pre-entrenamiento (Pre-training)

Es la etapa más costosa y pesada.

Se entrena el modelo con enormes cantidades de texto para aprender patrones del lenguaje.

Fuentes típicas:

- Libros
- Artículos
- Páginas web
- Código de repositorios públicos
- Foros y preguntas/respuestas
- Documentación técnica

👉 Objetivo:
Aprender a predecir el siguiente token correctamente

👉 Resultado:
El modelo aprende:

- gramática
- contexto
- conocimiento general
- patrones de lenguaje

⚠️ Importante:
Aquí el modelo NO está optimizado para conversar ni seguir instrucciones.

---

### ETAPA 2: Fine-tuning (ajuste fino)

Se entrena el modelo con datasets más pequeños pero de mayor calidad.

Ejemplos:

- Preguntas y respuestas bien estructuradas
- Instrucciones humanas
- Ejemplos de tareas específicas

👉 Objetivo:
Hacer el modelo más útil para tareas concretas

👉 Resultado:

- Mejora en generación de código
- Mejores respuestas
- Mayor coherencia

---

### ETAPA 3: Alineación (Alignment)

Aquí es donde el modelo se adapta al comportamiento humano esperado.

Se busca que el modelo:

- sea útil
- sea seguro
- siga instrucciones correctamente

---

#### Técnica clave: RLHF

Reinforcement Learning from Human Feedback

Proceso:

1. Humanos evalúan respuestas del modelo
2. Se entrena un modelo de recompensa
3. El LLM se ajusta para generar mejores respuestas

👉 Resultado:

- respuestas más útiles
- menos contenido problemático
- mejor seguimiento de instrucciones

---

### ETAPA 4 (opcional): Ajustes adicionales

Dependiendo del modelo, pueden existir etapas extra:

- Optimización para velocidad
- Reducción de costos
- Especialización en dominios (ej: medicina, código)

---

## Qué significa esto para ti como desarrollador

👉 El modelo que usas ya viene entrenado y ajustado

Pero también:

- Tiene sesgos de los datos
- Tiene límites de conocimiento
- No siempre responde correctamente

---

## Error común

Pensar:

"Puedo enseñarle todo con prompts"

❌ Incorrecto

👉 El prompt guía el comportamiento  
👉 Pero NO cambia el entrenamiento base

---

## Regla práctica

👉 No intentes cambiar el modelo  
👉 Diseña tu app alrededor de cómo el modelo ya funciona

## Tamaño de los modelos (7B, 70B, 250B)

Cuando ves nombres como:

- Modelo 7B
- Modelo 70B
- Modelo 250B

La "B" significa **billions (miles de millones)** de parámetros.

👉 Los parámetros son los valores internos que el modelo ajusta durante el entrenamiento.

---

## ¿Qué significa esto en la práctica?

Más parámetros ≠ automáticamente mejor  
Pero en general:

- Más grande → más capacidad
- Más pequeño → más rápido y barato

---

## Comparación práctica

### Modelos pequeños (7B - 13B)

- Más rápidos
- Más baratos
- Menor consumo de recursos
- Menor calidad en tareas complejas

👉 Buenos para:

- tareas simples
- clasificación
- apps con alto volumen

---

### Modelos medianos (30B - 70B)

- Buen balance entre costo y calidad
- Mejor razonamiento que modelos pequeños

👉 Buenos para:

- chatbots
- generación de contenido
- código básico/intermedio

---

### Modelos grandes (100B+)

- Mayor capacidad de razonamiento
- Mejor comprensión de contexto
- Respuestas más coherentes

Pero:

- más lentos
- más caros

👉 Buenos para:

- tareas complejas
- asistentes avanzados
- generación de código compleja

---

## Trade-offs clave

Siempre estás balanceando:

- Calidad
- Velocidad
- Costo

👉 No existe el modelo perfecto

---

## Error común

Pensar:

"uso el modelo más grande y listo"

❌ Mala decisión

👉 Muchas veces un modelo más pequeño:

- es suficiente
- cuesta menos
- responde más rápido

---

## Regla práctica

👉 Empieza con el modelo más pequeño que funcione  
👉 Escala solo si lo necesitas

---

## Ejemplo real (mental)

Si haces:

- análisis de sentimiento → usa modelo pequeño
- chatbot complejo → modelo mediano
- asistente tipo copiloto → modelo grande

---

## Conclusión

El tamaño del modelo define:

- cuánto puede entender
- cuánto cuesta usarlo
- qué tan rápido responde

👉 Elegir el modelo correcto es una decisión de arquitectura, no de hype
