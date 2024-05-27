import {
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { useEffect, useState } from "react";
import { getAllPosts, getLatest } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const { data: posts, refreshData } = useAppwrite(getAllPosts);
  const { data: latest } = useAppwrite(getLatest);

  const onRefresh = async () => {
    setRefreshing(true);
    //recall all videos
    await refreshData();
    setRefreshing(false);
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className=" px-4 my-6 space-y-6">
            <View className="flex-row justify-between items-start">
              <View>
                <Text className="text-gray-100 text-pmedium text-sm">
                  Welcome back,
                </Text>
                <Text className="text-white text-psemibold  text-2xl">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-10 h-9"
                  resizeMode="contain"
                />
              </View>
            </View>
            <SearchInput />
            <View className="flex-1 pt-3 w-full pb-8 ">
              <Text className="text-gray-100 text-pmedium text-lg font-pregular mb-3">
                Latest Videos
              </Text>
              <Trending posts={latest ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
