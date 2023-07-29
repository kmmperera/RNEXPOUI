import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {userByID, } from '../actions/admin/getuseractions';
import {getfriendsuggestions} from '../actions/admin/getuseractions';

import {Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import Followingsitem from './Followingsitem';
import Suggestions from './Suggestions';

export default function Followings() {

    const allusers = useSelector((state) => {return state.users});
    const auth = useSelector((state) => state.auth);
    const {user: userred} = auth;
    const [currentuser, setCurrentuser] = useState([]);
    const[currentsuggestions,setCurrentsuggestions]=useState();
    const[followedtoggle,setFollowedtoggle] =useState();
    const dispatch = useDispatch();


    useEffect(() => {
        if (userred._id != "" ) {
          
           const followingobj = allusers && allusers.userbyid[0] && allusers.userbyid[0].following.length > 0 ? allusers.userbyid[0].following :userred.following ;
           dispatch(getfriendsuggestions({id: userred._id, following: followingobj}));
           
        }
        allusers && setFollowedtoggle(allusers.followed);
    }, []);

    useEffect(() => {
        if (userred._id != "" ) {
            const followingobj = allusers && allusers.userbyid[0] && allusers.userbyid[0].following.length > 0 ? allusers.userbyid[0].following :userred.following ;
            dispatch(getfriendsuggestions({id: userred._id, following: followingobj}));
          
        }
    }, [allusers.userbyid]);


    useEffect(() => {
        if (userred && userred._id != "") {
            dispatch(userByID({id: userred._id}));
        }
    }, [userred._id, allusers.userafterpicupdated, allusers.updatedUser]);






    return (
        <SafeAreaView style={Mystyles.followingsconatiner}>

        { allusers && allusers.userbyid[0] && allusers.userbyid[0].following.length > 0 ?
         <View style={Mystyles.followingsview}>
         <Text style={Mystyles.suggestionstext}>Followings :</Text>
            <FlatList
                data={allusers && allusers.userbyid[0] && allusers.userbyid[0].following.length > 0 && allusers.userbyid[0].following}

                renderItem={({item}) => {return (<Followingsitem item={item} />)}}
                keyExtractor={(item,index) => {return (index)}}
            />
        </View>
        : null 
        }
        { 
            allusers && allusers.suggestions && Object.keys(allusers.suggestions).length > 0 ? 
        <View style={Mystyles.suggestionsview}>

        
        <Text style={Mystyles.suggestionstext}>Suggestions :</Text>

        
            <FlatList
                data={allusers && allusers.suggestions && Object.keys(allusers.suggestions).length > 0 && Object.keys(allusers.suggestions)}

                renderItem={({item}) => {return (<Suggestions item={allusers.suggestions[item]} />)}}
                keyExtractor={(item,index) => {return (index)}}
            />
        </View>
        : null
        }
        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({

    followingsconatiner: {flex: 1, },
    followingsview:{flex:1},
    suggestionsview:{flex:1},
    suggestionstext:{fontSize:12,fontWeight:700,color:"#35b870",marginLeft:20,marginVertical:5}

});