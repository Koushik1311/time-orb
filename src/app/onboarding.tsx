import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Onboarding() {
  const { user } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const finish = async () => {
    if (!user) return;

    setLoading(true);

    await supabase
      .from("profiles")
      .update({
        full_name: name,
        onboarded: true,
      })
      .eq("id", user.id);

    setLoading(false);
    router.replace("/");
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Text className="text-2xl font-bold mb-2">Welcome 👋</Text>

      <Text className="text-stone-500 mb-6">Let's set up your journey</Text>

      <TextInput
        placeholder="Your name"
        value={name}
        onChangeText={setName}
        className="border p-3 rounded mb-4"
      />

      <Pressable onPress={finish} className="bg-black py-3 rounded mt-2">
        <Text className="text-white text-center font-semibold">
          {loading ? "Saving..." : "Continue"}
        </Text>
      </Pressable>
    </View>
  );
}
