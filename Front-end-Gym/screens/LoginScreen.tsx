import Checkbox from 'expo-checkbox';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { loginApi } from "../api/authApi";
import React, { useState } from 'react';
import {
    Text,
    View,
    StatusBar,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Alert,
    TextInput,
    Image
} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';


const LoginScreen = () => {
    const navigation = useNavigation<any>(); // ✅ ĐÚNG CHỖ

    const [agree, setAgree] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkEmail, setCheckEmail] = useState(true);

    const onSubmit = async () => {
        let regetEmail = new RegExp(
            "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$"
        );

        if (!regetEmail.test(email)) {
            setCheckEmail(true);
            return;
        }

        setCheckEmail(false);

        try {
            const res = await loginApi(email, password);

            const { token, email: userEmail, role } = res.data;

            // ✅ CHỈ LƯU TOKEN
            await AsyncStorage.setItem("token", token);
            await AsyncStorage.setItem("email", userEmail);
            await AsyncStorage.setItem("role", role);

            // ❌ KHÔNG navigate
            // ❌ KHÔNG reset

        } catch (error: any) {
            Alert.alert(
                "Đăng nhập thất bại",
                error?.response?.data?.message || "Sai email hoặc mật khẩu"
            );
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={'#ffffff'} />

            <View style={styles.title}>
                <Text style={{ fontWeight: 'bold', fontSize: 30, color: '#1bcdff' }}>Login</Text>

                <Text style={{ marginTop: 30 }}>By signing in you are agreeing</Text>

                <View style={{ flexDirection: 'row' }}>
                    <Text>our </Text>
                    <TouchableOpacity onPress={() => Alert.alert("Sau này làm chuyển trang")}>
                        <Text style={{ color: '#1bcdff' }}>Term and privacy policy</Text>
                    </TouchableOpacity>
                </View >
            </View>

            <View style={styles.form}>
                <View style={styles.group}>
                    <Fontisto name="email" size={24} color="rgba(2, 2, 2, 1)" />
                    <TextInput placeholder="Email" style={styles.input} onChangeText={(value) => setEmail(value)} />

                </View>
                <View>
                    <Text style={{ color: 'red' }}>{checkEmail ? 'Sai định dạng email' : ''}</Text>
                </View>

                <View style={styles.group}>
                    <Fontisto name="locked" size={24} color="rgba(2, 2, 2, 1)" />
                    <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={(value) => setPassword(value)} />
                </View>
                <View style={styles.group2}><View style={styles.group1}>
                    <Checkbox
                        value={agree}
                        onValueChange={() => setAgree(!agree)}
                        color={agree ? '#1bcdff' : undefined}
                    />
                    <Text style={{ marginLeft: 8 }}>Remember me</Text>
                </View>
                    <View>
                        <TouchableOpacity onPress={() => Alert.alert("Sau này làm chuyển trang")}>
                            <Text style={{ color: '#1bcdff' }}>Quên mật khẩu</Text></TouchableOpacity>
                    </View>
                </View>

            </View>
            <TouchableOpacity>
                <Text style={styles.btn} onPress={() => onSubmit()}>Login</Text>
            </TouchableOpacity>



        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 40,
    },
    title: {
        marginTop: 50,
        alignItems: 'center'

    },
    form: {
        marginTop: 50,
        paddingHorizontal: 50,
    },
    group: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: "#ccc",
        marginVertical: 10,
        marginTop: 30,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    group1: {
        flexDirection: 'row',
        alignItems: 'center',


    },
    group2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    btn: {
        marginTop: 50,
        backgroundColor: '#1bcdff',
        textAlign: 'center',
        paddingVertical: 20,
        borderRadius: 30,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginHorizontal: 50,
    }
});

export default LoginScreen;
