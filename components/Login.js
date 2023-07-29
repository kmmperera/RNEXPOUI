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
  Platform
} from 'react-native';




import {Ionicons} from '@expo/vector-icons';
import Header from './Header';
import {useDispatch, useSelector} from "react-redux";
import {signout, isUserLoggedIn, signin} from '../actions/authactions';


export default function Login({navigation}) {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted,setSubmitted]=useState(false);
  const {user: userred} = auth;
  const [authstate, setAuthstate] = useState(auth.loggedin);

  useEffect(() => {

    dispatch(isUserLoggedIn());

  }, []);

  // useEffect(() => {

  //  console.log(submitted)

  // }, [submitted]);



  useEffect(() => {
    console.log(auth.loggedin);


  }, [auth.loggedin]);

  useEffect(() => {

    console.log(userred.firstName);

    console.log(auth.error);
  }, [userred.firstName, auth.error]);

  // useEffect(() => {


  //   if (auth.loggedin) {navigation.navigate("Drawer")}

  // }, [authstate]);

  const cleanupfunc = () => {
    setUsername("");
    setPassword("");
  }

  const submitfunc = () => {

    const user = {username, password};
    dispatch(signin(user));
  //  cleanupfunc();
    //setSubmitted(!submitted);
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
                <Ionicons name="md-person-circle-outline" size={100} color="grey" />
                <Text style={Mystyles.welcomtext}> Welcome Back</Text>
                <Text style={Mystyles.signintext}> Sign to continue </Text>
              </View>

              <View style={Mystyles.viewform}>
                <View style={Mystyles.inputviews}>
                  <Ionicons
                    style={Mystyles.formicons}
                    name="mail-outline"
                    size={16}
                    color="black"
                  />
                  <TextInput 
                  style={Mystyles.inputtexts} 
                  placeholder="EMAIL" 
                  defaultValue={username} 
                  onChangeText={(username)=>{setUsername(username);}}
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
                  onPress={() => {}}
                  style={Mystyles.touchableopacityforgetpass}>
                  <Text style={Mystyles.forgettext}> Forget Password? </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                onPress={submitfunc}
                style={Mystyles.touchablelogin}>
                  <Text style={Mystyles.logintext}> LOGIN </Text>
                </TouchableOpacity>

                <View style={Mystyles.createaccview}>
                  <Text style={Mystyles.donthaveacctext}>
                    {' '}
                    Dont't have account ?{' '}
                  </Text>
                  <TouchableOpacity onPress={() => {}}>
                    <Text style={Mystyles.createacctext}> create a new account </Text>
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
  secondcontainer: {},
  proppicview: {paddingHorizontal: 40, alignItems: 'center'},
  welcomtext: {fontSize: 20, fontWeight: 700},
  signintext: {fontSize: 12, fontWeight: 300, color: 'grey'},
  viewform: {marginTop: 50, paddingHorizontal: 40},
  inputviews: {
    flexDirection: 'row',
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  formicons: {padding: 0, margin: 0},
  inputtexts: {flex: 1, paddingVertical: 0, fontSize: 12, marginLeft: 10},
  touchableopacityforgetpass: {flexDirection: 'row-reverse'},
  forgettext: {color: '#35b870', marginTop: 20, fontSize: 12},
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
