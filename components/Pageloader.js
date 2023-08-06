import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

export default function Pageloader() {

    return (
        <View style={Mystyles.loadingview}>
            <ActivityIndicator size="large" color="#35b870" />
        </View>

    );
}

const Mystyles = StyleSheet.create({
    loadingview:{position:"absolute",top:"50%",right:"50%",  transform: [{translateX: 20}],}

});