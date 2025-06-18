import React from 'react';
import styled from 'styled-components/native';
import CustomSearchBar from '@ui/components/CustomSearchBar/CustomSearchBar';
import OperationsSummaryCard from '@operations/components/OperationsSummaryCard/OperationsSummaryCard';
import { Spacer } from '@ui/components/Spacer/Spacer';

interface Props {
  searchTerm: string;
  onChangeSearch: (text: string) => void;
  totals: {
    incomesTotal: number;
    outcomesTotal: number;
    balanceTotal: number;
  };
}

const OperationsHeader = ({ searchTerm, onChangeSearch, totals }: Props) => {
  return (
    <Container>
      <Spacer size={12} />
      <CustomSearchBar
        placeholder="Rechercher un élément"
        value={searchTerm}
        onChangeText={onChangeSearch}
      />
      <Spacer size={16} />
      <OperationsSummaryCard data={totals} />
      <Spacer size={10} />
    </Container>
  );
};

export default OperationsHeader;

const Container = styled.View({
  paddingHorizontal: 24,
});
