import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNLocation from 'react-native-location';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios'

import { API_URL } from '../../config'

export default function HomeScreen({ navigation }) {
    const [position, setPosition] = useState({
        latitude: -1,
        longitude: -1
    });
    const [city, setCity] = useState(null)

    useEffect(() => {
        async function getUserLocation() {
            const user = await AsyncStorage.getItem('user')
            if (user === null) {
                navigation.navigate('Login')
                return
            }
            await getLocation()
        }
        getUserLocation()
    }, [getLocation])


    const getLocation = async () => {
        RNLocation.configure({
            distanceFilter: 100,
        })
        Geolocation.getCurrentPosition(async (info) => {
            setPosition({ latitude: info.coords.latitude, longitude: info.coords.longitude })
            const userId = JSON.parse(await AsyncStorage.getItem('user'))
            await axios.post(`${API_URL}actualWheather`, { latitude: position.latitude, longitude: position.longitude, userId })
                .then(res => {
                    console.log(res.data)
                    setCity(res.data)
                })
        });

    }

    return (
        <View>
            <TouchableOpacity
                style={styles.horizontal}
                onPress={getLocation}
            >
                <Icon style={{ marginTop: 5, marginHorizontal: 20 }} name="location-arrow" color={'black'} size={20} />
                <Text style={styles.getCoordsText}>Update</Text>
            </TouchableOpacity>
            <Text>Latitude: {position.latitude} </Text>
            <Text>Longitude: {position.longitude} </Text>
            {city && <Text>{city.name}</Text>}
        </View>

    );
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'flex-end'
    },
    getCoordsText: {
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});