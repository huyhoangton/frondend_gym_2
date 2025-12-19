import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const Details = () => {
    return (
        <>
            <Text style={styles.header}>Chi tiết gói tập</Text>
            <Image style={styles.img} source={require('../assets/1.jpg')} />
            <View>
                <Text style={styles.ten}>Tên gói</Text>
                <Text >Gia</Text>
                <Text>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure assumenda laborum commodi eos laboriosam quibusdam eaque placeat qui totam ratione est ab ipsum, necessitatibus voluptatum id repellat ad dicta voluptatem.</Text>
            </View>
            <TouchableOpacity>
                <Text style={styles.btn}>Đặt gói</Text>
            </TouchableOpacity>
        </>
    )
}
const styles = StyleSheet.create(
    {
        header: {
            marginTop: 30,
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',

        },
        container: {

        },
        btn: {
            backgroundColor: 'green',
            borderRadius: 30,
            width: 150,
            height: 45,
            textAlign:'center',
            justifyContent: 'center',
            margin : 5,
            padding:10,
            marginTop: 40,
            marginLeft: 250



        },
        ten: {
fontSize: 30,
fontWeight: 'bold',

        },
        img: {
            marginTop: 20,
            width: '100%',
            height: 400,

        }
    }
);
export default Details;