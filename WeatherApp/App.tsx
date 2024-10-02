import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { lightTheme, darkTheme } from './src/themes/themes';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { useColorScheme } from 'react-native';

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
