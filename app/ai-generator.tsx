import { supabase } from "@/lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
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

type Level = "A1" | "A2" | "B1" | "B2" | "C1";

const LEVELS: { value: Level; label: string; description: string }[] = [
  { value: "A1", label: "A1", description: "Mwanzishi" },
  { value: "A2", label: "A2", description: "Msingi" },
  { value: "B1", label: "B1", description: "Wastani" },
  { value: "B2", label: "B2", description: "Juuli" },
  { value: "C1", label: "C1", description: "Mahiri" },
];

const EXAMPLE_PROMPTS = [
  "Nataka kujifunza maneno ya duka la dawa",
  "Nifundishe kuomba kazi kwa Kijerumani",
  "Najitayarisha kwenda Ujerumani, nifundishe maneno ya uwanja wa ndege",
  "Nataka kujifunza maneno ya upishi na vyakula",
  "Nifundishe kuzungumza na daktari",
];

export default function AIGeneratorScreen() {
  const [userPrompt, setUserPrompt] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<Level>("A1");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!userPrompt.trim()) {
      Alert.alert("Tafadhali andika", "Andika unachotaka kujifunza");
      return;
    }

    setIsGenerating(true);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        Alert.alert("Hitilafu", "Tafadhali ingia kwanza");
        return;
      }

      // Check if user is premium
      const { data: profile } = await supabase
        .from("user_profiles")
        .select("premium_until")
        .eq("id", user.id)
        .single();

      const isPremium =
        profile?.premium_until && new Date(profile.premium_until) > new Date();

      // Call the API
      const response = await fetch("/api/generate-lesson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userPrompt: userPrompt.trim(),
          level: selectedLevel,
          userId: user.id,
          isPremium,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          Alert.alert(
            "Kikomo cha Wiki",
            data.message ||
              "Umefikia kikomo cha masomo ya bure kwa wiki hii. Boresha akaunti yako ya Premium!",
            [
              { text: "Sawa", style: "cancel" },
              { text: "Boresha", onPress: () => router.push("/payment") },
            ]
          );
        } else {
          Alert.alert("Hitilafu", data.error || "Imeshindikana kutengeneza somo");
        }
        return;
      }

      // Navigate to the generated lesson
      router.push({
        pathname: "/lesson/[id]",
        params: {
          id: data.id,
          lessonData: JSON.stringify(data),
          isAIGenerated: "true",
        },
      });
    } catch (error) {
      console.error("[AI Generator] Error:", error);
      Alert.alert(
        "Hitilafu",
        "Imeshindikana kuwasiliana na seva. Tafadhali jaribu tena."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExamplePrompt = (prompt: string) => {
    setUserPrompt(prompt);
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
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#001328" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Tengeneza Somo la AI</Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.heroIcon}>
              <Ionicons name="sparkles" size={48} color="#6c4ef5" />
            </View>
            <Text style={styles.heroTitle}>
              Jifunze Kijerumani Kulingana na Mahitaji Yako
            </Text>
            <Text style={styles.heroSubtitle}>
              Andika unachotaka kujifunza, na AI itatengeneza somo maalum kwako
            </Text>
          </View>

          {/* Prompt Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Unataka kujifunza nini?
            </Text>
            <TextInput
              value={userPrompt}
              onChangeText={setUserPrompt}
              placeholder="Mfano: Nataka kujifunza maneno ya hospitali..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              style={styles.promptInput}
              editable={!isGenerating}
            />
          </View>

          {/* Example Prompts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Mifano ya Masomo:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.examplesContainer}
            >
              {EXAMPLE_PROMPTS.map((prompt, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.exampleChip}
                  onPress={() => handleExamplePrompt(prompt)}
                  disabled={isGenerating}
                >
                  <Text style={styles.exampleChipText}>{prompt}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Level Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Chagua Kiwango:</Text>
            <View style={styles.levelGrid}>
              {LEVELS.map((level) => (
                <TouchableOpacity
                  key={level.value}
                  style={[
                    styles.levelCard,
                    selectedLevel === level.value && styles.levelCardSelected,
                  ]}
                  onPress={() => setSelectedLevel(level.value)}
                  disabled={isGenerating}
                >
                  <Text
                    style={[
                      styles.levelLabel,
                      selectedLevel === level.value &&
                        styles.levelLabelSelected,
                    ]}
                  >
                    {level.label}
                  </Text>
                  <Text
                    style={[
                      styles.levelDescription,
                      selectedLevel === level.value &&
                        styles.levelDescriptionSelected,
                    ]}
                  >
                    {level.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={[
              styles.generateButton,
              (!userPrompt.trim() || isGenerating) &&
                styles.generateButtonDisabled,
            ]}
            onPress={handleGenerate}
            disabled={!userPrompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.generateButtonText}>
                  Inatengeneza somo...
                </Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Ionicons name="sparkles" size={20} color="#fff" />
                <Text style={styles.generateButtonText}>Tengeneza Somo</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color="#4D88FF" />
            <Text style={styles.infoText}>
              Watumiaji wa bure wanaweza kutengeneza somo 1 kwa wiki.{"\n"}
              Watumiaji wa Premium wanapata masomo yasiyo na kikomo!
            </Text>
          </View>

          {/* Premium Upsell */}
          <TouchableOpacity
            style={styles.premiumUpsell}
            onPress={() => router.push("/payment")}
          >
            <Ionicons name="diamond" size={24} color="#FFD700" />
            <View style={styles.premiumUpsellText}>
              <Text style={styles.premiumUpsellTitle}>
                Boresha kwa Premium
              </Text>
              <Text style={styles.premiumUpsellSubtitle}>
                Pata masomo yasiyo na kikomo ya AI
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6b7280" />
          </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#001328",
  },
  heroSection: {
    backgroundColor: "#f5f2ff",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: "#6c4ef5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  heroTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#001328",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#001328",
    marginBottom: 12,
  },
  promptInput: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#001328",
    minHeight: 120,
    textAlignVertical: "top",
  },
  examplesContainer: {
    gap: 8,
  },
  exampleChip: {
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
  },
  exampleChipText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#4b5563",
  },
  levelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  levelCard: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  levelCardSelected: {
    borderColor: "#6c4ef5",
    backgroundColor: "#f5f2ff",
  },
  levelLabel: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    color: "#6b7280",
    marginBottom: 4,
  },
  levelLabelSelected: {
    color: "#6c4ef5",
  },
  levelDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#9ca3af",
  },
  levelDescriptionSelected: {
    color: "#6c4ef5",
  },
  generateButton: {
    backgroundColor: "#6c4ef5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#6c4ef5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  generateButtonDisabled: {
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  generateButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  infoBox: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 16,
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#1e40af",
    flex: 1,
    lineHeight: 18,
  },
  premiumUpsell: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fbbf24",
    gap: 12,
  },
  premiumUpsellText: {
    flex: 1,
  },
  premiumUpsellTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#001328",
    marginBottom: 2,
  },
  premiumUpsellSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
  },
});