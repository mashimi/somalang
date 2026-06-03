import { Activity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DialogueComplete } from "./activities/DialogueComplete";
import { MatchPairs } from "./activities/MatchPairs";
import { OrderSentence } from "./activities/OrderSentence";
import { ListeningComprehension } from "./activities/ListeningComprehension";

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

  // For fill-blank and grammar-drill
  const [currentExercise, setCurrentExercise] = useState(0);

  // Handle activities that have their own dedicated components
  if (activity.type === "match") {
    return <MatchPairs activity={activity} onComplete={onComplete} />;
  }

  if (activity.type === "order-sentence") {
    return <OrderSentence activity={activity} onComplete={onComplete} />;
  }

  if (activity.type === "dialogue") {
    return <DialogueComplete activity={activity} onComplete={onComplete} />;
  }

  if (activity.type === "listening-comprehension") {
    return (
      <ListeningComprehension
        activity={activity}
        onComplete={onComplete}
        onSpeak={onSpeak}
      />
    );
  }

  // Generic answer handler for activities with correctAnswer + options
  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === (activity as any).correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onComplete(correct);
      setSelectedAnswer(null);
      setShowResult(false);
    }, 2000);
  };

  const renderOptions = (options: string[], correctAnswer: string) => (
    <View style={styles.optionsContainer}>
      {options.map((option, index) => {
        const isSelected = selectedAnswer === option;
        const isCorrectAnswer = option === correctAnswer;

        let optionStyle: any[] = [styles.optionButton];
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
  );

  const renderResult = () => (
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
          : "Nicht ganz. Versuche es nochmal!"}
      </Text>
    </View>
  );

  switch (activity.type) {
    case "multiple-choice": {
      const a = activity;
      return (
        <View style={styles.activityContainer}>
          <View style={styles.questionCard}>
            <Ionicons name="help-circle" size={32} color="#6c4ef5" />
            <Text style={styles.questionText}>{a.question}</Text>
            {a.hint && <Text style={styles.hintText}>💡 {a.hint}</Text>}
          </View>
          {a.options && renderOptions(a.options, a.correctAnswer)}
          {showResult && renderResult()}
        </View>
      );
    }

    case "flashcard": {
      const a = activity;
      return (
        <View style={styles.activityContainer}>
          <View style={styles.flashcard}>
            <Text style={styles.flashcardQuestion}>
              {a.front || a.question}
            </Text>
            <TouchableOpacity
              style={styles.speakButton}
              onPress={() => onSpeak(a.front || a.question)}
            >
              <Ionicons name="volume-high" size={24} color="#6c4ef5" />
            </TouchableOpacity>
          </View>

          {a.example && (
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>{a.example}</Text>
            </View>
          )}

          {a.options ? (
            renderOptions(a.options, a.correctAnswer)
          ) : (
            <>
              <View style={styles.infoBox}>
                <Text style={styles.infoText}>
                  Sieh dir die Karte an. Tippe auf &quot;Weiter&quot; um fortzufahren.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.confirmTranslateButton}
                onPress={() => onComplete(true)}
              >
                <Text style={styles.confirmTranslateButtonText}>Weiter</Text>
              </TouchableOpacity>
            </>
          )}

          {showResult && (
            <View style={styles.resultContainer}>
              <Text
                style={[
                  styles.resultText,
                  isCorrect ? styles.correctText : styles.wrongText,
                ]}
              >
                {isCorrect
                  ? "Perfekt! ✨"
                  : `Die richtige Antwort ist: ${a.back || a.correctAnswer}`}
              </Text>
            </View>
          )}
        </View>
      );
    }

    case "translate": {
      const a = activity;
      return (
        <View style={styles.activityContainer}>
          <View style={styles.questionCard}>
            <Ionicons name="swap-horizontal" size={32} color="#6c4ef5" />
            <Text style={styles.questionText}>{a.question}</Text>
            {a.hint && <Text style={styles.hintText}>💡 {a.hint}</Text>}
          </View>

          <TouchableOpacity
            style={styles.speakButtonLarge}
            onPress={() => onSpeak(a.correctAnswer)}
          >
            <Ionicons name="volume-high" size={32} color="#fff" />
            <Text style={styles.speakButtonText}>Höre die Antwort</Text>
          </TouchableOpacity>

          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Sprich die Antwort laut aus oder denke sie dir. Der AI-Lehrer wird
              dir Feedback geben!
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
    }

    case "listen": {
      const a = activity;
      return (
        <View style={styles.activityContainer}>
          <View style={styles.questionCard}>
            <Ionicons name="ear" size={32} color="#6c4ef5" />
            <Text style={styles.questionText}>{a.question}</Text>
          </View>

          <TouchableOpacity
            style={styles.speakButtonLarge}
            onPress={() => onSpeak(a.correctAnswer)}
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
    }

    case "fill-blank": {
      const a = activity;
      return (
        <View style={styles.activityContainer}>
          <View style={styles.questionCard}>
            <Ionicons name="text" size={32} color="#6c4ef5" />
            <Text style={styles.questionText}>
              {a.sentence.replace(a.blank, "___")}
            </Text>
            {a.hint && <Text style={styles.hintText}>💡 {a.hint}</Text>}
          </View>
          {a.options && renderOptions(a.options, a.correctAnswer)}
          {showResult && renderResult()}
        </View>
      );
    }

    case "grammar-drill": {
      const a = activity;
      const exercise = a.exercises[currentExercise];
      if (!exercise) return null;

      const hasOptions = exercise.options && exercise.options.length > 0;

      const handleDrillAnswer = (answer: string) => {
        const correct = answer === exercise.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        setTimeout(() => {
          setShowResult(false);
          setSelectedAnswer(null);
          if (currentExercise < a.exercises.length - 1) {
            setCurrentExercise(currentExercise + 1);
          } else {
            onComplete(correct);
            setCurrentExercise(0);
          }
        }, 1500);
      };

      return (
        <View style={styles.activityContainer}>
          <View style={styles.questionCard}>
            <Ionicons name="book" size={32} color="#6c4ef5" />
            <Text style={styles.grammarRuleText}>{a.rule}</Text>
            <View style={styles.examplesBox}>
              {a.examples.map((ex, i) => (
                <Text key={i} style={styles.exampleItem}>
                  {ex}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.exerciseProgress}>
            <Text style={styles.progressText}>
              Übung {currentExercise + 1} von {a.exercises.length}
            </Text>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>{exercise.prompt}</Text>
            {exercise.hint && (
              <Text style={styles.hintText}>💡 {exercise.hint}</Text>
            )}
          </View>

          {hasOptions
            ? (() => {
                const opts = exercise.options!;
                return (
                  <View style={styles.optionsContainer}>
                    {opts.map((option, index) => {
                      const optIsSelected = selectedAnswer === option;
                      const optIsCorrect = option === exercise.correctAnswer;

                      let optStyle: any[] = [styles.optionButton];
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
                          onPress={() =>
                            !showResult && handleDrillAnswer(option)
                          }
                          disabled={showResult}
                        >
                          <Text
                            style={[
                              styles.optionText,
                              showResult &&
                                optIsCorrect &&
                                styles.optionTextCorrect,
                            ]}
                          >
                            {option}
                          </Text>
                          {showResult && optIsCorrect && (
                            <Ionicons
                              name="checkmark-circle"
                              size={24}
                              color="#21c16b"
                            />
                          )}
                          {showResult && optIsSelected && !optIsCorrect && (
                            <Ionicons
                              name="close-circle"
                              size={24}
                              color="#ef4444"
                            />
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })()
            : (
              <TouchableOpacity
                style={styles.confirmTranslateButton}
                onPress={() => handleDrillAnswer(exercise.correctAnswer)}
              >
                <Text style={styles.confirmTranslateButtonText}>Prüfen</Text>
              </TouchableOpacity>
            )}

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
                  ? "Korrekt! 🎉"
                  : `Richtig ist: ${exercise.correctAnswer}`}
              </Text>
            </View>
          )}
        </View>
      );
    }

    default:
      return (
        <View style={styles.activityContainer}>
          <View style={styles.questionCard}>
            <Ionicons name="construct" size={32} color="#6c4ef5" />
            <Text style={styles.questionText}>
              Activity type &quot;{activity.type}&quot; is being built
            </Text>
            <Text style={styles.hintText}>Coming soon!</Text>
          </View>
          <TouchableOpacity
            style={styles.confirmTranslateButton}
            onPress={() => onComplete(true)}
          >
            <Text style={styles.confirmTranslateButtonText}>Weiter</Text>
          </TouchableOpacity>
        </View>
      );
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
  grammarRuleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#4b5563",
    textAlign: "center",
    marginTop: 12,
    lineHeight: 22,
  },
  examplesBox: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f5f2ff",
    borderRadius: 12,
    width: "100%",
  },
  exampleItem: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#6c4ef5",
    textAlign: "center",
    marginVertical: 2,
  },
  exampleBox: {
    backgroundColor: "#f5f2ff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#e4d9ff",
  },
  exampleText: {
    fontFamily: "Poppins-Medium",
    fontSize: 14,
    color: "#6c4ef5",
    textAlign: "center",
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
});