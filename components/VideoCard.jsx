import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import { Audio, Video, ResizeMode } from "expo-av";

const VideoCard = ({
  video: {
    title,
    thumbnail,
    video,
    users: { username, avatar },
  },
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-1 flex-row">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="flex-1 justify-center items-start ml-3">
            <Text
              className="text-white text-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
          <View className="pt-2">
            <Image
              source={icons.menu}
              className="w-4 h-4"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      {isPlaying ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-lg mt-3 justify-center items-center relative "
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) =>
            status.didJustFinish && setIsPlaying(false)
          }
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setIsPlaying(true);
          }}
          className="w-full h-60 rounded-lg mt-3 justify-center items-center relative "
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
