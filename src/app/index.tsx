import styled from 'styled-components/native';
import CustomSearchBar from '@ui/components/CustomSearchBar/CustomSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacer } from '@ui/components/Spacer/Spacer';

const OperationsScreen = () => {
  return (
    <SafeAreaContainer>
      <Container>
        <Spacer size={12} />
        <CustomSearchBar placeholder="Rechercher un élément" />
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
