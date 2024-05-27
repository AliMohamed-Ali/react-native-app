import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = () => {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  return (
    <View className="w-full h-16 bg-black-100 border-2 border-black-200 rounded-2xl flex-row  px-4  items-center justify-between focus:border-secondary mt-6 space-x-4">
      <TextInput
        className=" text-white text-base font-pregular flex-1 mt-0.5 "
        placeholderTextColor={"#CDCDE0"}
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder="Search for a video topic"
      />

      <TouchableOpacity
        className=" text-pmedium text-base"
        onPress={() => {
          if (!query) {
            return Alert.alert(
              "Missing Query",
              "Please enter a query to search across database"
            );
          }
          if (pathname.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
