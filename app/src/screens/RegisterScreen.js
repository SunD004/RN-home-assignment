import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from "react-native";
import axios from 'axios'

import { API_URL } from '../../config'

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default function RegisterScreen({ navigation }) {
    const [state, setState] = useState({
        username: "",
        password: "",
        email: "",
        error: "",
        color: "",
    });

    const handleChange = (e, who) => {
        setState((prevstate) => ({
            ...prevstate,
            [who]: e,
        }));
    };

    const submitSignUp = async (e) => {
        e.preventDefault();
        try {
            if (!state.email.match(regexEmail)) {
                Alert.alert(
                    "Email format incorrect",
                    "Oups... Enter a valid email please",
                    [
                        { text: "i understand" }
                    ]
                );
                return
            }
            if (state.email === '' || state.username === '' || state.password === '') {
                Alert.alert(
                    "Field is empty",
                    "Oups... One or mores fields is empty",
                    [
                        { text: "i understand" }
                    ]
                );
                return
            }
            await axios.post(`${API_URL}register`, { username: state.username, password: state.password, email: state.email })
                .then(() => {
                    navigation.navigate('Login')
                })
        } catch (e) {
            Alert.alert(
                "Registration failed",
                "Oups... " + e?.response?.data.message,
                [
                    { text: "try again" }
                ]
            );
        }
    };

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25, marginBottom: 20 }}>Welcome !</Text>
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
                onChangeText={(text) => handleChange(text, "email")}
                value={state.email}
                placeholder="Enter your email"
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
                onPress={submitSignUp}
            >
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
            <View style={styles.horizontal}>
                <Text>Already registered ?</Text><Text onPress={() => navigation.navigate('Login')} style={{ marginLeft: 2, fontWeight: 'bold' }}>Sign in</Text>
            </View>
        </View>
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