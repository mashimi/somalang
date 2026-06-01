import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Simple admin PIN (in production, use environment variable)
const ADMIN_PIN = "1234";

export default function AdminLoginScreen() {
  const [pin, setPin] = useState("");

  const handleLogin = () => {
    if (pin === ADMIN_PIN) {
      router.replace("/admin/dashboard");
    } else {
      Alert.alert("Invalid PIN", "Please try again");
      setPin("");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>Enter PIN to continue</Text>

          <TextInput
            value={pin}
            onChangeText={setPin}
            placeholder="••••"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            keyboardType="number-pad"
            maxLength={4}
            style={styles.input}
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={pin.length !== 4}
            style={[
              styles.button,
              pin.length !== 4 && styles.buttonDisabled,
            ]}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Back to App</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#001328",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 32,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    padding: 16,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    fontFamily: "Poppins-Regular",
  },
  button: {
    width: "100%",
    backgroundColor: "#6c4ef5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  backButton: {
    padding: 12,
  },
  backButtonText: {
    color: "#6c4ef5",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
