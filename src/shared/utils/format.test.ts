import { formatAmount, formatSignedAmount } from './format';

describe('formatAmount', () => {
  it('formats a positive number with comma and euro symbol', () => {
    expect(formatAmount(1234.56)).toBe('1234,56 €');
  });

  it('formats a negative number with comma and euro symbol', () => {
    expect(formatAmount(-78.9)).toBe('-78,90 €');
  });

  it('formats a number with no decimals correctly', () => {
    expect(formatAmount(50)).toBe('50,00 €');
  });
});

describe('formatSignedAmount', () => {
  it('adds + sign for positive numbers', () => {
    expect(formatSignedAmount(42.5)).toBe('+ 42,50 €');
  });

  it('adds - sign for negative numbers and uses absolute value', () => {
    expect(formatSignedAmount(-99.9)).toBe('- 99,90 €');
  });

  it('handles zero as positive', () => {
    expect(formatSignedAmount(0)).toBe('+ 0,00 €');
  });
});
