import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import { formatTanzaniaPhone, isValidTanzaniaPhone, supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");

    // Validate phone
    const formattedPhone = formatTanzaniaPhone(phone);
    if (!formattedPhone || !isValidTanzaniaPhone(phone)) {
      setError(
        "Tafadhali weka namba sahihi ya Tanzania (mfano: 0712345678)"
      );
      return;
    }

    if (pin.length !== 6) {
      setError("PIN lazima iwe na tarakimu 6");
      return;
    }

    setIsLoading(true);
    posthog.capture("sign_in_submitted", { method: "phone_pin" });

    try {
      const authEmail = `${formattedPhone.replace("+", "")}@lingua.local`;

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: authEmail,
          password: pin,
        });

      if (signInError) {
        setError("Namba ya simu au PIN si sahihi");
        posthog.capture("$exception", {
          $exception_list: [
            { type: "SignInError", value: signInError.message },
          ],
          $exception_source: "sign-in",
        });
        setIsLoading(false);
        return;
      }

      posthog.capture("sign_in_completed", { method: "phone_pin" });

      if (data.user) {
        posthog.identify(data.user.id, {
          $set: { phone: formattedPhone },
        });
      }

      router.replace("/");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Hitilafu isiyojulikana";
      setError(message);
      console.error("Sign in error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6">
            {/* Back */}
            <TouchableOpacity
              onPress={() => router.back()}
              className="mt-4 w-10 h-10 justify-center"
            >
              <Ionicons name="chevron-back" size={24} color="#001328" />
            </TouchableOpacity>

            {/* Header */}
            <Text className="h1 mt-4">Karibu tena! 👋</Text>
            <Text className="body-md text-text-secondary mt-2">
              Endelea na safari yako ya Kijerumani
            </Text>

            {/* Mascot */}
            <View className="items-center mt-6 mb-6">
              <Image
                source={images.mascotAuth}
                style={{ width: 160, height: 160 }}
                resizeMode="contain"
              />
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Namba ya Simu</Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="0712 345 678"
                placeholderTextColor="#9ca3af"
                keyboardType="phone-pad"
                style={styles.input}
              />
            </View>

            {/* PIN */}
            <View style={[styles.inputContainer, { flexDirection: "column" }]}>
              <Text style={styles.inputLabel}>PIN ya tarakimu 6</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TextInput
                  value={pin}
                  onChangeText={setPin}
                  placeholder="••••••"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry={!showPin}
                  keyboardType="number-pad"
                  maxLength={6}
                  style={[styles.input, { flex: 1 }]}
                />
                <TouchableOpacity
                  onPress={() => setShowPin((p) => !p)}
                  hitSlop={8}
                >
                  <Ionicons
                    name={showPin ? "eye" : "eye-outline"}
                    size={20}
                    color="#9ca3af"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {error ? (
              <Text className="body-sm text-error mb-2">{error}</Text>
            ) : null}

            {/* Sign In button */}
            <TouchableOpacity
              className="bg-lingua-purple rounded-2xl py-4 items-center mt-2"
              activeOpacity={0.85}
              onPress={handleSignIn}
              disabled={!phone || pin.length !== 6 || isLoading}
              style={{
                opacity: !phone || pin.length !== 6 || isLoading ? 0.6 : 1,
              }}
              testID="sign-in-button"
            >
              <Text className="font-poppins-semibold text-base text-white">
                {isLoading ? "Inaingia..." : "Ingia"}
              </Text>
            </TouchableOpacity>

            {/* Sign Up link */}
            <View className="flex-row justify-center mt-4 mb-8">
              <Text className="body-md text-text-secondary">
                Huna akaunti?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-up")}
              >
                <Text className="body-md text-lingua-purple font-poppins-semibold">
                  Jisajili
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: 12,
  },
  inputLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#6b7280",
    marginBottom: 2,
  },
  input: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001328",
    padding: 0,
  },
});