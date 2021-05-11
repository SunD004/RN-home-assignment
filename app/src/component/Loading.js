import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

const Loading = ({ wasOff }) => {
    return (
        <View style={{ flex: 1, justifyContent: "center", flexDirection: 'column', alignContent: 'center' }}>
            <ActivityIndicator size="large" color="black" />
            {wasOff &&
                <View style={{ marginVertical: 20 }}>
                    <Text style={styles.text}>Your location was off </Text>
                    <Text style={styles.text}>Press 'Update' for get your location</Text></View>}
            {!wasOff && <View style={{ marginVertical: 20 }}>
                <Text style={styles.text}>We getting your position... </Text>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic'
    }
});

export default Loading;