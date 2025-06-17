
export const formatAmount = (value: number) => `${value.toFixed(2).replace('.', ',')} €`;

export const formatSignedAmount = (value: number) => {
  const sign = value >= 0 ? '+' : '-';
  return `${sign} ${Math.abs(value).toFixed(2).replace('.', ',')} €`;
};
