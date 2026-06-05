import { ScreenHeader } from "@/components/ScreenHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Constants from "expo-constants";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Alert,
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

const MPESA_NUMBER =
  process.env.EXPO_PUBLIC_MPESA_NUMBER ||
  (Constants.expoConfig?.extra?.mpesaNumber as string) ||
  "+255 749 696 967";


export default function PaymentScreen() {
  const { user } = useAuth();
  const { amount } = useLocalSearchParams<{ amount?: string }>();
  const [transactionId, setTransactionId] = useState("");
  const [senderName, setSenderName] = useState("");
  const [paymentAmount, setPaymentAmount] = useState(amount || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const copyMpesaNumber = async () => {
    await Clipboard.setStringAsync(MPESA_NUMBER.replace(/\s/g, ""));
    Alert.alert("Copied!", "M-Pesa number copied to clipboard");
  };

  const handleSubmitReceipt = async () => {
    setError("");

    if (!transactionId || transactionId.length < 6) {
      setError("Please enter a valid transaction ID (e.g., QJ7K2M123)");
      return;
    }

    const amountNum = parseInt(paymentAmount);
    if (!paymentAmount || isNaN(amountNum) || amountNum < 1000) {
      setError("Please enter a valid amount (minimum 10,000 TZS)");
      return;
    }

    if (!user?.id) {
      setError("Please sign in to submit a payment");
      return;
    }

    setIsLoading(true);

    try {
      const { error: insertError } = await supabase.from("payments").insert({
        user_id: user.id,
        transaction_id: transactionId.toUpperCase(),
        amount: amountNum,
        sender_name: senderName || null,
        status: "pending",
      });

      if (insertError) {
        if (insertError.message?.includes("duplicate")) {
          setError("This transaction ID has already been submitted");
        } else {
          setError(insertError.message || "Failed to submit payment");
        }
        setIsLoading(false);
        return;
      }

      Alert.alert(
        "Payment Submitted!",
        "Your payment is being verified. You'll receive premium access within 24 hours.",
        [{ text: "OK", onPress: () => router.replace("/subscription") }]
      );
    } catch (err: any) {
      setError(err.message || "An error occurred");
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
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader title="Premium Payment" />

          {/* M-Pesa Instructions */}
          <View style={styles.instructionCard}>
            <View style={styles.instructionHeader}>
              <Ionicons name="cash" size={24} color="#FF8A00" />
              <Text style={styles.instructionTitle}>Pay via M-Pesa</Text>
            </View>

            <Text style={styles.instructionText}>
              1. Open M-Pesa on your phone{"\n"}
              2. Send payment to:
            </Text>

            <TouchableOpacity
              onPress={copyMpesaNumber}
              style={styles.mpesaNumberBox}
              activeOpacity={0.7}
            >
              <Text style={styles.mpesaNumber}>{MPESA_NUMBER}</Text>
              <Ionicons name="copy" size={20} color="#6c4ef5" />
            </TouchableOpacity>

            <Text style={styles.instructionText}>
              3. Amount:{" "}
              <Text style={styles.boldText}>Amount</Text> (min 10,000 TZS)
              {"\n"}
              4. Save the Transaction ID (e.g., QJ7K2M...)
            </Text>
          </View>

          {/* Transaction Details Form */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Enter Transaction Details</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Transaction ID *</Text>
              <TextInput
                value={transactionId}
                onChangeText={setTransactionId}
                placeholder="QJ7K2M123"
                placeholderTextColor="#9ca3af"
                autoCapitalize="characters"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount Sent (TZS) *</Text>
              <TextInput
                value={paymentAmount}
                onChangeText={setPaymentAmount}
                placeholder="5000"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Sender Name (Optional)</Text>
              <TextInput
                value={senderName}
                onChangeText={setSenderName}
                placeholder="John Doe"
                placeholderTextColor="#9ca3af"
                style={styles.input}
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!transactionId || !paymentAmount || isLoading) &&
                styles.submitButtonDisabled,
            ]}
            activeOpacity={0.85}
            onPress={handleSubmitReceipt}
            disabled={!transactionId || !paymentAmount || isLoading}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? "Submitting..." : "Submit Payment Receipt"}
            </Text>
          </TouchableOpacity>

          {/* Info */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color="#4D88FF" />
            <Text style={styles.infoText}>
              Your payment will be verified manually within 24 hours. Once
              approved, you will receive 30 days of premium access with unlimited
              AI lessons and advanced German content.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  instructionCard: {
    backgroundColor: "#FFF5E8",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },
  instructionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  instructionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#001328",
    marginLeft: 8,
  },
  instructionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
    lineHeight: 22,
  },
  boldText: {
    fontFamily: "Poppins-SemiBold",
  },
  mpesaNumberBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#6c4ef5",
    borderStyle: "dashed",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mpesaNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#6c4ef5",
  },
  formCard: {
    backgroundColor: "#f6f7fb",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  formTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#001328",
    marginBottom: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
    marginBottom: 12,
    backgroundColor: "#fff",
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
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#ef4444",
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#6c4ef5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#4D88FF",
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    flex: 1,
    marginLeft: 8,
    lineHeight: 20,
  },
});