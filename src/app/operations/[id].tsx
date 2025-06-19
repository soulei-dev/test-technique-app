import { useLocalSearchParams, useNavigation } from 'expo-router';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useOperationByIdQuery } from '@operations/hooks/useOperationByIdQuery';
import { COLORS } from '@ui/theme/colors';
import ErrorState from '@ui/components/ErrorState/ErrorState';
import AppHeader from '@ui/components/AppHeader/AppHeader';
import { TextInput } from 'react-native-paper';
import CustomInput from '@ui/components/CustomInput/CustomInput';
import { formatDate } from '@shared/utils/formatDate';

const OperationDetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, refetch } = useOperationByIdQuery(
    Number(id),
  );

  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AppHeader title={data?.label ?? ''} />,
    });
  }, [navigation, data]);

  useEffect(() => {
    if (data) {
      setAmount(String(data.amount));
      setDescription(data.description ?? '');
    }
  }, [data]);

  if (isLoading) {
    return (
      <CenteredView>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </CenteredView>
    );
  }

  if (isError) {
    return <ErrorState onRetry={() => refetch()} />;
  }

  return (
    <Container>
      <DateLabel>{formatDate(data?.date ?? '')}</DateLabel>
      <CustomInput
        value={amount}
        onChangeText={(text) => setAmount(text)}
        labelText="Montant"
        right={<TextInput.Icon icon="currency-eur" color={COLORS.text} />}
      />
      <CustomInput
        value={description}
        onChangeText={(text) => setDescription(text)}
        labelText="Description"
        multiline
      />
    </Container>
  );
};

export default OperationDetailScreen;

const Container = styled.View({
  flex: 1,
  paddingHorizontal: 24,
  gap: 16,
});

const DateLabel = styled.Text({
  fontSize: 14,
  color: COLORS.text,
  fontFamily: 'OpenSans-Regular',
});

const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 24,
});
