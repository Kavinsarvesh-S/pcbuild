export function formatRupees(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  return '₹' + amount.toLocaleString('en-IN');
}
