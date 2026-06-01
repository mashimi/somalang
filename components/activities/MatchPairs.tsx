import { MatchActivity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  activity: MatchActivity;
  onComplete: (correct: boolean) => void;
}

export function MatchPairs({ activity, onComplete }: Props) {
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [showResult, setShowResult] = useState(false);

  const handleLeftSelect = (id: string) => {
    if (showResult || matched.has(id)) return;
    setLeftSelected(id);
  };

  const handleRightSelect = (id: string) => {
    if (showResult || !leftSelected || matched.has(id)) return;

    const leftPair = activity.pairs.find(p => p.id === leftSelected);
    const rightPair = activity.pairs.find(p => p.id === id);
    const isCorrect = leftPair?.right === rightPair?.right;

    if (isCorrect) {
      setMatched(prev => new Set([...prev, leftSelected, id]));
    }

    setLeftSelected(null);

    if (matched.size + (isCorrect ? 2 : 0) + 2 >= activity.pairs.length * 2) {
      setShowResult(true);
      setTimeout(() => {
        onComplete(matched.size + (isCorrect ? 2 : 0) + 2 >= activity.pairs.length * 2);
      }, 1500);
    }
  };

  return (
    <View className="flex-1 p-5">
      <View className="bg-white rounded-2xl p-5 mb-6 items-center shadow-sm">
        <Ionicons name="link" size={32} color="#6c4ef5" />
        <Text className="text-lg font-semibold text-[#001328] text-center mt-3">
          {activity.instruction}
        </Text>
      </View>

      <View className="flex-row gap-4">
        {/* Left Column */}
        <View className="flex-1 gap-3">
          {activity.pairs.map((pair) => {
            const isMatched = matched.has(pair.id);
            const isSelected = leftSelected === pair.id;

            return (
              <TouchableOpacity
                key={pair.id}
                onPress={() => handleLeftSelect(pair.id)}
                disabled={isMatched || showResult}
                className={`p-4 rounded-xl border-2 ${
                  isMatched
                    ? "bg-green-50 border-green-500"
                    : isSelected
                    ? "bg-purple-50 border-purple-500"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text className="text-base font-medium text-[#001328] text-center">
                  {pair.left}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Right Column */}
        <View className="flex-1 gap-3">
          {activity.pairs.map((pair) => {
            const isMatched = matched.has(pair.id);
            const isSelected = leftSelected === activity.pairs.find(p => p.right === pair.right)?.id;

            return (
              <TouchableOpacity
                key={`right-${pair.id}`}
                onPress={() => handleRightSelect(pair.id)}
                disabled={isMatched || !leftSelected || showResult}
                className={`p-4 rounded-xl border-2 ${
                  isMatched
                    ? "bg-green-50 border-green-500"
                    : isSelected
                    ? "bg-purple-50 border-purple-500"
                    : "bg-white border-gray-200"
                }`}
              >
                <Text className="text-base font-medium text-[#001328] text-center">
                  {pair.right}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {showResult && (
        <View className="mt-6 items-center">
          <Ionicons name="checkmark-circle" size={48} color="#21c16b" />
          <Text className="text-lg font-semibold text-green-500 mt-3">
            Perfekt verbunden! 🎉
          </Text>
        </View>
      )}
    </View>
  );
}