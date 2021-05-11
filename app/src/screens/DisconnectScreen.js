import React from 'react';
import { useIsFocused } from '@react-navigation/native'
import { View, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DisconnectScreen({ navigation }) {
    const isFocused = useIsFocused()

    const disconnect = async () => {
        await AsyncStorage.removeItem('user')
        setTimeout(() => {
            Toast.show({
                type: 'success',
                text1: 'Disconnected',
                text2: 'Good bye 👋'
            });
            navigation.navigate("Login")
        }, 100)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isFocused && (Alert.alert(
                "Sign Out",
                "Are you sure you want sign out ?",
                [
                    {
                        text: "Cancel",
                        onPress: () => setTimeout(() => {
                            navigation.goBack()
                        }, 100),
                        style: "cancel"
                    },
                    { text: "YES", onPress: disconnect }
                ]
            ))}
        </View>
    );
}