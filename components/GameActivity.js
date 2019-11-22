import React, { Component } from 'react';

import {
  Platform,
  Animated,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  Image,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { AsyncStorage } from 'react-native';
import Animater from './Animater';
import HscoreImage from './HscoreImage';


const AnimatedButton = Animated.createAnimatedComponent(TouchableHighlight);

export default class GameActivity extends Component {
  constructor(props) {
    super(props);
  
    // AsyncStorage.setItem('hscore', '1');
    this.state = {
      cscore: 0,
      hscore: 0,
    };
  }


  static navigationOptions = {
    title: "Game",
    headerStyle: {
      backgroundColor: "#73C6B6"
    }
  };


  componentDidMount() {
    
    this.retrieveData();

  }



  getPoints = (isLost, back) => {
    if (isLost) {
    

      this.setState({ cscore: 0 }, () => {
        this.updatehscore()
      });

      if (back){
        this.props.navigation.goBack(); 
      }
    } else {
      this.setState({ cscore: this.state.cscore + 1 }, () => {
        this.updatehscore()
      });

      //console.log( 'hscore after retrieve'  + this.retrieveData() );
    }


  }; //end of getpoints

  updatehscore = () => {
    if (this.state.cscore > this.state.hscore) {

      // this.setState({ hscore: this.state.cscore });
      this.storeData(this.state.cscore);

    }
    this.retrieveData();
  }

  // create a function that saves your data asyncronously
  storeData = async score => {
    try {
      await AsyncStorage.setItem('hscore', score.toString());
      console.log('Saved');
      //Alert.alert('Saved')
    } catch (error) {
      // Error saving data
      console.log('Error saving score');
    }

  };

  // fetch the data back asyncronously
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('hscore');
      const item = JSON.parse(value);

      if (item == null) {
        this.setState({ hscore: 0 });
      } else if (item !== null) {
        // Our data is fetched successfully
        this.setState({ hscore: item });
        console.log('IF NOT NULL: ' + parseInt(item));
        return parseInt(item);
      }
    } catch (error) {
      // Error retrieving data
      AsyncStorage.setItem('hscore', '0');
      console.log('Error getting score ' + error);
    }
  };



  render() {
    return (
      <View style={styles.mainContainer}>
        <View style = {styles.containerHscore}>
        <View style = {styles.hscoreImage}>
        <HscoreImage />
        </View>
        <Text style={styles.hscore}>
          {this.state.hscore}
        </Text>
        </View>
        <Text style={styles.score}>
          {this.state.cscore}
        </Text>
        <View style={styles.container}>
          <Animater callForPoints={this.getPoints}  currentScore = {this.state.cscore}/>

       </View>
     </View>
   
      //<PresentationalComponent color = {[animatedStyle]} showAlert = {this.showAlert}/>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    // display: flex,
    flex: 1,
    backgroundColor: '#00c4cc',//'#019399',//'#00c4cc',
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  score: {
    position: 'absolute',
    textAlign: 'center',
    fontSize: 175,
    justifyContent: 'center',
    alignItems: 'center',
    top: 45,
  },
  hscore: {
    textAlign: 'right',
    fontSize: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  hscoreImage: {
    alignSelf:'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  containerHscore: {
    flexDirection: 'row',
    alignSelf:'flex-end',
   
  },
  interstitialBanner: {
    width: "100%",
    marginLeft: 0
  },

});
