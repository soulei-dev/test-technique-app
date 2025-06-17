import { COLORS } from '@ui/theme/colors';
import styled from 'styled-components/native';

type Props = {
  title: string;
  amount: string;
  amountColor?: string;
};

const OperationSummaryItem = ({
  title,
  amount,
  amountColor = COLORS.text,
}: Props) => {
  return (
    <Container>
      <Amount $amountColor={amountColor}>{amount}</Amount>
      <Title>{title}</Title>
    </Container>
  );
};

export default OperationSummaryItem;

const Container = styled.View({
  alignItems: 'flex-end',
  gap: 4,
});

const Amount = styled.Text<{ $amountColor?: string }>(({ $amountColor }) => ({
  fontSize: 16,
  fontFamily: 'Eoni03-SemiBold',
  color: $amountColor ?? COLORS.text,
}));

const Title = styled.Text({
  fontSize: 11,
  fontFamily: 'OpenSans-Regular',
  color: COLORS.gray,
});
