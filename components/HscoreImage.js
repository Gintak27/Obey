import React, { Component } from 'react';
import {
  Platform,
  Animated,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableHighlight,
} from 'react-native';


const AniButton = Animated.createAnimatedComponent(TouchableHighlight);

export default class HscoreImage extends Component {


  render() {
    return (
      <View>
        <View style={styles.containerR}>
          <AniButton
            style={[styles.buttonG]}
            activeOpacity={1}>
            <Text>  </Text>
          </AniButton>

          <AniButton
            style={[styles.buttonB]}
            activeOpacity={1}
            >
            <Text> </Text>
          </AniButton>
        </View>
        <View style={styles.containerC}>
          <AniButton
            style={[styles.buttonR]}
            activeOpacity={1}
            >
            <Text> </Text>
          </AniButton>

          <AniButton
            style={[styles.buttonY]}
            activeOpacity={1}
            >
            <Text> </Text>
          </AniButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonG: {
    backgroundColor: '#33faaa',
    padding: 10,
    //margin: 10,
    //paddingTop: 60,
    borderRadius: 100,
    width: 10,
    height: 10,
  },
  buttonB: {
    backgroundColor: '#00ffff',
    padding: 10,
    //margin: 10,
    borderRadius: 100,
    width: 10,
    height: 10,
  },
  buttonR: {
    backgroundColor: '#ff0000',
    padding: 10,
    //margin: 10,
    borderRadius: 100,
    width: 10,
    height: 10,
  },
  buttonY: {
    backgroundColor: '#ffff00',
    padding: 10,
    //margin: 10,
    borderRadius: 100,
    width: 10,
    height: 10,
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
});
