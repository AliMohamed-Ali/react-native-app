import { View, Text, ScrollView, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { StatusBar } from "expo-status-bar";
import FormFiled from "../../components/FormFiled";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { singIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getCurrentUser } from "../../lib/appwrite";

const SingIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    setIsLoading(true);
    try {
      await singIn(form.email, form.password);
      const user = await getCurrentUser();
      setUser(user);
      setIsLoggedIn(true);
      Alert.alert("Success", "User logged in successfrully");
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
            SingIn
          </Text>
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
            title="SingIn"
            handlePress={submit}
            isLoading={isLoading}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-white font-psemibold text-base">
              Don't have an account?
            </Text>
            <Link
              className="text-secondary-200 font-psemibold text-lg"
              href={"/sign-up"}
            >
              Sing Up
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default SingIn;
