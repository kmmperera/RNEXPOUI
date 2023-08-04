import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Image, FlatList, Platform, TextInput} from 'react-native';
import {AntDesign} from '@expo/vector-icons';
import {useNavigation, useRoute} from "@react-navigation/native";
import Feeditem from './Feeditem';
import {MaterialIcons} from '@expo/vector-icons';

import {sendnotifications} from '../actions/admin/notifications';

import {getpostbyuser, getpostforshowuser} from '../actions/admin/post';
import {userByID, showuserByID} from '../actions/admin/getuseractions';

import Backbutton from './Backbutton';


export default function Usersprofile() {

    const navigation = useNavigation();
    const {params: {showuserid}, } = useRoute();


    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const postred = useSelector((state) => state.post);
    const allusers = useSelector((state) => state.users);

    const {user: userred} = auth;

    const [ownposts, setOwnposts] = useState({});

    const [currentuser, setCurrentuser] = useState([]);

    const [message, setMessage] = useState("");
    const [reciever, setReciever] = useState("");
    const [openmessagebox, setOpenmessagebox] = useState(false);

    const messegeref = useRef(null);


    const propicurl = currentuser[0] && currentuser[0].pofilePicture ? currentuser[0].pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";




    useEffect(() => {
        let user = {id: showuserid};
        dispatch(showuserByID({id: showuserid}));
        dispatch(getpostforshowuser(user));

    }, [showuserid]);


    useEffect(() => {

        setCurrentuser(allusers.showuserbyid);

    }, [allusers.showuserbyid])


    useEffect(() => {

        setOwnposts(postred.showuserposts);


    }, [postred.showuserposts]);


    useEffect(() => {
        setReciever(showuserid);
    }, [showuserid]);

    const sendNoti = () => {
        if (message != "" && reciever != "" && userred._id != "") {
            let notifiction = {message: message, reciever: reciever, sender: userred._id};

            dispatch(sendnotifications(notifiction));
            setMessage("");
            setOpenmessagebox(false);
            messegeref.current.clear();

        }
    }

    const openmessageboxfunc = () => {
        setOpenmessagebox(true);
    }

    const closemessebeboxfunc = () => {
        setOpenmessagebox(false);
        setMessage("");
        messegeref.current.clear();
    }


    return (
        <SafeAreaView style={Mystyles.profileview}>
            <View style={Mystyles.statusbarempty}></View>

            <Backbutton headername="Profile" backscreen="Feed" />

            <View style={Mystyles.aboutview}>
                <Image source={{uri: propicurl}}
                    style={Mystyles.propic}
                />
                {currentuser[0] ?
                    <Text style={Mystyles.nametext}>{`${currentuser[0].firstName} ${currentuser[0].lastName}`}</Text>
                    : null
                }
                <TouchableOpacity
                    style={Mystyles.changepropictouchable}
                    onPress={openmessageboxfunc}>
                    <Text style={Mystyles.changepropictext}>Message</Text>
                </TouchableOpacity>



            </View>

            <View style={Mystyles.postsview}>
            </View>
            <FlatList
                data={Object.keys(ownposts)}

                renderItem={({item}) => {return (<Feeditem item={ownposts[item]} Parentcompo="Userprofile" />)}}
                keyExtractor={(item) => {return (ownposts[item]._id)}}
            />

            {openmessagebox == true ?
                <View style={Mystyles.messageboxview}>
                    <View style={Mystyles.closebtnview}>
                        <TouchableOpacity onPress={closemessebeboxfunc}>
                            <MaterialIcons name="cancel-presentation" size={24} color="red" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={Mystyles.messagetexts}
                        placeholder="Write a message"
                        defaultValue={message}
                        onChangeText={(message) => {setMessage(message);}}
                        editable
                        multiline
                        numberOfLines={4}
                        maxLength={40}
                        ref={messegeref}

                    />
                    <View style={Mystyles.sendbtnview}>
                        <TouchableOpacity onPress={sendNoti} style={Mystyles.sendtouchable}>
                            <Text style={Mystyles.sendtext}> Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
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
    absoluteview: {position: "absolute", bottom: 30, right: 20},
    messageboxview: {
        position: "absolute", bottom: 260, right: 10, backgroundColor: "#fff", width: 300, height: 200,
        padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#b8b6b6"
    },
    sendtouchable: {marginTop: 20, backgroundColor: "#35b870", borderRadius: 12},
    sendtext: {color: "#fff", textAlign: "center", fontSize: 16, fontWeight: 700, padding: 5, },
    messagetexts: {backgroundColor: "#f5fff5", padding: 5},
    sendbtnview: {alignItems: "flex-end"},
    closebtnview: {alignItems: "flex-end", padding: 5}




});