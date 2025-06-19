import { SelectedCategoryProvider } from '@categories/context/SelectedCategoryContext';
import AppHeader from '@ui/components/AppHeader/AppHeader';
import { COLORS } from '@ui/theme/colors';
import { Stack } from 'expo-router';

export default function OperationLayout() {
  return (
    <SelectedCategoryProvider>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: COLORS.white },
        }}
      >
        <Stack.Screen
          name="categories"
          options={{ header: () => <AppHeader title="Catégories" /> }}
        />
      </Stack>
    </SelectedCategoryProvider>
  );
}
