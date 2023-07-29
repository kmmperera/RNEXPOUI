import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {deletecomment} from '../actions/admin/post';
import {MaterialIcons} from '@expo/vector-icons';
import Closemodal from './Closemodal';
import {MaterialCommunityIcons} from '@expo/vector-icons';


export default function Commentitem({Comments, postid, loggeduserid}) {

    const [deletedcommentid, setDeletedcommentid] = useState("");
    const [deletecomentopen, setDeletecomentopen] = useState(false);

    const dispatch = useDispatch();

    const propicurl = Comments.postedBy.pofilePicture ? Comments.postedBy.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

    const deletecommentfunc = (commentid, postid) => {

        if (commentid) {

            dispatch(deletecomment({postId: postid, comment: {_id: commentid}}));

        }

    }
    return (
        <View style={Mystyles.commentitemview}>

            <Image
                source={{uri: propicurl}}

                style={Mystyles.proimg}
            />
            <View style={Mystyles.commentcontainerview}>
                <Text style={Mystyles.pronametext}>{Comments.postedBy.firstName}</Text>
                <Text style={Mystyles.commentcontenttext}>{Comments.text}</Text>
            </View>
            <View style={Mystyles.dotsview}>

                <TouchableOpacity onPress={() => {setDeletecomentopen(true)}}>
                    <MaterialCommunityIcons name="dots-vertical" size={18} color="black" />

                </TouchableOpacity>

            </View>

            <View style={Mystyles.modalview}>
                <View style={Mystyles.absolutemodalview}>

                    <Closemodal visible={deletecomentopen}>
                        <View style={Mystyles.modalclosebtnview}>
                            <TouchableOpacity style={Mystyles.closemodalbtn} onPress={() => {setDeletecomentopen(false)}}>

                                <MaterialIcons name="cancel-presentation" size={24} color="black" />
                            </TouchableOpacity>


                        </View>
                        <View>
                            {Comments.postedBy._id == loggeduserid ?
                                <View style={Mystyles.deletebtnview}>
                                    <TouchableOpacity style={Mystyles.deletetouchable} onPress={() => {deletecommentfunc(Comments._id, postid)}}>

                                        <MaterialIcons name="cancel-presentation" size={24} color="red" />
                                        <Text style={Mystyles.deletetext}>Delete this Comment </Text>
                                    </TouchableOpacity>
                                </View>
                                : <View style={Mystyles.nopermissionview}>
                                    <Text style={Mystyles.nopermissiontext}>You do not have permissions to Delete this Comment!</Text>
                                </View>
                            }
                        </View>
                    </Closemodal>

                </View>


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
    deletecomentview: {position: "relative", top: 5, right: 5, flex: 1, alignItems: "flex-end"},

    dotsview:{flexDirection:"row",justifyContent:"flex-end",flex:1},
    modalview: {},
    absolutemodalview: {},
    deletetouchable: {flexDirection: "row", alignItems: "center", marginTop: 40},
    deletetext: {marginLeft: 10, fontSize: 16, fontWeight: 500},
    closemodalbtn: {flexDirection: "row", justifyContent: "flex-end"},
    modalclosebtnview: {flexDirection: "row", justifyContent: "flex-end"},
    nopermissionview: {flexDirection: "row", alignItems: "center", marginTop: 40},
    nopermissiontext: {textAlign: "center"},
    deletebtnview:{flexDirection:"row",justifyContent:"flex-start"}


});