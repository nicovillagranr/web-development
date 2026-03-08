class Character {
  constructor(name, hp, attack) {
    this.name = name;
    this.hp = hp;
    this.attack = attack;
  }

  hit(target) {
    target.hp = Math.max(0, target.hp - this.attack);
  }
}

class Mage extends Character {
  hit(target) {
    target.hp = Math.max(0, target.hp - (this.attack + 5));
  }
}

const warrior = new Character('Warrior', 60, 8);
const mage = new Mage('Mage', 45, 7);
mage.hit(warrior);
console.log('[rpg-characters] warrior hp =', warrior.hp);
