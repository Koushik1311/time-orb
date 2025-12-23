import React, { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

import { useAuth } from "@/context/AuthContext";
import { AppGate } from "@/components/auth/AppGate";
import { useRouter } from "expo-router";
import { supabase } from "@/utils/supabase";

function Home() {
  const { user } = useAuth();
  const router = useRouter();
  const [capsules, setCapsules] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    supabase
      .from("capsules")
      .select("*")
      .order("open_at", { ascending: true })
      .then(({ data }) => setCapsules(data || []));
  }, [user]);

  return (
    <View className="p-6">
      <Pressable
        className="mb-4"
        onPress={() => router.push("/capsules/create")}
      >
        <Text className="text-blue-600">+ Create Capsule</Text>
      </Pressable>

      <FlatList
        data={capsules}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View className="border p-3 mb-3 rounded">
            <Text className="font-semibold">{item.title}</Text>

            {!item.opened ? (
              <Text className="text-stone-500">
                Opens on {new Date(item.open_at).toDateString()}
              </Text>
            ) : (
              <Text>{item.content}</Text>
            )}
          </View>
        )}
      />
    </View>
  );
}
export default function Page() {
  return (
    <AppGate>
      <Home />
    </AppGate>
  );
}
