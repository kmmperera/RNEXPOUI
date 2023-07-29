import axios from 'axios';
import store from '../store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = 'https://chatmev3.onrender.com/api';


// const functoken = async () => {
//   const val = await AsyncStorage.getItem('token');
//   const mytoken = JSON.parse(val);
//   return mytoken;
// };
// const token =functoken();
// const apilink = axios.create({
//   baseURL: api,
//   headers: {
//     Authorization: token ? `Bearer ${token}` : '',
//   },
// });

// apilink.interceptors.request.use((req) => {
//   const { auth } = store.getState();

//   if (auth.token) {
//     req.headers.Authorization = `Bearer ${auth.token}`;
//   }

//   return req;
// });

// apilink.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     const status = error.response ? error.response.status : 400;
//     if (status && status === 401) {
//       // localStorage.clear();
//       //  store.dispatch({ type:"logout"});
//     }
//     console.log(error.response);

//     return Promise.reject(error);
//   }
// );

// export default apilink;



axios.defaults.baseURL = api;
const apiInstance =axios.create();

apiInstance.interceptors.request.use(

    async config =>{
      const val = await AsyncStorage.getItem('token');
      const token = JSON.parse(val);

      if(token){
        config.headers.Authorization=`Bearer ${token}` ;
      }
     // console.log("the token",token);
     // console.log("axios headers are",config.headers.Authorization);

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
        store.dispatch({ type:"logout"});
    }
    console.log(error.response);

    return Promise.reject(error);
  }
);





export default apiInstance ;