import React,{useEffect} from 'react';
import {View, Text, ImageBackground, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer';
import {Ionicons} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import {signout, isUserLoggedIn} from '../actions/authactions';
import {useDispatch, useSelector} from "react-redux";

function CustomDrawer(props) {

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const navigation =useNavigation();

    const {user: userred} = auth;



    const propicurl =  userred.pofilePicture ? userred.pofilePicture : "https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";



    useEffect(() => {



    }, [userred.pofilePicture]);
    
    useEffect(() => {

        dispatch(isUserLoggedIn());
    
      }, []);

    useEffect(() => {


        if (!auth.loggedin) {navigation.navigate("Frontpage")}
    
      }, [auth.loggedin]);

    const logout = () => {dispatch(signout());}


    return (
        <View style={DrawerStyle.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={DrawerStyle.contentContainer}
            >

                <View style={DrawerStyle.topview}>
                   

                    <Image
                        source={{uri:propicurl}}
                        style={DrawerStyle.profilePic}
                    />

                    <Text style={DrawerStyle.nametext}>
                        {`${userred.firstName} ${userred.lastName}`}
                    </Text>

                    
                 </View>
                <View style={DrawerStyle.drawerList}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>


            <View style={DrawerStyle.bottomView}>
                <TouchableOpacity onPress={() => {}} style={DrawerStyle.touchableOpacity}>
                    <View style={DrawerStyle.bottomNavs}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={DrawerStyle.bottomNavtexts}>
                            Tell a Friend
                            </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout} style={DrawerStyle.touchableOpacity}>
                    <View style={DrawerStyle.bottomNavs}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={[DrawerStyle.bottomNavtexts,DrawerStyle.signouttext]}>
                            Sign Out
                            </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const DrawerStyle = StyleSheet.create({

    container: {flex: 1},
    imageBackground: {padding: 20},
    topview:{paddingTop:40,flex:1,marginBottom:20,justifyContent:"center",alignItems:"center",},
    nametext:{fontSize:16,fontWeight:700},
    contentContainer: {paddingTop:0},
    profilePic: {height: 80, width: 80, borderRadius: 40, marginBottom: 10},
    profileName: {color: '#fff', fontSize: 18, marginBottom: 5, },
    coinsView: {flexDirection: 'row'},
    coinsText: {color: '#fff', marginRight: 5, },
    drawerList: {flex: 1, backgroundColor: '#fff', paddingTop: 10},
    bottomView: {padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'},
    touchableOpacity: {paddingVertical: 15},
    bottomNavs: {flexDirection: 'row', alignItems: 'center'},
    bottomNavtexts: {fontSize: 15, marginLeft: 5, },
    signouttext:{color:"#35b870"}

});




export default CustomDrawer;