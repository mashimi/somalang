import { ScreenHeader } from "@/components/ScreenHeader";
import { Database, supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
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

type Referral = Database["public"]["Tables"]["referrals"]["Row"] & {
  referrer?: Database["public"]["Tables"]["user_profiles"]["Row"];
  referee?: Database["public"]["Tables"]["user_profiles"]["Row"];
};

export default function ReferralsScreen() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      // Both `referrer_id` and `referee_id` are FK columns on the referrals
      // table that reference `auth.users.id`. Because `user_profiles.id`
      // also references `auth.users.id`, we can join through it. The
      // explicit `!referrer_id` / `!referee_id` hint tells PostgREST which
      // FK column to use for each join.
      const { data, error } = await supabase
        .from("referrals")
        .select(
          "*, referrer:user_profiles!referrer_id(*), referee:user_profiles!referee_id(*)",
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReferrals((data as Referral[]) || []);
    } catch (err) {
      console.error("Error loading referrals:", err);
      Alert.alert("Error", "Failed to load referrals");
    } finally {
      setLoading(false);
    }
  };

  const totalRewards = referrals.reduce(
    (sum, r) => sum + (r.reward_xp || 0),
    0
  );
  const grantedCount = referrals.filter((r) => r.status === "granted").length;

  const grantReward = async (referral: Referral) => {
    if (!referral.referrer_id || !referral.reward_xp) return;
    setProcessing(referral.id);
    try {
      // 1. Update referral status to granted
      const { error: refError } = await supabase
        .from("referrals")
        .update({ status: "granted" })
        .eq("id", referral.id);
      if (refError) throw refError;

      // 2. Add XP to the referrer's balance
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("xp_balance")
        .eq("id", referral.referrer_id)
        .single();

      const newBalance = (profile?.xp_balance || 0) + referral.reward_xp;

      const { error: xpError } = await supabase
        .from("user_profiles")
        .update({ xp_balance: newBalance })
        .eq("id", referral.referrer_id);

      if (xpError) throw xpError;

      Alert.alert("Success", `Granted ${referral.reward_xp} XP to referrer`);
      await loadReferrals();
    } catch (err) {
      console.error("Error granting reward:", err);
      Alert.alert("Error", "Failed to grant reward");
    } finally {
      setProcessing(null);
    }
  };

  const renderReferral = ({ item }: { item: Referral }) => {
    const isPending = item.status === "pending";
    return (
      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.personColumn}>
            <Text style={styles.personName}>
              {item.referrer?.phone || "Unknown"}
            </Text>
            <Text style={styles.personLabel}>Referrer</Text>
          </View>
          <Ionicons name="arrow-forward" size={20} color="#9ca3af" />
          <View style={[styles.personColumn, { alignItems: "flex-end" }]}>
            <Text style={styles.personName}>
              {item.referee?.phone || "Unknown"}
            </Text>
            <Text style={styles.personLabel}>Referred</Text>
          </View>
        </View>

        <View style={styles.rewardRow}>
          <View style={styles.rewardBadge}>
            <Ionicons name="gift" size={16} color="#6c4ef5" />
            <Text style={styles.rewardText}>+{item.reward_xp} XP</Text>
          </View>
          <View
            style={[
              styles.statusBadge,
              item.status === "granted" && styles.statusGranted,
            ]}
          >
            <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
          </View>
        </View>

        {isPending && (
          <TouchableOpacity
            onPress={() => grantReward(item)}
            disabled={processing === item.id}
            style={[styles.grantButton, processing === item.id && styles.buttonDisabled]}
          >
            {processing === item.id ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.grantButtonText}>Grant XP Bonus</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        <Text style={styles.dateText}>
          {new Date(item.created_at).toLocaleDateString()}
        </Text>
      </View>
    );
  };

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
      <ScreenHeader
        title="Referral Rewards"
        rightElement={
          <TouchableOpacity onPress={loadReferrals} className="w-10 h-10 items-center justify-center">
            <Ionicons name="refresh" size={24} color="#6c4ef5" />
          </TouchableOpacity>
        }
      />

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{referrals.length}</Text>
          <Text style={styles.statLabel}>Total Referrals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#21c16b" }]}>
            {grantedCount}
          </Text>
          <Text style={styles.statLabel}>Rewards Granted</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statValue, { color: "#f59e0b" }]}>
            {totalRewards.toLocaleString()}
          </Text>
          <Text style={styles.statLabel}>Total XP Given</Text>
        </View>
      </View>

      {/* Referrals List */}
      <FlatList
        data={referrals}
        renderItem={renderReferral}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="people-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyText}>No referrals yet</Text>
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
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  personColumn: {
    flex: 1,
  },
  personName: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#001328",
  },
  personLabel: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rewardBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f5f2ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  rewardText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#6c4ef5",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#fef3c7",
  },
  statusGranted: {
    backgroundColor: "#d1fae5",
  },
  statusText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 11,
    color: "#001328",
  },
  dateText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#9ca3af",
  },
  grantButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#21c16b",
    borderRadius: 12,
    padding: 12,
    gap: 8,
    marginBottom: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  grantButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
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
