
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Share } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ShareCp = ({ city }) => {

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `Hey 👋! in ${city.name} the actual wheather is ${city.main.temp}°C and it's feels like ${city.main["feels_like"]}°C ! The actual humidity is ${city.main.humidity}% See you soon my friends 👋! `,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <TouchableOpacity
            style={styles.horizontal}
            onPress={onShare}
        >
            <Icon style={{ marginTop: 5, marginHorizontal: 20, opacity: 0.9, }} name="share-square-o" color={'white'} size={20} />
            <Text style={styles.getCoordsText}>Share</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    horizontal: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        alignContent: 'center',
        alignSelf: 'flex-end',
        marginTop: 10,
    },
    getCoordsText: {
        opacity: 0.9,
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    }
});

export default ShareCp;