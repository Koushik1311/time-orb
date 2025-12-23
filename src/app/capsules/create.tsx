import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function () {
  const { user } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");

  const create = async () => {
    if (!user) return;

    await supabase.from("capsules").insert({
      user_id: user.id,
      title,
      content,
      open_at: new Date(date).toISOString(),
    });

    router.replace("/");
  };

  return (
    <View className="p-6">
      <Text className="text-xl font-bold mb-4">New Capsule</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        className="border p-3 mb-3"
      />

      <TextInput
        placeholder="Message"
        value={content}
        onChangeText={setContent}
        className="border p-3 mb-3 h-32"
        multiline
      />

      <TextInput
        placeholder="Open date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        className="border p-3 mb-3"
      />

      <Pressable onPress={create} className="bg-black py-3 rounded-2xl">
        <Text className="text-white text-center">Create Capsule</Text>
      </Pressable>
    </View>
  );
}
