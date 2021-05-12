import * as React from 'react';
import { View, Text, ImageBackground } from 'react-native';

export default function HomeScreen() {
    return (
        <ImageBackground source={require('../asset/bg.jpg')} style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Search!</Text>
            </View>
        </ImageBackground>
    );
}