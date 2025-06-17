import { COLORS } from '@ui/theme/colors';
import { TextInput } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
};

const CustomSearchBar = ({ value, onChangeText, placeholder }: Props) => {
  return (
    <Container>
      <Ionicons name="search-outline" color={COLORS.text} size={16} />
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray325}
      />
    </Container>
  );
};

export default CustomSearchBar;

const Container = styled.View({
  flexDirection: 'row',
  backgroundColor: COLORS.white,
  borderRadius: 4,
  borderWidth: 1,
  borderColor: COLORS.gray300,
  width: '100%',
  alignItems: 'center',
  padding: 12,
  gap: 8,
});

const Input = styled(TextInput)({
  flex: 1,
  fontSize: 14,
  fontFamily: 'OpenSans-Regular',
  color: COLORS.text,
  padding: 0,
});
