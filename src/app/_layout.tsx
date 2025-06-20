import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { COLORS } from '@ui/theme/colors';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { FONTS } from '@ui/theme/fonts';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import Toast from 'react-native-toast-message';
import ToastMessage from '@ui/components/ToastMessage/ToastMessage';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

const toastConfig = {
  success: ({ text2 }: any) => (
    <ToastMessage
      icon={<AntDesign name="checkcircleo" color={COLORS.white} size={20} />}
      message={text2}
    />
  ),
  error: ({ text2 }: any) => (
    <ToastMessage
      icon={
        <MaterialIcons name="error-outline" color={COLORS.white} size={20} />
      }
      backgroundColor={COLORS.red}
      message={text2}
    />
  ),
};

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
    <>
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
      <Toast config={toastConfig} />
    </>
  );
};

export default RootLayout;
