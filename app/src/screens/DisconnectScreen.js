import React from 'react';
import { useIsFocused } from '@react-navigation/native'
import { View, Alert } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DisconnectScreen({ navigation }) {
    const isFocused = useIsFocused()

    const disconnect = async () => {
        await AsyncStorage.removeItem('user')
        setTimeout(() => {
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
                            navigation.navigate("HomeScreen")
                        }, 100),
                        style: "cancel"
                    },
                    { text: "YES", onPress: disconnect }
                ]
            ))}
        </View>
    );
}