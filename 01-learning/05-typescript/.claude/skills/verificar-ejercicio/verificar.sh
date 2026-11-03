#!/usr/bin/env bash
# Verificación mecánica de un ejercicio de 05-typescript.
# Uso:  bash .claude/skills/verificar-ejercicio/verificar.sh 10-eventos-formularios/exercise-06
#
# Cubre los pasos automatizables del protocolo (docs/AUTORIA-DRILLS.md §8).
# Los pasos 5 y 6 —Pista 3 contra la salida real, y auditoría de spoiler— son de
# criterio y NO se scriptean: los hace quien monta el archivo.

set -uo pipefail

TARGET="${1:-}"
if [ -z "$TARGET" ]; then
  echo "uso: verificar.sh <carpeta>/<exercise-NN>   p.ej. 10-eventos-formularios/exercise-06" >&2
  exit 2
fi

TARGET="${TARGET#src/exercises/}"
TARGET="${TARGET%.tsx}"; TARGET="${TARGET%.ts}"
BASE="src/exercises/${TARGET}"

if   [ -f "${BASE}.tsx" ]; then SRC="${BASE}.tsx"; TEST="${BASE}.test.tsx"
elif [ -f "${BASE}.ts"  ]; then SRC="${BASE}.ts";  TEST="${BASE}.test.ts"
else echo "no encuentro ${BASE}.ts(x)" >&2; exit 2
fi
PISTAS="${BASE}.pistas.md"

PROBLEMAS=0
aviso() { echo "  ⚠️  $1"; PROBLEMAS=$((PROBLEMAS + 1)); }

echo "═══ $SRC ═══"
echo

# ── 1. TESTS ────────────────────────────────────────────────────────────────
echo "▸ TESTS"
TESTOUT=$(pnpm test:run "$TEST" 2>&1)
# `(✓|×) ` con algo detrás: un «×» suelto es el texto de un botón ✕ que el test
# imprime al fallar (el de tu MapModal), no un test. Por la misma razón los rojos
# salen del resumen de vitest («4 failed»), no de contar líneas con ×.
echo "$TESTOUT" | grep -E "^\s+(✓|×) \S" | sed 's/^/  /'
echo "$TESTOUT" | grep -E "^\s+Tests " | sed 's/^/  /'
ROJOS=$(echo "$TESTOUT" | grep -E "^\s+Tests " | grep -oE "[0-9]+ failed" | grep -oE "[0-9]+")
ROJOS=${ROJOS:-0}
echo

# ── 2. TYPECHECK ────────────────────────────────────────────────────────────
# ⚠️ NUNCA truncar con `tail` antes de contar: se pierden los errores de cabecera.
echo "▸ TYPECHECK"
TCOUT=$(pnpm typecheck 2>&1 | grep -E "^src/.*error TS")
MIOS=$(echo "$TCOUT" | grep -F "$SRC" | grep -v '^$')
NTIPOS=$(echo "$MIOS" | grep -c . )
if [ -n "$MIOS" ]; then echo "$MIOS" | sed "s|$SRC|  ·|"; else echo "  (0 errores en este archivo)"; fi

OTROS=$(echo "$TCOUT" | grep -vF "$SRC" | grep -v '^$')
if [ -n "$OTROS" ]; then
  echo "  ── fuera de este archivo:"
  echo "$OTROS" | sed 's/^/     /'
fi
echo

# ── 3. RUIDO QUE DELATA EL STARTER ──────────────────────────────────────────
echo "▸ RUIDO"
HUERFANAS=$(echo "$MIOS" | grep -E "TS6133|TS6196" || true)
if [ -n "$HUERFANAS" ]; then
  aviso "variables huérfanas — el starter deja algo sin usar y eso SEÑALA dónde está el fallo"
  echo "$HUERFANAS" | sed "s|$SRC|     ·|"
  echo "     → rediseña el starter para que USE sus parámetros (defecto reincidente)"
else
  echo "  ok — sin TS6133/TS6196"
fi
echo

# ── 4. SEÑAL POR DRILL ──────────────────────────────────────────────────────
echo "▸ SEÑAL POR DRILL   (cada drill tiene que fallar en ALGÚN sitio)"
# Dos formatos: `/* N) …` (compacto, v4: casi todo el cuaderno) y `// N) …` (el viejo,
# que solo queda en 00-vocabulario). N admite T1) y las letras de los peldaños (4a).
# Hasta el 3 nov 2026 solo se buscaba `// N)`: tras la migración al compacto esta
# sección y la 6 salían vacías sin avisar. Por eso no encontrar drills es un AVISO.
PATRON_DRILL='^(//|/\*) *[0-9T]+[a-z]?\)'
DRILLS=$(grep -nE "$PATRON_DRILL" "$SRC" | cut -d: -f1)
if [ -z "$DRILLS" ]; then
  aviso "no detecto ningún drill ('/* N)' ni '// N)'): esta sección y la de enunciados no comprueban nada"
