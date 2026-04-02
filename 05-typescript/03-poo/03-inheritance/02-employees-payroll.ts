// 02 — Employees Payroll
// TS: constructor parameter properties con public/protected.
// 'override' garantiza que el método existe en el padre.

class Employee {
  constructor(
    public name: string,
    protected baseSalary: number
  ) {}

  salary(): number {
    return this.baseSalary;
  }

  info(): string {
    return `${this.name} — Salario: $${this.salary()}`;
  }
}

class Developer extends Employee {
  constructor(
    name: string,
    baseSalary: number,
    private bonus: number
  ) {
    super(name, baseSalary); // llama al constructor del padre
  }

  override salary(): number {
    return this.baseSalary + this.bonus;
  }
}

class Manager extends Employee {
  constructor(
    name: string,
    baseSalary: number,
    private teamSize: number
  ) {
    super(name, baseSalary);
  }

  override salary(): number {
    return this.baseSalary + this.teamSize * 100;
  }
}

const dev = new Developer("Ana", 1300, 250);
const mgr = new Manager("Pedro", 2000, 8);

console.log("[employees-payroll]", dev.info());   // Ana — Salario: $1550
console.log("[employees-payroll]", mgr.info());   // Pedro — Salario: $2800
