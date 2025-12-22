import React from "react";
import { Pressable, Text, View } from "react-native";

import { Link } from "@/tw";
import { AuthGate } from "@/components/auth/AuthGate";
import { useAuth } from "@/context/AuthContext";
import { AppGate } from "@/components/auth/AppGate";

function Home() {
  const { profile, signOut } = useAuth();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl mb-2">Welcome, {profile?.full_name}</Text>

      <Pressable onPress={signOut} className="bg-black py-3 rounded mt-2">
        <Text className="text-white text-center font-semibold">Logout</Text>
      </Pressable>
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
