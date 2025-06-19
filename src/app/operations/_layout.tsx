import { Stack } from 'expo-router';
import { COLORS } from '@ui/theme/colors';

export default function OperationsLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.white },
      }}
    />
  );
}
