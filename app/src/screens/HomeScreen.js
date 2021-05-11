import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNLocation from 'react-native-location';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import ConnectivityManager from 'react-native-connectivity-status'

import { API_URL } from '../../config'

import Loading from '../component/Loading'

export default function HomeScreen({ navigation }) {
    const isFocused = useIsFocused()
    const [position, setPosition] = useState({
        latitude: -1,
        longitude: -1
    });
    const [city, setCity] = useState(null)
    const [loading, setLoading] = useState(false)
    const [wasOff, setWasOff] = useState(false)

    useEffect(() => {
        async function getUserLocation() {
            const user = await AsyncStorage.getItem('user')
            if (user === null) {
                navigation.navigate('Login')
                return
            }
        }
        getUserLocation()
    }, [])


    const getLocation = async () => {
        const isLocationON = await ConnectivityManager.areLocationServicesEnabled()
        console.log('getLocation')
        setLoading(true)
        if (!isLocationON) {
            RNLocation.configure({
                distanceFilter: 100,
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 10000
            })
            setWasOff(true)
        } else {
            setWasOff(false)
            Geolocation.getCurrentPosition(
                async (info) => {
                    setPosition({ latitude: info.coords.latitude, longitude: info.coords.longitude })
                    console.log('yeeah')
                    const userId = JSON.parse(await AsyncStorage.getItem('user'))
                    await axios.post(`${API_URL}actualWheather`, { latitude: position.latitude, longitude: position.longitude, userId })
                        .then(res => {
                            console.log("res=", res.data)
                            setCity(res.data)
                            setLoading(false)
                        })
                },
                (error) => Alert.alert('Error', JSON.stringify(error)),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
            );
        }

    }

    if (isFocused && (city === null && !loading) || (city != null && !city?.name && !loading) && !wasOff)
        getLocation();

    return !city?.name || loading ? <>
        <TouchableOpacity
            style={styles.horizontal}
            onPress={getLocation}
        >
            <Icon style={{ marginTop: 5, marginHorizontal: 20 }} name="location-arrow" color={'black'} size={20} />
            <Text style={styles.getCoordsText}>Update</Text>
        </TouchableOpacity>
        <Loading wasOff />
    </> : (
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
            <Text>{JSON.stringify(city?.name)}</Text>
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