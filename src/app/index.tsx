import styled from 'styled-components/native';
import CustomSearchBar from '@ui/components/CustomSearchBar/CustomSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '@ui/components/Spacer/Spacer';
import OperationsSummaryCard from '@operations/components/OperationsSummaryCard/OperationsSummaryCard';

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
