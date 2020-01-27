import React, { Component } from 'react';
import { Video } from 'expo-av';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

class HomeActivity extends React.Component {
  async componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('App');
    }, 10000); //<-- Time until it jumps to "MainView"
  }

  render() {

    return (
      <View style={styles.container}>

        <Video
          source={require('/Users/kj/Downloads/obey/assets/mobile.mp4')}
          //rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          fullscreen={true}
          style={{width: 300, height: 300 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#08082D',
  },
  headerText: {
    fontSize: 100,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});

export default HomeActivity;
