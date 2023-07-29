import React, {useState, useEffect, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {sendnotifications} from '../actions/admin/notifications';
import {getchat} from '../actions/admin/chats';
import {getallusers, getInbox} from '../actions/admin/getuseractions';
import {io} from "socket.io-client";


import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, FlatList, ScrollView, TextInput} from 'react-native';
import Messagesitem from './Messageitem';
import {dummymessages} from '../Data/Messagesdata';
import Chatitem from './Chatitem';


export default function Messages() {

    const [inboxuserid, setInboxuserid] = useState(1);

    const dispatch = useDispatch();

    const auth = useSelector((state) => {return state.auth});
    const chatsred = useSelector((state) => {return state.chats});
    const chatboxuser = useSelector ((state)=>{return state.noti});
    const {user: userred} = auth;
    const [message, setMessage] = useState("");
    const [reciever, setReciever] = useState("");
    const [recievername, setRecievername] = useState("");

    const allusers = useSelector((state) => {return state.users});
    const [displaymessages, setDisplaymessages] = useState(chatsred.chats);
    let localchat = chatsred.chats;
    let chatuser = {_id: reciever, loggedid: userred._id};

    const socket = useRef(null);
    const flatlistref =useRef(null);
    const textInputref =useRef(null);
    const flatlisttwo =useRef(null);

    const [arrivalMessage, setArrivalMessage] = useState({sender: "", message: ""});
    const dummyimg = "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";


    const setRef = useCallback(node => {
        if (node) {
            node.scrollIntoView({smooth: true})
        }
    }, [])

    useEffect(() => {
        dispatch(getallusers());

    }, []);

    useEffect(() => {
        if (userred && userred._id != "") {
            dispatch(getInbox({id: userred._id}));
        }
    }, [userred._id,chatboxuser.notifictions]);

    useEffect(() => {

       // console.log(allusers.inbox);

    }, [allusers.inbox]);
    useEffect(() => {
        if (reciever !== "" && reciever !== "notselected") {
            dispatch(getchat(chatuser));
        }
    }, [displaymessages]);


    useEffect(() => {
        if (socket.current == null) {
            socket.current = io("wss://chatmev3.onrender.com");
            socket.current.emit("addUser", userred._id);
        }

        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.sender,
                message: data.message,
            });

            console.log(data);

        });
        return () => socket.current.disconnect();
    }, []);

    useEffect(() => {
        socket.current.on("welcome", (message) => {
            console.log(message);

        });
        console.log(arrivalMessage);
    }, [userred._id]);




    useEffect(() => {
        if (allusers.inbox && allusers.inbox.length > 0) {
            setReciever(allusers.inbox[0].messenger._id);
        }
    }, [allusers]);


    useEffect(() => {
        if (arrivalMessage.message !== "") {
            let notifiction = {message: arrivalMessage.message, reciever: userred._id, sender: arrivalMessage.sender};
            localchat = [...localchat, notifiction];
            dispatch({type: "newmessage", payload: {localchat}});

        }
        console.log(arrivalMessage);
    }, [arrivalMessage]);
    useEffect(() => {
        if (reciever !== "" && reciever !== "notselected") {
            getChat();
        }
    }, [reciever]);


    useEffect(() => {
        if(localchat.length > 0){ 
            localchat.length && flatlistref.current && flatlistref.current.scrollToIndex({animated: true, index: localchat.length - 1 });
        }
        // return () => {
        //     flatlistref.current = null;
        // }
      },[reciever]);

    const sendNoti = () => {
        let notifiction = {message: message, reciever: reciever, sender: userred._id};
        const fakeid=Math.floor(Math.random() * 10000);
        const modifiednotification ={...notifiction,_id:fakeid}
        //localchat = [...localchat, notifiction];
        localchat = [...localchat, modifiednotification];
        dispatch({type: "newmessage", payload: {localchat}});
        dispatch(sendnotifications(notifiction));
        setMessage("");
    }

    const goOnline = () => {
        socket.current.emit("addUser", userred._id);
        socket.current.on("welcome", (message) => {setArrivalMessage(message)});
    }
    const socketMessage = () => {
        if(reciever != "") { 
        let notifiction = {message: message, reciever: reciever, sender: userred._id};
        const fakeid=Math.floor(Math.random() * 10000);
        const modifiednotification ={...notifiction,_id:fakeid}
        //localchat = [...localchat, notifiction];
        localchat = [...localchat, modifiednotification];

      //  localchat = [...localchat, notifiction];
        dispatch({type: "newmessage", payload: {localchat}});
        socket.current.emit("sendMessage", {sender: userred._id, reciever: reciever, message: message});
        setMessage("");
        textInputref.current.clear();
        }
    }


    const getChat = () => {


        dispatch(getchat(chatuser));
    }



    return (
        <SafeAreaView style={Mystyles.messagesview}>
            <View style={Mystyles.headerview}>
                <Text style={Mystyles.headertext}>Messages</Text>

            </View>
            <View style={Mystyles.flatlistcontainerview}>

                <FlatList
                    data={allusers.inbox && allusers.inbox}

                    renderItem={({item}) => {return (<Messagesitem item={item} usersetter={setReciever} inboxuserid={reciever} />)}}
                    keyExtractor={(item) => {return (item.messenger._id)}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                />

            </View>
            <View style={Mystyles.chatboxview}>
                <View style={Mystyles.flatlistconatinerview}>
                    <FlatList
                        data={localchat && localchat}
                        ref={flatlisttwo  }
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) => {return (<Chatitem item={item} loggeduser={userred._id} />)}}
                        keyExtractor={(item) => {return (item._id)}}

                        onContentSizeChange={() => {
                            if (flatlisttwo.current && flatlisttwo.current.scrollToIndex && localchat && localchat.length) {
                                flatlisttwo.current.scrollToIndex({  index: localchat.length - 1 });
                            }
                        }}
                        onScrollToIndexFailed={() => {}}
                    
                    />
                </View>
                { allusers.inbox && allusers.inbox.length > 0 ?
                <View style={Mystyles.sendconatinerview}>
                    <TextInput
                        style={Mystyles.textinput}
                        placeholder="What's up ?"
                        defaultValue={message}
                        onChangeText={(message) => {setMessage(message);}}
                        clearButtonMode="always"
                        ref={ textInputref } 
                    />
                    <TouchableOpacity onPress={socketMessage}>
                        <Text style={Mystyles.sendtext}>Send</Text>
                    </TouchableOpacity>
                </View>
                : null 
                }
            </View>
        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({

    messagesview: {flex: 1},
    flatlistcontainerview: {paddingRight: 10},
    headerview: {height: 60, justifyContent: "flex-end", marginBottom: 20},
    headertext: {textAlign: "center", fontSize: 18, fontWeight: 700},
    chatboxview: {flex: 1, },
    flatlistconatinerview: {flex: 1, marginHorizontal: 15},
    sendconatinerview: {
        flexDirection: "row", marginBottom: 10, alignItems: "center", paddingHorizontal: 30,
        borderColor: "#f5fff5", borderWidth: 1, borderRadius: 25, marginHorizontal: 10, backgroundColor: "#f5fff5",
        paddingVertical: 10


    },
    textinput: {flex: 1},
    sendtext: {fontWeight: 700, color: "#35b870"}

});