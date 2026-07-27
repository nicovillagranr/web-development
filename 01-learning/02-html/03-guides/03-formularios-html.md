# Guia 03: Formularios en HTML

## Objetivo

Crear formularios entendibles para usuarios y tecnologias asistivas.

## Bloques esenciales

- `form`: contenedor de envio.
- `label`: texto asociado a cada control.
- `input`, `select`, `textarea`: campos.
- `button`: accion de envio o control.
- `fieldset` y `legend`: agrupacion semantica de campos.

## Reglas practicas

- Cada control debe tener `label` visible.
- Usa `type` correcto (`email`, `tel`, `date`, `number`).
- Marca obligatorios con `required`.
- Restringe formato con `min`, `max`, `pattern`, `maxlength`.
- Define `name` para todos los campos que se envian.

## Validacion HTML nativa

- `required` valida presencia.
- `type="email"` valida formato basico.
- `min` y `max` controlan rangos numericos.
- `minlength` y `maxlength` controlan longitud.

## Checklist de formularios

- [ ] Todos los campos tienen `label`.
- [ ] Los tipos de input coinciden con el dato esperado.
- [ ] Existe feedback minimo para campos invalidos.
- [ ] Se agrupan campos relacionados con `fieldset/legend` cuando aplica.
