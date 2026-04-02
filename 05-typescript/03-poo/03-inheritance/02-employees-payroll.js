// 02 — Employees Payroll
// TS: constructor parameter properties con public/protected.
// 'override' garantiza que el método existe en el padre.
class Employee {
    constructor(name, baseSalary) {
        this.name = name;
        this.baseSalary = baseSalary;
    }
    salary() {
        return this.baseSalary;
    }
    info() {
        return `${this.name} — Salario: $${this.salary()}`;
    }
}
class Developer extends Employee {
    constructor(name, baseSalary, bonus) {
        super(name, baseSalary); // llama al constructor del padre
        this.bonus = bonus;
    }
    salary() {
        return this.baseSalary + this.bonus;
    }
}
class Manager extends Employee {
    constructor(name, baseSalary, teamSize) {
        super(name, baseSalary);
        this.teamSize = teamSize;
    }
    salary() {
        return this.baseSalary + this.teamSize * 100;
    }
}
const dev = new Developer("Ana", 1300, 250);
const mgr = new Manager("Pedro", 2000, 8);
console.log("[employees-payroll]", dev.info()); // Ana — Salario: $1550
console.log("[employees-payroll]", mgr.info()); // Pedro — Salario: $2800
export {};
//# sourceMappingURL=02-employees-payroll.js.map