import React from 'react';
import { useSelector} from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {EvilIcons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Feeditem({item,fromprofile,Parentcompo}) {
    const auth = useSelector((state) => state.auth);
   
    const {user: userred} = auth;

    const navigation =useNavigation();
    const propicurl= item && item.postedBy && item.postedBy.pofilePicture ? item.postedBy.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";
    let hasliked = item && item.likes && item.likes.includes(userred._id);

    return (
        <TouchableOpacity onPress={() => {navigation.navigate("Postdetails",{item, Parentcompo, previous_screen: fromprofile ? 'Profile' :""})}}>
            <View style={Mystyles.feedconatiner}>

                <View style={Mystyles.feeditemview}>
                    <View style={Mystyles.propicwreapper}>
                        <Image
                            style={Mystyles.profileimg}
                            source={{uri:propicurl}}


                        />
                    </View>
                    <View style={Mystyles.postcontentwrapper}>
                        <Text style={Mystyles.postedby}>{ `${item.postedBy.firstName} ` }</Text>

                        <Text style={Mystyles.postcontenttext}>{item.text}</Text>
                        <View style={Mystyles.iconview}>
                            <View style={Mystyles.iconwrapperview}>
                                <EvilIcons name="comment" size={18} color="black" />
                                <Text style={Mystyles.postactiondatatext}>{item.comments.length}</Text>
                            </View>
                            <View style={Mystyles.iconwrapperview}>
                                <EvilIcons style={hasliked ? Mystyles.likebtn : null }  name="like" size={18} color="black" />
                                <Text style={Mystyles.postactiondatatext}>{item.likes.length}</Text>
                            </View>
                           
                        </View>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const Mystyles = StyleSheet.create({
    feedconatiner: {backgroundColor: "#e8e6e6", borderBottomColor: "#b8b6b6", borderBottomWidth: 1, },
    feeditemview: {padding: 20, flexDirection: "row"},
    profileimg: {height: 44, width: 44, borderRadius: 22, flexShrink: 0, },
    propicwreapper: {marginRight: 20},
    postcontentwrapper: {flex: 1},
    postcontenttext: {paddingRight: 5, marginTop: 10},
    postedby: {fontSize: 14, fontWeight: 700},
    iconview: {flexDirection: "row", paddingRight: 30, marginTop: 15, flex: 1, justifyContent: "space-between"},
    iconwrapperview:{flexDirection:"row",flex:1,alignItems:"center"},
    postactiondatatext:{fontSize:11},
    likebtn:{color:"blue"}

});