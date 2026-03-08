class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  salary() { return this.baseSalary; }
}

class Developer extends Employee {
  constructor(name, baseSalary, bonus) {
    super(name, baseSalary);
    this.bonus = bonus;
  }

  salary() { return this.baseSalary + this.bonus; }
}

const dev = new Developer('Ana', 1300, 250);
console.log('[employees-payroll] salary =', dev.salary());
