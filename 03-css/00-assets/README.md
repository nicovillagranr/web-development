# 00-assets

Repositorio de recursos compartidos para los ejercicios CSS.

## Contenido

- `fonts/`: familias tipograficas locales para pruebas visuales.
- `icons/`: iconografia reutilizable.
- `images/`: imagenes de apoyo para layouts y templates.

## Librerias de iconos (`icons/`)

SVG crudos descargados desde las fuentes oficiales open-source. Cada carpeta conserva
su `LICENSE` original y la subdivision por estilo (outline/solid/etc.).

| Carpeta | Origen | Licencia | Iconos (.svg) |
|---|---|---|---|
| `tabler/` | github.com/tabler/tabler-icons | MIT | 6146 |
| `lucide/` | github.com/lucide-icons/lucide | ISC | 1711 |
| `iconoir/` | github.com/iconoir-icons/iconoir | MIT | 1671 |
| `boxicons/` | npm `boxicons` (atisawd) | MIT | 1634 |
| `heroicons/` | github.com/tailwindlabs/heroicons | MIT | 1288 |
| `svgl/` | github.com/pheralb/svgl | MIT* | 1063 |
| `css.gg/` | github.com/astrit/css.gg | MIT | 704 |
| `radix-icons/` | github.com/radix-ui/icons | MIT | 347 |
| `fontawesome/` | fontawesome.com (Free) | CC-BY 4.0 / MIT | — |
| `animatedicons/` | animatedicons.co | freemium (manual) | — |

`*` **svgl**: el codigo es MIT, pero la carpeta contiene **logos de marcas registradas**.
Su uso esta sujeto a las normas de marca de cada empresa, no a la licencia MIT.

**Nota sobre `animatedicons/`**: servicio freemium de pago, sin repo open-source. Los
iconos gratuitos se descargan manualmente; ver `icons/animatedicons/README.md`.

**`react-icons` no se incluye**: no es una libreria de SVG propia sino un agregador que
reempaqueta otros sets (Font Awesome, Material, etc.) como componentes React. Si se
necesita un set concreto, conviene tomarlo de su fuente original.

## Uso recomendado

- Mantener assets neutrales y reutilizables.
- Evitar duplicar archivos dentro de cada proyecto cuando ya existe aqui.
- Documentar origen o licencia cuando se agreguen nuevos recursos.

## Nota

Este modulo es de soporte. La logica de aprendizaje principal vive en `01-architecture`, `02-layouts`, `03-frameworks` y `04-templates`.
