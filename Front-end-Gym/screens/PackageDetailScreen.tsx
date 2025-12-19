import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { gymApi } from "../api/package";
import { BASE_URL } from "../api/axios";
import { useNavigation } from "@react-navigation/native";

export default function PackageDetailScreen({ route }: any) {
    const navigation = useNavigation<any>();
    const { id } = route.params;
    const [pkg, setPkg] = useState<any>(null);

    useEffect(() => {
        const loadDetail = async () => {
            try {
                const data = await gymApi.getCategoryById(id);
                setPkg(data);
            } catch (e) {
                console.log("Load detail error", e);
            }
        };
        loadDetail();
    }, [id]);

    if (!pkg) return null;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                {/* IMAGE */}
                <Image
                    source={{ uri: BASE_URL + pkg.image }}
                    style={styles.image}
                />

                {/* CONTENT */}
                <View style={styles.content}>
                    <Text style={styles.name}>{pkg.name}</Text>

                    <Text style={styles.price}>
                        {pkg.price.toLocaleString()} đ
                    </Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>⏱ Thời hạn:</Text>
                        <Text style={styles.value}>{pkg.duration_days} ngày</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>📌 Trạng thái:</Text>
                        <Text
                            style={[
                                styles.value,
                                { color: pkg.is_active ? "green" : "red" },
                            ]}
                        >
                            {pkg.is_active ? "Đang mở" : "Tạm dừng"}
                        </Text>
                    </View>

                    <Text style={styles.descTitle}>Mô tả</Text>
                    <Text style={styles.desc}>{pkg.description}</Text>
                </View>
            </ScrollView>

            {/* REGISTER BUTTON */}
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Payment", { pkg })}
                
            >
                <Text style={styles.btnText}>Đăng ký tập</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f5f5f5",
    },
    image: {
        width: "100%",
        height: 240,
    },
    content: {
        backgroundColor: "#fff",
        marginTop: -20,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        padding: 20,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
    },
    price: {
        fontSize: 20,
        color: "#0b2ea8",
        fontWeight: "bold",
        marginBottom: 15,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    label: {
        color: "#555",
        fontSize: 15,
    },
    value: {
        fontSize: 15,
        fontWeight: "bold",
    },
    descTitle: {
        marginTop: 15,
        fontSize: 16,
        fontWeight: "bold",
    },
    desc: {
        marginTop: 8,
        color: "#666",
        lineHeight: 22,
    },
    btn: {
        backgroundColor: "#0b2ea8",
        paddingVertical: 18,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