else
  LINEAS_ERR=$(echo "$MIOS" | sed -n 's/.*(\([0-9]*\),[0-9]*).*/\1/p')
  TOTAL=$(echo "$DRILLS" | grep -c .)
  i=0
  for INICIO in $DRILLS; do
    i=$((i + 1))
    FIN=$(echo "$DRILLS" | awk -v n=$((i + 1)) 'NR==n' )
    [ -z "$FIN" ] && FIN=$(wc -l < "$SRC")
    NOMBRE=$(sed -n "${INICIO}p" "$SRC" | sed -E 's#^(//|/\*) *##; s# —.*##; s#\*/ *$##' | cut -c1-34)
    TIENE=""
    for L in $LINEAS_ERR; do
      if [ "$L" -ge "$INICIO" ] && [ "$L" -lt "$FIN" ]; then TIENE="tipos"; fi
    done
    if [ -n "$TIENE" ]; then
      printf "  %-34s error de tipos\n" "$NOMBRE"
    else
      printf "  %-34s sin error de tipos  → tiene que estar en ROJO en el test\n" "$NOMBRE"
    fi
  done
  echo
  echo "  errores de tipos: $NTIPOS   ·   tests rojos: $ROJOS   ·   drills: $TOTAL"
  echo "  → cuadra el recuento de la cabecera con estos dos números ANTES de dar por montado"
fi
echo

# ── 5. MÉTRICA DE LA SPEC v3 ────────────────────────────────────────────────
echo "▸ SPEC v3"
NTS=$(grep -cE "TS[0-9]{4}" "$SRC")
NETI=$(grep -cE "QUÉ CONSTRUIR|STARTER ROTO|📎" "$SRC")
NLIN=$(wc -l < "$SRC")

[ "$NETI" -gt 0 ] && aviso "$NETI etiquetas de formulario (QUÉ CONSTRUIR / STARTER ROTO / 📎) — fuera" \
                 || echo "  ok — 0 etiquetas de formulario"

if [ "$NTS" -gt 0 ]; then
  echo "  ⓘ  $NTS código(s) TS####  — solo válidos en TEORÍA y si el mensaje ES la lección (§3):"
  grep -nE "TS[0-9]{4}" "$SRC" | sed 's/^/     /' | cut -c1-100
else
  echo "  ok — 0 códigos TS####"
fi

[ "$NLIN" -gt 260 ] && aviso "$NLIN líneas (techo ~230)" || echo "  ok — $NLIN líneas"

if [ -f "$PISTAS" ]; then
  NIV=$(grep -c "<details>" "$PISTAS")
  echo "  ok — $(basename "$PISTAS") con $NIV bloques plegados"
else
  aviso "falta $(basename "$PISTAS")"
fi
echo

