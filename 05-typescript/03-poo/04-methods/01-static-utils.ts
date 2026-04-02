// 01 — Static Utils
// TS: métodos estáticos tipados; se llaman en la clase, no en instancias.

class PriceUtils {
  // static: no necesita instancia para llamarse
  static tax(amount: number, percent: number): number {
    return amount + amount * (percent / 100);
  }

  static discount(amount: number, percent: number): number {
    return amount - amount * (percent / 100);
  }

  // Método estático que retorna string
  static format(amount: number, currency: string = "USD"): string {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

console.log("[static-utils] con IVA:", PriceUtils.tax(120, 19));         // 142.8
console.log("[static-utils] con descuento:", PriceUtils.discount(120, 10)); // 108
console.log("[static-utils] formateado:", PriceUtils.format(142.8));    // USD 142.80

// TS: no puedes crear instancias y llamar estáticos como si fueran de instancia
// const utils = new PriceUtils();
// utils.tax(100, 19); // Error — tax es un método estático
