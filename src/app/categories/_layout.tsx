import { Stack } from 'expo-router';
import { COLORS } from '@ui/theme/colors';
import AppHeader from '@ui/components/AppHeader/AppHeader';

export default function CategoriesLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: COLORS.white },
        header: () => <AppHeader title="Catégories" />,
      }}
    />
  );
}
