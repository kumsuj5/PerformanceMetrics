import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PerformanceMetrics from './src/PerformanceMetrics';
import SplashScreen from './src/SplashScreen';
import AllRecords from './src/AllRecords';

const Stack = createStackNavigator();

const App = () => {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    isSplashVisible ? (
      <SplashScreen />
    ) : (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Performance Metrics"
            component={PerformanceMetrics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AllRecords"
            component={AllRecords}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  );
};

export default App;
