import { View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Signup() {
  const { signUp } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    try {
      await signUp(email, password);
      setMessage("Account created! Check email if confirmation enabled.");
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  return (
    <View className="flex-1 justify-center p-6">
      <Text className="text-xl font-bold mb-4">Sign Up</Text>

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

      <Pressable onPress={handleSignup} className="bg-black py-3 rounded mt-2">
        <Text className="text-white text-center font-semibold">Signup</Text>
      </Pressable>

      {message ? <Text className="mt-3">{message}</Text> : null}
    </View>
  );
}
