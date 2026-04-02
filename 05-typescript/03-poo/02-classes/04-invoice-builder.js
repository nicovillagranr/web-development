// 04 — Invoice Builder
// TS: interfaz InvoiceLine para cada línea; reduce con tipos explícitos.
class Invoice {
    constructor(client) {
        this.lines = [];
        this.client = client;
    }
    addLine(detail, amount) {
        this.lines.push({ detail, amount });
    }
    total() {
        return this.lines.reduce((acc, line) => acc + line.amount, 0);
    }
    summary() {
        console.log(`Factura para: ${this.client}`);
        this.lines.forEach((line) => {
            console.log(`  ${line.detail}: $${line.amount}`);
        });
        console.log(`  TOTAL: $${this.total()}`);
    }
}
const invoice = new Invoice("Acme SPA");
invoice.addLine("Development sprint", 500);
invoice.addLine("Support", 120);
console.log("[invoice-builder] total =", invoice.total()); // 620
invoice.summary();
export {};
//# sourceMappingURL=04-invoice-builder.js.map