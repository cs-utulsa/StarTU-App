import React, { useState, useEffect, FC } from 'react';
import {StyleSheet, Image, Modal, Text, View, TextInput, Button, Pressable, ImageBackground} from 'react-native'
import {Location, Location_Data} from '../../Database/Location';

type RoutingPopupProps = {
    updateEndpoints: (newOrigin: Location_Data, newDestination: Location_Data) => void,
}
const Lorton_Hall: Location_Data = {
  Name: "Lorton Hall",
  Description: "Building of the Department of Psychology",
  Latitude: 36.15142254421786,
  Longitude: -95.94796814388067,
  Tags: ["all", "a&s"]
};

const Chapman_Hall: Location_Data = {
  Name: "Chapman Hall",
  Description: "Building of the Kendall College of Arts & Science",
  Latitude: 36.15308684418934,
  Longitude: -95.94790750389673,
  Tags: ["all", "a&s"]
};

export const RoutingPopup: FC<RoutingPopupProps> = ({updateEndpoints}) => {
    const [viewPopup, toggleViewPopup] = useState<boolean>(false)
    const [tempOrigin, setTempOrigin] = useState<string>("Mcfarlin Library");
    const [tempDestination, setTempDestination] = useState<string>("Keplinger Hall");
    return(
        <Pressable disabled = {false} onPress = {() => {
          toggleViewPopup(!viewPopup);
        }} style = {styles.button} >

            <Image source={require('../../assets/Directions.png')} style={styles.icon}></Image>
            <Modal
              animationType="slide"
              transparent={true}
              visible={viewPopup}
              onDismiss ={() => {
                console.log(tempOrigin);
                console.log(tempDestination);
                console.log('Modal closed');
                updateEndpoints(Lorton_Hall, Chapman_Hall);
              }}>
              
              <View style={styles.popupView}>
                <View style={styles.textInputViewTo}>
                  <TextInput placeholder="To:" style={styles.textInput} onSubmitEditing = {(e) => {
                    setTempOrigin(e.nativeEvent.text);
                  }}></TextInput>
                </View>

                <View style={styles.textInputViewFrom}>
                  <TextInput placeholder="From: " style={styles.textInput} onSubmitEditing = {(e) => {
                    setTempDestination(e.nativeEvent.text)
                  }}></TextInput>
                </View>

                <Pressable onPress={() => {toggleViewPopup(!viewPopup)}} style={styles.onPressRoute}>
                  <Text>Route</Text>
                </Pressable>
              </View>
            </Modal>
          
          </Pressable>
    
        
    )
}

const styles = StyleSheet.create({
    test: {
      height: 50,
      width: 50,
    },
    onPressRoute: {
      alignSelf: 'flex-start',
      left: 77,
      //backgroundColor: 'black'
    },
    textInputViewTo: {
      position: "relative",
      alignContent: "flex-start",
      top: 5,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 195,
    },
    textInputViewFrom: {
      position: "relative",
      alignContent: "flex-start",
      top: -5,
      paddingTop: 10,
      paddingBottom: 10,
      paddingRight: 195,
    },
    textInput: {
      alignSelf: 'flex-start',
      width: 195,
      backgroundColor: "#DADADA",
    },

    popupView: {
      position: "absolute",
      top: 380,
      justifyContent: "center",
      alignSelf: "center",
      width: 200,
      height: 100,
      backgroundColor: 'white',
      borderRadius: 20,
      borderColor: "black",
      borderWidth: 2.5,
    
    },

    button: {
      position: 'relative',
      top: 20,
      left: 12,
      width: 35,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 5,
      //transform: [{ rotate: "45deg" }],
      //backgroundColor: 'grey'
    },
  
    icon:{
      alignSelf: 'flex-start',
      height: 50,
      width: 50,
      top: 10,
      left: 10,
    }
});