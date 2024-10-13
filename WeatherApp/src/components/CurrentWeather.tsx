import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface CurrentWeatherProps {
  data: any;
  isMetric: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isMetric }) => {
  const { colors } = useTheme();
  const temperature = isMetric ? data.current.temp_c : data.current.temp_f;
  const feelsLike = isMetric ? data.current.feelslike_c : data.current.feelslike_f;
  const unit = isMetric ? '°C' : '°F';

  return (
    <View style={styles.container}>
      <Text style={[styles.temperature, { color: colors.text }]}>{`${Math.round(temperature)}${unit}`}</Text>
      <Text style={[styles.feelsLike, { color: colors.text }]}>{`Feels like ${Math.round(feelsLike)}${unit}`}</Text>
      <Text style={[styles.locationCity, { color: colors.text }]}>{data.location.name}</Text>
      <Text style={[styles.locationRegion, { color: colors.text }]}>{data.location.region}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  temperature: {
    fontSize: 64,
  },
  feelsLike: {
    fontSize: 18,
  },
  locationCity: {
    fontSize: 32,
  },
  locationRegion: {
    fontSize: 24,
  },
});

export default CurrentWeather;
