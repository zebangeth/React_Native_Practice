import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import HourlyForecastScreen from '../screens/HourlyForecastScreen';
import SearchScreen from '../screens/SearchScreen';
import { MainStackParamList } from './types';

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Weather" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HourlyForecast" component={HourlyForecastScreen} options={{ title: 'Hourly Forecast' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ presentation: 'modal', headerShown: false }} />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
