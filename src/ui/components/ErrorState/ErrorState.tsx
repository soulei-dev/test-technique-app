import React from 'react';
import styled from 'styled-components/native';
import { Spacer } from '@ui/components/Spacer/Spacer';
import CustomButton from '@ui/components/CustomButton/CustomButton';
import { COLORS } from '@ui/theme/colors';

type Props = {
  onRetry: () => void;
  message?: string;
};

const ErrorState = ({
  onRetry,
  message = 'Un problème est survenu',
}: Props) => {
  return (
    <CenteredView>
      <ErrorText>{message}</ErrorText>
      <Spacer size={12} />
      <CustomButton label="Réessayez" onPress={onRetry} />
    </CenteredView>
  );
};

export default ErrorState;

const ErrorText = styled.Text({
  color: COLORS.text,
  textAlign: 'center',
  fontFamily: 'OpenSans-Semibold',
});

const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 24,
});
