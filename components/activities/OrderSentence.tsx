import { OrderSentenceActivity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  activity: OrderSentenceActivity;
  onComplete: (correct: boolean) => void;
}

export function OrderSentence({ activity, onComplete }: Props) {
  const [ordered, setOrdered] = useState<string[]>([]);
  const [available, setAvailable] = useState(activity.scrambled);
  const [showResult, setShowResult] = useState(false);

  const handleAddWord = (word: string) => {
    if (showResult) return;
    setOrdered([...ordered, word]);
    setAvailable(available.filter(w => w !== word || available.indexOf(w) !== available.lastIndexOf(w)));

    // Remove single occurrence
    const idx = available.indexOf(word);
    setAvailable([...available.slice(0, idx), ...available.slice(idx + 1)]);
  };

  const handleRemoveWord = (index: number) => {
    if (showResult) return;
    const word = ordered[index];
    setOrdered(ordered.filter((_, i) => i !== index));
    setAvailable([...available, word]);
  };

  const checkAnswer = () => {
    const isCorrect = JSON.stringify(ordered) === JSON.stringify(activity.correctOrder);
    setShowResult(true);
    setTimeout(() => {
      onComplete(isCorrect);
    }, 2000);
  };

  const isComplete = ordered.length === activity.correctOrder.length;

  return (
    <View className="flex-1 p-5">
      <View className="bg-white rounded-2xl p-5 mb-6 items-center shadow-sm">
        <Ionicons name="reorder-three" size={32} color="#6c4ef5" />
        <Text className="text-lg font-semibold text-[#001328] text-center mt-3">
          {activity.instruction}
        </Text>
        {activity.hint && (
          <Text className="text-sm text-gray-500 text-center mt-2">
            💡 {activity.hint}
          </Text>
        )}
      </View>

      {/* Ordered sentence area */}
      <View className="bg-gray-50 rounded-2xl p-4 mb-4 min-h-[80px]">
        {ordered.length === 0 ? (
          <Text className="text-base text-gray-400 text-center italic">
            Wähle Wörter aus, um den Satz zu bauen...
          </Text>
        ) : (
          <View className="flex-row flex-wrap gap-2">
            {ordered.map((word, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleRemoveWord(index)}
                className="px-4 py-2 bg-purple-500 rounded-full"
              >
                <Text className="text-sm font-semibold text-white">{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Available words */}
      <View className="flex-row flex-wrap gap-2 mb-6">
        {available.map((word, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleAddWord(word)}
            disabled={showResult}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full"
          >
            <Text className="text-base font-medium text-[#001328]">{word}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Check button */}
      {isComplete && !showResult && (
        <TouchableOpacity
          onPress={checkAnswer}
          className="bg-purple-500 rounded-xl py-4 items-center"
        >
          <Text className="text-base font-semibold text-white">
            Satz überprüfen
          </Text>
        </TouchableOpacity>
      )}

      {/* Result */}
      {showResult && (
        <View className="mt-6 items-center">
          <Ionicons
            name={JSON.stringify(ordered) === JSON.stringify(activity.correctOrder) ? "checkmark-circle" : "close-circle"}
            size={48}
            color={JSON.stringify(ordered) === JSON.stringify(activity.correctOrder) ? "#21c16b" : "#ff4d4f"}
          />
          <Text className={`text-lg font-semibold mt-3 ${
            JSON.stringify(ordered) === JSON.stringify(activity.correctOrder) ? "text-green-500" : "text-red-500"
          }`}>
            {JSON.stringify(ordered) === JSON.stringify(activity.correctOrder)
              ? "Perfekter Satz! ✨"
              : "Fast! Versuche es nochmal."}
          </Text>
          {JSON.stringify(ordered) !== JSON.stringify(activity.correctOrder) && (
            <Text className="text-sm text-gray-500 mt-2">
              Richtige Reihenfolge: {activity.correctOrder.join(" ")}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}