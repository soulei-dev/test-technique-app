import CategorySortButtons, {
  FilterOption,
} from '@categories/components/CategorySortButtons/CategorySortButtons';
import styled from 'styled-components/native';

const CategoriesScreen = () => {
  const handleSortChange = (filter: FilterOption) => {
    console.log('DEBUG selectedFilter is -> ', filter);
  };

  return (
    <Container>
      <Row>
        <Label>Trier par</Label>
        <CategorySortButtons onChange={handleSortChange} />
      </Row>
    </Container>
  );
};

export default CategoriesScreen;

const Container = styled.View({
  flex: 1,
  paddingHorizontal: 24,
  paddingTop: 16,
});

const Row = styled.View({
  flexDirection: 'row',
  alignItems: 'center',
  gap: 20,
});

const Label = styled.Text({
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
});
