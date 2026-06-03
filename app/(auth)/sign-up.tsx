import { images } from "@/constants/images";
import { posthog } from "@/lib/posthog";
import {
  formatTanzaniaPhone,
  generateReferralCode,
  isValidPin,
  isValidTanzaniaPhone,
  supabase,
  type Database,
} from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

export default function SignUpScreen() {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    setError("");

    // Validate phone
    const formattedPhone = formatTanzaniaPhone(phone);
    if (!formattedPhone || !isValidTanzaniaPhone(phone)) {
      setError(
        "Tafadhali weka namba sahihi ya Tanzania (mfano: 0712345678)"
      );
      return;
    }

    // Validate PIN
    if (!isValidPin(pin)) {
      setError("PIN lazima iwe na tarakimu 6");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN hazifanani");
      return;
    }

    // Validate referral code format if provided
    if (referralCode && !/^TZA-[A-Z0-9]{6}$/i.test(referralCode)) {
      setError("Msimbo wa rufaa si sahihi (mfano: TZA-ABC123)");
      return;
    }

    setIsLoading(true);
    posthog.capture("sign_up_submitted", {
      method: "phone_pin",
      has_referral: !!referralCode,
    });

    try {
      // Step 1: Check if referral code is valid.
      // Use the SECURITY DEFINER RPC so the signup flow can validate a
      // referral code before the user is signed in (RLS would otherwise
      // block the lookup since the user has no session yet).
      let referrerId: string | null = null;
      if (referralCode) {
        const { data: referrerIdResult, error: referrerError } =
          await supabase.rpc("get_referrer_id_by_code", {
            code: referralCode.toUpperCase(),
          });

        if (referrerError || !referrerIdResult) {
          setError("Msimbo wa rufaa haupo. Tafadhali angalia tena.");
          setIsLoading(false);
          return;
        }
        referrerId = referrerIdResult as string;
      }

      // Step 2: Create Supabase auth user
      // We use email format "phone@lingua.local" as workaround (no SMS costs)
      // PIN is used as the password
      // Strip the "+" prefix from formattedPhone because "+" is invalid in email local-part
      const authEmail = `${formattedPhone.replace("+", "")}@lingua.local`;

      const { data: authData, error: signUpError } =
        await supabase.auth.signUp({
          email: authEmail,
          password: pin,
          options: {
            data: {
              phone: formattedPhone,
              referral_code_input: referralCode.toUpperCase() || null,
            },
          },
        });

      if (signUpError) {
        if (signUpError.message.includes("already registered")) {
          setError("Namba hii tayari imesajiliwa. Tafadhali ingia.");
        } else {
          setError(signUpError.message);
        }
        posthog.capture("$exception", {
          $exception_list: [
            { type: "SignUpError", value: signUpError.message },
          ],
          $exception_source: "sign-up",
        });
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setError("Hitilafu imetokea. Tafadhali jaribu tena.");
        setIsLoading(false);
        return;
      }

      // Step 3: Create user profile
      const newReferralCode = generateReferralCode();

      const { error: profileError } = await supabase
        .from("user_profiles")
        .insert({
          id: authData.user.id,
          phone: formattedPhone,
          referral_code: newReferralCode,
          referred_by: referrerId,
        } satisfies Database["public"]["Tables"]["user_profiles"]["Insert"]);

      if (profileError) {
        // If profile creation fails (e.g., duplicate phone), clean up auth user
        console.error("Profile creation error:", profileError);
        setError("Hitilafu ya kuunda wasifu. Tafadhali jaribu tena.");
        setIsLoading(false);
        return;
      }

      // Step 4: Create referral record if referred
      if (referrerId) {
        await supabase.from("referrals").insert({
          referrer_id: referrerId,
          referee_id: authData.user.id,
          reward_xp: 500,
          status: "pending",
        });
      }

      // Step 5: Identify in PostHog
      posthog.capture("sign_up_completed", {
        method: "phone_pin",
        has_referral: !!referralCode,
      });
      posthog.identify(authData.user.id, {
        $set_once: { signup_date: new Date().toISOString() },
        $set: { phone: formattedPhone },
      });

      Alert.alert(
        "Karibu! 🎉",
        "Akaunti yako imeundwa. Anza kujifunza Kijerumani sasa!",
        [
          {
            text: "Twende!",
            onPress: () => router.replace("/language-select"),
          },
        ]
      );
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Hitilafu isiyojulikana";
      setError(message);
      console.error("Sign up error:", err);
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
            <Text className="h1 mt-4">Karibu! 🇹🇿</Text>
            <Text className="body-md text-text-secondary mt-2">
              Anza safari yako ya Kijerumani leo
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
              <Text style={styles.inputLabel}>Unda PIN ya tarakimu 6</Text>
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

            {/* Confirm PIN */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Thibitisha PIN</Text>
              <TextInput
                value={confirmPin}
                onChangeText={setConfirmPin}
                placeholder="••••••"
                placeholderTextColor="#9ca3af"
                secureTextEntry={!showPin}
                keyboardType="number-pad"
                maxLength={6}
                style={styles.input}
              />
            </View>

            {/* Referral Code (Optional) */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>
                Msimbo wa Rufaa (Si lazima)
              </Text>
              <TextInput
                value={referralCode}
                onChangeText={setReferralCode}
                placeholder="TZA-ABC123"
                placeholderTextColor="#9ca3af"
                autoCapitalize="characters"
                style={styles.input}
              />
              <Text className="body-sm text-text-secondary mt-1">
                Pata XP 500 ya bonasi unapotumia msimbo wa rafiki!
              </Text>
            </View>

            {error ? (
              <Text className="body-sm text-error mb-2">{error}</Text>
            ) : null}

            {/* Sign Up button */}
            <TouchableOpacity
              className="bg-lingua-purple rounded-2xl py-4 items-center mt-2"
              activeOpacity={0.85}
              onPress={handleSignUp}
              disabled={!phone || !pin || !confirmPin || isLoading}
              style={{
                opacity: !phone || !pin || !confirmPin || isLoading ? 0.6 : 1,
              }}
              testID="sign-up-button"
            >
              <Text className="font-poppins-semibold text-base text-white">
                {isLoading ? "Inaunda akaunti..." : "Jisajili"}
              </Text>
            </TouchableOpacity>

            {/* Sign In link */}
            <View className="flex-row justify-center mt-4 mb-8">
              <Text className="body-md text-text-secondary">
                Tayari una akaunti?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => router.replace("/(auth)/sign-in")}
              >
                <Text className="body-md text-lingua-purple font-poppins-semibold">
                  Ingia
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