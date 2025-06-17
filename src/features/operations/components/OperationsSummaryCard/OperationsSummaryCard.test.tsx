import React from 'react';
import { render } from '@testing-library/react-native';
import OperationsSummaryCard from './OperationsSummaryCard';
import { Stats } from '@operations/types';

jest.mock('../OperationSummaryItem/OperationSummaryItem', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return ({ title, amount }: { title: string; amount: string }) => (
    <View>
      <Text>{amount}</Text>
      <Text>{title}</Text>
    </View>
  );
});

describe('OperationsSummaryCard', () => {
  const mockData: Stats = {
    incomesTotal: 1500.34,
    outcomesTotal: -500,
    balanceTotal: 1000,
  };

  it('renders credit, debit and balance correctly formatted', () => {
    const { getByText } = render(<OperationsSummaryCard data={mockData} />);

    expect(getByText('1500,34 €')).toBeTruthy();
    expect(getByText('Crédit')).toBeTruthy();

    expect(getByText('-500,00 €')).toBeTruthy();
    expect(getByText('Débit')).toBeTruthy();

    expect(getByText('1000,00 €')).toBeTruthy();
    expect(getByText('Solde')).toBeTruthy();
  });
});
