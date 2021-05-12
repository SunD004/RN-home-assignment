import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNLocation from 'react-native-location';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios'
import { useIsFocused } from '@react-navigation/native'
import ConnectivityManager from 'react-native-connectivity-status'

import { API_URL } from '../../config'

import Loading from '../component/Loading'
import Update from '../component/Update'
import ActualWheather from '../component/ActualWheather'

export default function HomeScreen({ navigation }) {
    const isFocused = useIsFocused()
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
                    const userId = JSON.parse(await AsyncStorage.getItem('user'))
                    await axios.post(`${API_URL}actualWheather`, { latitude: info.coords.latitude, longitude: info.coords.longitude, userId })
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

    const chooseBackgroundColor = () => {
        const value = parseInt(city.main["feels_like"])
        switch (true) {
            case value <= 17:
                return '#1976D2'
            case value >= 18:
                return '#fbc02d'
            default:
                return 'white'
        }
    }

    if (isFocused && (city === null && !loading) || (city != null && !city?.name && !loading) && !wasOff)
        getLocation();

    return !city?.name || loading ? <ImageBackground source={require('../asset/bg.jpg')} style={{ flex: 1 }}>
        <Update func={getLocation} />
        <Loading wasOff={wasOff} />
    </ImageBackground> : (
        <ImageBackground source={require('../asset/bg.jpg')} style={{ flex: 1 }}>
            {/*<View style={{ backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column' }}>*/}
            <Update func={getLocation} />
            <ActualWheather city={city} />
            {/*</View>*/}
        </ImageBackground>
    );
}