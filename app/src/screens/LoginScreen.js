import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ImageBackground
} from "react-native";
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

import { API_URL } from '../../config'

export default function LoginScreen({ navigation }) {
    const [state, setState] = useState({
        username: "",
        password: "",
        error: "",
        color: "",
    });

    const handleChange = (e, who) => {
        setState((prevstate) => ({
            ...prevstate,
            [who]: e,
        }));
    };

    const checkLogin = async (e) => {
        e.preventDefault();
        try {
            let userId
            await axios.post(`${API_URL}login`, { username: state.username, password: state.password })
                .then(res => {
                    console.log(res.data);
                    userId = res.data
                })
            await AsyncStorage.setItem('user', JSON.stringify(userId))
            Toast.show({
                type: 'success',
                text1: 'Welcome back',
                text2: 'Successfully logged ! 👋'
            });
            navigation.navigate('HomeScreen')
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Authentification failed',
                text2: 'Oups... Your login is incorrect'
            });
        }
    };

    return (
        <ImageBackground source={require('../asset/bg.jpg')} style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginBottom: 20 }}>Welcome Back 👋</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange(text, "username")}
                    value={state.username}
                    placeholder="Enter your username"
                    placeholderTextColor="#000"
                    textAlign={"center"}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleChange(text, "password")}
                    value={state.password}
                    placeholder="Enter your password"
                    secureTextEntry={true}
                    textAlign={"center"}
                    placeholderTextColor="#000"
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={checkLogin}
                >
                    <Text style={styles.submitButtonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.horizontal}>
                    <Text>Don't have an account ?</Text><Text onPress={() => navigation.navigate('Register')} style={{ marginLeft: 2, fontWeight: 'bold' }}>Sign up</Text>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        marginHorizontal: 40,
        marginVertical: 20,
        height: 40,
        fontWeight: 'bold',
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 30,
        fontWeight: "bold",
        fontSize: 15,
    },
    submitButton: {
        backgroundColor: "black",
        padding: 10,
        margin: 15,
        height: 40,
        width: 200,
        borderRadius: 30,
        alignContent: "center",
        alignSelf: "center"
    },
    submitButtonText: {
        color: "white",
        fontSize: 14,
        alignSelf: "center",
        fontWeight: "bold"
    },
    errorText: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 5
    },
});