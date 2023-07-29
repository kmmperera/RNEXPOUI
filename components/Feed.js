import React ,{useState, useEffect}from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import {dummypostdata} from '../Data/Postdata';
import Feeditem from './Feeditem';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';

import {createpost,  getNewsFeed,redirectafterpost} from '../actions/admin/post';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Feed() {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const allusers = useSelector((state) => {return state.users});

    const postred = useSelector((state) => state.post);
    const {user: userred} = auth;
   // const [updates,setUpdates]=useState(false);

    const [feedposts, setFeedposts] = useState({});


    useEffect(() => {
        
        if (userred._id && userred._id != "") {
            let feeddetails = {loggeduser: userred._id, following: userred.following};
            dispatch(getNewsFeed(feeddetails));
        }
    }, [userred._id, userred,allusers.userbyid]);


    useEffect(() => {

        setFeedposts(postred.feed);
      

    }, [postred.feed]);

    useEffect(() => {


        const tokenget=async () =>{
            const token = await AsyncStorage.getItem('token');
           // const token = JSON.parse(val);
            return token;
           
          };
        const valoftoken =tokenget();

     //   console.log("token from redux is",auth.token);
     //   console.log("token from async storage ",valoftoken);

    }, []);

   useEffect(()=>{

    //console.log(allusers.userbyid);
  //  console.log(allusers.updatedUser);
   },[allusers]);

   useEffect(()=>{

   // console.log(auth.user);
   
   },[auth.user,allusers]);


  

    const navigation =useNavigation();
    return (
        <SafeAreaView style={Mystyles.feedcontainer}>



            <FlatList
                data={  Object.keys(feedposts)}

                renderItem={({item}) => {return (<Feeditem item={feedposts[item]}   Parentcompo="Feed"   />)}}
                keyExtractor={(item) => {return (feedposts[item]._id)}}
            />
            <View style={Mystyles.absoluteview}>
                <TouchableOpacity onPress={()=>{navigation.navigate("Createpost")}}>
                    <View style={Mystyles.plusview}>
                        <Feather name="plus" size={32} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            {
                 Object.keys(feedposts).length < 1 ? 
                 <View style={Mystyles.emptyview}>
                     <Text style={Mystyles.emptytext}>You do not have friends yet .Go to Followings tab to see friend suggestions</Text>
                 </View>
                 : null 
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
    emptyview:{justifyContent:"center",alignItems:"center",paddingHorizontal:30,position:"relative",bottom:300},
    emptytext:{textAlign:"center"},
});