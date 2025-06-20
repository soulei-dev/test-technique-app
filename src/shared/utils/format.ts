/**
 * Formats a numeric amount to a string with two decimals,
 * using a comma as the decimal separator and appending the euro symbol.
 *
 * @param value - The numeric amount to format (e.g., 1234.5)
 * @returns A formatted string (e.g., "1234,50 €")
 */
export const formatAmount = (value: number) => `${value.toFixed(2).replace('.', ',')} €`;

/**
 * Formats a numeric amount with a sign ("+" or "-"), two decimals,
 * a comma as the decimal separator, and appends the euro symbol.
 *
 * @param value - The numeric amount to format (positive or negative)
 * @returns A formatted signed string (e.g., "+ 1234,50 €" or "- 12,00 €")
 */
export const formatSignedAmount = (value: number) => {
  const sign = value >= 0 ? '+' : '-';
  return `${sign} ${Math.abs(value).toFixed(2).replace('.', ',')} €`;
};

/**
 * Formats a number with two decimal places,
 * using a comma as decimal separator.
 * Adds a space after the minus sign if negative.
 *
 * @param value - The numeric value to format
 * @returns A string like "- 500,00" or "24,44"
 */
export const formatToTwoDigits = (value: number): string => {
  const formatted = Math.abs(value).toFixed(2).replace('.', ',');
  return value < 0 ? `- ${formatted}` : formatted;
};

/**
 * Parses a string amount into a number.
 * Accepts only clean numeric input (e.g. "12", "12.34", "-0.5").
 * Returns null if the string includes invalid characters.
 *
 * @param value - The input string to parse.
 * @returns A number or null if invalid.
 */
export const parseAmount = (value: string): number | null => {
  if (!value) return null;

  const normalized = value.replace(',', '.').trim();

  const isValid = /^-?\d+(\.\d+)?$/.test(normalized);
  if (!isValid) return null;

  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? null : parsed;
};