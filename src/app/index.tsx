import styled from 'styled-components/native';

const OperationsScreen = () => {
  return (
    <Container>
      <ScreenTitle>Operations List screen</ScreenTitle>
    </Container>
  );
};

export default OperationsScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const ScreenTitle = styled.Text`
  font-family: 'OpenSans-Regular';
`;
