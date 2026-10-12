import {
  Contador,
  Interruptor,
  SelectorColor,
  AvisoErrores,
  ListaTareas,
} from "../exercises/11-useState-useReducer/exercise-01";
import {
  GuardarNombre,
  ContadorConAviso,
  ContadorDoble,
  RegistroDoble,
  ContadorConTope,
} from "../exercises/11-useState-useReducer/exercise-02";
import {
  ContadorConReducer,
  ContadorConPaso,
  PanelConHistorial,
} from "../exercises/11-useState-useReducer/exercise-03";
import { ListaCompra, PanelNotas } from "../exercises/11-useState-useReducer/exercise-03b";
import {
  Altavoz,
  AltavozConPreset,
  AltavozCompleto,
} from "../exercises/11-useState-useReducer/exercise-03c";
import { FormContacto } from "../exercises/11-useState-useReducer/exercise-04";
import { EditorNota } from "../exercises/11-useState-useReducer/exercise-04b";
import { TarjetaPerfil } from "../exercises/11-useState-useReducer/exercise-05";
import { TiendaPedido } from "../exercises/11-useState-useReducer/exercise-06";
import { FormReserva } from "../exercises/11-useState-useReducer/exercise-07";
import {
  VotoConMeta,
  DemoFoto,
  Carrito,
  Marcador,
  Sala,
  Transferencia,
} from "../exercises/11-useState-useReducer/exercise-08";
import { FormRegistro } from "../exercises/11-useState-useReducer/exercise-09";
import { FormularioSolicitud } from "../exercises/11-useState-useReducer/exercise-10";
import { VisorSolicitud } from "../exercises/11-useState-useReducer/exercise-10b";
import { ProbadorValidacion } from "../exercises/11-useState-useReducer/exercise-10c";
import {
  CampoNombre,
  CampoCorreo,
  CampoDetalle,
  ErrorNombre,
  ErrorCorreo,
} from "../exercises/11-useState-useReducer/exercise-10d";
import { Seccion, Tarjeta } from "./piezas";

/* BLOQUE 11 — `11-useState-useReducer`, la carpeta entera. Es el banco del commit
 * `14062` (el último antes de pasar al 12), con los chips como estaban.
 *
 * El `exercise-01b` no aparece porque sus seis drills son funciones puras, no
 * componentes: esos solo se ven en el test. Del `exercise-03b` pasa lo mismo con los
 * drills 1 al 8; solo el 9 y el 10 pintan algo. Del `exercise-03c`, solo el 7, el 8 y el 9.
 * Del `exercise-04`, solo `FormContacto`, que junta los drills 7 y 8. Y del
 * `exercise-04b`, solo `EditorNota` (drill 9): los ocho primeros son funciones puras.
 * Del `exercise-05`, solo `TarjetaPerfil` (drill 10): del 1 al 5 son predicciones y
 * del 6 al 9, funciones puras. Del `exercise-06`, solo `TiendaPedido`, que junta los
 * drills 8 y 9. Del `exercise-07`, solo `FormReserva` (drill 8): del 1 al 7 son tipos,
 * predicciones y reducers sueltos. Del `exercise-08`, `VotoConMeta` (drill 3), la `DemoFoto`, el refuerzo 3a-3c y
 * `Transferencia` (drills 5 y 7). Del `exercise-09`, solo `FormRegistro` (drills 4 y 8).
 * Del `exercise-10`, `FormularioSolicitud`: el formulario completo que reescribiste
 * para juntar todo lo aprendido, ya sin drills. Del `10b` (su reducer, en drills),
 * el visor `VisorSolicitud`, que pinta lo que devuelve tu reducer. Del `10c` (tu
 * validador, en drills), el `ProbadorValidacion`, que pinta lo que devuelve tu
 * `validarSolicitud` en cada tecla. Del `10d`, los campos de los drills 1 a 4 y 6.
 * El `10d` es el de la versión vieja del `10` (JSX), ya cerrado. */

