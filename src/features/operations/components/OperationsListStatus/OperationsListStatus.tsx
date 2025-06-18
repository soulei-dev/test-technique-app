import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { COLORS } from '@ui/theme/colors';

interface Props {
  isLoading: boolean;
}

const OperationsListStatus: React.FC<Props> = ({ isLoading }) => {
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return <Message>Aucune opération ne correspond à votre recherche</Message>;
};

export default OperationsListStatus;

const Message = styled.Text({
  fontSize: 14,
  fontFamily: 'OpenSans-Semibold',
  color: COLORS.text,
  textAlign: 'center',
  marginTop: 20,
});
