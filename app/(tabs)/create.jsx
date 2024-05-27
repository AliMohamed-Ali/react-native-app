import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormFiled from "../../components/FormFiled";
import { Video, ResizeMode } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const openPicker = async (selectedType) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectedType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectedType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      } else if (selectedType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  const submit = async () => {
    if (!form.title || !form.prompt || !form.video || !form.thumbnail) {
      return Alert.alert("Error", "Please fill all the fields");
    }
    setUploading(true);
    try {
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Video uploaded successfully");
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white font-psemibold text-2xl">Upload Video</Text>

        <FormFiled
          title="Video Title"
          value={form.title}
          handleChangeText={(value) => {
            setForm({ ...form, title: value });
          }}
          otherStyles="mt-10"
          placeholder="Give your video a catchy title..."
        />

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-pmedium text-base">
            Upload Video
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("video")}
          >
            {form.video ? (
              <Video
                source={{ uri: form.video }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 rounded-2xl px-4 bg-black-100 flex items-center justify-center">
                <View className="w-14 h-14  border border-dashed border-secondary-100 justify-center items-center p-0.5">
                  <Image
                    source={icons.upload}
                    className="w-1/2 h-1/2"
                    resizeMode="contain"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-pmedium text-base">
            Thumbnail Image
          </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => openPicker("image")}
          >
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="w-full h-40 rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View
                className="w-full h-16 px-4 rounded-2xl items-center bg-black-200 
              flex-row justify-center"
              >
                <Image
                  source={icons.upload}
                  className="w-6 h-6 mr-2"
                  resizeMode="contain"
                />
                <Text className="text-white text-pmedium text-base">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormFiled
          title="AI Prompt"
          value={form.prompt}
          handleChangeText={(value) => {
            setForm({ ...form, prompt: value });
          }}
          otherStyles="mt-10"
          placeholder="The AI prompt of your video...."
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyle="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
