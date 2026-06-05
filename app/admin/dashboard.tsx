import { ScreenHeader } from "@/components/ScreenHeader";
import { useAuth } from "@/hooks/useAuth";
import { Database, supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Payment = Database["public"]["Tables"]["payments"]["Row"];
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

type PaymentWithProfile = Payment & {
  user_profiles: Pick<UserProfile, "id" | "phone" | "referral_code"> | null;
};

const ADMIN_USER_ID = process.env.EXPO_PUBLIC_ADMIN_USER_ID || "";

export default function AdminDashboardScreen() {
  const { user, isLoaded } = useAuth();
  const [payments, setPayments] = useState<PaymentWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  // Authorization gate: only the configured admin user can see payments.
  const isAuthorized = !!user && (ADMIN_USER_ID ? user.id === ADMIN_USER_ID : false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isAuthorized) {
      // Bounce non-admin users back to the home screen.
      router.replace("/");
      return;
    }
    loadPayments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, isAuthorized]);

  const loadPayments = async () => {
    try {
      // The payments table FK `user_id → auth.users.id`. The user_profiles
      // table PK is also `id` (which references auth.users.id), so the join
      // is: payments.user_id → user_profiles.id.
      const { data, error } = await supabase
        .from("payments")
        .select("*, user_profiles!user_id(id, phone, referral_code)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPayments((data as PaymentWithProfile[]) || []);
    } catch (err) {
      console.error("Error loading payments:", err);
      Alert.alert("Error", "Failed to load payments");
    } finally {
      setLoading(false);
    }
  };

  const approvePayment = async (payment: Payment) => {
    setProcessing(payment.id);

    try {
      // Update payment status
      const { error: paymentError } = await supabase
        .from("payments")
        .update({
          status: "approved",
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", payment.id);

      if (paymentError) throw paymentError;

      // Update user premium status
      const premiumUntil = new Date();
      premiumUntil.setDate(premiumUntil.getDate() + payment.premium_days);

      const { error: userError } = await supabase
        .from("user_profiles")
        .update({ premium_until: premiumUntil.toISOString() })
        .eq("id", payment.user_id);

      if (userError) throw userError;

      Alert.alert("Success", "Payment approved and premium activated");
      await loadPayments();
    } catch (err) {
      console.error("Error approving payment:", err);
      Alert.alert("Error", "Failed to approve payment");
    } finally {
      setProcessing(null);
    }
  };

  const rejectPayment = async (payment: Payment) => {
    Alert.alert(
      "Reject Payment",
      "Are you sure you want to reject this payment?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reject",
          style: "destructive",
          onPress: async () => {
            setProcessing(payment.id);

            try {
              const { error } = await supabase
                .from("payments")
                .update({
                  status: "rejected",
                  reviewed_at: new Date().toISOString(),
                })
                .eq("id", payment.id);

              if (error) throw error;

              Alert.alert("Success", "Payment rejected");
              await loadPayments();
            } catch (err) {
              console.error("Error rejecting payment:", err);
              Alert.alert("Error", "Failed to reject payment");
            } finally {
              setProcessing(null);
            }
          },
        },
      ]
    );
  };

  const renderPayment = ({ item }: { item: PaymentWithProfile }) => {
    const isPending = item.status === "pending";
    const isApproved = item.status === "approved";

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.transactionId}>{item.transaction_id}</Text>
            <Text style={styles.phone}>
              {item.user_profiles?.phone || "Unknown"}
            </Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              isPending && styles.statusPending,
              isApproved && styles.statusApproved,
              !isPending && !isApproved && styles.statusRejected,
            ]}
          >
            <Text style={styles.statusText}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Amount:</Text>
            <Text style={styles.detailValue}>
              {item.amount.toLocaleString()} TZS
            </Text>
          </View>
          {item.sender_name && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sender:</Text>
              <Text style={styles.detailValue}>{item.sender_name}</Text>
            </View>
          )}
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date:</Text>
            <Text style={styles.detailValue}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Premium Days:</Text>
            <Text style={styles.detailValue}>{item.premium_days} days</Text>
          </View>
        </View>

        {isPending && (
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => rejectPayment(item)}
              disabled={processing === item.id}
              style={[styles.button, styles.rejectButton]}
            >
              <Ionicons name="close" size={20} color="#fff" />
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => approvePayment(item)}
              disabled={processing === item.id}
              style={[
                styles.button,
                styles.approveButton,
                processing === item.id && styles.buttonDisabled,
              ]}
            >
              {processing === item.id ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Ionicons name="checkmark" size={20} color="#fff" />
              )}
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (!isLoaded || loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6c4ef5" />
        </View>
      </SafeAreaView>
    );
  }

  if (!isAuthorized) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.loadingContainer}>
          <Text>Unauthorized — redirecting…</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      <ScreenHeader
        title="Payment Approvals"
        rightElement={
          <TouchableOpacity onPress={loadPayments} className="w-10 h-10 items-center justify-center">
            <Ionicons name="refresh" size={24} color="#6c4ef5" />
          </TouchableOpacity>
        }
      />

      {/* Navigation */}
      <View style={styles.navRow}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("/(admin)/referrals")}
        >
          <Ionicons name="gift" size={20} color="#6c4ef5" />
          <Text style={styles.navButtonText}>Manage Referral Rewards</Text>
          <Ionicons name="chevron-forward" size={20} color="#6c4ef5" />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {payments.filter((p) => p.status === "pending").length}
          </Text>
          <Text style={styles.statLabel}>Pending</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {payments.filter((p) => p.status === "approved").length}
          </Text>
          <Text style={styles.statLabel}>Approved</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>
            {payments.filter((p) => p.status === "rejected").length}
          </Text>
          <Text style={styles.statLabel}>Rejected</Text>
        </View>
      </View>

      {/* Payments List */}
      <FlatList
        data={payments}
        renderItem={renderPayment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="card-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>No payments yet</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#001328",
  },
  refreshButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#6c4ef5",
  },
  statLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  transactionId: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#001328",
  },
  phone: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusPending: {
    backgroundColor: "#fef3c7",
  },
  statusApproved: {
    backgroundColor: "#d1fae5",
  },
  statusRejected: {
    backgroundColor: "#fee2e2",
  },
  statusText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
  },
  details: {
    gap: 8,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
  },
  detailValue: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#001328",
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 12,
    gap: 8,
  },
  rejectButton: {
    backgroundColor: "#ef4444",
  },
  approveButton: {
    backgroundColor: "#21c16b",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  navRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f2ff",
    padding: 16,
    borderRadius: 12,
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e4d9ff",
  },
  navButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#6c4ef5",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 64,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#9ca3af",
    marginTop: 16,
  },
});
