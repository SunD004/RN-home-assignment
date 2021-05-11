
import React from 'react';
import { Text, Dimensions, StyleSheet, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ActualWheather = ({ city }) => {
    console.log(city)

    const chooseIcon = () => {
        const value = parseInt(city.main["feels_like"])
        switch (true) {
            case value <= 17:
                return 'cloud'
            case value >= 1:
                return 'sun-o'
            default:
                return 'sun-o'
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
            <View style={styles.horizontal}>
                <Icon style={styles.icons} name="home" color={"white"} size={30} />
                <Text style={styles.textCity}>{city.name}</Text>
            </View>

            <View style={styles.horizontal}>
                <Icon style={styles.icons} name="bell-o" color={"white"} size={20} />
                <Text style={styles.getCoordsText}>{city.sys.country}</Text>
            </View>

            <View style={[styles.horizontal, { marginTop: '10%' }]}>
                <Icon style={styles.icons} name={chooseIcon()} color={"white"} size={20} />
                <Text style={styles.getCoordsText}>{chooseText()}</Text>
            </View>

            <View style={[styles.cardsRound, { width: "60%", alignSelf: 'center', marginTop: 20, position: 'absolute', bottom: '30%' }]}>
                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="hand-o-right" color={"white"} size={20} />
                    <Text style={styles.getCoordsText}>Actual: {city.main.temp}°C</Text>
                </View>

                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="hand-o-right" color={"white"} size={20} />
                    <Text style={styles.getCoordsText}>Feels Like: {city.main["feels_like"]}°C</Text>
                </View>

                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="hand-o-right" color={"white"} size={20} />
                    <Text style={styles.getCoordsText}>Max: {city.main.temp_max}°C</Text>
                </View>

                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="hand-o-right" color={"white"} size={20} />
                    <Text style={styles.getCoordsText}>Min: {city.main.temp_min}°C</Text>
                </View>
            </View>

            <View style={{ position: 'absolute', bottom: 1 }}>
                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="location-arrow" color={"white"} size={20} />
                    <Text style={styles.getCoordsText}>Latitude: {city.coord.lat}</Text>
                </View>
                <View style={styles.horizontal}>
                    <Icon style={styles.icons} name="location-arrow" color={"white"} size={20} />
                    <Text style={styles.getCoordsText}>Longitude: {city.coord.lon}</Text>
                </View>
            </View>



            {/* <Text>Latitude: {city.coord.lat} </Text>
            <Text>Longitude: {city.coord.lon} </Text>
            <Text>{city.name}</Text> */}
        </>
    );
}

const styles = StyleSheet.create({
    icons: {
        marginHorizontal: 7
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    cardsRound: {
        borderRadius: 50,
        borderColor: 'black',
        borderWidth: 3,
        shadowOpacity: 0.25,
        shadowRadius: 4.84,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    getCoordsText: {
        marginVertical: 5,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontStyle: 'italic'
    },
    textCity: {
        marginVertical: 5,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default ActualWheather;