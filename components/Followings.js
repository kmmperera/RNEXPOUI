import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userByID, } from '../actions/admin/getuseractions';

import {Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import {dummyfollowings} from '../Data/Followingsdata';
import Followingsitem from './Followingsitem';


export default function Followings() {

    const allusers = useSelector((state) => {return state.users});
    const auth = useSelector((state) => state.auth);
    const {user: userred} = auth;
    const [currentuser, setCurrentuser] = useState([]);
    
    const dispatch = useDispatch();



    useEffect(() => {
        if (userred && userred._id != "") {
            dispatch(userByID({id: userred._id}));
        }
    }, [userred._id, allusers.userafterpicupdated, allusers.updatedUser]);

    useEffect(() => {
        setCurrentuser(allusers.userbyid);
       // console.log(allusers.userbyid);
    }, [allusers.userbyid, currentuser]);



    return (
        <SafeAreaView style={Mystyles.followingsconatiner}>



            <FlatList
                data={allusers && allusers.userbyid[0] &&  allusers.userbyid[0].following.length > 0 && allusers.userbyid[0].following}

                renderItem={({item}) => {return (<Followingsitem item={item}/>)}}
                keyExtractor={(item) => {return (item._id)}}
            />

        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({

    followingsconatiner: {flex:1,},
  
});