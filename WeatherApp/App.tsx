import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './src/themes/themes';

const App: React.FC = () => {
  const scheme = useColorScheme();

  return (
    <FavoritesProvider>
      <NavigationContainer theme={scheme === 'dark' ? darkTheme : lightTheme}>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
