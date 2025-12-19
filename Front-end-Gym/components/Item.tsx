import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../api/axios";

export default function GymCard({ item }: any) {
    const navigation = useNavigation<any>(); // ✅ BẮT BUỘC

    if (!item) return null;

    return (
        <View style={styles.card}>
            <Image source={{ uri: BASE_URL + item.image }} style={styles.image} />

            <View style={styles.dess}>
                <Text style={styles.title}>{item.name}</Text>

                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("PackageDetail", { id: item.id })
                    }
                >
                    <Text style={styles.btn}>Xem chi tiết</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    desc: {

    },
    card: {
        width: "48%",
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        overflow: "hidden",
        elevation: 3
    },
    image: {
        width: "100%",
        height: 150,
    },
    dess: {
        padding: 10,
        backgroundColor: "black",
    },
    title: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
        textAlign: "center"
    },
    btn: {
        backgroundColor: "#138881",
        color: "white",
        paddingVertical: 6,
        borderRadius: 15,
        textAlign: "center",
        fontWeight: "bold",
    }
});
