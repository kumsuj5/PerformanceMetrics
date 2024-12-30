import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PerformanceMetrics from './src/PerformanceMetrics';
import AllRecords from './src/AllRecords';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Performance Metrics"
          component={PerformanceMetrics}
          options={{headerShown:false}}
        />
        <Stack.Screen
          name="AllRecords"
          component={AllRecords}
          options={{headerShown:false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
