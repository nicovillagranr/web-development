// Proyecto 0.1 — Juego de personajes (herencia + métodos)
// TS: clase abstracta fuerza a las subclases a implementar ataqueEspecial().
class Personaje {
    constructor(nombre, vida, ataque) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
    }
    atacar(objetivo) {
        const dano = this.ataque;
        objetivo.vida = Math.max(0, objetivo.vida - dano);
        document.writeln(`${this.nombre} atacó a ${objetivo.nombre} y le quitó ${dano} puntos de vida.<br>`);
        if (objetivo.vida <= 0) {
            document.writeln(`${objetivo.nombre} ha sido derrotado.<br>`);
        }
    }
    verEstado() {
        document.writeln(`${this.nombre} tiene ${this.vida} de vida.<br>`);
    }
    estaVivo() {
        return this.vida > 0;
    }
}
class Guerrero extends Personaje {
    ataqueEspecial(objetivo) {
        const dano = this.ataque * 2;
        objetivo.vida = Math.max(0, objetivo.vida - dano);
        document.writeln(`${this.nombre} usó Espadazo 🔥 y quitó ${dano} de vida a ${objetivo.nombre}.<br>`);
    }
}
class Mago extends Personaje {
    ataqueEspecial(objetivo) {
        const dano = this.ataque + 10;
        objetivo.vida = Math.max(0, objetivo.vida - dano);
        document.writeln(`${this.nombre} lanzó un Hechizo mágico 🌟 y quitó ${dano} de vida a ${objetivo.nombre}.<br>`);
    }
}
// Simulación de combate
const guerrero = new Guerrero("Theorin", 100, 15);
const mago = new Mago("Gandalf", 80, 12);
guerrero.verEstado();
mago.verEstado();
guerrero.atacar(mago);
mago.atacar(guerrero);
guerrero.ataqueEspecial(mago);
mago.verEstado();
guerrero.ataqueEspecial(mago);
guerrero.atacar(mago);
export {};
//# sourceMappingURL=index.js.map