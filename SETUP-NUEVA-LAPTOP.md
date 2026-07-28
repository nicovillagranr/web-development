# Replicar setup de VS Code / Cursor en una laptop nueva

## Lo que SÍ hace `.vscode/extensions.json`

Al clonar el repo y abrirlo en VS Code o Cursor, aparece una notificación: *"This workspace has extension recommendations"*. Clic en **"Install All"** y se instalan las 30 extensiones de un golpe.

## Lo que NO hace

`extensions.json` solo es una **lista de nombres**. No replica:

- **Theme activo** (cuál de los 10 themes está seleccionado)
- **Icon theme activo**
- **Settings de VS Code** (tamaño de fuente, formatOnSave, tabSize por lenguaje, atajos de teclado, etc.)
- **Configuración interna de cada extensión** (reglas custom, snippets propios)
- **Cuentas logueadas** (GitHub, Claude, Codeium, ChatGPT — requieren login manual)

---

## Cómo dejarlo realmente "igual"

### 1. Settings Sync (lo más fácil — recomendado)

VS Code lo trae built-in:

1. `Ctrl+Shift+P` → `Settings Sync: Turn On`
2. Login con GitHub o Microsoft
3. Sincroniza automáticamente:
   - Settings
   - Keybindings
   - Extensions (instaladas, no solo recomendadas)
   - Snippets
   - UI state (theme activo, icon theme)

En la laptop nueva, mismo login → todo aparece.

### 2. `.vscode/settings.json` en el repo (opcional, complementario)

Para settings **específicos del proyecto** que quieras versionar y compartir: formatter por lenguaje, tabSize, etc.

---

## Resumen práctico

| Necesidad | Solución |
|---|---|
| Clonar repo y trabajar | `git clone` |
| Instalar las extensiones | `.vscode/extensions.json` ✅ (ya creado) |
| Theme, settings, atajos, login | **Settings Sync** de VS Code |
| Cursor en vez de VS Code | Cursor soporta importar settings de VS Code en su primera ejecución |

---

## Checklist en la PC actual

- [ ] Activar Settings Sync ahora: `Ctrl+Shift+P` → `Settings Sync: Turn On` → login con GitHub o Microsoft → marcar Settings, Keybindings, Extensions, Snippets, UI State.

## Checklist en la laptop nueva

1. **Clonar y abrir el repo**
   ```bash
   git clone <url-del-repo>
   ```
   Abrir la carpeta en VS Code o Cursor → aparece la notificación *"This workspace has extension recommendations"* → **Install All** (instala las 30 extensiones de `.vscode/extensions.json`).

2. **Activar Settings Sync** (mismo login que en la PC actual)
   `Ctrl+Shift+P` → `Settings Sync: Turn On` → en segundos aparecen settings, keybindings, theme, icon theme y snippets.

3. **Cursor** (si lo usás en vez de VS Code)
   - En el primer arranque ofrece *"Import from VS Code"* → aceptar.
   - Si ya está abierto: `Ctrl+Shift+P` → `Cursor Settings: Import VS Code Settings`.

4. **Verificar que `.vscode/settings.json` se aplica**
   Abrir cualquier `.jsx` (p. ej. `00-portfolio/01-react/projex/src/App.jsx`), romper el formato a propósito y guardar → Prettier debe reformatear y ESLint debe auto-fix.

## Settings versionados en el repo

`.vscode/settings.json` define lo que sí queremos compartir entre máquinas vía git:

- Prettier como formatter por defecto + `formatOnSave`
- ESLint `source.fixAll` al guardar
- Tailwind IntelliSense para helpers `cn()` y `clsx()`
- `files.exclude` / `search.exclude` para `node_modules`, `dist`, `.vite`

Lo que NO se versiona (vive en Settings Sync porque es preferencia personal):
- Theme y icon theme activos
- Tamaño de fuente, atajos custom, cuentas logueadas

`indent_size`, `end_of_line`, `insert_final_newline` y `trim_trailing_whitespace` los maneja `.editorconfig` — no se duplican en `settings.json`.
