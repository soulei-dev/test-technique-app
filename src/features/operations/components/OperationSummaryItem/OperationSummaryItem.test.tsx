import React from 'react';
import { render } from '@testing-library/react-native';
import OperationSummaryItem from './OperationSummaryItem';
import { COLORS } from '@ui/theme/colors';

describe('OperationSummaryItem', () => {
  it('renders title and amount correctly', () => {
    const { getByText } = render(
      <OperationSummaryItem title="Crédit" amount="1500,00 €" />,
    );

    expect(getByText('1500,00 €')).toBeTruthy();
    expect(getByText('Crédit')).toBeTruthy();
  });

  it('applies default amount color when none is provided', () => {
    const { getByText } = render(
      <OperationSummaryItem title="Solde" amount="900,00 €" />,
    );

    const amountText = getByText('900,00 €');
    expect(amountText.props.style).toEqual(
      expect.objectContaining({ color: COLORS.text }),
    );
  });

  it('applies custom amount color when provided', () => {
    const customColor = COLORS.red;
    const { getByText } = render(
      <OperationSummaryItem
        title="Débit"
        amount="-300,00 €"
        amountColor={customColor}
      />,
    );

    const amountText = getByText('-300,00 €');
    expect(amountText.props.style).toEqual(
      expect.objectContaining({ color: customColor }),
    );
  });
});
