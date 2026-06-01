import { Activity } from "@/types/learning";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ActivityRendererProps {
  activity: Activity;
  onComplete: (correct: boolean) => void;
  onSpeak: (text: string) => void;
}

export function ActivityRenderer({
  activity,
  onComplete,
  onSpeak,
}: ActivityRendererProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === activity.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onComplete(correct);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  const renderMultipleChoice = () => (
    <View style={styles.activityContainer}>
      <View style={styles.questionCard}>
        <Ionicons name="help-circle" size={32} color="#6c4ef5" />
        <Text style={styles.questionText}>{activity.question}</Text>
        {activity.hint && (
          <Text style={styles.hintText}>💡 {activity.hint}</Text>
        )}
      </View>

      <View style={styles.optionsContainer}>
        {activity.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === activity.correctAnswer;

          let optionStyle = [styles.optionButton];
          if (showResult) {
            if (isCorrectAnswer) {
              optionStyle.push(styles.optionCorrect);
            } else if (isSelected && !isCorrectAnswer) {
              optionStyle.push(styles.optionWrong);
            }
          } else if (isSelected) {
            optionStyle.push(styles.optionSelected);
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => !showResult && handleAnswer(option)}
              disabled={showResult}
            >
              <Text
                style={[
                  styles.optionText,
                  showResult && isCorrectAnswer && styles.optionTextCorrect,
                ]}
              >
                {option}
              </Text>
              {showResult && isCorrectAnswer && (
                <Ionicons name="checkmark-circle" size={24} color="#21c16b" />
              )}
              {showResult && isSelected && !isCorrectAnswer && (
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
          <Text style={[styles.resultText, isCorrect ? styles.correctText : styles.wrongText]}>
            {isCorrect ? "Richtig! 🎉" : "Nicht ganz. Versuche es nochmal!"}
          </Text>
        </View>
      )}
    </View>
  );

  const renderFlashcard = () => (
    <View style={styles.activityContainer}>
      <View style={styles.flashcard}>
        <Text style={styles.flashcardQuestion}>{activity.question}</Text>
        <TouchableOpacity
          style={styles.speakButton}
          onPress={() => onSpeak(activity.question)}
        >
          <Ionicons name="volume-high" size={24} color="#6c4ef5" />
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        {activity.options?.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === activity.correctAnswer;

          let optionStyle = [styles.optionButton];
          if (showResult) {
            if (isCorrectAnswer) {
              optionStyle.push(styles.optionCorrect);
            } else if (isSelected && !isCorrectAnswer) {
              optionStyle.push(styles.optionWrong);
            }
          } else if (isSelected) {
            optionStyle.push(styles.optionSelected);
          }

          return (
            <TouchableOpacity
              key={index}
              style={optionStyle}
              onPress={() => !showResult && handleAnswer(option)}
              disabled={showResult}
            >
              <Text
                style={[
                  styles.optionText,
                  showResult && isCorrectAnswer && styles.optionTextCorrect,
                ]}
              >
                {option}
              </Text>
              {showResult && isCorrectAnswer && (
                <Ionicons name="checkmark-circle" size={24} color="#21c16b" />
              )}
              {showResult && isSelected && !isCorrectAnswer && (
                <Ionicons name="close-circle" size={24} color="#ef4444" />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {showResult && (
        <View style={styles.resultContainer}>
          <Text style={[styles.resultText, isCorrect ? styles.correctText : styles.wrongText]}>
            {isCorrect ? "Perfekt! ✨" : `Die richtige Antwort ist: ${activity.correctAnswer}`}
          </Text>
        </View>
      )}
    </View>
  );

  const renderTranslate = () => (
    <View style={styles.activityContainer}>
      <View style={styles.questionCard}>
        <Ionicons name="swap-horizontal" size={32} color="#6c4ef5" />
        <Text style={styles.questionText}>{activity.question}</Text>
        {activity.hint && (
          <Text style={styles.hintText}>💡 {activity.hint}</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.speakButtonLarge}
        onPress={() => onSpeak(activity.correctAnswer)}
      >
        <Ionicons name="volume-high" size={32} color="#fff" />
        <Text style={styles.speakButtonText}>Höre die Antwort</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Sprich die Antwort laut aus oder denke sie dir. Der AI-Lehrer wird dir Feedback geben!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.confirmTranslateButton}
        onPress={() => onComplete(true)}
      >
        <Text style={styles.confirmTranslateButtonText}>Weiter</Text>
      </TouchableOpacity>
    </View>
  );

  const renderListen = () => (
    <View style={styles.activityContainer}>
      <View style={styles.questionCard}>
        <Ionicons name="ear" size={32} color="#6c4ef5" />
        <Text style={styles.questionText}>{activity.question}</Text>
      </View>

      <TouchableOpacity
        style={styles.speakButtonLarge}
        onPress={() => onSpeak(activity.correctAnswer)}
      >
        <Ionicons name="play" size={32} color="#fff" />
        <Text style={styles.speakButtonText}>Nochmal anhören</Text>
      </TouchableOpacity>

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          Wiederhole den Satz laut. Der AI-Lehrer bewertet deine Aussprache!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.confirmTranslateButton}
        onPress={() => onComplete(true)}
      >
        <Text style={styles.confirmTranslateButtonText}>Weiter</Text>
      </TouchableOpacity>
    </View>
  );

  switch (activity.type) {
    case "multiple-choice":
      return renderMultipleChoice();
    case "flashcard":
      return renderFlashcard();
    case "translate":
      return renderTranslate();
    case "listen":
      return renderListen();
    default:
      return null;
  }
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
  hintText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 8,
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
  flashcard: {
    backgroundColor: "#6c4ef5",
    borderRadius: 24,
    padding: 36,
    marginBottom: 24,
    alignItems: "center",
    shadowColor: "#6c4ef5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  flashcardQuestion: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
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
  speakButtonLarge: {
    backgroundColor: "#6c4ef5",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginBottom: 24,
    shadowColor: "#6c4ef5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  speakButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 24,
  },
  infoText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    lineHeight: 22,
  },
  confirmTranslateButton: {
    backgroundColor: "#6c4ef5",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  confirmTranslateButtonText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
  },
});
