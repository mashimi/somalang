import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View, ViewStyle } from "react-native";

interface ScreenHeaderProps {
  title: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export function ScreenHeader({
  title,
  onBack,
  rightElement,
  containerStyle,
}: ScreenHeaderProps) {
  const handleBack = onBack ?? router.back;

  return (
    <View
      className="flex-row items-center px-4 py-3 bg-white border-b border-border"
      style={containerStyle}
    >
      <TouchableOpacity
        onPress={handleBack}
        className="w-10 h-10 items-center justify-center"
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="chevron-back" size={24} color="#001328" />
      </TouchableOpacity>

      <Text
        className="flex-1 text-center font-poppins-semibold text-lg text-text-primary"
        numberOfLines={1}
      >
        {title}
      </Text>

      {rightElement ?? <View className="w-10" />}
    </View>
  );
}