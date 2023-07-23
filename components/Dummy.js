import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


export default function Dummy() {
  return (
  <View style={Mystyles.dummyview}>
      <Text>This is dummy component</Text>
  </View>
  );
}

const Mystyles=StyleSheet.create({

    dummyview:{flex:1,justifyContent:"center",alignItems:"center"}
});