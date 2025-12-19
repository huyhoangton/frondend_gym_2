import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigation from "./navigation/AuthNavigation";
import PackageDetailScreen from "./screens/PackageDetailScreen";
import PaymentScreen from "./screens/PaymentScreen";
import VNPayScreen from "./screens/VNPayScreen";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* AUTH + TAB */}
        <Stack.Screen name="Root" component={AuthNavigation} />

        {/* NGOÀI TAB */}
        <Stack.Screen
          name="PackageDetail"
          component={PackageDetailScreen}
          options={{ headerShown: true, title: "Chi tiết gói tập" }}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: true, title: "Thanh toán" }}
        />
        <Stack.Screen
          name="VNPay"
          component={VNPayScreen}
          options={{ title: "Thanh toán VNPay" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
