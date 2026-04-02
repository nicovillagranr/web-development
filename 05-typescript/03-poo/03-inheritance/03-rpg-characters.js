// 03 — RPG Characters
// TS: clase base con 'protected attack' para que las subclases puedan leerlo.
// abstract class fuerza a las subclases a implementar ciertos métodos.
class Character {
    constructor(name, hp, attack) {
        this.name = name;
        this.hp = hp;
        this.attack = attack;
    }
    // Método base — puede ser sobreescrito
    hit(target) {
        target.hp = Math.max(0, target.hp - this.attack);
        console.log(`${this.name} atacó a ${target.name}. HP restante: ${target.hp}`);
    }
    status() {
        return `${this.name}: ${this.hp} HP`;
    }
    isAlive() {
        return this.hp > 0;
    }
}
class Warrior extends Character {
    specialAttack(target) {
        const damage = this.attack * 2;
        target.hp = Math.max(0, target.hp - damage);
        console.log(`${this.name} usó Espadazo 🔥 y quitó ${damage} HP a ${target.name}`);
    }
}
class Mage extends Character {
    hit(target) {
        // Mago tiene +5 de daño base comparado con Character
        target.hp = Math.max(0, target.hp - (this.attack + 5));
        console.log(`${this.name} lanzó hechizo. HP restante de ${target.name}: ${target.hp}`);
    }
    specialAttack(target) {
        const damage = this.attack + 10;
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
export {};
//# sourceMappingURL=03-rpg-characters.js.map