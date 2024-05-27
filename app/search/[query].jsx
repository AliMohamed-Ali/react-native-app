import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { searchPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refreshData } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refreshData();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full items-center justify-center">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className=" px-4 my-6">
            <Text className="text-gray-100 text-pmedium text-sm">
              Search Results
            </Text>
            <Text className="text-white text-pbold  text-2xl">{query}</Text>
            <View className="mt-6 mb-8">
              <SearchInput initialValue={query} />
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

export default Search;
