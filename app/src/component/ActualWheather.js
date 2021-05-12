
import React from 'react';
import { Text, Dimensions, StyleSheet, View, ImageBackground } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ActualWheather = ({ city }) => {
    console.log(city)

    const chooseIcon = () => {
        const value = parseInt(city.main["feels_like"])
        switch (true) {
            case value <= 17:
                return 'cloud-outline'
            case value >= 1:
                return 'weather-sunny'
            default:
                return 'weather-sunny'
        }
    }

    const chooseText = () => {
        const value = parseInt(city.main["feels_like"])
        switch (true) {
            case value <= 17:
                return 'Cloudly'
            case value >= 1:
                return 'Sunny'
            default:
                return 'Good weather'
        }
    }

    return (
        <>
            <View style={[styles.horizontal, styles.leftBorder, { position: 'absolute', top: 10 }]}>
                <Icon style={styles.icons} name="bell-o" color={"black"} size={20} />
                <Text style={styles.getCoordsText}>{city.sys.country}</Text>
            </View>
            <View style={[styles.horizontal, styles.leftBorder, { alignSelf: 'center', borderTopRightRadius: 10, borderBottomLeftRadius: 10, borderBottomRightRadius: 0, marginTop: '15%' }]}>
                <IconMaterialCommunityIcons style={styles.icons} name="map-marker-outline" color={"black"} size={25} />
                <Text style={styles.textCity}>{city.name}</Text>
            </View>


            <View style={[styles.horizontal, { justifyContent: 'space-between', marginTop: '10%' }]}>
                <View style={[styles.horizontal, styles.leftBorder]}>
                    <IconMaterialCommunityIcons style={styles.icons} name={chooseIcon()} color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>{chooseText()}</Text>
                </View>
                <View style={[styles.horizontal, styles.rightBorder]}>
                    <IconMaterialCommunityIcons style={styles.icons} name={'water-outline'} color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>{city.main.humidity}%</Text>
                </View>
            </View>

            <View style={[styles.cardsRound, { width: "60%", alignSelf: 'center', marginTop: 50 }]}>
                <View style={[styles.horizontal]}>
                    <Icon style={styles.icons} name="hand-o-right" color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>Actual {city.main.temp}°C</Text>
                </View>

                <View style={[styles.horizontal]}>
                    <Icon style={styles.icons} name="hand-o-right" color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>Feels Like {city.main["feels_like"]}°C</Text>
                </View>

                <View style={[styles.horizontal]}>
                    <Icon style={styles.icons} name="hand-o-right" color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>Max {city.main.temp_max}°C</Text>
                </View>

                <View style={[styles.horizontal]}>
                    <Icon style={styles.icons} name="hand-o-right" color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>Min  {city.main.temp_min}°C</Text>
                </View>
            </View>

            <View style={[styles.cardsRound, { width: '70%', alignSelf: 'center', marginTop: 50, paddingTop: 5, paddingBottom: 5 }]}>
                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="map-o" color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>Latitude {city.coord.lat}</Text>
                </View>
                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="map-o" color={"black"} size={20} />
                    <Text style={styles.getCoordsText}>Longitude {city.coord.lon}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    icons: {
        marginHorizontal: 10
    },
    leftBorder: {
        opacity: 0.9,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderColor: '#282828',
        borderWidth: 2,
        marginLeft: -10,
        paddingRight: 20,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    rightBorder: {
        opacity: 0.9,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: '#282828',
        borderWidth: 2,
        marginRight: -10,
        paddingRight: 20,
        paddingLeft: 0,
        backgroundColor: 'white'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cardsRound: {
        opacity: 0.9,
        borderColor: '#282828',
        borderWidth: 2,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    getCoordsText: {
        opacity: 0.9,
        marginVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic',
        color: '#282828'
    },
    textCity: {
        opacity: 0.8,
        marginVertical: 5,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#282828'
    }
});

export default ActualWheather;