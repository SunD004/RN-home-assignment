import * as React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import axios from 'axios'
import Toast from 'react-native-toast-message';
import GestureRecognizer from 'react-native-swipe-gestures';

import SearchBar from '../component/Search'
import Share from '../component/Share'
import Loading from '../component/Loading'
import CityWheather from '../component/CityWheather'
import { API_URL } from '../../config'

export default function SearchScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const [city, setCity] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    const sendSearchRequest = async () => {
        setLoading(true)
        await axios.post(`${API_URL}searchCity`, { search: searchQuery })
            .then(res => {
                setLoading(false)
                setCity(res.data)
            }).catch((e) => {
                setLoading(false)
                setCity(null)
                Toast.show({
                    type: 'error',
                    text1: 'Search failed',
                    text2: "Oups... " + e?.response?.data.message,
                })
            })
    }

    return (
        <ImageBackground source={require('../asset/bg.jpg')} style={{ flex: 1 }}>
            <GestureRecognizer
                onSwipeLeft={() => navigation.navigate('HomeScreen')}
                onSwipeRight={() => navigation.navigate('DisconnectScreen')}
                config={{
                    velocityThreshold: 0.3,
                    directionalOffsetThreshold: 80,
                    gestureIsClickThreshold: 5
                }}
                style={{
                    flex: 1,
                }}
            >
                <ScrollView>
                    <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} sendSearchRequest={sendSearchRequest} />
                    {city && <Share city={city} />}
                    {city && <CityWheather city={city} />}
                    {loading && <View style={{ marginTop: '50%' }}><Loading normal /></View>}
                </ScrollView>
            </GestureRecognizer>
        </ImageBackground>
    );
}