import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Welcome() {
  const { signInAnonymously } = useAuth();
  const router = useRouter();

  const continueAsGuest = async () => {
    await signInAnonymously();
    router.replace("onboarding");
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-3xl font-bold mb-4">Welcome</Text>

      <Text className="text-stone-500 text-center mb-8">
        Write a message to your future self. Open it when the tume is right.
      </Text>

      <Pressable
        onPress={continueAsGuest}
        className="bg-black py-3 rounded mt-2 px-3"
      >
        <Text className="text-white text-center font-semibold">
          Continue as Guest
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/auth/login")}
        className="bg-black py-3 rounded mt-2 px-3"
      >
        <Text className="text-white text-center font-semibold">Login</Text>
      </Pressable>

      <Pressable
        onPress={() => router.push("/auth/signup")}
        className="bg-black py-3 rounded mt-2 px-3"
      >
        <Text className="text-white text-center font-semibold">Signup</Text>
      </Pressable>
    </View>
  );
}
