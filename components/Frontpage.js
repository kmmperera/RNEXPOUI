import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView} from 'react-native';


import SvgComponent from "./Frontimg.js";
import Header from './Header';


export default function Frontpage({navigation}) {

    
    

    return (
        <SafeAreaView style={Mystyles.safeareaview}>
            <Header  />
            <View style={Mystyles.svgview}>

                <SvgComponent />
            </View>
            <View>
                <Text style={Mystyles.bigtext}>Create an account</Text>
                <Text style={Mystyles.smalltext}>Register by filling sign up form</Text>
            </View>
            <View>
                <Text style={Mystyles.bigtextblack}>Make posts</Text>
                <Text style={Mystyles.smalltext}>Users are allowed to post and delete own posts</Text>
            </View>
            <View>
                <Text style={Mystyles.bigtext}>Comment on posts</Text>
                <Text style={Mystyles.smalltext}>Users are allowed to comment and delete own comments</Text>
            </View>
            <View>
                <Text style={Mystyles.bigtextblack}>Find friends</Text>
                <Text style={Mystyles.smalltext}>Search for friends & follow them</Text>
            </View>
            <View>
                <Text style={Mystyles.bigtext}>Chat with friends</Text>
                <Text style={Mystyles.smalltext}>Start a conversation by sending a message .Users can do real time chat</Text>
            </View>

            <View>
                <Text style={Mystyles.tryittext}>Try it</Text>
                <Text style={Mystyles.tryitsubtext}>This is not an end product by any means.This is a demo app to demonstrate some features.</Text>
            </View>
        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({

    safeareaview: {flex: 1, },
    svgview: {paddingHorizontal: 20, height: 200},
    bigtext: {color: "#6b4de6", fontSize: 16, fontWeight: 700, paddingHorizontal: 20, marginTop: 15},
    bigtextblack: {fontSize: 16, fontWeight: 700, paddingHorizontal: 20, marginTop: 15},
    smalltext: {color: "grey", paddingHorizontal: 20},
    tryittext: {color: "#6b4de6", fontSize: 24, fontWeight: 700, marginTop: 15, textAlign: "center"},
    tryitsubtext: {color: "grey", paddingHorizontal: 20, fontSize: 12, marginTop: 10, textAlign: "center"}

});



