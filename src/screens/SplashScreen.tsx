import React, { useEffect, useRef, useState } from 'react';
import {
  View, Image, StyleSheet, Animated, StatusBar, Dimensions, Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

const EARTH_HTML = `
<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    background-color: #0A1628;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  .earth {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  .earth p {
    color: white;
    font-size: 18px;
    font-family: "Gill Sans", Calibri, "Trebuchet MS", sans-serif;
    letter-spacing: 2px;
    opacity: 0.9;
  }
  .earth-loader {
    --watercolor: #3344c1;
    --landcolor: #7cc133;
    width: 120px;
    height: 120px;
    background-color: var(--watercolor);
    position: relative;
    overflow: hidden;
    border-radius: 50%;
    box-shadow:
      inset 0em 0.5em rgb(255,255,255,0.25),
      inset 0em -0.5em rgb(0,0,0,0.25);
    border: solid 2px white;
    animation: startround 1s;
    animation-iteration-count: 1;
  }
  .earth-loader svg:nth-child(1) {
    position: absolute;
    bottom: -30px;
    width: 112px;
    height: auto;
    animation: round1 5s infinite linear 0.75s;
  }
  .earth-loader svg:nth-child(2) {
    position: absolute;
    top: -48px;
    width: 112px;
    height: auto;
    animation: round1 5s infinite linear;
  }
  .earth-loader svg:nth-child(3) {
    position: absolute;
    top: -40px;
    width: 112px;
    height: auto;
    animation: round2 5s infinite linear;
  }
  .earth-loader svg:nth-child(4) {
    position: absolute;
    bottom: -35px;
    width: 112px;
    height: auto;
    animation: round2 5s infinite linear 0.75s;
  }
  @keyframes startround {
    0% { filter: brightness(500%); box-shadow: none; }
    75% { filter: brightness(500%); box-shadow: none; }
    100% {
      filter: brightness(100%);
      box-shadow:
        inset 0em 0.5em rgb(255,255,255,0.25),
        inset 0em -0.5em rgb(0,0,0,0.25);
    }
  }
  @keyframes round1 {
    0%   { left: -32px;  opacity: 1; transform: skewX(0deg)   rotate(0deg); }
    30%  { left: -96px;  opacity: 1; transform: skewX(-25deg) rotate(25deg); }
    31%  { left: -96px;  opacity: 0; transform: skewX(-25deg) rotate(25deg); }
    35%  { left: 112px;  opacity: 0; transform: skewX(25deg)  rotate(-25deg); }
    45%  { left: 112px;  opacity: 1; transform: skewX(25deg)  rotate(-25deg); }
    100% { left: -32px;  opacity: 1; transform: skewX(0deg)   rotate(0deg); }
  }
  @keyframes round2 {
    0%   { left: 80px;   opacity: 1; transform: skewX(0deg)   rotate(0deg); }
    75%  { left: -112px; opacity: 1; transform: skewX(-25deg) rotate(25deg); }
    76%  { left: -112px; opacity: 0; transform: skewX(-25deg) rotate(25deg); }
    77%  { left: 128px;  opacity: 0; transform: skewX(25deg)  rotate(-25deg); }
    80%  { left: 128px;  opacity: 1; transform: skewX(25deg)  rotate(-25deg); }
    100% { left: 80px;   opacity: 1; transform: skewX(0deg)   rotate(0deg); }
  }
</style>
</head>
<body>
<div class="earth">
  <div class="earth-loader">
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,20 45,15 50,35 30,40" fill="#7cc133"/>
      <polygon points="55,10 80,20 75,40 55,35" fill="#7cc133"/>
      <polygon points="10,50 35,45 40,65 15,70" fill="#7cc133"/>
      <polygon points="60,50 85,45 90,65 65,70" fill="#7cc133"/>
      <polygon points="25,75 50,70 55,90 30,95" fill="#7cc133"/>
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="15,30 40,25 45,50 20,55" fill="#7cc133"/>
      <polygon points="55,20 80,15 85,40 60,45" fill="#7cc133"/>
      <polygon points="20,65 45,60 50,80 25,85" fill="#7cc133"/>
      <polygon points="60,65 85,60 90,80 65,85" fill="#7cc133"/>
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="10,20 35,15 40,40 15,45" fill="#7cc133"/>
      <polygon points="50,10 75,15 80,35 55,40" fill="#7cc133"/>
      <polygon points="15,55 40,50 45,70 20,75" fill="#7cc133"/>
      <polygon points="55,55 80,50 85,70 60,75" fill="#7cc133"/>
      <polygon points="30,80 55,75 60,95 35,100" fill="#7cc133"/>
    </svg>
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="20,15 45,10 50,30 25,35" fill="#7cc133"/>
      <polygon points="60,20 85,15 90,35 65,40" fill="#7cc133"/>
      <polygon points="10,55 35,50 40,70 15,75" fill="#7cc133"/>
      <polygon points="55,60 80,55 85,75 60,80" fill="#7cc133"/>
    </svg>
  </div>
  <p>Connecting...</p>
</div>
</body>
</html>
`;

export default function SplashScreen() {
  const navigation = useNavigation<any>();
  const [phase, setPhase] = useState<'web' | 'logo'>('web');
  const webOpacity = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const t1 = setTimeout(() => {
      Animated.timing(webOpacity, {
        toValue: 0, duration: 500, useNativeDriver: true,
      }).start(() => {
        setPhase('logo');
        Animated.timing(logoOpacity, {
          toValue: 1, duration: 600, useNativeDriver: true,
        }).start();
      });
    }, 3000);

    const t2 = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 6500);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />

      <Image
        source={require('../assets/images/bg.png')}
        style={styles.bgImage}
        resizeMode="cover"
      />

      {phase === 'web' && (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: webOpacity }]}>
          <WebView
            source={{ html: EARTH_HTML }}
            scrollEnabled={false}
            style={styles.webview}
            backgroundColor="#0A1628"
          />
        </Animated.View>
      )}

      {phase === 'logo' && (
        <Animated.View style={[styles.logoContainer, { opacity: logoOpacity }]}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgDark,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    width,
    height,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
  },
});