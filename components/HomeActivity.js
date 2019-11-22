
import React, { Component } from 'react';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'expo-ads-admob';
import { Platform, StyleSheet, Text, View, Button, TouchableHighlight, TouchableOpacity, Animated, Image, ImageBackground } from 'react-native';
import { Audio } from 'expo-av'
const StartButton = Animated.createAnimatedComponent(TouchableHighlight);


class HomeActivity extends React.Component {

  constructor(props) {
    super(props);
    this.playbackInstance = null;
    this.muted = false;
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);

  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.animatedValue.setValue(0);
    });
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: false,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
    });
    //  This function will be called
    this._loadNewPlaybackInstance(true);
  }

  componentWillUnmount() {
    // Remove the event listener
    this.focusListener.remove();

    this.playbackInstance.unloadAsync();
    //  Check Your Console To verify that the above line is working
    console.log('unmount');
  }

  async _loadNewPlaybackInstance(playing) {
    if (this.playbackInstance != null) {
      await this.playbackInstance.unloadAsync();
      this.playbackInstance.setOnPlaybackStatusUpdate(null);
      this.playbackInstance = null;
    }
    const source = require('/Users/kj/Downloads/obey/assets/song.mp3');
    const initialStatus = {
      //        Play by default
      shouldPlay: true,
      //        Control the speed
      rate: 1.0,
      //        Correct the pitch
      shouldCorrectPitch: true,
      //        Control the Volume
      volume: 0.5,
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
    this.playbackInstance.setIsLoopingAsync(true);
    //  Play the Music
    this.playbackInstance.playAsync();

    //this.playbackInstance.setIsMutedAsync(true);
  }



  startGame = () => {
    //start game 

    this.animatedValue.setValue(0);
    Animated.sequence([
      Animated.delay(500),
      Animated.timing(this.animatedValue, {
        toValue: 1,
        duration: 500,
      }),
    ]).start(() => { this.props.navigation.navigate('Game') }, console.log('work?'))


  }
  
  muteMusic = () => {
   

    if (this.muted === true) {
      this.muted = false
      console.log("muted to not muted");
      this.playbackInstance.setIsMutedAsync(this.muted);
    } else {
      this.muted = true
      console.log("not muted to  muted");
      this.playbackInstance.setIsMutedAsync(this.muted);
    }

  }

  bannerError = ()  =>{
    console.log("An error");
    return;
  }
  
  render() {
    const scaleUP = this.animatedValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 7, 14]
    });


    const animatedStyle = {
      transform: [{ scale: scaleUP }],
    };

    return (
      <ImageBackground style={nStyles.mainContainer} source={require('/Users/kj/Downloads/obey/assets/home.png')}>

        <View style={nStyles.container}>
          <StartButton
            style={[animatedStyle, nStyles.buttonStart]}
            onPress={() => this.startGame()}
            activeOpacity={1}>
            <Text>  </Text>
          </StartButton>

        </View>
        <View style={nStyles.muteContainer}>
          <TouchableOpacity onPress={() => this.muteMusic()}>

            <Image style={nStyles.mute} source={require('/Users/kj/Downloads/obey/assets/music.png')} />

          </TouchableOpacity>

        </View>
        <AdMobBanner
          style={nStyles.bottomBanner}
          bannerSize="fullBanner"
          adUnitID="ca-app-pub-9285286406088187/8511165200"
          // Test ID, Replace with your-admob-unit-id
          testDeviceID="EMULATOR"
          didFailToReceiveAdWithError={this.bannerError}
        />
      </ImageBackground>
    );
  }
}

const nStyles = StyleSheet.create({
  mainContainer: {
    // display: flex,
    flex: 1,
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
  buttonStart: {
    backgroundColor: '#de1738',
    padding: 10,
    borderRadius: 100,
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontSize: 150,
    alignItems: 'center',
    top: 100,
  },
  mute: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  muteContainer: {
    flex: 1,
    height:35,
    width:35,
    justifyContent: 'flex-end',
    marginBottom: 36,
    paddingLeft: 30,
  },
  bottomBanner: {
    //position: "absolute",
    bottom: 0
  },

});

export default HomeActivity;
