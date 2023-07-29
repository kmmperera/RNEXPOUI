import {
    View,
    StyleSheet,
    Button,
    Modal,
    Image,
    Text,
    TouchableOpacity,
    Animated,
  } from "react-native";
  import React, { useState, useRef, useEffect } from "react";
  
  
  
  const ModalLayout = ({ children, visible }) => {
    const scaleValue = useRef(new Animated.Value(0)).current;
    const [showModal, setShowModal] = useState(visible);
  
    useEffect(() => {
      toggleModal();
    }, [visible]);
  
    const toggleModal = () => {
      if (visible) {
        setShowModal(true);
        Animated.spring(scaleValue, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
      } else {
        setTimeout(() => setShowModal(false), 200);
        Animated.timing(scaleValue, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    };
  
    return (
      <Modal transparent visible={showModal}>
        <View style={Mystyles.container}>
          <Animated.View
            style={[Mystyles.modalCon, { transform: [{ scale: scaleValue }] }]}
          >
            {children}
          </Animated.View>
        </View>
      </Modal>
    );
  };
  
  const Mystyles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      
     
    },
  
    modalCon: {
      backgroundColor: "white",
      paddingHorizontal: 20,
      paddingVertical: 30,
      borderRadius: 8,
      elevation: 20,
      width: "80%",
      borderColor:"#b8b6b6",
      borderWidth:1,
    },
  });
  
  export default ModalLayout;