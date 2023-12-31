import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import * as ImagePicker from 'expo-image-picker';

import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, Platform} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import Feeditem from './Feeditem';
import {Feather} from '@expo/vector-icons';

import {getpostbyuser} from '../actions/admin/post';
import {changeProfilePic, userByID} from '../actions/admin/getuseractions';

import Backbutton from './Backbutton';
import Pageloader from './Pageloader';


export default function Profile() {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const postred = useSelector((state) => state.post);
    const allusers = useSelector((state) => {return state.users});

    const {user: userred} = auth;

    const [ownposts, setOwnposts] = useState([]);

    const [currentuser, setCurrentuser] = useState([]);
    const [profilepicture, setProfilepicture] = useState(null);
    const [profilepictureobj, setProfilepictureobj] = useState(null);
    const [propicloading, setPropicloading] = useState();
    const [postloading, setPostloading] = useState();
    const [propicurl, setPropicurl] = useState(userred.pofilePicture ? userred.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg");


    useEffect(() => {

        setPropicurl(userred.pofilePicture ? userred.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg");

    }, [userred.pofilePicture, allusers.userbyid]);



    useEffect(() => {
        let user = {id: userred._id};
        dispatch(getpostbyuser(user));
        dispatch({type: "userpostsloading"});

    }, [userred.pofilePicture]);



    useEffect(() => {

        if(postred && postred.feed){ 

            let keysarray = Object.keys(postred.feed);
            let mypostsarry =[];
            for(let i=0; i < keysarray.length ; i++){
                if(userred._id ==  postred.feed[keysarray[i]].postedBy._id ){
                    mypostsarry.push(   postred.feed[keysarray[i]] );
                }
      
            }
            
            setOwnposts(mypostsarry);
    
           // console.log(mypostsarry);
    
             }
    
    }, [postred.feed]);

    useEffect(() => {

        if(postred && postred.feed){ 

        let keysarray = Object.keys(postred.feed);
        let mypostsarry =[];
        for(let i=0; i < keysarray.length ; i++){
            if(userred._id ==  postred.feed[keysarray[i]].postedBy._id ){
                mypostsarry.push(   postred.feed[keysarray[i]] );
            }
  
        }
        
        setOwnposts(mypostsarry);

      //  console.log(mypostsarry);

         }
        
    }, []);


    useEffect(() => {

        checkpermission();

    }, []);

    useEffect(() => {

        setPropicloading(allusers.profilepicloading);

    }, [allusers.profilepicloading]);


    useEffect(() => {

        setPostloading(postred.ownerpostsloading);

    }, [postred.ownerpostsloading]);




    const navigation = useNavigation();


    const submitProductForm = () => {
        if (profilepicture) {
            const form = new FormData();

            let uriArray = profilepicture.split(".");
            let fileType = uriArray[uriArray.length - 1];

            form.append("id", userred._id);
            form.append("profilepic", {


                uri: profilepicture,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,


            });

            // setFormobj(form);
            dispatch(changeProfilePic(form));
            dispatch({type: "profilepicloading"});


            setProfilepicture(null);

        }
    };

    const checkpermission = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };




    const pickImage = async () => {


        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            // setProfilepicture(result.assets[0].uri);
            setProfilepicture(result.assets[0].uri);
            setProfilepictureobj(result.assets[0]);
            console.log("result obj from image picker", result);


        }
    };


    return (
        <SafeAreaView style={Mystyles.profileview}>
            <View style={Mystyles.statusbarempty}></View>

            <Backbutton headername="Profile" backscreen="Feed" />

            <View style={Mystyles.aboutview}>
                <Image source={{uri: profilepicture != null ? profilepicture : propicurl}}
                    style={Mystyles.propic}
                />
                <Text style={Mystyles.nametext}>{`${userred.firstName} ${userred.lastName}`}</Text>
                {
                    profilepicture == null ?
                        <TouchableOpacity
                            style={Mystyles.changepropictouchable}
                            onPress={pickImage}>
                            <Text style={Mystyles.changepropictext}>Change Profile Picture</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={Mystyles.changepropictouchable}
                            onPress={submitProductForm}>
                            <Text style={Mystyles.changepropictext}>UPDATE</Text>
                        </TouchableOpacity>
                }
            </View>

            <View style={Mystyles.postsview}>
            </View>
            { ownposts && ownposts.length > 0 ? 
            <FlatList
                data={ownposts}

                renderItem={({item}) => {
                    return (<Feeditem item={item} fromprofile={true} Parentcompo="Profile"
                    />)
                }}
                keyExtractor={(item,index) => {return index}}
            />
            :null
            }
            <View style={Mystyles.absoluteview}>
                <TouchableOpacity onPress={() => {navigation.navigate("Createpost")}}>
                    <View style={Mystyles.plusview}>
                        <Feather name="plus" size={32} color="#fff" />
                    </View>
                </TouchableOpacity>
            </View>
            {
                postloading || propicloading == true ? <Pageloader /> : null
            }


        </SafeAreaView >
    );
}

const Mystyles = StyleSheet.create({

    profileview: {flex: 1},
    statusbarempty: {height: 30},
    headerview: {height: 70, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, position: "relative"},
    headertext: {fontSize: 16, fontWeight: 600, position: "absolute", left: "50%", transform: [{translateX: "-50%"},]},
    aboutview: {marginTop: 20, justifyContent: "center", alignItems: "center"},
    postsview: {marginTop: 20},
    propic: {width: 80, height: 80, borderRadius: 40},
    nametext: {fontSize: 16, fontWeight: 700, marginTop: 8, color: "#35b870"},
    changepropictext: {padding: 10, color: "#fff"},
    changepropictouchable: {marginTop: 10, backgroundColor: "#35b870", borderRadius: 18},
    plusview: {
        backgroundColor: "#35b870", borderRadius: 8, elevation: 9, shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    absoluteview: {position: "absolute", bottom: 30, right: 20}



});