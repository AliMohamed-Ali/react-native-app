import { View, Text, ScrollView, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import FormFiled from "../../components/FormFiled";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SingUp = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLoggedIn(true);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView className={"h-full bg-primary"}>
      <ScrollView>
        <View className="w-full min-h-[83vh]  justify-center px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[34px]"
            resizeMode="contain"
          />
          <Text className="text-white font-psemibold text-2xl text-semibold mt-10 ">
            SingUp
          </Text>

          <FormFiled
            title="Username"
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
            otherStyles="mt-7"
            placeholder="Enter your username"
          />
          <FormFiled
            title="Email"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeholder="Enter your email"
          />
          <FormFiled
            title="Password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
            placeholder="Enter your password"
            secureTextEntry
          />
          <CustomButton
            containerStyle="mt-7"
            title="Sing Up"
            handlePress={submit}
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white font-psemibold text-base">
              Already have an account
            </Text>
            <Link
              className="text-secondary-200 font-psemibold text-lg"
              href={"/sign-in"}
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default SingUp;
