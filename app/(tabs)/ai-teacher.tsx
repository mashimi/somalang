import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { LESSONS } from "@/data/lessons";
import { LANGUAGES } from "@/data/languages";
import { posthog } from "@/lib/posthog";
import { useLanguageStore } from "@/store/languageStore";

export default function AITeacherScreen() {
  const router = useRouter();
  const { selectedLanguage } = useLanguageStore();

  useEffect(() => {
    posthog.capture("ai_teacher_viewed", { language_code: selectedLanguage });
  }, [selectedLanguage]);

  const activeLessons = LESSONS.filter((l) => l.id.startsWith(selectedLanguage ?? "de"));
  const language = LANGUAGES.find((l) => l.code === selectedLanguage);
  const languageName = language ? language.name : "German";

  const handleStartLesson = (lessonId: string) => {
    posthog.capture("ai_teacher_lesson_started", { lesson_id: lessonId });
    router.push(`/lesson/${lessonId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Voice Teacher</Text>
        <Text style={styles.headerSubtitle}>Practice your speaking skills</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Intro Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>Meet your AI Teacher</Text>
            <Text style={styles.heroDescription}>
              Have interactive voice conversations in {languageName}. Learn pronunciation and vocabulary in a friendly, low-pressure environment!
            </Text>
          </View>
          <Image
            source={images.mascotWelcome}
            contentFit="contain"
            style={styles.heroImage}
          />
        </View>

        <Text style={styles.sectionTitle}>Available Conversations</Text>

        {activeLessons.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={48} color={colors.neutral.textSecondary} />
            <Text style={styles.emptyText}>No lessons available for {languageName} yet.</Text>
          </View>
        ) : (
          <View style={styles.lessonList}>
            {activeLessons.map((lesson) => (
              <View key={lesson.id} style={styles.lessonCard}>
                <View style={styles.lessonIconContainer}>
                  <Text style={styles.lessonEmoji}>{lesson.icon || "🗣️"}</Text>
                </View>
                <View style={styles.lessonInfo}>
                  <View style={styles.badgeRow}>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelText}>{lesson.level}</Text>
                    </View>
                    <Text style={styles.durationText}>
                      ⏱️ {lesson.estimatedMinutes} mins
                    </Text>
                  </View>
                  <Text style={styles.lessonTitle}>{lesson.title}</Text>
                  <Text style={styles.lessonDescription} numberOfLines={2}>
                    {lesson.description}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => handleStartLesson(lesson.id)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="call" size={18} color="#fff" />
                  <Text style={styles.startButtonText}>Call</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#001328",
  },
  headerSubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    marginTop: 2,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  heroCard: {
    flexDirection: "row",
    backgroundColor: "#EDE9FE",
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  heroLeft: {
    flex: 1,
    paddingRight: 8,
  },
  heroTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: "#5b3bf6",
    marginBottom: 6,
  },
  heroDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#4c1d95",
    lineHeight: 18,
  },
  heroImage: {
    width: 90,
    height: 90,
  },
  sectionTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 16,
    color: "#001328",
    marginBottom: 14,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    gap: 12,
  },
  emptyText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  lessonList: {
    gap: 16,
  },
  lessonCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  lessonIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#f5f2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  lessonEmoji: {
    fontSize: 22,
  },
  lessonInfo: {
    flex: 1,
    marginRight: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  levelBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  levelText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 10,
    color: "#4f46e5",
  },
  durationText: {
    fontFamily: "Poppins-Regular",
    fontSize: 11,
    color: "#6b7280",
  },
  lessonTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#001328",
    marginBottom: 2,
  },
  lessonDescription: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  startButton: {
    backgroundColor: "#6c4ef5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  startButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 13,
    color: "#fff",
  },
});
