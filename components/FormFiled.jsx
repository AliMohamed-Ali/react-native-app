import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";

const FormFiled = ({
  title,
  value,
  handleChangeText,
  otherStyles,
  placeholder,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-gray-100 text-pmedium text-base">{title}</Text>
      <View className="w-full h-[58px] bg-black-100 border-2 border-black-200 rounded-2xl px-4 focus:border-secondary items-center flex-row">
        <TextInput
          className=" text-white text-base font-psemibold w-[95%]"
          placeholderTextColor={"#7B7B8B"}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity
            className="text-secondary-200 text-pmedium text-base"
            onPress={() => setShowPassword(!showPassword)}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormFiled;
