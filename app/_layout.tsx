import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

if (__DEV__) {
  require("./ReactotronConfig");
}

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(trip)",
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 5,
    },
  },
});

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Pretendart-Regular": require("../assets/fonts/Pretendard-Regular.otf"),
    "Pretendart-Medium": require("../assets/fonts/Pretendard-Medium.otf"),
    "Pretendart-SemiBold": require("../assets/fonts/Pretendard-SemiBold.otf"),
    "Pretendart-Bold": require("../assets/fonts/Pretendard-Bold.otf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(trip)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </QueryClientProvider>
  );
}
