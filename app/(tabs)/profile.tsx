import { useAuth } from "@/hooks/useAuth";
import { supabase, type Database } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type UserProfile = Database["public"]["Tables"]["user_profiles"]["Row"];

export default function ProfileScreen() {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    } else {
      setLoading(false);
    }
  }, [user?.id]);

  const loadProfile = async () => {
    if (!user?.id) return;

    try {
      const { data } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setProfile(data);
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const isPremium =
    profile?.premium_until && new Date(profile.premium_until) > new Date();

  const copyReferralCode = async () => {
    if (profile?.referral_code) {
      await Clipboard.setStringAsync(profile.referral_code);
      Alert.alert("Copied!", "Referral code copied to clipboard");
    }
  };

  const handleSignOut = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          router.replace("/");
        },
      },
    ]);
  };

  // Derive display info from Supabase user
  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.phone ||
    user?.email ||
    "Learner";

  const avatarLetter = displayName?.[0]?.toUpperCase() || "U";

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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Info */}
        <View style={styles.userCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>

          <Text style={styles.userName}>{displayName}</Text>

          <Text style={styles.userEmail}>
            {profile?.phone || user?.phone || user?.email || ""}
          </Text>

          {isPremium && (
            <View style={styles.premiumBadge}>
              <Ionicons name="diamond" size={14} color="#FFD700" />
              <Text style={styles.premiumBadgeText}>Premium</Text>
            </View>
          )}
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{profile?.xp_balance || 0}</Text>
            <Text style={styles.statLabel}>Total XP</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              {isPremium
                ? Math.ceil(
                    (new Date(profile!.premium_until!).getTime() -
                      Date.now()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 0}
            </Text>
            <Text style={styles.statLabel}>Days Left</Text>
          </View>
        </View>

        {/* Premium Status */}
        <TouchableOpacity
          style={styles.subscriptionCard}
          onPress={() => router.push("/subscription")}
          activeOpacity={0.8}
        >
          <View style={styles.subscriptionLeft}>
            <View
              style={[
                styles.subscriptionIcon,
                {
                  backgroundColor: isPremium ? "#FEF3C7" : "#F3F4F6",
                },
              ]}
            >
              <Ionicons
                name={isPremium ? "diamond" : "diamond-outline"}
                size={24}
                color={isPremium ? "#D97706" : "#6B7280"}
              />
            </View>
            <View>
              <Text style={styles.subscriptionTitle}>
                {isPremium ? "Premium Active" : "Upgrade to Premium"}
              </Text>
              <Text style={styles.subscriptionSubtitle}>
                {isPremium
                  ? `Expires ${new Date(profile!.premium_until!).toLocaleDateString()}`
                  : "Unlock all features"}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Referral Card */}
        {profile?.referral_code && (
          <View style={styles.referralCard}>
            <Text style={styles.referralTitle}>Your Referral Code</Text>
            <Text style={styles.referralSubtitle}>
              Share with friends and earn 500 XP each!
            </Text>

            <TouchableOpacity
              style={styles.referralCodeBox}
              onPress={copyReferralCode}
              activeOpacity={0.7}
            >
              <Text style={styles.referralCode}>{profile.referral_code}</Text>
              <Ionicons name="copy" size={20} color="#6c4ef5" />
            </TouchableOpacity>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/payment")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="card" size={22} color="#6c4ef5" />
              <Text style={styles.menuItemText}>Make a Payment</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/payment-history")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="receipt" size={22} color="#6c4ef5" />
              <Text style={styles.menuItemText}>Payment History</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="settings" size={22} color="#6c4ef5" />
              <Text style={styles.menuItemText}>Settings</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle" size={22} color="#6c4ef5" />
              <Text style={styles.menuItemText}>Help & Support</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Version */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  userCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6c4ef5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    color: "#fff",
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#001328",
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  premiumBadgeText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 12,
    color: "#D97706",
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
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
  subscriptionCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  subscriptionLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subscriptionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  subscriptionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#001328",
  },
  subscriptionSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  referralCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  referralTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#001328",
    marginBottom: 4,
  },
  referralSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 12,
  },
  referralCodeBox: {
    backgroundColor: "#F5F2FF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: "#6c4ef5",
    borderStyle: "dashed",
  },
  referralCode: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#6c4ef5",
    letterSpacing: 2,
  },
  menuCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#001328",
    marginLeft: 12,
  },
  menuDivider: {
    height: 1,
    backgroundColor: "#f3f4f6",
    marginHorizontal: 16,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
    marginBottom: 16,
  },
  signOutText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#EF4444",
  },
  versionText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "center",
  },
});