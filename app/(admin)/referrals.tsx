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

type Referral = Database["public"]["Tables"]["referrals"]["Row"] & {
  referrer?: Database["public"]["Tables"]["user_profiles"]["Row"];
  referee?: Database["public"]["Tables"]["user_profiles"]["Row"];
};

export default function ReferralsScreen() {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReferrals();
  }, []);

  const loadReferrals = async () => {
    try {
      const { data, error } = await supabase
        .from("referrals")
        .select("*, referrer:user_profiles!referrals_referrer_id_fkey(*), referee:user_profiles!referee_id_fkey(*)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setReferrals(data || []);
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

  const renderReferral = ({ item }: { item: Referral }) => (
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

      <Text style={styles.dateText}>
        {new Date(item.created_at).toLocaleDateString()}
      </Text>
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
        <Text style={styles.headerTitle}>Referral Rewards</Text>
        <TouchableOpacity onPress={loadReferrals} style={styles.refreshButton}>
          <Ionicons name="refresh" size={24} color="#6c4ef5" />
        </TouchableOpacity>
      </View>

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