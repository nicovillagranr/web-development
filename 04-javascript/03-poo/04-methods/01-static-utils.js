class PriceUtils {
  static tax(amount, percent) {
    return amount + amount * (percent / 100);
  }
}

console.log('[static-utils]', PriceUtils.tax(120, 19));
