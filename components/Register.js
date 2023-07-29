import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Header from './Header';

import {useDispatch, useSelector} from "react-redux";
import {signup} from '../actions/authactions';

export default function Register({navigation}) {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expoPushToken, setExpoPushToken] = useState(null);
 

  const {user: userred} = auth;

  useEffect(() => {

    console.log(auth.signup);

    console.log(auth.error);
  }, [auth.signup, auth.error]);

  useEffect(() => {

    if(auth.signup){
      navigation.navigate("Login");
      }
   
  }, [auth.signup]);


  const submitfunc=(e)=>{
		e.preventDefault();

		
		const user={firstname,lastname,email,password,expoPushToken};
		dispatch(signup(user));
	//	cleanupfunc();
  
		
	}
	const cleanupfunc=()=>{
		setFirstname("");
		setLastname("");
		setEmail("");
		setPassword("");
		
	}
	





  return (


    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -64 : -50}

    >
     <Header />
      <SafeAreaView style={Mystyles.container}>

        <View style={Mystyles.bigview}>
         


          <View style={Mystyles.proppicview}>
            <Text style={Mystyles.welcomtext}> Create Account</Text>
            <Text style={Mystyles.signintext}> Create a new account </Text>
          </View>

          <View style={Mystyles.viewform}>




            <View style={Mystyles.inputviews}>
              <Ionicons name="person-outline" size={16} color="black" />
              <TextInput style={Mystyles.inputtexts}
               placeholder="FIRST NAME" 
               defaultValue={firstname} 
               onChangeText={(firstname)=>{setFirstname(firstname);}}
               />
            </View>

            <View style={Mystyles.inputviews}>
              <Ionicons name="person-outline" size={16} color="black" />
              <TextInput style={Mystyles.inputtexts}
               placeholder="LAST NAME" 
               defaultValue={lastname} 
               onChangeText={(lastname)=>{setLastname(lastname);}}
               />
            </View>

            <View style={Mystyles.inputviews}>
              <Ionicons name="mail-outline" size={16} color="black" />
              <TextInput 
              style={Mystyles.inputtexts} 
              placeholder="EMAIL"
              defaultValue={email} 
              onChangeText={(email)=>{setEmail(email);}}
              />
            </View>
           
            <View style={Mystyles.inputviews}>
              <Ionicons name="lock-closed-outline" size={16} color="black" />
              <TextInput
                secureTextEntry={true}
                style={Mystyles.inputtexts}
                placeholder="PASSWORD"
                defaultValue={password}
                 onChangeText={(password)=>{setPassword(password);}}
              />
            </View>
           

            <TouchableOpacity
              onPress={submitfunc}
              style={Mystyles.touchablelogin}>
              <Text style={Mystyles.logintext}> CREATE ACCOUNT </Text>
            </TouchableOpacity>

            <View style={Mystyles.createaccview}>
              <Text style={Mystyles.donthaveacctext}>
                {' '}
                Already have a account?
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={Mystyles.createacctext}> Login </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </SafeAreaView>

    </KeyboardAvoidingView>

  );
}

const Mystyles = StyleSheet.create({
  container: {flex: 1},
  bigview: {flex: 1, justifyContent: "space-around"},
  proppicview: {paddingHorizontal: 40, alignItems: 'center'},
  welcomtext: {fontSize: 20, fontWeight: 700},
  signintext: {fontSize: 12, fontWeight: 300, color: 'grey'},
  viewform: {paddingHorizontal: 40, marginTop: 30},
  inputviews: {
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },

  inputtexts: {flex: 1, paddingVertical: 0, fontSize: 12, marginLeft: 10},

  touchablelogin: {
    alignItems: 'center',
    backgroundColor: '#35b870',
    padding: 15,
    borderRadius: 5,
    marginTop: 40,
  },
  logintext: {color: '#fff'},
  createaccview: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
  createacctext: {color: '#35b870', fontSize: 12},
  donthaveacctext: {fontSize: 12},
});