# ── 6. LARGO DE LOS ENUNCIADOS ──────────────────────────────────────────────
echo "▸ ENUNCIADOS   (techo 7 líneas de prosa)"
echo "   no cuentan los apartes: 📌 recordatorio · → resultado · 👀 observación · 💡 nota · ⚠️"
# LC_ALL=C: el awk compara BYTES, así los emojis de los apartes se buscan con index()
# como cadenas fijas, sin depender de cómo maneje el locale los multibyte.
LC_ALL=C awk '
  BEGIN { n = -1; compacto = 0 }
  function vuelca(  etq) {
    etq = (n > 7) ? "  ← pasa del techo" : ""
    printf "  %-42s %d lineas%s\n", num, n, etq
    n = -1; compacto = 0
  }
  function aparte(t) {
    return index(t, "📌") == 1 || index(t, "→") == 1 || index(t, "👀") == 1 ||
           index(t, "💡") == 1 || index(t, "⚠") == 1
  }
  # Ejemplos de uso dentro del enunciado: JSX (<Caja … />) o una llamada con su
  # resultado (f(x) → y). Son código, no prosa.
  function codigo(t) {
    if (t ~ /^(export|const|function|type|fn\(|\}|\/\/|<[A-Za-z])/) return 1
    return (t ~ /^[A-Za-z_][A-Za-z0-9_.]*\(/ && index(t, ") →") > 0)
  }
  # Un aparte puede seguir en la línea de abajo SIN sangría: sigue mientras su frase
  # no acabe en . ? o ! (con un ) » o " detrás, si los hay).
  function acaba_frase(t) { return t ~ /[.?!][)»"]* *$/ }

  # ── formato compacto:  /* 1) Nombre — prosa…   ·   * …   ·   *  (línea libre)   ·   */
  # La primera línea ya es prosa y cuenta. El enunciado acaba en la línea libre de la
  # respuesta (" *" a secas), en el cierre, o en cuanto la pregunta del ¿Por qué? se
  # cierra con «?»: el alumno a veces escribe la respuesta EN la línea libre, sin
  # dejarla en blanco, y lo que hay debajo de la pregunta es suyo y no cuenta.
  /^\/\* *[0-9T]+[a-z]?\)/ {
    if (n >= 0) vuelca()
    n = 1; compacto = 1; pq = 0; respuesta = 0; sigue = 0
    num = $0; sub(/^\/\* */, "", num); sub(/ —.*/, "", num); sub(/ *\*\/ *$/, "", num)
    num = substr(num, 1, 42)
    if ($0 ~ /\*\/ *$/) vuelca()           # el drill de una sola línea
    next
  }
  compacto && /^ \*[ \t]*$/  { vuelca(); next }   # la línea libre: se acabó el enunciado
  compacto && /^ \*\//       { vuelca(); next }   # el cierre
  compacto && /^ \* / {
    t = substr($0, 4)
    cierra = ($0 ~ /\*\/ *$/)
    if (respuesta)                        { }      # debajo de la pregunta: la respuesta
    else if (aparte(t))                   { sigue = !acaba_frase(t) }
    else if (t ~ /^  /)                   { if (sigue) sigue = !acaba_frase(t) }
                                                   # sangrado: código de ejemplo de un
                                                   # «Predice», o continuación de un aparte
    else if (sigue && index(t, "¿Por qué?") != 1) { sigue = !acaba_frase(t) }
                                                   # el aparte sigue, sin sangría
    else if (codigo(t))                   { sigue = 0 }
    else if (pq == 2 && index(t, "¿") != 1) { respuesta = 1 }  # tras un «¿Por qué?» a
                                                   # secas, lo que no es pregunta es la respuesta
    else {
      n++
      if (t ~ /^¿Por qué\? *$/) pq = 2             # la pregunta sigue (o no) en la de abajo
      else {
        if (index(t, "¿Por qué?") == 1 || pq == 2) pq = 1
        if (pq == 1 && t ~ /\? *$/) respuesta = 1  # la pregunta se cierra con «?»
      }
    }
    if (cierra) vuelca()
    next
  }
  compacto                   { vuelca(); next }   # cualquier otra cosa: fuera del bloque

  # ── formato viejo:  // 1) Nombre — …  (solo queda en 00-vocabulario)
  /^\/\/ *[0-9T]+[a-z]?\)/   { if (n >= 0) vuelca(); n=0; sub(/^\/\/ */,""); sub(/ —.*/,""); num=$0; next }
  n >= 0 && /^[^\/]/         { vuelca(); next }
  # Un "aparte" es toda línea cuyo primer carácter tras el `//` no es ASCII imprimible,
  # o sea los marcadores 📌 → 👀 💡 ⚠️. Se detectan POR BYTES: este awk no matchea
  # emojis dentro de una alternancia `(a|b)` y fallaba en silencio.
  n >= 0 && /^\/\/ *[^\040-\176]/         { salta=1; next }   # el aparte no cuenta…
  n >= 0 && salta && /^\/\/      /        { next }            # …ni sus continuaciones (6+ esp.)
  n >= 0 && /^\/\/ *(export|const|function|type|fn\(|\}|\/\/)/ { next }  # código comentado
  n >= 0                                  { salta=0; n++ }
  END                        { if (n >= 0) vuelca() }
' "$SRC"
echo

# ── CIERRE ──────────────────────────────────────────────────────────────────
echo "───"
if [ "$PROBLEMAS" -eq 0 ]; then
  echo "Sin problemas mecánicos. Faltan los dos pasos de criterio:"
else
  echo "$PROBLEMAS problema(s) mecánico(s). Y además faltan los dos pasos de criterio:"
fi
echo "  5) ¿la Pista 3 de cada drill cita el error LITERAL de arriba, ni uno más?"
echo "  6) auditoría de spoiler: tapa starter y test y lee cada enunciado."
echo "     ¿basta para saber QUÉ construir?  ¿dice algo que el compilador ya dice?"
exit $((PROBLEMAS > 0))
