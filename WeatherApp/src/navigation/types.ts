import { NavigatorScreenParams } from '@react-navigation/native';

export type MainStackParamList = {
  Weather: { zipCode?: string };
  HourlyForecast: { date: string; hourlyData: any[]; isMetric: boolean };
  Search: undefined;
};

export type DrawerParamList = {
  Weather: NavigatorScreenParams<MainStackParamList>;
  'Manage Favorites': undefined;
};
