import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "../constants";
import CustomButton from "./CustomButton";
import { router } from "expo-router";

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-white font-psembold text-xl mt-2">{title}</Text>
      <Text className="text-gray-100 font-pmedium text-sm ">{subtitle}</Text>
      <CustomButton
        title="Create a Video"
        handlePress={() => {
          router.push("/create");
        }}
        containerStyle="my-4 w-full"
      />
    </View>
  );
};

export default EmptyState;
