import { COLORS } from '@ui/theme/colors';
import styled from 'styled-components/native';
import OperationSummaryItem from '../OperationSummaryItem/OperationSummaryItem';
import { formatAmount } from '@shared/utils/format';
import { Stats } from '@operations/types';

type Props = {
  data: Stats;
};

const OperationsSummaryCard = ({ data }: Props) => {
  return (
    <Container>
      <OperationSummaryItem
        title="Crédit"
        amount={formatAmount(data.incomesTotal)}
      />
      <OperationSummaryItem
        title="Débit"
        amount={formatAmount(data.outcomesTotal)}
        amountColor={COLORS.red}
      />
      <OperationSummaryItem
        title="Solde"
        amount={formatAmount(data.balanceTotal)}
        amountColor={COLORS.green500}
      />
    </Container>
  );
};

export default OperationsSummaryCard;

const Container = styled.View`
  border-radius: 8px;
  shadow-color: #000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.15;
  shadow-radius: 15px;
  background-color: ${COLORS.white};
  padding: 16px;
  flex-direction: row;
  justify-content: space-between;
  elevation: 5;
`;
