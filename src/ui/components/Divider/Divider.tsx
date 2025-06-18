import { COLORS } from '@ui/theme/colors';
import styled from 'styled-components/native';

const Divider = () => {
  return <ItemSeparator />;
};

export default Divider;

const ItemSeparator = styled.View({
  height: 1,
  backgroundColor: COLORS.gray300,
  marginHorizontal: 24,
});
