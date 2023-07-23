import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userByID, } from '../actions/admin/getuseractions';

import {Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import {dummyfollowers} from '../Data/Followersdata';
import Followersitem from './Followersitem';


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
        <SafeAreaView style={Mystyles.followersconatiner}>



            <FlatList
                data={ allusers && allusers.userbyid[0] &&  allusers.userbyid[0].followers.length > 0 && allusers.userbyid[0].followers}

                renderItem={({item}) => {return (<Followersitem item={item} />)}}
                keyExtractor={(item) => {return ( item._id)}}
            />

        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({

    followersconatiner: {flex: 1, },

});