import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';


export default function Commentitem({Comments}) {

    const propicurl= Comments.postedBy.pofilePicture ? Comments.postedBy.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

    return (
        <View style={Mystyles.commentitemview}>

            <Image
                source={{uri:propicurl}}

                style={Mystyles.proimg}
            />
            <View style={Mystyles.commentcontainerview}>
                <Text style={Mystyles.pronametext}>{Comments.postedBy.firstName}</Text>
                <Text style={Mystyles.commentcontenttext}>{Comments.text}</Text>
            </View>
        </View>
    );
}

const Mystyles = StyleSheet.create({

    commentitemview: {
        flex: 1, paddingLeft: 40, flexDirection: "row", paddingVertical: 10, paddingRight: 30, backgroundColor: "#f5fff5",
        borderBottomColor: "#f0f2f0", borderBottomWidth: 1
    },
    proimg: {width: 44, height: 44, borderRadius: 22, marginRight: 20},
    pronametext: {fontSize: 14, fontWeight: 700},
    commentcontainerview: {paddingRight: 20},
    commentcontenttext: {flexShrink: 1},

});