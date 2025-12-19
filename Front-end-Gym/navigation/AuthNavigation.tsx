 import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "../screens/LoginScreen";
import Navigation from "./Navigation";

const Stack = createNativeStackNavigator();

export default function AuthNavigation() {
  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLogin(!!token);
    };

    check();
    const interval = setInterval(check, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLogin ? (
        <Stack.Screen name="Main" component={Navigation} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}
