import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { userApi } from "../api/userApi";
import Item from "../components/Item";
import { gymApi } from "../api/package";
import GymCard from "../components/Item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// import { newsApi } from "../api/newsApi";

const HomeScreen = ({ item }: any) => {
    const navigation = useNavigation<any>();
    const [user, setUser] = useState<any>(null);
    const [packages, setPackages] = useState<any[]>([]);
   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const email = await AsyncStorage.getItem("email");
                if (!email) return;

                const profile = await userApi.getProfile(email);
                const pkgs = await gymApi.getPackages();

                setUser(profile);
                setPackages(pkgs);
            } catch (e) {
                console.log("Load error", e);
            }
        };

        fetchData();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <View style={styles.row}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: user?.photo || "https://i.pravatar.cc/150" }}
                    />
                    <View>
                        <Text style={styles.hello}>{user?.full_name}</Text>
                    </View>

                    <TouchableOpacity style={styles.areaButton}>
                        <Text style={styles.areaText}>{user?.area || "TP Hà Nội"}</Text>
                    </TouchableOpacity>
                </View>


            </View>

            {/* MENU */}
            <View style={styles.menuRow}>
                {menuItems.map((m) => (
                    <View key={m.label} style={styles.menuItem}>
                        <Image style={styles.menuIcon} source={m.icon} />
                        <Text>{m.label}</Text>
                    </View>
                ))}
            </View>

            {/* NEWS */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Khám phá gói tập</Text>
                <Text style={styles.viewAll}>Xem tất cả</Text>
            </View>
            <View style={styles.newsGrid}>
                {packages.map((item) => (
                    <GymCard key={item.id} item={item} />
                ))}
            </View>

        </ScrollView>
    );
};

const menuItems = [
    { label: "Tìm kiếm", icon: require("../assets/search.png") },
    { label: "Tìm đường", icon: require("../assets/map.png") },
    { label: "Góp ý", icon: require("../assets/chat.png") },
    { label: "Yêu thích", icon: require("../assets/heart.png") },
];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f8f8" },

    header: {
        backgroundColor: "#0b2ea8",
        padding: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        height: 200
    },

    row: {
        flexDirection: "row", alignItems: "center",
        marginTop: 30
    },

    avatar: { width: 55, height: 55, borderRadius: 30, marginRight: 15 },

    hello: { fontSize: 18, color: "#fff", fontWeight: "bold" },

    areaButton: {
        marginLeft: "auto",
        backgroundColor: "#fff2",
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 20,
    },

    areaText: { color: "#fff", fontWeight: "bold" },


    menuRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: -30,
        paddingHorizontal: 20,
    },

    menuItem: {
        backgroundColor: "#fff",
        width: 80,
        height: 80,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },

    menuIcon: { width: 30, height: 30, marginBottom: 5 },

    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
        paddingBottom: 10,
    },

    sectionTitle: { fontSize: 18, fontWeight: "bold" },

    viewAll: { color: "#0b2ea8" },

    newsGrid: {
        paddingHorizontal: 20,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    newsCard: {
        width: "48%",
        backgroundColor: "#fff",
        borderRadius: 15,
        marginBottom: 20,
        padding: 10,
    },

    newsImg: { width: "100%", height: 120, borderRadius: 10 },

    newsTitle: { marginTop: 8, fontWeight: "bold" },

    newsDate: { color: "gray", fontSize: 12, marginTop: 4 },
});

export default HomeScreen;
