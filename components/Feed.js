import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import Feeditem from './Feeditem';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {createpost, getNewsFeed, redirectafterpost} from '../actions/admin/post';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Pageloader from './Pageloader';

export default function Feed() {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const allusers = useSelector((state) => {return state.users});

    const postred = useSelector((state) => state.post);
    const {user: userred} = auth;
    // const [updates,setUpdates]=useState(false);

    const [feedposts, setFeedposts] = useState({});
    const [feedreq, setFeedreq] = useState();


    // useEffect(() => {

    //     if (userred._id && userred._id != "") {
    //         let feeddetails = {loggeduser: userred._id, following: userred.following};
    //         dispatch(getNewsFeed(feeddetails));
    //     }
    // }, [userred._id, userred,allusers.userbyid, userred.pofilePicture]);

    useEffect(() => {

        if (userred._id && userred._id != "" && allusers && allusers.userbyid) {
            let feeddetails = {loggeduser: userred._id, following: allusers.followingsarray};
            dispatch(getNewsFeed(feeddetails));

            dispatch({type: "feedrequest"});

        }
    }, [userred._id,  allusers.followingsarray, userred.pofilePicture]);

    useEffect(() => {

        setFeedposts(postred.feed);


    }, [postred.feed]);

    useEffect(() => {

        setFeedreq(postred.feedrequest);
      //  console.log("feedrequest from reducer", postred.feedrequest);
      //  console.log("feedreq from state", feedreq);



    }, [postred.feedrequest]);



    useEffect(() => {


        const tokenget = async () => {
            const token = await AsyncStorage.getItem('token');
            // const token = JSON.parse(val);
            return token;

        };
        const valoftoken = tokenget();


    }, []);

    useEffect(() => {

    }, [allusers]);

    useEffect(() => {


    }, [auth.user, allusers]);






    const navigation = useNavigation();
    return (
        <SafeAreaView style={Mystyles.feedcontainer}>


            {
                Object.keys(feedposts).length > 0 ?
                    <FlatList
                        data={Object.keys(feedposts)}

                        renderItem={({item}) => {return (<Feeditem item={feedposts[item]} Parentcompo="Feed" />)}}
                        keyExtractor={(item) => {return (feedposts[item]._id)}}
                    />
                    :
                    <View style={Mystyles.emptyview}>
                        <Text style={Mystyles.emptytext}>You do not have friends yet .Go to Followings tab to see friend suggestions</Text>
                    </View>


            }
            <View style={Mystyles.absoluteview}>
                <TouchableOpacity onPress={() => {navigation.navigate("Createpost")}}>
                    <View style={Mystyles.plusview}>
                        <Feather name="plus" size={32} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            {
                feedreq == true ? <Pageloader /> : null
            }


        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({

    feedcontainer: {flex: 1},
    itemcontentetxt: {color: "red"},
    plusview: {
        backgroundColor: "#35b870", borderRadius: 8, elevation: 9, shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    absoluteview: {position: "absolute", bottom: 30, right: 20},
    emptyview: {flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 30, },
    emptytext: {textAlign: "center"},
});