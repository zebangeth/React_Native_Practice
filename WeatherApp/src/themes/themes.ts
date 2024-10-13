import { Theme } from '@react-navigation/native';

export const lightTheme: Theme = {
  dark: false,
  colors: {
    primary: '#0A84FF',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#000000',
    border: '#CCCCCC',
    notification: '#FF453A',
    // Custom colors
    placeholder: '#A9A9A9',
    headerBackground: '#FFFFFF',
    headerText: '#000000',
    icon: '#000000',
    buttonBackground: '#EEEEEE',
    buttonText: '#000000',
    cardBackground: '#C3E1FF',
  },
};

export const darkTheme: Theme = {
  dark: true,
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#272729',
    notification: '#FF453A',
    // Custom colors
    placeholder: '#A9A9A9',
    headerBackground: '#000000',
    headerText: '#FFFFFF',
    icon: '#FFFFFF',
    buttonBackground: '#333333',
    buttonText: '#FFFFFF',
    cardBackground: '#2C2C2E',
  },
};
