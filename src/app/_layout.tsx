import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@ui/theme/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FONTS } from '@ui/theme/fonts';
import { PaperProvider } from 'react-native-paper';

SplashScreen.preventAutoHideAsync();

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
    <PaperProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
    </PaperProvider>
  );
};

export default RootLayout;
