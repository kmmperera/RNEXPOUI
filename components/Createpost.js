import React,{useState,useEffect,useRef} from 'react';
import { useDispatch, useSelector } from "react-redux";

import {Text, View, StyleSheet, TouchableOpacity, SafeAreaView, TextInput} from 'react-native';
import {EvilIcons} from "@expo/vector-icons";
import {AntDesign} from '@expo/vector-icons';
import {useNavigation} from "@react-navigation/native";
import {createpost,setnewpost} from '../actions/admin/post';


export default function Createpost() {
    const navigation = useNavigation();

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [textarea, setTextarea] = useState("");
    const postref =useRef(null);

    const {user: userred} = auth;
    const postred = useSelector((state) => state.post);


    useEffect(()=>{
      //  postref.newpost &&  navigation.goBack();

    },[postref.newpost]);
   
    useEffect(()=>{
    //    return ()=>{
    //        dispatch(setnewpost(false));
    //    }
    },[]);

	
	


	const cPost = () => {

        let post ={ text: textarea, postedBy: userred._id };
        let details = { post, propic: userred.pofilePicture, fname: userred.firstName };

		if (post.postedBy && userred) {

			dispatch(createpost(details));
			setTextarea("");
            postref.current.clear();

		}
	}



    return (
        <SafeAreaView style={Mystyles.createpostview}>
            <View style={Mystyles.statusbarempty}></View>
            <View style={Mystyles.headerview}>
                <TouchableOpacity onPress={() => {navigation.goBack()}}>
                    <AntDesign name="arrowleft" size={30} color="#35b870" />

                </TouchableOpacity>

                <Text style={Mystyles.headertext}>Create Post</Text>
            </View>
            <View style={Mystyles.inputview}>

                <TextInput
                    editable
                    multiline
                    numberOfLines={4}
                    maxLength={40}
                    placeholder="What's up ?"
                    ref={postref}
                    style={Mystyles.textinput}
                    defaultValue={textarea}
                    onChangeText={(textarea)=>{setTextarea(textarea)}}
                />
            </View>
            <View style={Mystyles.postbtnview}>
                <TouchableOpacity onPress={cPost} style={Mystyles.touchablebtn}>
                    <Text style={Mystyles.postbtntext}>Post</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const Mystyles = StyleSheet.create({
    statusbarempty: {height: 30},
    headerview: {height: 70, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, },
    headertext: {fontSize: 16, fontWeight: 600, marginLeft: 80},
    inputview:{borderWidth:1,borderColor:"#f0f2f0",borderRadius:8,margin:10,backgroundColor:"#f5fff5"},
    textinput:{padding:10,paddingBottom:30},
    createpostview: {flex: 1},
    postbtnview:{marginTop:20,alignItems:"flex-end",marginRight:10,},
    touchablebtn:{padding:10,backgroundColor:"#35b870",borderRadius:8},
    postbtntext:{fontSize:16,fontWeight:700,color:"#fff"}
});