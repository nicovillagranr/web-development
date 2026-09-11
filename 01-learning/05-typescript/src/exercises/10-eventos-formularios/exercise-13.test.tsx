import { describe, it, expect } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  textoDelBoton,
  PanelDeEstado,
  FormularioAviso,
  FormularioSinDobleEnvio,
  FormularioQueVuelveAIdle,
  CampoQueSeMarca,
  AvisoQueSeVa,
  AvisoConEnvioLento,
  BotonLimpiarProtegido,
} from "./exercise-13";

/* Los cinco drills se comprueban por comportamiento: qué dice el botón antes, durante
 * y después del envío, y qué avisos hay en pantalla en cada momento. El envío finge
 * tardar, así que varios tests esperan a que termine con `findBy*`. */

describe("10-eventos-formularios / exercise-13 — el estado del envío", () => {
  it("1) textoDelBoton — un texto distinto por estado", () => {
    expect(textoDelBoton("idle")).toBe("Enviar mensaje");
    expect(textoDelBoton("submitting")).toBe("Enviando...");
    expect(textoDelBoton("success")).toBe("Enviado");
  });

  it("1) textoDelBoton — un estado que no existe no debería compilar", () => {
    /* Este test no comprueba el VALOR devuelto, comprueba TIPOS. La directiva de abajo
     * dice "la línea siguiente tiene que dar error de tipos"; si la función acepta
     * cualquier texto, no lo da, y entonces `pnpm typecheck` protesta por la directiva
     * que sobra. Es la única señal que tiene un parámetro demasiado ancho.
     * Por eso lo que se afirma aquí es que sale una cadena y nada más: qué cadena sale
     * para un estado imposible es asunto tuyo, no del enunciado. */
    // @ts-expect-error "enviando" no es uno de los tres estados del envío
    expect(typeof textoDelBoton("enviando")).toBe("string");
  });

  it("2) PanelDeEstado — arranca quieto y cada botón lo mueve a su estado", async () => {
    const user = userEvent.setup();
    render(<PanelDeEstado />);

    expect(screen.getByText("Enviar mensaje")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Enviar" }));
    expect(screen.getByText("Enviando...")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Terminar" }));
    expect(screen.getByText("Enviado")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(screen.getByText("Enviar mensaje")).toBeInTheDocument();
  });

  it("3) FormularioAviso — sin enviar no hay aviso ninguno", () => {
    render(<FormularioAviso />);

    expect(screen.getByRole("button")).toHaveTextContent("Enviar mensaje");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("3) FormularioAviso — mientras espera al servidor el botón lo dice", async () => {
    const user = userEvent.setup();
    render(<FormularioAviso />);

    await user.type(screen.getByLabelText("Mensaje"), "hola");
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toHaveTextContent("Enviando...");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("3) FormularioAviso — cuando vuelve, sale el aviso de éxito", async () => {
    const user = userEvent.setup();
    render(<FormularioAviso />);

    await user.type(screen.getByLabelText("Mensaje"), "hola");
    await user.click(screen.getByRole("button"));

    expect(await screen.findByRole("status")).toHaveTextContent("Mensaje enviado correctamente");
    expect(screen.getByRole("button")).toHaveTextContent("Enviado");
  });

  it("4) FormularioSinDobleEnvio — durante el envío el botón no se puede pulsar", async () => {
    const user = userEvent.setup();
    render(<FormularioSinDobleEnvio />);

    await user.type(screen.getByLabelText("Mensaje"), "hola");
    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("4) FormularioSinDobleEnvio — dos clics seguidos mandan un solo mensaje", async () => {
    const user = userEvent.setup();
    render(<FormularioSinDobleEnvio />);

    await user.type(screen.getByLabelText("Mensaje"), "hola");
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByRole("button"));

    /* damos tiempo de sobra a que terminen DOS envíos: si el segundo clic llegó a
     * disparar uno, el recuento acaba en 2 */
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 600));
    });

    expect(screen.getByText(/Enviados:\s*1/)).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("5) FormularioQueVuelveAIdle — escribir después de enviar borra el aviso", async () => {
    const user = userEvent.setup();
    render(<FormularioQueVuelveAIdle />);

    const campo = screen.getByLabelText("Mensaje");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button"));
    expect(await screen.findByRole("status")).toBeInTheDocument();

    await user.type(campo, "!");

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Enviar mensaje");
    expect(campo).toHaveValue("hola!");
  });

  it("5) FormularioQueVuelveAIdle — escribir durante el envío no lo saca de enviando", async () => {
    const user = userEvent.setup();
    render(<FormularioQueVuelveAIdle />);

    const campo = screen.getByLabelText("Mensaje");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button"));
    await user.type(campo, "!");

    expect(screen.getByRole("button")).toHaveTextContent("Enviando...");
  });

  it("5) FormularioQueVuelveAIdle — escribir sin haber enviado no cambia el botón", async () => {
    const user = userEvent.setup();
    render(<FormularioQueVuelveAIdle />);

    await user.type(screen.getByLabelText("Mensaje"), "hola");

    expect(screen.getByRole("button")).toHaveTextContent("Enviar mensaje");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  /* ── ESCALERA DEL 5 ──────────────────────────────────────────────────────── */

  it("5a) CampoQueSeMarca — la primera tecla marca el campo sin perder el texto", async () => {
    const user = userEvent.setup();
    render(<CampoQueSeMarca />);

    expect(screen.getByText("sin teclear")).toBeInTheDocument();

    await user.type(screen.getByLabelText("Nombre"), "Nico");

    expect(screen.getByText("tecleado")).toBeInTheDocument();
    expect(screen.getByLabelText("Nombre")).toHaveValue("Nico");
  });

  it("5b) AvisoQueSeVa — teclear apaga el aviso y conserva lo escrito", async () => {
    const user = userEvent.setup();
    render(<AvisoQueSeVa />);

    const campo = screen.getByLabelText("Nota");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button", { name: "Marcar guardado" }));
    expect(screen.getByRole("status")).toBeInTheDocument();

    await user.type(campo, "!");

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(campo).toHaveValue("hola!");
  });

  it("5c) AvisoConEnvioLento — escribir durante el envío no lo saca de enviando", async () => {
    const user = userEvent.setup();
    render(<AvisoConEnvioLento />);

    const campo = screen.getByLabelText("Mensaje");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button"));
    await user.type(campo, "!");

    expect(screen.getByRole("button")).toHaveTextContent("Enviando...");
  });

  it("5c) AvisoConEnvioLento — después del envío, teclear sí apaga el aviso", async () => {
    const user = userEvent.setup();
    render(<AvisoConEnvioLento />);

    const campo = screen.getByLabelText("Mensaje");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button"));
    expect(await screen.findByRole("status")).toBeInTheDocument();

    await user.type(campo, "!");

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(campo).toHaveValue("hola!");
  });

  it("5d) BotonLimpiarProtegido — con el formulario quieto, Limpiar vacía el campo", async () => {
    const user = userEvent.setup();
    render(<BotonLimpiarProtegido />);

    const campo = screen.getByLabelText("Mensaje");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button", { name: "Limpiar" }));

    expect(campo).toHaveValue("");
  });

  it("5d) BotonLimpiarProtegido — durante el envío, Limpiar no hace nada", async () => {
    const user = userEvent.setup();
    render(<BotonLimpiarProtegido />);

    const campo = screen.getByLabelText("Mensaje");
    await user.type(campo, "hola");
    await user.click(screen.getByRole("button", { name: "Enviar mensaje" }));
    await user.click(screen.getByRole("button", { name: "Limpiar" }));

    /* el campo intacto y el botón de enviar todavía avisando: la guardia está dentro
     * del manejador, no en un `disabled` que se coma el clic */
    expect(campo).toHaveValue("hola");
    expect(screen.getByRole("button", { name: "Limpiar" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "Enviando..." })).toBeInTheDocument();
  });
});
