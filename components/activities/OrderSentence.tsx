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
  const [available, setAvailable] = useState<string[]>(activity.scrambled);
  const [showResult, setShowResult] = useState(false);

  // Add a word to the ordered sentence. Removes a single occurrence of the
  // word from the `available` bank so that each tile can be used at most once.
  const handleAddWord = (word: string) => {
    if (showResult) return;
    setOrdered((prev) => [...prev, word]);
    setAvailable((prev) => {
      const idx = prev.indexOf(word);
      if (idx === -1) return prev;
      return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
    });
  };

  // Remove a word from the ordered sentence and put a single occurrence
  // back into the `available` bank.
  const handleRemoveWord = (index: number) => {
    if (showResult) return;
    setOrdered((prev) => {
      const word = prev[index];
      if (word === undefined) return prev;
      setAvailable((bank) => [...bank, word]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const checkAnswer = () => {
    const isCorrect =
      JSON.stringify(ordered) === JSON.stringify(activity.correctOrder);
    setShowResult(true);
    setTimeout(() => {
      onComplete(isCorrect);
    }, 2000);
  };

  const isComplete = ordered.length === activity.correctOrder.length;
  const isCorrectResult =
    JSON.stringify(ordered) === JSON.stringify(activity.correctOrder);

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
                key={`${word}-${index}`}
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
        {available.length === 0 ? (
          <Text className="text-sm text-gray-400 italic">
            Maneno yote yamechaguliwa
          </Text>
        ) : (
          available.map((word, index) => (
            <TouchableOpacity
              key={`${word}-${index}`}
              onPress={() => handleAddWord(word)}
              disabled={showResult}
              className="px-4 py-2 bg-white border-2 border-gray-200 rounded-full"
            >
              <Text className="text-base font-medium text-[#001328]">{word}</Text>
            </TouchableOpacity>
          ))
        )}
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
            name={isCorrectResult ? "checkmark-circle" : "close-circle"}
            size={48}
            color={isCorrectResult ? "#21c16b" : "#ff4d4f"}
          />
          <Text
            className={`text-lg font-semibold mt-3 ${
              isCorrectResult ? "text-green-500" : "text-red-500"
            }`}
          >
            {isCorrectResult
              ? "Perfekter Satz! ✨"
              : "Fast! Versuche es nochmal."}
          </Text>
          {!isCorrectResult && (
            <Text className="text-sm text-gray-500 mt-2">
              Richtige Reihenfolge: {activity.correctOrder.join(" ")}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
