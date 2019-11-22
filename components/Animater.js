import React, { Component } from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';
import {
  Modal,
  Platform,
  Animated,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';

//import PresentationalComponent from './components/PresentationalComponent';

const AnimatedButton = Animated.createAnimatedComponent(TouchableHighlight);

export default class Animater extends Component {

  constructor(props) {
    super(props);
    this.playbackInstance = null;//Win audio 
    this.losePlay = null; //lose audio
    this.buttonPlay = null;//button press


    this.state = {
      modalVisible: false,//lose modal pop up
      disabled : true,// disable buttons 
    };
  }



  setModalVisible(visible) {
    this.setState({ modalVisible: visible });//set if modal visible 
  }

  setDisabled(disable) {
    this.setState({ disabled: disable });//set if modal visible 
  }



  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animatedValue3 = new Animated.Value(0);
    this.animatedValue4 = new Animated.Value(0);

  }

  componentWillUnmount() {
    // Remove the event listener
    //this.focusListener.remove();
    if (this.playbackInstance != null) {
      this.playbackInstance.unloadAsync();
      //  Check Your Console To verify that the above line is working
      console.log('unmount win');
    }

    if (this.losePlay != null) {
    this.losePlay.unloadAsync();
    //  Check Your Console To verify that the above line is working
    console.log('unmount lose');
    }
    if (this.buttonPlay != null) {
      this.buttonPlay.unloadAsync();
      //  Check Your Console To verify that the above line is working
      console.log('unmount buttonplay');
      }

      AdMobInterstitial.removeAllListeners();
  }
  componentDidMount() {
    const { navigation } = this.props;
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });
    //  This function will be called

    AdMobInterstitial.setTestDeviceID("EMULATOR");
    // ALWAYS USE TEST ID for Admob ads
    AdMobInterstitial.setAdUnitID("ca-app-pub-9285286406088187/8228890337");

    AdMobInterstitial.addEventListener("interstitialDidLoad", () =>
      console.log("interstitialDidLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidFailToLoad", () =>
      console.log("interstitialDidFailToLoad")
    );
    AdMobInterstitial.addEventListener("interstitialDidOpen", () =>
      console.log("interstitialDidOpen")
    );
    AdMobInterstitial.addEventListener("interstitialDidClose", () =>
      console.log("interstitialDidClose")
    );
    AdMobInterstitial.addEventListener("interstitialWillLeaveApplication", () =>
      console.log("interstitialWillLeaveApplication")
    );


    this.animate();
  }

  bannerError = () => {
    console.log("An error");
    return;
  }

  _openInterstitial = async () => {
    try {
      //this.setState({ disableInterstitialBtn: true })
      await AdMobInterstitial.requestAdAsync()
      await AdMobInterstitial.showAdAsync()
    } catch (error) {
      console.error(error)
    } finally {
     // this.setState({ disableInterstitialBtn: false })
    }
  }

  async _losePlay(playing) {
    if (this.losePlay != null) {
      await this.losePlay.unloadAsync();
      this.losePlay.setOnPlaybackStatusUpdate(null);
      this.losePlay = null;
    }
    const source = require('/Users/kj/Downloads/obey/assets/lose.wav');
    const initialStatus = {
      //        Play by default
      shouldPlay: true,
      //        Control the speed
      rate: 1.0,
      //        Correct the pitch
      shouldCorrectPitch: true,
      //        Control the Volume
      volume: 1.0,
      //        mute the Audio
      isMuted: false
    };
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus
    );
    //  Save the response of sound in playbackInstance
    this.losePlay = sound;
    //  Make the loop of Audio
    //this.playbackInstance.setIsLoopingAsync(false);
    //  Play the Music
    this.losePlay.playAsync();
  }

  async _buttonPlay(playing) {
    if (this.buttonPlay != null) {
      await this.buttonPlay.unloadAsync();
      this.buttonPlay.setOnPlaybackStatusUpdate(null);
      this.buttonPlay = null;
    }
    const source = require('/Users/kj/Downloads/obey/assets/lose.wav');
    const initialStatus = {
      //        Play by default
      shouldPlay: true,
      //        Control the speed
      rate: 1.0,
      //        Correct the pitch
      shouldCorrectPitch: true,
      //        Control the Volume
      volume: 1.0,
      //        mute the Audio
      isMuted: false
    };
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus
    );
    //  Save the response of sound in playbackInstance
    this.buttonPlay = sound;
    //  Make the loop of Audio
    //this.playbackInstance.setIsLoopingAsync(false);
    //  Play the Music
    this.buttonPlay.playAsync();
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = require('/Users/kj/Downloads/obey/assets/win.wav');
    const initialStatus = {
      //        Play by default
      shouldPlay: true,
      //        Control the speed
      rate: 1.0,
      //        Correct the pitch
      shouldCorrectPitch: true,
      //        Control the Volume
      volume: 1.0,
      //        mute the Audio
      isMuted: false
    };
    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialStatus
    );
    //  Save the response of sound in playbackInstance
    this.playbackInstance = sound;
    //  Make the loop of Audio
    //this.playbackInstance.setIsLoopingAsync(false);
    //  Play the Music
    this.playbackInstance.playAsync();
  }


  userTurn = (n) => {
    //console.log('show: ');
    console.log('seq: ' + this.seq);
    this._buttonPlay(true);

    //if button number == fnumber in index 0 then remove it 
    //else leave it and tell user they wrong 
    //if array not empty then user guess was wrong 
    if (n == this.seq[0]) {
      this.seq.shift()
      //if array epty then correct 
      if (Array.isArray(this.seq) && !this.seq.length) {
        this.showPoints(false, false);
        this._loadNewPlaybackInstance(true);
        this.setDisabled(true);
        //Alert.alert('Winner!');

        this.animate()
      }
    } else {

      this.loser();
      /* Alert.alert(
         "WRONG!",
         "Try Again",
         [
           { text: "Yes", onPress: () => this.startOver()},
           {
             text: "No",
             onPress: () => console.log("NOPE"),
           }
         ]
       )//end of alert */
    }
  }//end of show alert

  loser = () => {
    this._losePlay(true);
    this.setDisabled(true);
    this.setModalVisible(true);
    this._openInterstitial();
  }

  showPoints = (isLost, back) => {
    this.props.callForPoints(isLost, back);
  }

  startOver = () => {
    this.showPoints(true, false);
    this.setModalVisible(!this.state.modalVisible);
    this.animate();
  }



  random = () => {
    // console.log('The Count ' + );
    //score / 5 = amount 
    //amount * 2 =level

    let base = 3;

    this.count++;
    if (this.count > base + (Math.floor((this.props.currentScore / 5)) * 2)) {
      //if count greater than the amount algo says to light up thats the end
      this.setDisabled(false);
      console.log("Disabled: " + this.state.disabled);
      return -1;
    } else {
      //else continue lighting up buttons 
      //this.disabled = true;
      console.log("Disabled: " + this.state.disabled);
      let rand = Math.floor(Math.random() * 4) + 1;

      if (rand == 1) {
        //1st button
        this.seq.push(1)
        return 1;
      }
      if (rand == 2) {
        //second button
        this.seq.push(2)
        return 2;
      }
      if (rand == 3) {
        //second button
        this.seq.push(3)
        return 3;
      }
      if (rand == 4) {
        //second button
        this.seq.push(4)
        return 4;
      }
    }
  };

  fourthButtonAni = () => {
    // console.log('fourth');
    this.animatedValue4.setValue(0);
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.animatedValue4, {
        toValue: 150,
        duration: 700,
      }),
    ]).start(() => {
      // Logic whenever an iteration finishes...
      let rand = this.random();
      if (rand == 1) {
        this.firstButtonAni();
      }
      if (rand == 2) {
        this.secondButtonAni();
      }
      if (rand == 3) {
        this.thirdButtonAni();
      }
      if (rand == 4) {
        this.fourthButtonAni();
      }
    });
  };

  thirdButtonAni = () => {
    // console.log('third');
    this.animatedValue3.setValue(0);
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.animatedValue3, {
        toValue: 150,
        duration: 700,
      }),
    ]).start(() => {
      // Logic whenever an iteration finishes...
      let rand = this.random();
      if (rand == 1) {
        this.firstButtonAni();
      }
      if (rand == 2) {
        this.secondButtonAni();
      }
      if (rand == 3) {
        this.thirdButtonAni();
      }
      if (rand == 4) {
        this.fourthButtonAni();
      }
    });
  };

  secondButtonAni = () => {
    // console.log('second');
    this.animatedValue2.setValue(0);
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.animatedValue2, {
        toValue: 150,
        duration: 700,
      }),
    ]).start(() => {
      // Logic whenever an iteration finishes...
      let rand = this.random();
      if (rand == 1) {
        this.firstButtonAni();
      }
      if (rand == 2) {
        this.secondButtonAni();
      }
      if (rand == 3) {
        this.thirdButtonAni();
      }
      if (rand == 4) {
        this.fourthButtonAni();
      }
    });
  };

  firstButtonAni = () => {
    //console.log('first');
    this.animatedValue.setValue(0);
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.animatedValue, {
        toValue: 150,
        duration: 700,
      }),
    ]).start(() => {
      // Logic whenever an iteration finishes..
      //if repeat rec call else secondbutton
      //if amount of rand calls  == 3 then stop
      let rand = this.random();
      if (rand == 1) {
        this.firstButtonAni();
      }
      if (rand == 2) {
        this.secondButtonAni();
      }
      if (rand == 3) {
        this.thirdButtonAni();
      }
      if (rand == 4) {
        this.fourthButtonAni();
      }
    });
  };

  animate = () => {
    console.log('Start');
    this.count = 0;
    this.seq = new Array();

    let rand = this.random();
    if (rand == 1) {
      this.firstButtonAni();
    }
    if (rand == 2) {
      this.secondButtonAni();
    }
    if (rand == 3) {
      this.thirdButtonAni();
    }
    if (rand == 4) {
      this.fourthButtonAni();
    }

  };

  render() {
    const interpolateColor = this.animatedValue.interpolate({//green
      inputRange: [0, 100, 150],
      outputRange: ['rgb(55, 184, 0)', 'rgb(231, 255, 217)', 'rgb(55, 184, 0)'],
    });

    const interpolateColor2 = this.animatedValue2.interpolate({//Blue
      inputRange: [0, 100, 150],
      outputRange: ['rgb(0, 170, 255)', 'rgb(230, 255, 255)', 'rgb(0, 170, 255)'],
    });

    const interpolateColor3 = this.animatedValue3.interpolate({//Red
      inputRange: [0, 100, 150],
      outputRange: ['rgb(255, 0, 0)', 'rgb(255,200,200)', 'rgb(255, 0, 0)'],
    });

    const interpolateColor4 = this.animatedValue4.interpolate({//Yellow
      inputRange: [0, 100, 150],
      outputRange: ['rgb(244, 195, 2)', 'rgb(255, 255, 255)', 'rgb(244, 195, 2))'],
    });


    const animatedStyle = {
      backgroundColor: interpolateColor,
    };
    const animatedStyle2 = {
      backgroundColor: interpolateColor2,
    };
    const animatedStyle3 = {
      backgroundColor: interpolateColor3,
    };
    const animatedStyle4 = {
      backgroundColor: interpolateColor4,
    };
    return (
      <View>
        <View style={styles.containerR}>
          <AnimatedButton
            style={[animatedStyle, styles.buttonG]}
            onPress={() => this.userTurn(1)}
            disabled={this.state.disabled}  
            activeOpacity={1}>
            <Text>  </Text>
          </AnimatedButton>

          <AnimatedButton
            style={[animatedStyle2, styles.buttonB]}
            onPress={() => this.userTurn(2)}
            disabled={this.state.disabled} 
            activeOpacity={1}
          >
            <Text> </Text>
          </AnimatedButton>
        </View>
        <View style={styles.containerC}>
          <AnimatedButton
            style={[animatedStyle3, styles.buttonR]}
            onPress={() => this.userTurn(3)}
            disabled={this.state.disabled} 
            activeOpacity={1}
          >
            <Text> </Text>
          </AnimatedButton>

          <AnimatedButton
            style={[animatedStyle4, styles.buttonY]}
            onPress={() => this.userTurn(4)}
            disabled={this.state.disabled} 
            activeOpacity={1}
          >
            <Text> </Text>
          </AnimatedButton>


        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={styles.modalContent}>

              <TouchableHighlight
                style={styles.tryAgain}
                activeOpacity={1}
                onPress={() => {
                  this.startOver();
                }}>
                <Text style={styles.tryAgainText}>Try Again!</Text>
              </TouchableHighlight>

              <TouchableHighlight
                style={styles.mainMenu}
                activeOpacity={1}
                onPress={() => {
                  this.showPoints(true, true);
                }}>
                <Text style={styles.mainMenuText} >Main Menu</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonG: {
    //backgroundColor: '#33faaa',
    padding: 20,
    margin: 10,
    //paddingTop: 60,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  buttonB: {
    //backgroundColor: '#00ffff',
    padding: 20,
    margin: 10,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  buttonR: {
    //backgroundColor: '#ff0000',
    padding: 20,
    margin: 10,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  buttonY: {
    // backgroundColor: '#ffff00',
    padding: 20,
    margin: 10,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  containerC: {
    //flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  containerR: {
    //flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    width: 300,
    height: 300,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  tryAgainText: {
    textAlign: 'center',
    fontSize: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tryAgain: {
    backgroundColor: '#00c4cc',
    padding: 20,
    margin: 10,
    borderRadius: 30,
    width: 150,
    height: 70,
  },
  mainMenuText: {
    textAlign: 'center',
    fontSize: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainMenu: {
    backgroundColor: '#00c4cc',
    padding: 20,
    margin: 10,
    borderRadius: 30,
    width: 150,
    height: 70,
  },

});
