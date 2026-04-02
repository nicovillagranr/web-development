// 04 — Invoice Builder
// TS: interfaz InvoiceLine para cada línea; reduce con tipos explícitos.

interface InvoiceLine {
  detail: string;
  amount: number;
}

class Invoice {
  client: string;
  private lines: InvoiceLine[] = [];

  constructor(client: string) {
    this.client = client;
  }

  addLine(detail: string, amount: number): void {
    this.lines.push({ detail, amount });
  }

  total(): number {
    return this.lines.reduce((acc: number, line: InvoiceLine) => acc + line.amount, 0);
  }

  summary(): void {
    console.log(`Factura para: ${this.client}`);
    this.lines.forEach((line: InvoiceLine) => {
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
