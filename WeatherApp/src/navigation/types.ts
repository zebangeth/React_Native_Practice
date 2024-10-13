import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  Weather: { zipCode?: string };
  HourlyForecast: { date: string; hourlyData: any[]; isMetric: boolean };
  Search: undefined;
  SetBackground: { zipCode: string };
};

export type DrawerParamList = {
  Home: NavigatorScreenParams<MainStackParamList>;
  'Manage Favorites': undefined;
};