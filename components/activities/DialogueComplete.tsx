import { DialogueActivity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  activity: DialogueActivity;
  onComplete: (correct: boolean) => void;
}

export function DialogueComplete({ activity, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(
    activity.lines.findIndex(line => line.isBlank)
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (answer: string) => {
    if (showResult) return;

    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: answer });

    // Move to next blank or finish
    const nextBlank = activity.lines.findIndex(
      (line, i) => i > currentIndex && line.isBlank
    );

    if (nextBlank !== -1) {
      setCurrentIndex(nextBlank);
    } else {
      // Check all answers
      const allCorrect = activity.lines
        .filter(line => line.isBlank && line.correctAnswer)
        .every(line => selectedAnswers[activity.lines.indexOf(line)] === line.correctAnswer);

      setShowResult(true);
      setTimeout(() => {
        onComplete(allCorrect);
      }, 2000);
    }
  };

  return (
    <ScrollView className="flex-1 p-5">
      <View className="bg-white rounded-2xl p-5 mb-6 items-center shadow-sm">
        <Ionicons name="chatbubble-ellipses" size={32} color="#6c4ef5" />
        <Text className="text-lg font-semibold text-[#001328] text-center mt-3">
          {activity.context}
        </Text>
      </View>

      {/* Dialogue */}
      <View className="gap-4 mb-6">
        {activity.lines.map((line, index) => {
          const isSelected = selectedAnswers[index];
          const isCurrent = index === currentIndex && line.isBlank;
          const isCorrect = line.correctAnswer && isSelected === line.correctAnswer;

          return (
            <View
              key={index}
              className={`p-4 rounded-2xl ${
                line.speaker === "ai" ? "bg-purple-50 ml-8" : "bg-white mr-8"
              }`}
            >
              <Text className="text-xs font-medium text-gray-500 mb-1 uppercase">
                {line.speaker === "ai" ? "🤖 Lehrer" : "👤 Du"}
              </Text>

              {line.isBlank ? (
                isSelected ? (
                  <View className={`p-3 rounded-xl ${
                    showResult && isCorrect ? "bg-green-100" :
                    showResult && !isCorrect ? "bg-red-100" :
                    "bg-purple-100"
                  }`}>
                    <Text className="text-base font-medium text-[#001328]">{isSelected}</Text>
                    {showResult && !isCorrect && line.correctAnswer && (
                      <Text className="text-sm text-green-600 mt-1">
                        ✓ {line.correctAnswer}
                      </Text>
                    )}
                  </View>
                ) : isCurrent && line.options ? (
                  <View className="gap-2">
                    {line.options.map((option, optIndex) => (
                      <TouchableOpacity
                        key={optIndex}
                        onPress={() => handleSelect(option)}
                        className="p-3 bg-white border-2 border-gray-200 rounded-xl"
                      >
                        <Text className="text-base font-medium text-[#001328]">{option}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <View className="p-3 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
                    <Text className="text-base text-gray-400 italic">
                      Wähle eine Antwort...
                    </Text>
                  </View>
                )
              ) : (
                <Text className="text-base text-[#001328]">{line.text}</Text>
              )}
            </View>
          );
        })}
      </View>

      {showResult && (
        <View className="items-center mt-6 mb-8">
          <Ionicons name="checkmark-circle" size={48} color="#21c16b" />
          <Text className="text-lg font-semibold text-green-500 mt-3">
            Gespräch abgeschlossen! 🎉
          </Text>
        </View>
      )}
    </ScrollView>
  );
}