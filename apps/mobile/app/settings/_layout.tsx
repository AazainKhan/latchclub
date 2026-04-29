import { Stack } from "expo-router";

import { colors } from "../../src/theme";

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: colors.bg.base },
        headerTintColor: colors.text.primary,
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: colors.bg.base },
      }}
    />
  );
}
