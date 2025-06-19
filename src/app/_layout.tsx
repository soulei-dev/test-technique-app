import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@ui/theme/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FONTS } from '@ui/theme/fonts';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const RootLayout = () => {
  const [loaded, error] = useFonts(FONTS);

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: COLORS.white },
            }}
          />
        </PaperProvider>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
