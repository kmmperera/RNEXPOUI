import "react-native-gesture-handler";

import React from 'react';
import Navigations from './navigations/Drawer';

import store from './store';
import {Provider} from 'react-redux';


export default function App() {
  return (
    <Provider store={store}>
      <Navigations />

    </Provider>
  );
}

