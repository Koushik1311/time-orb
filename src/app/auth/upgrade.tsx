import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/utils/supabase";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, Text, TextInput, View } from "react-native";

export default function UpgradeAccount() {
  const { user } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.is_anonymous) {
      router.replace("/");
    }
  }, [user]);

  const upgrade = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (!error) {
      Alert.alert(
        "Check your email",
        "Please verify your email to complete the upgrade.",
      );
    }

    router.replace("/");
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Text className="text-2xl font-bold mb-2">Save your account</Text>

      <Text className="text-stone-500 mb-6">
        Secure your data and access it on any device
      </Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="border p-3 rounded mb-3"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border p-3 rounded mb-3"
      />
      {error && <Text className="text-red-500 mb-3">{error}</Text>}

      <Pressable onPress={upgrade} className="bg-black py-3 rounded">
        <Text className="text-white text-center font-semibold">
          {loading ? "Saving..." : "Upgrade Account"}
        </Text>
      </Pressable>
    </View>
  );
}
