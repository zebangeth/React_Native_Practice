import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainStackNavigator from './MainStackNavigator';
import ManageFavoritesScreen from '../screens/ManageFavoritesScreen';
import { DrawerParamList } from './types';

const Drawer = createDrawerNavigator<DrawerParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={MainStackNavigator} options={{ headerShown: true }} />
      <Drawer.Screen name="Manage Favorites" component={ManageFavoritesScreen} />
    </Drawer.Navigator>
  );
};

export default AppNavigator;
