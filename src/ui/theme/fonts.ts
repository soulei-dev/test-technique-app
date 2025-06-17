
type FontKeys =
  | "Eina03-SemiBold"
  | "OpenSans-Regular"
  | "OpenSans-Semibold"
  | "OpenSans-Italic";

export const FONTS: Record<FontKeys, ReturnType<typeof require>> = {
  'Eina03-SemiBold': require('@assets/fonts/Eina03/Eina03-SemiBold.ttf'),
  'OpenSans-Regular': require('@assets/fonts/OpenSans/OpenSans-Regular.ttf'),
  'OpenSans-Semibold': require('@assets/fonts/OpenSans/OpenSans-Semibold.ttf'),
  'OpenSans-Italic': require('@assets/fonts/OpenSans/OpenSans-Italic.ttf'),
} as const;
