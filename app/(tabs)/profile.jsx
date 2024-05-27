import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUsersPosts, logout } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import { icons } from "../../constants";
import { router, Redirect } from "expo-router";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUsersPosts(user.$id));
  const signOut = async () => {
    await logout();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center px-4 mt-6 mb-12">
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={signOut}
            >
              <Image
                source={icons.logout}
                className="w-6 h-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="w-[60px] h-[60px] rounded-lg border border-secondary justify-center items-center p-0.5">
              <Image
                source={{ uri: user?.avatar }}
                className="w-full h-full rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              titleStyle="text-lg"
              containerStyle="mt-5"
            />
            <View className=" flex-row ">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyle="text-lg"
                containerStyle="mr-10"
              />

              <InfoBox title="1.2K" subtitle="Followers" titleStyle="text-xl" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="No videos found with that query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
