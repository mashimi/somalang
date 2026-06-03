import { DialogueActivity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
  activity: DialogueActivity;
  onComplete: (correct: boolean) => void;
}

export function DialogueComplete({ activity, onComplete }: Props) {
  // Map of blank-line index → chosen answer text.
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>(
    {},
  );
  // Index of the blank the user is currently answering.
  const [currentBlankIndex, setCurrentBlankIndex] = useState<number>(
    activity.lines.findIndex((line) => line.isBlank),
  );
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Pre-compute the list of blank line indices so we can navigate and
  // evaluate them deterministically.
  const blankIndices = activity.lines
    .map((line, idx) => (line.isBlank ? idx : -1))
    .filter((idx) => idx !== -1);

  const allAnswered = blankIndices.every(
    (idx) => selectedAnswers[idx] !== undefined,
  );

  const handleSelect = (answer: string) => {
    if (showResult) return;

    // Build the next answer map for the CURRENT blank. Use a function form
    // to avoid stale-state issues and to keep the value immediately
    // available for the completion check.
    const nextAnswers = { ...selectedAnswers, [currentBlankIndex]: answer };
    setSelectedAnswers(nextAnswers);

    // Find the next blank that hasn't been answered yet.
    const nextBlank = blankIndices.find(
      (idx) => idx > currentBlankIndex && nextAnswers[idx] === undefined,
    );

    if (nextBlank !== undefined) {
      setCurrentBlankIndex(nextBlank);
      return;
    }

    // No more blanks to fill — evaluate every answer against the
    // activity's correctAnswer for that line.
    const allCorrect = blankIndices.every((idx) => {
      const line = activity.lines[idx];
      return line?.correctAnswer
        ? nextAnswers[idx] === line.correctAnswer
        : true;
    });

    setIsCorrect(allCorrect);
    setShowResult(true);
    setTimeout(() => {
      onComplete(allCorrect);
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 p-5">
      <View className="bg-white rounded-2xl p-5 mb-6 items-center shadow-sm">
        <Ionicons name="chatbubble-ellipses" size={32} color="#6c4ef5" />
        <Text className="text-lg font-semibold text-[#001328] text-center mt-3">
          {activity.context}
        </Text>
        {allAnswered && (
          <Text className="text-sm text-gray-500 text-center mt-2">
            Umejaza majibu yote — bofya chaguo la mwisho kuangalia matokeo.
          </Text>
        )}
      </View>

      {/* Dialogue */}
      <View className="gap-4 mb-6">
        {activity.lines.map((line, index) => {
          const isBlank = line.isBlank;
          const chosen = isBlank ? selectedAnswers[index] : undefined;
          const isCurrent = isBlank && index === currentBlankIndex && !showResult;
          const lineIsCorrect =
            isBlank && line.correctAnswer
              ? chosen === line.correctAnswer
              : false;

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

              {isBlank ? (
                chosen ? (
                  <View
                    className={`p-3 rounded-xl ${
                      showResult && lineIsCorrect
                        ? "bg-green-100"
                        : showResult && !lineIsCorrect
                          ? "bg-red-100"
                          : "bg-purple-100"
                    }`}
                  >
                    <Text className="text-base font-medium text-[#001328]">
                      {chosen}
                    </Text>
                    {showResult && !lineIsCorrect && line.correctAnswer && (
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
                        <Text className="text-base font-medium text-[#001328]">
                          {option}
                        </Text>
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
          <Ionicons
            name={isCorrect ? "checkmark-circle" : "close-circle"}
            size={48}
            color={isCorrect ? "#21c16b" : "#ff4d4f"}
          />
          <Text
            className={`text-lg font-semibold mt-3 ${
              isCorrect ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCorrect
              ? "Gespräch abgeschlossen! 🎉"
              : "Fast! Soma mazungumzo tena."}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}
