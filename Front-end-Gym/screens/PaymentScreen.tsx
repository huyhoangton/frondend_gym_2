import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import { paymentApi } from "../api/paymentApi";

export default function PaymentScreen({ route, navigation }: any) {
    const { pkg } = route.params;

    const [trainer, setTrainer] = useState<string>("HLV A");
    const [method, setMethod] = useState<"CASH" | "VNPAY">("CASH");
    const [loading, setLoading] = useState(false);

    const handlePay = async () => {
        if (loading) return;

        if (method === "CASH") {
            Alert.alert(
                "Đăng ký thành công",
                "Bạn đã đăng ký gói tập bằng tiền mặt.",
                [
                    {
                        text: "OK",
                        onPress: () =>
                            navigation.reset({
                                index: 0,
                                routes: [{ name: "Trang chủ" }],
                            }),
                    },
                ]
            );
        } else {
            try {
                setLoading(true);

                const url = await paymentApi.createVNPay(
                    pkg.price,
                    pkg.id
                );

                navigation.navigate("VNPay", { url });

            } catch (err) {
                Alert.alert("Lỗi", "Không thể tạo thanh toán VNPay");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* HEADER */}
            <Text style={styles.title}>🧾 HÓA ĐƠN ĐĂNG KÝ</Text>

            {/* PACKAGE INFO */}
            <View style={styles.card}>
                <Row label="Gói tập" value={pkg.name} />
                <Row label="Thời hạn" value={`${pkg.duration_days} ngày`} />
                <Row label="Huấn luyện viên" value={trainer} />
                <View style={styles.divider} />
                <Row
                    label="Tổng tiền"
                    value={`${pkg.price.toLocaleString()} đ`}
                    bold
                />
            </View>

            {/* TRAINER */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>👨‍🏫 Chọn huấn luyện viên</Text>

                {["HLV A", "HLV B", "HLV C"].map((t) => (
                    <Option
                        key={t}
                        label={t}
                        active={trainer === t}
                        onPress={() => setTrainer(t)}
                    />
                ))}
            </View>

            {/* PAYMENT METHOD */}
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>💳 Phương thức thanh toán</Text>

                <Option
                    label="💵 Tiền mặt"
                    active={method === "CASH"}
                    onPress={() => setMethod("CASH")}
                />

                <Option
                    label="💳 VNPay (Thẻ / QR)"
                    active={method === "VNPAY"}
                    onPress={() => setMethod("VNPAY")}
                />
            </View>

            {/* PAY BUTTON */}
            <TouchableOpacity
                style={[
                    styles.payBtn,
                    loading && { opacity: 0.7 },
                ]}
                onPress={handlePay}
                disabled={loading}
            >
                <Text style={styles.payText}>
                    {loading ? "Đang xử lý..." : "XÁC NHẬN THANH TOÁN"}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

/* ================= COMPONENT PHỤ ================= */

const Row = ({ label, value, bold }: any) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, bold && { fontWeight: "bold" }]}>
            {value}
        </Text>
    </View>
);

const Option = ({ label, active, onPress }: any) => (
    <TouchableOpacity
        onPress={onPress}
        style={[styles.option, active && styles.active]}
    >
        <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
);

/* ================= STYLE ================= */

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "#f3f4f6",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 16,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 6,
    },
    label: {
        color: "#777",
    },
    value: {
        fontSize: 16,
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginVertical: 10,
    },
    option: {
        padding: 14,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginTop: 10,
    },
    active: {
        borderColor: "#0b2ea8",
        backgroundColor: "#eef1ff",
    },
    payBtn: {
        backgroundColor: "#0b2ea8",
        padding: 18,
        borderRadius: 14,
        alignItems: "center",
        marginBottom: 30,
    },
    payText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },
});
