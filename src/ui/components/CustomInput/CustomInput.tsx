import React from 'react';
import styled from 'styled-components/native';
import { TextInput, TextInputProps } from 'react-native-paper';
import { COLORS } from '@ui/theme/colors';

type Props = TextInputProps & {
  labelText: string;
};

const CustomInput = ({ labelText, ...rest }: Props) => {
  return (
    <StyledInput
      mode="outlined"
      outlineColor={COLORS.gray300}
      activeOutlineColor={COLORS.gray300}
      textColor={COLORS.text}
      selectionColor={COLORS.text}
      label={<Label>{labelText}</Label>}
      {...rest}
    />
  );
};

export default CustomInput;

const StyledInput = styled(TextInput)({
  backgroundColor: COLORS.white,
  fontFamily: 'OpenSans-Semibold',
});

const Label = styled.Text({
  color: COLORS.text,
  fontFamily: 'OpenSans-Regular',
});
