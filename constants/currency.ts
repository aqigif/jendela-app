export const formatCurrency = (
  value: number,
  currency: string,
  locale: string = "en-US"
): string => {
  return new Intl.NumberFormat(locale, {
    currency: currency,
  }).format(value);
};
