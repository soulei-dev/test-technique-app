/**
 * Format a date string from ISO format (YYYY-MM-DD) to "DD Month YYYY",
 * with the first letter of the month capitalized.
 *
 * @param isoDate - The ISO date string to format.
 * @returns The formatted date string, e.g., "15 Décembre 2023".
 */
export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const formatted = date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return formatted.replace(/^\d{2} (\w)/, (match, p1) => match.replace(p1, p1.toUpperCase()));
};
