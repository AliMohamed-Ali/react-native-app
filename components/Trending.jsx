import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import { icons, images } from "../constants";
import * as Animatable from "react-native-animatable";
import { Audio, Video, ResizeMode } from "expo-av"; 

const zoomIn = {
  0: {
    scale: 0.9,
    opacity: 0.8,
  },
  1: {
    scale: 1.1,
    opacity: 1,
  },
};
const zoomOut = {
  0: {
    scale: 1.1,
    opacity: 1,
  },
  1: {
    scale: 0.8,
    opacity: 0.9,
  },
};
const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      className="my-5"
      animation={activeItem == item.$id ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg my-5 shadow-white/10"
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) =>
            status.didJustFinish && setPlay(false)
          }
        />
      ) : (
        <TouchableOpacity
          className="justify-center items-center relative "
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            // source={images.thumbnail}
            className="w-52 h-72 rounded-[35px] overflow-hidden shadow-lg my-5 shadow-black/40"
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            className="w-12 h-12 absolute "
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts);
  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  };
  return (
    <FlatList
      horizontal
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        viewAreaCoveragePercentThreshold: 70,
      }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;
