import styled from 'styled-components/native';

const CategoriesScreen = () => {
  return (
    <Container>
      <Label>Categories Screen</Label>
    </Container>
  );
};

export default CategoriesScreen;

const Container = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const Label = styled.Text({
  fontSize: 16,
  fontFamily: 'OpenSans-Regular',
});
