import "react-native-gesture-handler";

import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Frontpage from './components/Frontpage';
import Navigations from './navigations/Drawer';

import store from './store';
import {Provider} from 'react-redux';
import {useDispatch, useSelector} from "react-redux";


export default function App() {
  return (
    <Provider store={store}>
      <Navigations />

    </Provider>
  );
}

