import { useAuth } from "@/hooks/useAuth";
import { Database, supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Payment = Database["public"]["Tables"]["payments"]["Row"];
type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

export default function SubscriptionScreen() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadSubscriptionData();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const loadSubscriptionData = async () => {
    if (!user?.id) return;

    try {
      const { data: profileData } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(profileData);

      const { data: paymentsData } = await supabase
        .from("payments")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setPayments(paymentsData || []);
    } catch (err) {
      console.error("Error loading subscription data:", err);
    } finally {
      setLoading(false);
    }
  };

  const isPremium =
    profile?.premium_until && new Date(profile.premium_until) > new Date();

  const daysRemaining = isPremium
    ? Math.ceil(
        (new Date(profile!.premium_until!).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "#21c16b";
      case "pending":
        return "#f59e0b";
      case "rejected":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "rejected":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const renderPayment = ({ item }: { item: Payment }) => (
    <View style={styles.paymentCard}>
      <View style={styles.paymentHeader}>
        <View>
          <Text style={styles.transactionId}>{item.transaction_id}</Text>
          <Text style={styles.paymentDate}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: `${getStatusColor(item.status)}20` },
          ]}
        >
          <Ionicons
            name={getStatusIcon(item.status) as any}
            size={14}
            color={getStatusColor(item.status)}
          />
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(item.status) },
            ]}
          >
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={styles.paymentDetails}>
        <Text style={styles.amountText}>
          TZS {item.amount.toLocaleString()}
        </Text>
        <Text style={styles.premiumDaysText}>
          {item.premium_days} days premium
        </Text>
      </View>

      {item.reviewed_at && (
        <Text style={styles.reviewedText}>
          Reviewed: {new Date(item.reviewed_at).toLocaleDateString()}
        </Text>
      )}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6c4ef5" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#001328" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription</Text>
        <View style={styles.backButton} />
      </View>

      {/* Premium Status Card */}
      <View
        style={[
          styles.premiumCard,
          isPremium ? styles.premiumCardActive : styles.premiumCardInactive,
        ]}
      >
        <View style={styles.premiumIconContainer}>
          <Ionicons
            name={isPremium ? "diamond" : "diamond-outline"}
            size={40}
            color={isPremium ? "#FFD700" : "#9ca3af"}
          />
        </View>

        <Text
          style={[
            styles.premiumTitle,
            !isPremium && styles.premiumTitleInactive,
          ]}
        >
          {isPremium ? "Premium Active" : "Free Plan"}
        </Text>

        {isPremium ? (
          <>
            <Text style={styles.premiumSubtitle}>
              {daysRemaining} days remaining
            </Text>
            <Text style={styles.premiumExpiry}>
              Expires: {new Date(profile!.premium_until!).toLocaleDateString()}
            </Text>
          </>
        ) : (
          <Text
            style={[
              styles.premiumSubtitle,
              !isPremium && styles.premiumSubtitleInactive,
            ]}
          >
            Upgrade to unlock all features
          </Text>
        )}

        {!isPremium && (
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => router.push("/payment")}
          >
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Premium Features */}
      <View style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>Premium Features</Text>

        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#21c16b" />
          <Text style={styles.featureText}>Unlimited AI conversations</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#21c16b" />
          <Text style={styles.featureText}>All A1-C1 German lessons</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#21c16b" />
          <Text style={styles.featureText}>Advanced grammar drills</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#21c16b" />
          <Text style={styles.featureText}>Pronunciation scoring</Text>
        </View>

        <View style={styles.featureRow}>
          <Ionicons name="checkmark-circle" size={20} color="#21c16b" />
          <Text style={styles.featureText}>Spaced repetition review</Text>
        </View>
      </View>

      {/* Payment History */}
      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>Payment History</Text>

        <FlatList
          data={payments}
          renderItem={renderPayment}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.historyList}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="receipt-outline" size={48} color="#9ca3af" />
              <Text style={styles.emptyText}>No payments yet</Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => router.push("/payment")}
              >
                <Text style={styles.emptyButtonText}>
                  Make Your First Payment
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
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
    width: 40,
    height: 40,
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#001328",
  },
  premiumCard: {
    margin: 16,
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
  },
  premiumCardActive: {
    backgroundColor: "#1a1a2e",
  },
  premiumCardInactive: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  premiumIconContainer: {
    marginBottom: 12,
  },
  premiumTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#fff",
    marginBottom: 4,
  },
  premiumTitleInactive: {
    color: "#001328",
  },
  premiumSubtitle: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    marginBottom: 4,
  },
  premiumSubtitleInactive: {
    color: "#6b7280",
  },
  premiumExpiry: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  upgradeButton: {
    backgroundColor: "#6c4ef5",
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 16,
  },
  upgradeButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#fff",
  },
  featuresCard: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  featuresTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#001328",
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  featureText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001328",
    marginLeft: 12,
    flex: 1,
  },
  historySection: {
    flex: 1,
  },
  historyTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#001328",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  historyList: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  paymentCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  paymentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  transactionId: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#001328",
  },
  paymentDate: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
  },
  paymentDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  amountText: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#001328",
  },
  premiumDaysText: {
    fontFamily: "Poppins-Medium",
    fontSize: 13,
    color: "#6c4ef5",
  },
  reviewedText: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 12,
    marginBottom: 16,
  },
  emptyButton: {
    backgroundColor: "#6c4ef5",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#fff",
  },
});