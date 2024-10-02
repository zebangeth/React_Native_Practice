import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { FavoritesProvider } from './src/contexts/FavoritesContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './src/themes/themes'; // Import custom themes

const App: React.FC = () => {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;

  return (
    <FavoritesProvider>
      <NavigationContainer theme={theme}>
        <AppNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
};

export default App;
