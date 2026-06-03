import { MatchActivity } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  activity: MatchActivity;
  onComplete: (correct: boolean) => void;
}

type AttemptResult = "correct" | "wrong" | null;

export function MatchPairs({ activity, onComplete }: Props) {
  const [leftSelected, setLeftSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{
    leftId: string;
    rightId: string;
  } | null>(null);
  const [showResult, setShowResult] = useState(false);

  const totalPairs = activity.pairs.length;

  const handleLeftSelect = (id: string) => {
    if (showResult || matched.has(id) || wrongPair?.leftId === id) return;
    setLeftSelected(id);
  };

  const handleRightSelect = (rightId: string) => {
    if (showResult || !leftSelected || matched.has(rightId)) return;

    // Find the right-side pair object by id
    const rightPair = activity.pairs.find((p) => p.id === rightId);
    if (!rightPair) {
      setLeftSelected(null);
      return;
    }

    // Correct only if the right-side clicked item belongs to the same pair
    // as the previously selected left item (i.e. they share the same `id`).
    const isCorrect = rightPair.id === leftSelected;

    if (isCorrect) {
      const newMatched = new Set(matched);
      newMatched.add(leftSelected);
      newMatched.add(rightId);
      setMatched(newMatched);
      setWrongPair(null);

      if (newMatched.size >= totalPairs * 2) {
        setShowResult(true);
        setLeftSelected(null);
        setTimeout(() => {
          onComplete(true);
        }, 1500);
      } else {
        setLeftSelected(null);
      }
    } else {
      // Visual feedback for the wrong pairing; let the user try again.
      setWrongPair({ leftId: leftSelected, rightId });
      setLeftSelected(null);
      setTimeout(() => setWrongPair(null), 1200);
    }
  };

  return (
    <View className="flex-1 p-5">
      <View className="bg-white rounded-2xl p-5 mb-6 items-center shadow-sm">
        <Ionicons name="link" size={32} color="#6c4ef5" />
        <Text className="text-lg font-semibold text-[#001328] text-center mt-3">
          {activity.instruction}
        </Text>
        <Text className="text-sm text-gray-500 text-center mt-2">
          {matched.size / 2} / {totalPairs} imelinganishwa
        </Text>
      </View>

      <View className="flex-row gap-4">
        {/* Left Column */}
        <View className="flex-1 gap-3">
          {activity.pairs.map((pair) => {
            const isMatched = matched.has(pair.id);
            const isSelected = leftSelected === pair.id;
            const isWrongHighlight = wrongPair?.leftId === pair.id;

            return (
              <TouchableOpacity
                key={pair.id}
                onPress={() => handleLeftSelect(pair.id)}
                disabled={isMatched || showResult}
                className={`p-4 rounded-xl border-2 ${
                  isMatched
                    ? "bg-green-50 border-green-500"
                    : isWrongHighlight
                      ? "bg-red-50 border-red-500"
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
            const isWrongHighlight = wrongPair?.rightId === pair.id;

            return (
              <TouchableOpacity
                key={`right-${pair.id}`}
                onPress={() => handleRightSelect(pair.id)}
                disabled={isMatched || !leftSelected || showResult}
                className={`p-4 rounded-xl border-2 ${
                  isMatched
                    ? "bg-green-50 border-green-500"
                    : isWrongHighlight
                      ? "bg-red-50 border-red-500"
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
