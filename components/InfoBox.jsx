import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, subtitle, containerStyle, titleStyle }) => {
  return (
    <View className={containerStyle}>
      <Text
        className={`${titleStyle} text-white text-center font-psemibold`}
        numberOfLines={1}
      >
        {title}
      </Text>
      <Text
        className="text-gray-100 font-pregular text-center text-sm"
        numberOfLines={1}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
