import { useLocalSearchParams, useNavigation } from 'expo-router';
import styled from 'styled-components/native';
import { ActivityIndicator, Text } from 'react-native';
import { useLayoutEffect } from 'react';
import { useOperationByIdQuery } from '@operations/hooks/useOperationByIdQuery';
import { COLORS } from '@ui/theme/colors';
import ErrorState from '@ui/components/ErrorState/ErrorState';
import AppHeader from '@ui/components/AppHeader/AppHeader';

const OperationDetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError, refetch } = useOperationByIdQuery(
    Number(id),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AppHeader title={data?.label ?? ''} />,
    });
  }, [navigation, data]);

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
      <Label>Operation Detail</Label>
      <Text>ID: {data?.label}</Text>
    </Container>
  );
};

export default OperationDetailScreen;

const Container = styled.View({
  flex: 1,
  padding: 24,
  justifyContent: 'center',
  alignItems: 'center',
});

const Label = styled.Text({
  fontSize: 18,
  fontWeight: 'bold',
});

const CenteredView = styled.View({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 24,
});
