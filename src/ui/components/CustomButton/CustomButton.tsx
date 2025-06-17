import { COLORS } from '@ui/theme/colors';
import styled from 'styled-components/native';

type Props = {
  label: string;
  onPress: () => void;
};

const CustomButton = ({ label, onPress }: Props) => {
  return (
    <ButtonContainer onPress={onPress}>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity({
  backgroundColor: COLORS.primary,
  paddingVertical: 12,
  paddingHorizontal: 16,
  alignItems: 'center',
  borderRadius: 8,
});

const Label = styled.Text({
  color: COLORS.white,
  fontFamily: 'OpenSans-Semibold',
  fontSize: 14,
});
