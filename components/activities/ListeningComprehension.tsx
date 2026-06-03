import { ListeningComprehensionActivity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ListeningComprehensionProps {
  activity: ListeningComprehensionActivity;
  onComplete: (correct: boolean) => void;
  onSpeak: (text: string) => void;
}

export function ListeningComprehension({
  activity,
  onComplete,
  onSpeak,
}: ListeningComprehensionProps) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const currentQ = activity.questions[questionIndex];

  if (!currentQ) {
    return (
      <View style={styles.activityContainer}>
        <View style={styles.resultContainer}>
          <Ionicons name="checkmark-circle" size={64} color="#21c16b" />
          <Text style={[styles.resultText, styles.correctText]}>
            Alle Fragen beantwortet! 🎉
          </Text>
        </View>
      </View>
    );
  }

  const handleListeningAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === currentQ.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      if (questionIndex < activity.questions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else {
        onComplete(correct);
      }
    }, 1500);
  };

  return (
    <View style={styles.activityContainer}>
      <View style={styles.questionCard}>
        <Ionicons name="musical-notes" size={32} color="#6c4ef5" />
        <Text style={styles.questionText}>Höre zu und beantworte</Text>
        <TouchableOpacity
          style={[styles.speakButton, { marginTop: 16 }]}
          onPress={() => onSpeak(activity.transcript)}
        >
          <Ionicons name="play" size={28} color="#6c4ef5" />
        </TouchableOpacity>
      </View>

      <View style={styles.exerciseProgress}>
        <Text style={styles.progressText}>
          Frage {questionIndex + 1} von {activity.questions.length}
        </Text>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQ.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQ.options.map((option, index) => {
          const optIsSelected = selectedAnswer === option;
          const optIsCorrect = option === currentQ.correctAnswer;

          const optStyle: any[] = [styles.optionButton];
          if (showResult) {
            if (optIsCorrect) {
              optStyle.push(styles.optionCorrect);
            } else if (optIsSelected && !optIsCorrect) {
              optStyle.push(styles.optionWrong);
            }
          } else if (optIsSelected) {
            optStyle.push(styles.optionSelected);
          }

          return (
            <TouchableOpacity
              key={index}
              style={optStyle}
              onPress={() => !showResult && handleListeningAnswer(option)}
              disabled={showResult}
            >
              <Text
                style={[
                  styles.optionText,
                  showResult && optIsCorrect && styles.optionTextCorrect,
                ]}
              >
                {option}
              </Text>
              {showResult && optIsCorrect && (
                <Ionicons name="checkmark-circle" size={24} color="#21c16b" />
              )}
              {showResult && optIsSelected && !optIsCorrect && (
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={48}
            color={isCorrect ? "#21c16b" : "#ef4444"}
          />
          <Text
            style={[
              styles.resultText,
              isCorrect ? styles.correctText : styles.wrongText,
            ]}
          >
            {isCorrect
              ? "Richtig! 🎉"
              : `Die richtige Antwort ist: ${currentQ.correctAnswer}`}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  questionCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "#001328",
    textAlign: "center",
    marginTop: 12,
  },
  speakButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseProgress: {
    alignItems: "center",
    marginBottom: 16,
  },
  progressText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionSelected: {
    borderColor: "#6c4ef5",
    backgroundColor: "#f5f2ff",
  },
  optionCorrect: {
    borderColor: "#21c16b",
    backgroundColor: "#d1fae5",
  },
  optionWrong: {
    borderColor: "#ef4444",
    backgroundColor: "#fee2e2",
  },
  optionText: {
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    color: "#001328",
    flex: 1,
  },
  optionTextCorrect: {
    color: "#21c16b",
    fontWeight: "600",
  },
  resultContainer: {
    alignItems: "center",
    marginTop: 24,
    padding: 20,
  },
  resultText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    marginTop: 12,
  },
  correctText: {
    color: "#21c16b",
  },
  wrongText: {
    color: "#ef4444",
  },
});
