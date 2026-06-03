import { useAuth } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";

const ADMIN_USER_ID = process.env.EXPO_PUBLIC_ADMIN_USER_ID || "";

export default function AdminLayout() {
  const { isSignedIn, isLoaded, user } = useAuth();
  const userId = user?.id ?? null;

  if (!isLoaded) return null;

  if (!isSignedIn || (ADMIN_USER_ID && userId !== ADMIN_USER_ID)) {
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}