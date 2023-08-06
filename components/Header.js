import React, {useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity,StatusBar} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {signout, isUserLoggedIn} from '../actions/authactions';
import {useDispatch, useSelector} from "react-redux";



export default function Header() {


  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {

    dispatch(isUserLoggedIn());

  }, []);

  useEffect(() => {


  }, [auth.loggedin]);

  useEffect(() => {


    if (auth.loggedin) {navigation.navigate("Drawer")}

  }, [auth.loggedin]);

  const logout = () => {dispatch(signout());}

  

  return (
  
    <View style={Mystyles.headerview}>
      <StatusBar  barStyle="light-content" />
      <View style={Mystyles.containerview}>
        <TouchableOpacity onPress={() => {auth.loggedin && navigation.navigate("Drawer")}}>
          <Text style={Mystyles.chatmetext}>ChatMe</Text>
        </TouchableOpacity>
        {auth.loggedin === true ?
          <View style={Mystyles.touchablewrapper}>

            <TouchableOpacity onPress={() => {}}
              style={Mystyles.touchablebtns}>
              <Text style={Mystyles.touchabletext}>Logout</Text>
            </TouchableOpacity>
          </View> :
          <View style={Mystyles.touchablewrapper}>
            <TouchableOpacity onPress={() => {navigation.navigate("Login")}}
              style={route.name == "Login" || route.name == "Frontpage" ? Mystyles.touchablebtns : Mystyles.touchablebtnsoff}>
              <Text style={route.name == "Login" || route.name == "Frontpage" ? Mystyles.touchabletext : Mystyles.touchabletextoff}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {navigation.navigate("Register")}}
              style={route.name == "Register" ? Mystyles.touchablebtns : Mystyles.touchablebtnsoff}>
              <Text style={route.name == "Register" ? Mystyles.touchabletext : Mystyles.touchabletextoff}>Sign up</Text>
            </TouchableOpacity>
          </View>

        }
      </View>
    </View>
  );
}

const Mystyles = StyleSheet.create({
  headerview: {
    height: 100,

    justifyContent: 'flex-end',
  },
  containerview: {
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chatmetext: {fontSize: 18, fontWeight: 700, paddingVertical: 5},
  touchablewrapper: {flexDirection: 'row', justifyContent: 'space-between'},
  touchablebtns: {
    paddingVertical: 0,
    justifyContent: 'center',
    marginLeft: 4,
    fontSize: 16,
    backgroundColor: '#35b870',

    padding: 20,
    borderRadius: 18,
  },
  touchablebtnsoff: {
    backgroundColor: '#fff',
    paddingVertical: 0,
    justifyContent: 'center',
    marginLeft: 4,
    fontSize: 16,

    padding: 20,
    borderRadius: 18,
  },
  touchabletextoff: {color: '#35b870'},
  touchabletext: {color: '#fff'},
});
