import React from 'react';
import { View, Text, ImageBackground, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = () => {
  return (
    <ImageBackground 
      source={require('../src/assets/splash.png')} // Replace with your image path
      style={styles.backgroundImage}
    >
       <StatusBar 
        backgroundColor="black" 
        barStyle="light-content" 
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default SplashScreen;
