import axios from 'axios';
import store from "../store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '../reducers/auth';

const api = "https://chatmev3.onrender.com/api";
//const token = window.localStorage.getItem("token");
const token =JSON.parse(await AsyncStorage.getItem("token"));
//console.log(item);
const retrieveData = async () => {
  
        let value = await AsyncStorage.getItem('token');
        console.log(value);
        
        return JSON.parse(value);
       
 
};

 
const apilink = axios.create({
    baseURL: api,
     headers: {
   Authorization: token ? `Bearer ${token}` : "",
       

     },

});

apilink.interceptors.request.use((req) => {
    const {auth} = store.getState();
   

    if (auth.token) {
      
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
  

    return req;
   
});

apilink.interceptors.response.use(
    (res) => {
        return res;
    },
    (error) => {
        const status = error.response ? error.response.status : 400;
        if (status && status === 401) {
            // localStorage.clear();
            //  store.dispatch({ type:"logout"});
        }
        console.log(error.response);

        return Promise.reject(error);
    }
);

  


export default apilink;