import { useAuth } from "@/context/AuthContext";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/auth/login" />;
  }

  return <>{children}</>;
}
