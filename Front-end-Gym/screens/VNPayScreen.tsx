import React from "react";
import { View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";

export default function VNPayScreen({ route, navigation }: any) {
    const { url } = route.params;

    return (
        <WebView
            source={{ uri: url }}
            startInLoadingState
            renderLoading={() => (
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <ActivityIndicator size="large" />
                </View>
            )}
            onNavigationStateChange={(navState) => {
                if (navState.url.includes("vnp_ResponseCode")) {
                    if (navState.url.includes("vnp_ResponseCode=00")) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Trang chủ" }],
                        });
                    } else {
                        navigation.goBack();
                    }
                }
            }}
        />
    );
}
