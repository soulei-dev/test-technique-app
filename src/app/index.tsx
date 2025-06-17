import styled from 'styled-components/native';
import CustomSearchBar from '@ui/components/CustomSearchBar/CustomSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '@ui/components/Spacer/Spacer';
import OperationsSummaryCard from '@operations/components/OperationsSummaryCard/OperationsSummaryCard';
import OperationListItem from '@operations/components/OperationListItem/OperationListItem';

const OperationsScreen = () => {
  const mockOperationsStats = {
    incomesTotal: 5917.32,
    outcomesTotal: -7941.11,
    balanceTotal: -2023.79,
  };

  return (
    <SafeAreaContainer>
      <Container>
        <Spacer size={12} />
        <CustomSearchBar placeholder="Rechercher un élément" />
        <Spacer size={16} />
        <OperationsSummaryCard data={mockOperationsStats} />
        <Spacer size={10} />
        <OperationListItem
          label="Recette Juin 2024"
          amount={-1200}
          categoryLabel="Consommables"
          tagLabel="Honoraire rétrocédés"
          tagColor={'green'}
        />
      </Container>
    </SafeAreaContainer>
  );
};

export default OperationsScreen;

const SafeAreaContainer = styled(SafeAreaView)({
  flex: 1,
});

const Container = styled.View({
  paddingHorizontal: 24,
});
