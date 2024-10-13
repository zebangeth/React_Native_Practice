import '@react-navigation/native';

declare module '@react-navigation/native' {
  export interface Theme {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      // Add your custom color properties below
      placeholder: string;
      headerBackground: string;
      headerText: string;
      icon: string;
      buttonBackground: string;
      buttonText: string;
      cardBackground: string;
    };
    dark: boolean;
  }
}
