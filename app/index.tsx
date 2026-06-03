import { useAuth } from "@/hooks/useAuth";
import { useLanguageStore } from "@/store/languageStore";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const [languageHydrated, setLanguageHydrated] = useState(
    useLanguageStore.persist.hasHydrated()
  );

  useEffect(() => {
    if (languageHydrated) return;
    return useLanguageStore.persist.onFinishHydration(() =>
      setLanguageHydrated(true)
    );
  }, [languageHydrated]);

  // Auto-select German for Swahili speakers
  useEffect(() => {
    if (languageHydrated && !selectedLanguage) {
      setSelectedLanguage("de");
    }
  }, [languageHydrated, selectedLanguage, setSelectedLanguage]);

  if (!isLoaded || !languageHydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6c4ef5" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/(tabs)" />;
}
