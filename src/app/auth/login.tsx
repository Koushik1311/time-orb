import { useAuth } from "@/context/AuthContext";
import { Link } from "@/tw";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace("/");
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Text className="text-xl font-bold mb-4">Login</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        className="border p-3 mb-3 rounded"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="border p-3 mb-3 rounded"
      />

      {error ? <Text className="text-red-500">{error}</Text> : null}

      <Pressable onPress={handleLogin} className="bg-black py-3 rounded mt-2">
        <Text className="text-white text-center font-semibold">Login</Text>
      </Pressable>
      <Link href="/auth/signup">Signup</Link>
    </View>
  );
}
