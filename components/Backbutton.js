import React from 'react';
import {View, Text,StyleSheet,TouchableOpacity} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import { useNavigation} from "@react-navigation/native";

export default function Backnutton({headername, backscreen}) {

    const navigation = useNavigation();

    return (

        <View style={Mystyles.headerview}>
            <View style={Mystyles.backbtntouchableview}>
                <TouchableOpacity style={Mystyles.backbtntouchable} onPress={() => {navigation.navigate(backscreen);}}>
                    <AntDesign name="arrowleft" size={30} color="#35b870" />

                </TouchableOpacity>
            </View>
            <View style={Mystyles.headertextview}>
                <Text style={Mystyles.headertext}>{headername}</Text>
            </View>
        </View>

    );
}

const Mystyles = StyleSheet.create({

    headerview: {position: "relative", height: 40, flexDirection: "row", alignItems: "center", paddingHorizontal: 10,justifyContent:"center" },
    backbtntouchableview: {position:"absolute",left:20},
    headertextview: {},
    backbtntouchable: {},
    headertext: {fontSize: 16, fontWeight: 600, },

});
