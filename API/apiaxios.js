import axios from 'axios';
import store from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = 'https://chatmev3.onrender.com/api';





axios.defaults.baseURL = api;
const apiInstance =axios.create();

apiInstance.interceptors.request.use(

    async config =>{
      const val = await AsyncStorage.getItem('token');
      const token = JSON.parse(val);

      if(token){
        config.headers.Authorization=`Bearer ${token}` ;
      }

        return config ;
    },
    error => {
      return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 400;
    if (status && status === 401) {
      // localStorage.clear();
      // try{
      //   store.dispatch({ type:"logout"});
      //   localStorage.clear();
      // }
      // catch(error){
      //   store.dispatch({ type:"logout"});
      // }
      store.dispatch(signout());
    //   store.dispatch({ type:"logout"});

    }

    return Promise.reject(error);
  }
);





export default apiInstance ;