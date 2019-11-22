import React, { Component } from 'react'
import { Text, View , Platform, Animated, StyleSheet,Button, Alert, TouchableHighlight} from 'react-native'

const PresentationalComponent = (props) => {

   return (
    <View style={styles.container}>

      <View style={styles.containerR}>

        <TouchableHighlight
         style={[props.color, styles.buttonR]}
         onPress={props.showAlert}
         activeOpacity={1}
         underlayColor={'#ea5256'}
        >

        <Text>  </Text>
        </TouchableHighlight>
        <TouchableHighlight
         style={styles.buttonB}
         onPress={props.showAlert}
         activeOpacity={1}
         underlayColor={'#ea5256'}
        >

         <Text>  </Text>
         </TouchableHighlight>
    </View>
    <View style={styles.containerC}>
         <TouchableHighlight
          style={styles.buttonG}
          onPress={props.showAlert}
          activeOpacity={1}
          underlayColor={'#56F71E'}
         >

          <Text>  </Text>
          </TouchableHighlight>

         <TouchableHighlight
          style={styles.buttonY}
          onPress={props.showAlert}
          activeOpacity={1}
          underlayColor={'#FFFF00'}
          >

           <Text>  </Text>
           </TouchableHighlight>
        </View>
      </View>
   )
}
export default PresentationalComponent


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
    containerC: {
      //flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10
    },
    containerR: {
      //flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 10
    },
  buttonR: {

    //backgroundColor: '#de1738',
    padding: 10,
    borderRadius: 100,
    width: 100,
    height: 100
  },
    buttonB: {
      backgroundColor: '#003EE5',
      padding: 10,
    borderRadius: 100,
    width: 100,
    height: 100
    },
      buttonG: {
        backgroundColor: '#3BE500',
        padding: 10,
        borderRadius: 100,
        width: 100,
        height: 100
      },
        buttonY: {

          backgroundColor: '#F4FF14',
          padding: 10,
          borderRadius: 100,
          width: 100,
          height: 100
        },
});

