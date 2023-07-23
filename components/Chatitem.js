import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';


export default function Chatitem({item,loggeduser}) {
    const ownchat = item.sender == loggeduser  ? true : false;
    return (
        <View style={ownchat == true ? Mystyles.ownchatbigcontainer : Mystyles.chatbigconatiner  }>
        <View style={ownchat == true ?  Mystyles.ownchatitemview : Mystyles.chatitemview }>

            <Text style={ownchat == true ? Mystyles.ownchattext : Mystyles.chattext  }>{item.message}</Text>

        </View>
        </View>
    );
}

const Mystyles = StyleSheet.create({

    chatitemview: {
        backgroundColor: "#f5fff5", marginBottom: 20, maxWidth: 240, borderColor: "#f5fff5",
        borderWidth: 1, borderRadius: 30, borderBottomLeftRadius: 0

    },
    chatbigconatiner:{flex:1,alignItems:"flex-start"},
    ownchatbigcontainer:{flex:1,alignItems:"flex-end"},
    ownchatitemview: {
        backgroundColor: "#35b870", marginBottom: 20, maxWidth: 240, borderColor: "#35b870",
        borderWidth: 1, borderRadius: 30, borderBottomRightRadius: 0,

    },
    chattext: {paddingVertical: 20, paddingHorizontal: 20},
    ownchattext: {paddingVertical: 20, paddingHorizontal: 20,color:"#fff"},

});