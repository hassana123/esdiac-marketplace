export function formatCompactNumber(value: number) {
  if (value >= 1000) {
    return `${parseFloat((value / 1000).toFixed(value >= 100000 ? 0 : 1))}K`;
  }
  return `${value}`;
}

export function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}