/* Los errores de muestra para el drill 4 del exercise-01. Van en una constante y no
 * escritos dentro del JSX a propósito: con una firma `{}`, un objeto literal pegado ahí
 * daría TS2353 por exceso de propiedades, y ese error sería MÍO, no del drill. */
const erroresDeMuestra = {
  nombre: "El nombre es obligatorio",
  email: "El correo no es válido",
};

export function Bloque11() {
  return (
    <>
      <header className="mb-4">
        <h1 className="text-[56px] leading-[1.05] font-semibold tracking-[-0.03em] text-[#f5f5f7]">
          Estado local,
          <br />
          de principio a fin.
        </h1>
        <p className="mt-6 max-w-xl text-[21px] leading-[1.4] text-[#86868b]">
          El bloque 11 entero: el valor inicial y su tipo, lo que el setter no te da, y el reducer
          para cuando los cambios tienen reglas.
        </p>
        <p className="mt-6 max-w-xl text-[15px] leading-[1.5] text-[#6e6e73]">
          El chip de cada tarjeta dice si la cerraste. Es el banco tal como quedó al pasar al bloque
          12.
        </p>
      </header>

      <Seccion
        archivo="exercise-01"
        titulo="El valor inicial decide qué se puede guardar después."
      />

      <Tarjeta
        n={1}
        nombre="Contador"
        mirar="Sube de uno en uno y el número se mantiene número. Si en vez de 1, 2, 3 vieras crecer un texto pegado, el + habría dejado de sumar para concatenar."
        campos="un <p> con el número · botón Sumar"
        estado="resuelto"
      >
        <Contador />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="Interruptor"
        mirar="Dice OFF al arrancar y alterna a ON al pulsar. El useState estaba en booleano y el cuerpo seguía comparando con textos: el arreglo fue terminar el cambio, no deshacerlo."
        campos="un botón que muestra ON u OFF"
        estado="resuelto"
      >
        <Interruptor />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="SelectorColor"
        mirar="Dice Sin elegir y luego Elegido: verde. El valor inicial era correcto; lo que faltaba era decirle a useState qué más iba a poder guardar además de null."
        campos="un <p> con lo elegido · tres botones: rojo, verde, azul"
        estado="resuelto"
      >
        <SelectorColor />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="AvisoErrores"
        mirar="No tiene estado ni botones: recibe los errores por props y los pinta. Los dos de muestra se ven. El arreglo estaba en la firma, no en un useState."
        campos="una <ul> con un <li> por error"
        estado="resuelto"
      >
        <AvisoErrores errores={erroresDeMuestra} />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="ListaTareas"
        mirar="Pulsa Añadir varias veces y la lista crece. Tenía dos defectos a la vez: el never[] del useState vacío y la mutación del array, que dejaba a React con la misma referencia."
        campos="botón Añadir · una <ul> con un <li> por tarea"
        estado="resuelto"
      >
        <ListaTareas />
      </Tarjeta>

      <Seccion
        archivo="exercise-02"
        titulo="El setter guarda. No devuelve, y no está disponible en la misma vuelta."
      />

      <Tarjeta
        n={1}
        nombre="GuardarNombre"
        mirar="Escribe algo y pulsa Guardar: dice Guardado: Ana y el input se vacía. El starter le pedía al setter que le devolviera lo guardado; la salida era no necesitar recuperarlo."
        campos="un <input> · botón Guardar · un <p> con lo guardado"
        estado="resuelto"
      >
        <GuardarNombre />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="ContadorConAviso"
        mirar="Tras el primer click el aviso dice Ahora vale 1, y sigue cuadrando en el segundo. El starter acertaba el primero por accidente y al segundo duplicaba el texto."
        campos="un <p> con el número · otro <p> con el aviso · botón Sumar"
        estado="resuelto"
      >
        <ContadorConAviso />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="ContadorDoble"
        mirar="Sube de dos en dos con DOS llamadas al setter, no con una de +2. Cada llamada continúa a la anterior en vez de pisarla: 0 a 1, y 1 a 2."
        campos="un <p> con el número · botón Sumar 2"
        estado="resuelto"
      >
        <ContadorDoble />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="RegistroDoble"
        mirar="Un click deja Click 1 y Click 2; dos clicks, cuatro entradas. Es el drill anterior sobre un array: aquí lo que se perdía era una entrada entera."
        campos="botón Registrar 2 · una <ul> con las entradas"
        estado="resuelto"
      >
        <RegistroDoble />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="ContadorConTope"
        mirar="Primer click 2, segundo 3, y de ahí no se mueve. El tope se decide dentro de la función actualizadora, con el valor que llega y no con el de este render."
        campos="un <p> con el número · botón Sumar 2"
        estado="resuelto"
      >
        <ContadorConTope />
      </Tarjeta>

      <Seccion
        archivo="exercise-03"
        titulo="El reducer que ya sabes escribir, con un cable a React."
      />

      <Tarjeta
        n={1}
        nombre="ContadorConReducer"
        mirar="Sumar sube de uno en uno y Reiniciar vuelve a 0. El reducer venía escrito y era correcto: lo que no llegaba bien era la acción, que es un objeto con su tipo y no el texto suelto."
        campos="un <p> con el número · botones Sumar y Reiniciar"
        estado="resuelto"
      >
        <ContadorConReducer />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="ContadorConPaso"
        mirar="Sube de cinco en cinco con el reducer del drill 2. La acción sumar lleva la cantidad consigo, y esa cantidad solo existe dentro de su case."
        campos="un <p> con el número · botón Sumar 5"
        estado="resuelto"
      >
        <ContadorConPaso />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="PanelConHistorial"
        mirar="Sumar 2 sube el contador y deja una línea en el historial; Reiniciar lo pone a 0 sin borrar la lista. El reducer ya no toca lo que recibe: hoja nueva y también taquilla nueva para el historial."
        campos="un <p> con el contador · botones Sumar 2 y Reiniciar · una <ul> con el historial"
        estado="resuelto"
      >
        <PanelConHistorial />
      </Tarjeta>

      <Seccion archivo="exercise-03b" titulo="No toques lo que te llega: la hoja y la taquilla." />

      <Tarjeta
        n={9}
        estado="resuelto"
        nombre="ListaCompra"
        mirar="Cada click en Añadir leche suma una leche a la lista y se ve al momento. Si pulsas y no aparece nada, el array sí está creciendo: lo que pasa es que React recibe la misma llave y no repinta."
        campos="una <ul> que empieza con pan · botón Añadir leche"
      >
        <ListaCompra />
      </Tarjeta>

      <Tarjeta
        n={10}
        estado="resuelto"
        nombre="PanelNotas"
        mirar="Un click en Anotar debe dejar UNA nota. Aquí la pantalla sí repinta, pero cada nota sale doble: es el StrictMode de main.tsx llamando dos veces al reducer y delatando lo que toca."
        campos="botón Anotar · una <ul> con las notas"
      >
        <PanelNotas />
      </Tarjeta>

      <Seccion
        archivo="exercise-03c"
        titulo="La cadena de useReducer: el papel, el cajero y quién lo entrega."
      />

      <Tarjeta
        n={7}
        nombre="Altavoz"
        estado="resuelto"
        mirar="Subir y Bajar mueven el número de uno en uno, empezando en 5. Si en pantalla sale la palabra subir en vez de un número, el reducer recibió la etiqueta y no el papel."
        campos="un <p> con el volumen · botones Subir y Bajar"
      >
        <Altavoz />
      </Tarjeta>

      <Tarjeta
        n={8}
        nombre="AltavozConPreset"
        estado="resuelto"
        mirar="Empieza en 3 y el botón lo deja en 7. Si pulsas y no pasa nada, la cuenta se hizo, pero nadie guardó el resultado."
        campos="un <p> con el volumen · botón Al 7"
      >
        <AltavozConPreset />
      </Tarjeta>

      <Tarjeta
        n={9}
        nombre="AltavozCompleto"
        estado="resuelto"
        mirar="Silencio lo deja en 0 venga de donde venga, y después Bajar no baja más. Ni Subir ni Bajar pasan de 10 ni de 0. Con el starter, Silencio tumbaba la página entera: el reducer devolvía el papel y React no sabe pintar un objeto."
        campos="un <p> con el volumen · botones Subir, Bajar y Silencio"
      >
        <AltavozCompleto />
      </Tarjeta>

      <Seccion
        archivo="exercise-04"
        titulo="Tu formulario de contacto, con todas sus reglas en un reducer."
      />

      <Tarjeta
        n={7}
        nombre="FormContacto"
        estado="resuelto"
        mirar="Enviar vacío muestra los tres errores; un mensaje de menos de 10 caracteres también se rechaza. Con los tres campos bien, sale Enviando… y a los 300 ms Mensaje enviado, y los campos se vacían. Si escribes después de enviar, el aviso desaparece."
        campos="inputs Nombre, Correo y Mensaje · botón Enviar · un <p> con la fase"
      >
        <FormContacto />
      </Tarjeta>

      <Seccion
        archivo="exercise-04b"
        titulo="Lo que no nombras, se copia tal cual. También el aviso que ya no toca."
      />

      <Tarjeta
        n={9}
        nombre="EditorNota"
        estado="resuelto"
        mirar="Escribe un título y pulsa Guardar: aparece Guardado. Vuelve a teclear y el aviso desaparece. El starter dejaba el aviso puesto: el título cambiaba, pero el estado salía igual que entró porque nadie lo nombraba."
        campos="input Título · botón Guardar · un <p> con Guardado o vacío"
      >
        <EditorNota />
      </Tarjeta>

      <Seccion
        archivo="exercise-05"
        titulo="Qué sale de un spread: todo, salvo lo que pisas después."
      />

      <Tarjeta
        n={10}
        nombre="TarjetaPerfil"
        estado="resuelto"
        mirar="Pulsa los cuatro en cualquier orden: cada uno cambia lo suyo sin deshacer lo de los otros. Modo oscuro e Idioma: English tocan una sola clave de preferencias; Restablecer las sustituye enteras, pero la ciudad no se mueve."
        campos="un <p> con nombre y ciudad · otro <p> con tema e idioma · botones Mudarse de Santiago a Talca, Modo oscuro, Idioma: English y Restablecer preferencias"
      >
        <TarjetaPerfil />
      </Tarjeta>

      <Seccion archivo="exercise-06" titulo="Cada cambio pregunta antes cómo venía el pedido." />

      <Tarjeta
        n={8}
        nombre="TiendaPedido"
        estado="resuelto"
        mirar="Enviar sin pagar no hace nada, y mientras el pedido está en carrito sale el aviso de pagar antes de enviar. Paga y envía: sale enviado, y a partir de ahí ni +1 ni Cambiar a Té mueven nada. Si cambias a Té con el pedido pagado, vuelve a carrito. Con el starter la tienda deja hacerlo todo, en cualquier orden."
        campos="un <p> con producto, cantidad y fase · un <p> con el aviso · botones +1, Cambiar a Té, Pagar y Enviar"
      >
        <TiendaPedido />
      </Tarjeta>

      <Seccion
        archivo="exercise-07"
        titulo="El tipo dice qué casos existen, y quién avisa cuando falta uno."
      />

      <Tarjeta
        n={8}
        nombre="FormReserva"
        mirar="Escribe en los tres campos: cada uno guarda lo suyo y no toca los otros dos. Vaciar los deja todos en blanco. Con el starter, lo que escribes en Teléfono aparece en Nombre."
        campos="tres <input>: Nombre, Teléfono y Comentario · botón Vaciar"
        estado="resuelto"
      >
        <FormReserva />
      </Tarjeta>

      <Seccion
        archivo="exercise-08"
        titulo="Pedir anota; el estado nuevo llega en el render siguiente."
      />

      <Tarjeta
        n={3}
        nombre="VotoConMeta"
        mirar="Vota tres veces: el aviso tiene que salir justo con el tercer voto. Con el starter sale un clic tarde, con 4."
        campos="un <p> con los votos · botón Votar · un <p> con el aviso"
        estado="resuelto"
      >
        <VotoConMeta />
      </Tarjeta>

      <Tarjeta
        n="demo"
        nombre="DemoFoto"
        estado="demo"
        mirar="No es un drill. Vota seis veces y lee la tabla: en cada clic, el if miró el número de ANTES y la pantalla pinta el de DESPUÉS. La columna naranja es el if del starter del drill 3, que entra un clic tarde; la verde, el que pregunta al reducer, que entra a tiempo. Para empezar de cero, recarga."
        campos="un <p> con lo que hay en pantalla · botón Votar · una tabla con una fila por clic"
      >
        <DemoFoto />
      </Tarjeta>

      <Tarjeta
        n="3a"
        nombre="Carrito"
        mirar="Agrega cinco unidades: el aviso tiene que salir justo con la quinta. Con el starter sale un clic tarde, con 6."
        campos="un <p> con las unidades · botón Agregar · un <p> con el aviso"
        estado="resuelto"
      >
        <Carrito />
      </Tarjeta>

      <Tarjeta
        n="3b"
        nombre="Marcador"
        mirar="Llega a 50 con cinco aciertos, y después recarga y llega con dos bonus: el aviso tiene que salir en el clic que llega a 50 las dos veces. Con el starter sale un clic tarde."
        campos="un <p> con los puntos · botones Acierto (+10) y Bonus (+25) · un <p> con el aviso"
        estado="resuelto"
      >
        <Marcador />
      </Tarjeta>

      <Tarjeta
        n="3c"
        nombre="Sala"
        mirar="Entran cuatro personas: Sala completa tiene que salir con la cuarta. Pulsa Vaciar: el aviso se va. Con el starter sale tarde y, al vaciar, se queda."
        campos="un <p> con las personas · botones Entrar y Vaciar · un <p> con el aviso"
        estado="resuelto"
      >
        <Sala />
      </Tarjeta>

      <Tarjeta
        n={5}
        nombre="Transferencia"
        mirar="Transferir: sale Enviando… en el acto y, al rato, Transferencia enviada. Transfiere y cancela antes de que acabe: tiene que quedarse en cancelada. Con el starter, Enviando… no sale nunca y cancelar no sirve."
        campos="botones Transferir y Cancelar · un <p> con el estado de la transferencia"
        estado="resuelto"
      >
        <Transferencia />
      </Tarjeta>

      <Seccion
        archivo="exercise-09"
        titulo="El formulario entero: estado anidado, inputs controlados y envío."
      />

      <Tarjeta
        n={8}
        nombre="FormRegistro"
        mirar="Pulsa Crear cuenta en vacío: salen los errores y no se crea nada. Escribe en un campo con error y su error se va. Rellena bien (clave de 8 o más) y envía: Cuenta creada y el formulario vacío. Limpiar vacía los tres campos, también la clave."
        campos="tres <input>: Usuario, Correo y Clave, cada uno con su error debajo · botones Crear cuenta y Limpiar · un <p> con el estado"
        estado="resuelto"
      >
        <FormRegistro />
      </Tarjeta>

      <Seccion
        archivo="exercise-10"
        titulo="El formulario completo: validar, enviar, y qué hacer si el servidor falla."
      />

      <Tarjeta
        n="form"
        nombre="FormularioSolicitud"
        mirar="Envía en vacío: salen los cuatro errores. Escribe en un campo con error y su error se va. Rellena bien (detalle de 10 o más) y envía: Enviando… con todo bloqueado, y al segundo el aviso de enviada con el formulario vacío. Un correo sin @ enseña tu mensaje, no el globo del navegador."
        campos="cuatro campos con su <label>: Nombre, Apellido, Correo y Detalle (textarea), cada uno con su error · botones Enviar solicitud y Limpiar · el aviso de enviada"
        estado="resuelto"
      >
        <FormularioSolicitud />
      </Tarjeta>

      <Seccion
        archivo="exercise-10b"
        titulo="El reducer de tu 10: copiar o reemplazar, y el guard."
      />

      <Tarjeta
        n="visor"
        nombre="VisorSolicitud"
        mirar="No es un drill: aquí haces tú de usuario y de envío, pulsando cada acción a mano. Prueba Envío iniciado → Envío fallido → Escribir: el error del servidor tiene que borrarse y la fase volver a editando. Envío fallido estando en editando no cambia nada. Y Envío completado deja los datos vacíos. Con el starter, todo eso falla."
        campos="tres <p>: datos, errores y fase · botones Escribir, Envío iniciado, Envío completado, Envío fallido y Limpiar"
        estado="resuelto"
      >
        <VisorSolicitud />
      </Tarjeta>

      <Seccion
        archivo="exercise-10c"
        titulo="Tu validador: un objeto de errores, una regla a la vez."
      />

      <Tarjeta
        n="probador"
        nombre="ProbadorValidacion"
        mirar="No es un drill: escribe y mira el objeto en cada tecla. Con todo en blanco salen los cuatro errores, y los cuatro tienen que decir obligatorio. Escribe solo espacios en Nombre: tiene que seguir diciendo obligatorio. Luego rellénalo todo bien (detalle de 10 o más) y mira qué queda. Con el starter, el apellido y el detalle vacíos dan el mensaje de la longitud, y un nombre de espacios pasa."
        campos="inputs Nombre, Apellido y Correo · textarea Detalle · un <p> con el objeto de errores"
        estado="resuelto"
      >
        <ProbadorValidacion />
      </Tarjeta>

      <Seccion
        archivo="exercise-10d"
        titulo="El input refleja el estado, y el error solo existe cuando hay error."
      />

      <Tarjeta
        n={1}
        nombre="CampoNombre"
        mirar="Escribe: tiene que verse lo que tecleas. Con el starter el campo no cambia."
        campos="un <input> Nombre"
        estado="resuelto"
      >
        <CampoNombre />
      </Tarjeta>

      <Tarjeta
        n={2}
        nombre="CampoCorreo"
        mirar="Escribe un correo: tiene que verse. Con el starter el campo se queda en blanco."
        campos="un <input> Correo"
        estado="resuelto"
      >
        <CampoCorreo />
      </Tarjeta>

      <Tarjeta
        n={3}
        nombre="CampoDetalle"
        mirar="Escribe y pulsa Limpiar: el campo tiene que quedar en blanco. Con el starter el texto se queda."
        campos="un <input> Detalle · botón Limpiar"
        estado="resuelto"
      >
        <CampoDetalle />
      </Tarjeta>

      <Tarjeta
        n={4}
        nombre="ErrorNombre"
        mirar="Antes de Revisar no tiene que haber nada debajo del botón. Pulsa Revisar: sale El nombre es obligatorio. Con el starter el párrafo existe desde el principio, vacío."
        campos="botón Revisar · un <p role=alert> solo si hay error"
        estado="resuelto"
      >
        <ErrorNombre />
      </Tarjeta>

      <Tarjeta
        n={6}
        nombre="ErrorCorreo"
        mirar="Pulsa Revisar con el campo vacío y sale el error; escribe una letra y se va. Lo que cambia es el aria-invalid del input, que no se ve: míralo en las DevTools. Tiene que decir true o false, no el texto del error."
        campos="un <input> Correo · botón Revisar · un <p role=alert> solo si hay error"
        estado="resuelto"
      >
        <ErrorCorreo />
      </Tarjeta>
    </>
  );
}
