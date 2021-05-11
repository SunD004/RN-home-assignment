
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

const Update = ({ func }) => {
    return (
        <TouchableOpacity
            style={styles.horizontal}
            onPress={func}
        >
            <Icon style={{ marginTop: 5, marginHorizontal: 20 }} name="refresh" color={'black'} size={20} />
            <Text style={styles.getCoordsText}>Update</Text>
        </TouchableOpacity>
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

export default Update;