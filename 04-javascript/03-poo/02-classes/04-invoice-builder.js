class Invoice {
  constructor(client) {
    this.client = client;
    this.lines = [];
  }

  addLine(detail, amount) {
    this.lines.push({ detail, amount });
  }

  total() {
    return this.lines.reduce((acc, line) => acc + line.amount, 0);
  }
}

const invoice = new Invoice('Acme SPA');
invoice.addLine('Development sprint', 500);
invoice.addLine('Support', 120);
console.log('[invoice-builder] total =', invoice.total());
