import { ScreenHeader } from "@/components/ScreenHeader";
import { useLearningStore } from "@/store/learningStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Quality = 1 | 2 | 3 | 4 | 5;

export default function ReviewScreen() {
  const { getDueVocabulary, reviewVocabulary, addXP, vocabularySRS } = useLearningStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const dueVocab = getDueVocabulary();
  const currentCard = dueVocab[currentIndex];
  const isFinished = currentIndex >= dueVocab.length;

  const handleReview = (quality: Quality) => {
    if (!currentCard) return;

    reviewVocabulary(currentCard.word, quality);

    if (quality >= 3) {
      addXP(5);
    }

    setShowAnswer(false);
    setCurrentIndex(currentIndex + 1);
  };

  if (isFinished) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.emptyContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#21c16b" />
          <Text style={styles.emptyTitle}>Hongera! 🎉</Text>
          <Text style={styles.emptySubtitle}>
            Huna maneno ya kukariri kwa sasa. Rudi baadaye!
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/")}
          >
            <Text style={styles.backButtonText}>Rudi Nyumbani</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentCard && vocabularySRS.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.emptyContainer}>
          <Ionicons name="book" size={80} color="#6c4ef5" />
          <Text style={styles.emptyTitle}>Hakuna Maneno</Text>
          <Text style={styles.emptySubtitle}>
            Anza masomo ili kuongeza maneno kwenye orodha yako ya kukariri.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.push("/")}
          >
            <Text style={styles.backButtonText}>Rudi Nyumbani</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f7fb" }}>
      <ScreenHeader title="Kukariri Maneno" />

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentIndex / dueVocab.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentIndex + 1} / {dueVocab.length}
        </Text>
      </View>

      {/* Flashcard */}
      <View style={styles.cardContainer}>
        <View style={styles.flashcard}>
          <Text style={styles.germanWord}>{currentCard.word}</Text>
          {currentCard.pronunciation && (
            <Text style={styles.pronunciation}>
              [{currentCard.pronunciation}]
            </Text>
          )}

          {showAnswer ? (
            <View style={styles.answerContainer}>
              <View style={styles.divider} />
              <Text style={styles.swahiliTranslation}>
                {currentCard.translation}
              </Text>
              {currentCard.example && (
                <Text style={styles.exampleText}>{currentCard.example}</Text>
              )}
            </View>
          ) : (
            <TouchableOpacity
              style={styles.showAnswerButton}
              onPress={() => setShowAnswer(true)}
            >
              <Text style={styles.showAnswerText}>Onyesha Jibu</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Rating Buttons */}
      {showAnswer && (
        <View style={styles.ratingContainer}>
          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingAgain]}
            onPress={() => handleReview(1)}
          >
            <Text style={styles.ratingText}>Tena</Text>
            <Text style={styles.ratingSubtext}>{'<'} 1m</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingHard]}
            onPress={() => handleReview(2)}
          >
            <Text style={styles.ratingText}>Ngumu</Text>
            <Text style={styles.ratingSubtext}>2d</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingGood]}
            onPress={() => handleReview(3)}
          >
            <Text style={styles.ratingText}>Sawa</Text>
            <Text style={styles.ratingSubtext}>4d</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.ratingButton, styles.ratingEasy]}
            onPress={() => handleReview(5)}
          >
            <Text style={styles.ratingText}>Rahisi</Text>
            <Text style={styles.ratingSubtext}>7d</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#001328",
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6c4ef5",
    borderRadius: 4,
  },
  progressText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#6b7280",
    minWidth: 40,
    textAlign: "right",
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  flashcard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  germanWord: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#001328",
    textAlign: "center",
    marginBottom: 8,
  },
  pronunciation: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  answerContainer: {
    width: "100%",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e5e7eb",
    marginBottom: 24,
  },
  swahiliTranslation: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: "#21c16b",
    textAlign: "center",
    marginBottom: 12,
  },
  exampleText: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    fontStyle: "italic",
  },
  showAnswerButton: {
    backgroundColor: "#6c4ef5",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 32,
  },
  showAnswerText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 32,
    gap: 8,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  ratingAgain: {
    backgroundColor: "#fee2e2",
  },
  ratingHard: {
    backgroundColor: "#fef3c7",
  },
  ratingGood: {
    backgroundColor: "#d1fae5",
  },
  ratingEasy: {
    backgroundColor: "#dbeafe",
  },
  ratingText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#001328",
    marginBottom: 4,
  },
  ratingSubtext: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#6b7280",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#001328",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: "#6c4ef5",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
  },
  backButtonText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    color: "#fff",
  },
});