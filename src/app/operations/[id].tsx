import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useOperationByIdQuery } from '@operations/hooks/useOperationByIdQuery';
import { COLORS } from '@ui/theme/colors';
import ErrorState from '@ui/components/ErrorState/ErrorState';
import AppHeader from '@ui/components/AppHeader/AppHeader';
import { TextInput } from 'react-native-paper';
import CustomInput from '@ui/components/CustomInput/CustomInput';
import { formatDate } from '@shared/utils/formatDate';
import CategoryGroupButton from '@categories/components/CategoryGroupButton/CategoryGroupButton';
import { CategoriesGroup } from '@categories/types';
import CustomButton from '@ui/components/CustomButton/CustomButton';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Spacer } from '@ui/components/Spacer/Spacer';
import { formatToTwoDigits } from '@shared/utils/format';
import { useUpdateOperationMutation } from '@operations/hooks/useUpdateOperationMutation';

const OperationDetailScreen = () => {
  const router = useRouter();
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const { id, categoryGroup: categoryGroupParam } = useLocalSearchParams();
  const { data, isLoading, isError, refetch } = useOperationByIdQuery(
    Number(id),
  );

  const { mutateAsync: updateOperation, isPending } =
    useUpdateOperationMutation();

  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const categoryGroup = categoryGroupParam
    ? (JSON.parse(categoryGroupParam as string) as CategoriesGroup)
    : undefined;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <AppHeader title={data?.label ?? ''} />,
    });
  }, [navigation, data]);

  useEffect(() => {
    if (data) {
      const parsed = parseFloat(String(data.amount));
      setAmount(!isNaN(parsed) ? formatToTwoDigits(parsed) : '');
      setDescription(data.description ?? '');
    }
  }, [data]);

  const handleUpdate = async () => {
    const parsedAmount = parseFloat(amount.replace(',', '.'));
    if (isNaN(parsedAmount)) {
      Alert.alert('Erreur', 'Le montant saisi est invalide.');
      return;
    }

    try {
      await updateOperation({
        id: Number(id),
        data: {
          amount: parsedAmount,
          description: description || undefined,
        },
      });

      Alert.alert('Succès', 'Opération mise à jour avec succès.');
      router.push('/');
    } catch (error) {
      Alert.alert('Erreur', "Échec de la mise à jour de l'opération.");
    }
  };

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardController
        $inset={inset}
        behavior={'padding'}
        keyboardVerticalOffset={20}
      >
        <View>
          <DateLabel>{formatDate(data?.date ?? '')}</DateLabel>
          <Spacer size={20} />
          <CustomInput
            value={amount}
            onChangeText={setAmount}
            labelText="Montant"
            right={<TextInput.Icon icon="currency-eur" color={COLORS.text} />}
            keyboardType="numeric"
          />
          <Spacer size={20} />
          <CustomInput
            value={description}
            onChangeText={setDescription}
            labelText="Description"
            multiline
          />
          <Spacer size={20} />
          {categoryGroup && (
            <CategoryGroupButton
              label={categoryGroup.label}
              color={categoryGroup.color}
            />
          )}
        </View>

        <CustomButton
          label="Enregistrer"
          onPress={handleUpdate}
          disabled={isPending}
        />
      </KeyboardController>
    </TouchableWithoutFeedback>
  );
};

export default OperationDetailScreen;

const KeyboardController = styled(KeyboardAvoidingView)<{
  $inset: { bottom: number };
}>(({ $inset }) => ({
  flex: 1,
  justifyContent: 'space-between',
  marginBottom: $inset.bottom,
  paddingHorizontal: 24,
}));

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
