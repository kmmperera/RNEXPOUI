import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getfriendsuggestions, follow, unfollow} from '../actions/admin/getuseractions';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";



export default function Suggestions({item}) {

    const navigation = useNavigation();

    const allusers = useSelector((state) => {return state.users});
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const {user: userred} = auth;
    const [followid, setFollowid] = useState("");
    const [unfollowid, setUnfollowid] = useState("");
    // const[followdbyloggeduser,setFollowdbyloggeduser] =useState(false);
    const followdbyloggeduser = item.followers.includes(userred._id);

    //    useEffect(()=>{

    //     if(item.followers.includes(userred._id) == true ){
    //         setFollowdbyloggeduser(true);
    //     }
    //     console.log("Followed :",followdbyloggeduser);
    //    },[item]);


    useEffect(() => {

        if (followid && followid != "") {
            dispatch(follow({followingid: followid, loggeduser: userred._id}));
            dispatch({type: "addAFollower", payload: {followingid: followid}});
        }
    }, [followid]);

    useEffect(() => {
        if (unfollowid && unfollowid != "") {
            dispatch(unfollow({followingid: unfollowid, loggeduser: userred._id}));
            dispatch({type: "removeAFollower", payload: {followingid: unfollowid}});
        }
    }, [unfollowid]);

    useEffect(() => {

    }, [allusers.updatedUser, auth])

    const propicurl = item.pofilePicture ? item.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";

    return (


        <View style={Mystyles.followingcontainer}>
            <View style={Mystyles.profilewrapper}>
                <View style={Mystyles.imageconatinerview}>
                    <Image
                        style={Mystyles.propric}
                        source={{uri: propicurl}}
                    />
                </View>
                <View style={Mystyles.textconatainerview}>
                    <TouchableOpacity onPress={() => {item._id == userred._id ? navigation.navigate("Profile") : navigation.navigate("Userprofile", {showuserid: item._id})}}>

                        <Text style={Mystyles.nametext}>{item.firstName}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {followdbyloggeduser == true ? setUnfollowid(item._id) : setFollowid(item._id)}} style={Mystyles.followingtouchable}>
                        <Text style={Mystyles.followingtext}>{followdbyloggeduser == true ? "Unfollow" : "Follow"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={Mystyles.actionbtnview}>
                <TouchableOpacity>
                    <MaterialCommunityIcons style={Mystyles.icon} name="dots-vertical" size={18} color="black" />

                </TouchableOpacity>
            </View>

        </View>




    );
}

const Mystyles = StyleSheet.create({

    followingcontainer: {flex: 1, flexDirection: "row", marginTop: 20, justifyContent: "space-between", },
    profilewrapper: {flex: 1, flexDirection: "row", },
    imageconatinerview: {marginLeft: 40, },
    propric: {height: 44, width: 44, borderRadius: 22},
    textconatainerview: {flex: 1, marginLeft: 20},
    nametext: {fontSize: 14, fontWeight: 700, },
    actionbtnview: {flexDirection: "row", justifyContent: "flex-end", marginRight: 20, },
    followingtouchable: {marginTop:5},
    followingtext: {},
    icon: {flex: 1}


});