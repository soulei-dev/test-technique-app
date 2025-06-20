import React from 'react';
import { render } from '@testing-library/react-native';
import OperationListItem from './OperationListItem';
import { COLORS } from '@ui/theme/colors';

describe('OperationListItem', () => {
  it('renders label, category, amount and tag correctly', () => {
    const { getByText } = render(
      <OperationListItem
        label="Facture client"
        amount={1500}
        description="Prestations"
        tagLabel="Recettes"
        tagColor="green"
      />,
    );

    expect(getByText('Facture client')).toBeTruthy();
    expect(getByText('Prestations')).toBeTruthy();
    expect(getByText('+ 1500,00 €')).toBeTruthy();
    expect(getByText('Recettes')).toBeTruthy();
  });

  it('applies primary color for positive amounts', () => {
    const { getByText } = render(
      <OperationListItem
        label="Vente"
        amount={1000}
        description="Services"
        tagLabel="Revenus"
        tagColor="blue"
      />,
    );

    const amount = getByText('+ 1000,00 €');
    expect(amount.props.style.color).toBe(COLORS.primary);
  });

  it('applies default text color for negative amounts', () => {
    const { getByText } = render(
      <OperationListItem
        label="Achat matériel"
        amount={-300}
        description="Fournitures"
        tagLabel="Achats"
        tagColor="purple"
      />,
    );

    const amount = getByText('- 300,00 €');
    expect(amount.props.style.color).toBe(COLORS.text);
  });

  it('renders fallback tag label when tagLabel is empty', () => {
    const { getByText } = render(
      <OperationListItem
        label="Transaction inconnue"
        amount={0}
        description="Sans catégorie"
        tagLabel=""
      />,
    );

    expect(getByText('Non catégorisé')).toBeTruthy();
  });
});
