import "../global.css";

import { useAuth } from "@/hooks/useAuth";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";
import { useFonts } from "expo-font";
import { Stack, useGlobalSearchParams, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { PostHogProvider } from "posthog-react-native";
import { useEffect, useRef } from "react";

SplashScreen.preventAutoHideAsync();

function SupabaseIdentifier() {
  const { isSignedIn, user } = useAuth();
  const { selectedLanguage } = useLanguageStore();

  useEffect(() => {
    if (!isSignedIn || !user) return;
    posthog.identify(user.id, {
      $set_once: { signup_date: new Date().toISOString() },
      $set: { preferred_language: selectedLanguage ?? null },
    });
  }, [isSignedIn, user?.id, selectedLanguage]);

  return null;
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...params,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: true,
        captureTouches: true,
        propsToCapture: ["testID"],
        maxElementsCaptured: 20,
      }}
    >
      <SupabaseIdentifier />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="language-select" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson/[id]" />
        <Stack.Screen name="payment" />
        <Stack.Screen name="subscription" />
        <Stack.Screen name="payment-history" />
        <Stack.Screen name="ai-generator" />
        <Stack.Screen name="(admin)" />
        <Stack.Screen name="admin/login" />
        <Stack.Screen name="admin/dashboard" />
      </Stack>
    </PostHogProvider>
  );
}