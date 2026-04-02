// 03 — RPG Characters
// TS: clase base con 'protected attack' para que las subclases puedan leerlo.
// abstract class fuerza a las subclases a implementar ciertos métodos.

abstract class Character {
  constructor(
    public name: string,
    public hp: number,
    protected attack: number
  ) {}

  // Método base — puede ser sobreescrito
  hit(target: Character): void {
    target.hp = Math.max(0, target.hp - this.attack);
    console.log(`${this.name} atacó a ${target.name}. HP restante: ${target.hp}`);
  }

  // Método abstracto — DEBE ser implementado por cada subclase
  abstract specialAttack(target: Character): void;

  status(): string {
    return `${this.name}: ${this.hp} HP`;
  }

  isAlive(): boolean {
    return this.hp > 0;
  }
}

class Warrior extends Character {
  override specialAttack(target: Character): void {
    const damage: number = this.attack * 2;
    target.hp = Math.max(0, target.hp - damage);
    console.log(`${this.name} usó Espadazo 🔥 y quitó ${damage} HP a ${target.name}`);
  }
}

class Mage extends Character {
  override hit(target: Character): void {
    // Mago tiene +5 de daño base comparado con Character
    target.hp = Math.max(0, target.hp - (this.attack + 5));
    console.log(`${this.name} lanzó hechizo. HP restante de ${target.name}: ${target.hp}`);
  }

  override specialAttack(target: Character): void {
    const damage: number = this.attack + 10;
    target.hp = Math.max(0, target.hp - damage);
    console.log(`${this.name} lanzó Hechizo Mágico 🌟 — ${damage} de daño a ${target.name}`);
  }
}

// Simulación
const warrior = new Warrior("Theorin", 100, 15);
const mage = new Mage("Gandalf", 80, 12);

console.log(warrior.status());
console.log(mage.status());

warrior.hit(mage);
mage.specialAttack(warrior);
warrior.specialAttack(mage);

console.log(warrior.status());
console.log(mage.status());
