import { TouchableOpacity, Text } from "react-native";
import React from "react";

const CustomButton = ({
  title,
  handlePress,
  containerStyle,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle}
      ${isLoading ? "opacity-50" : ""}

      `}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      <Text className={`text-primary text-lg font-psemibold  ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
