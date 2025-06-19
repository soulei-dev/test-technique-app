import { COLORS } from '@ui/theme/colors';
import styled from 'styled-components/native';

type Props = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

const CustomButton = ({ label, onPress, disabled = false }: Props) => {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled} $disabled={disabled}>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

export default CustomButton;

const ButtonContainer = styled.TouchableOpacity<{ $disabled: boolean }>(
  ({ $disabled }) => ({
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
    width: '100%',
    opacity: $disabled ? 0.4 : 1,
  }),
);

const Label = styled.Text({
  color: COLORS.white,
  fontFamily: 'OpenSans-Semibold',
  fontSize: 14,
});
