import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./LoginScreen";


const AccountScreen = () => {
    const navigation = useNavigation<any>();

    const logout = async () => {
    await AsyncStorage.removeItem("token");
};
    return (
        <ScrollView style={styles.container}>

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Tài khoản</Text>

                <Image
                    style={styles.avatar}
                    source={{
                        uri: "https://i.pravatar.cc/150",
                    }}
                />
                <Text style={styles.name}>Đinh Bảo</Text>
            </View>

            <View style={styles.list}>

                {/* Item */}
                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Thông tin cá nhân</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Cài đặt</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemTextLeft}>Thay đổi khu vực</Text>
                    <Text style={styles.itemTextRight}>TP Hà Nội</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Cập nhật dữ liệu</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.item}>
                    <Text style={styles.itemText}>Đánh giá ứng dụng</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.item} onPress={logout}>
                    <Text style={{ color: "red" }}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },

    header: {
        backgroundColor: "#0b2ea8",
        paddingVertical: 40,
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    title: { color: "#fff", fontSize: 22, fontWeight: "bold" },

    avatar: {
        marginTop: 15,
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#fff",
    },

    name: { marginTop: 10, color: "#fff", fontSize: 18, fontWeight: "bold" },

    list: { marginTop: 20 },

    item: {
        backgroundColor: "#fff",
        padding: 18,
        marginHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: "row",
        justifyContent: "space-between",
    },

    itemText: { fontSize: 16 },

    itemTextLeft: { fontSize: 16 },
    itemTextRight: { fontSize: 16, color: "#0099ff" },
});

export default AccountScreen;
