# Plantilla — `exercise-NN.pistas.md`

Copiar el bloque de abajo al montar cada ejercicio, un `##` por drill.

Reglas (detalle en `AUTORIA-DRILLS.md` §7):

- Cada pista va dentro de un `<details>` para que se muestre **plegada** en el preview
  de Markdown. Hay que decidir abrirla.
- **Deja una línea en blanco** después de `<summary>…</summary>`, o el Markdown de
  dentro no se renderiza.
- Cuatro niveles, cada uno con su trabajo: **1** conceptual (no nombra la pieza) · **2**
  concreta (nombra el mecanismo, sin escribirlo) · **3** el error literal de `tsc` o el
  dato duro · **Solución** el código y por qué.
- La Pista 3 tiene que citar **el error real que escupe el compilador**, verificado
  contra la salida, ni uno más. Es el paso 5 del protocolo.

---

```markdown
# Pistas — exercise-NN

> Cada pista está plegada a propósito. Ábrela solo si llevas un rato atascado, y de
> una en una: la gracia del ejercicio es el rato que pasas antes de abrirla.

## Drill 1 — `NombreDelDrill`

<details><summary>Pista 1 — conceptual</summary>

Reencuadra el problema o señala dónde mirar. No nombres la pieza que falta.
</details>

<details><summary>Pista 2 — más concreta</summary>

Nombra el mecanismo. Sigue sin ser código.
</details>

<details><summary>Pista 3 — lo que dice el compilador</summary>

`TS____: …el mensaje literal, copiado de la salida de pnpm typecheck…`

Una frase traduciéndolo, si el mensaje es críptico.
</details>

<details><summary>Solución</summary>

```tsx
// el código
```

Por qué funciona, en dos o tres frases.
</details>
```
