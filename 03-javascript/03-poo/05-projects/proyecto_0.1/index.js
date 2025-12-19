// 9. Juego de personajes (herencia + métodos) ⚔️🔥

// Clase base Personaje
class Personaje {
    constructor(nombre, vida, ataque) {
        this.nombre = nombre;
        this.vida = vida;
        this.ataque = ataque;
    }

    // Método para atacar a otro personaje
    atacar(objetivo) {
        objetivo.vida = objetivo.vida - this.ataque;
        document.writeln(`${this.nombre} atacó a ${objetivo.nombre} y le quitó ${this.ataque} puntos de vida.<br>`);

        if (objetivo.vida <= 0) {
            objetivo.vida = 0;
            document.writeln(`${objetivo.nombre} quedó con ${objetivo.vida} de vida: Ha sido derrotado.<br>`);
        }
    }

    // Mostrar el estado del personaje
    verEstado() {
        document.writeln(`${this.nombre} tiene ${this.vida} de vida.<br>`);
    }
}

// Subclase Guerrero
class Guerrero extends Personaje {
    constructor(nombre, vida, ataque) {
        super(nombre, vida, ataque);
    }

    // Ataque especial del guerrero
    ataqueEspecial(objetivo) {
        let dano = this.ataque * 2;
        objetivo.vida = objetivo.vida - dano;
        document.writeln(`${this.nombre} usó Espadazo 🔥 y quitó ${dano} de vida a ${objetivo.nombre}.<br>`);
    }
}

// Subclase Mago
class Mago extends Personaje {
    constructor(nombre, vida, ataque) {
        super(nombre, vida, ataque);
    }

    // Ataque especial del mago
    ataqueEspecial(objetivo) {
        let dano = this.ataque + 10;
        objetivo.vida = objetivo.vida - dano;
        document.writeln(`${this.nombre} lanzó un Hechizo mágico 🌟 y quitó ${dano} de vida a ${objetivo.nombre}.<br>`);
    }
}

// Simulación de combate
let guerrero = new Guerrero("Theorin", 100, 15);
let mago = new Mago("Gandalf", 80, 12);

// Mostrar estados iniciales
guerrero.verEstado();
mago.verEstado();

// Turnos de ataque
guerrero.atacar(mago);
mago.atacar(guerrero);

// Ataques especiales
guerrero.ataqueEspecial(mago);
mago.verEstado();
guerrero.ataqueEspecial(mago);
guerrero.atacar(mago);
