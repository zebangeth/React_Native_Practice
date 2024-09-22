import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CurrentWeatherProps {
  data: any;
  isMetric: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isMetric }) => {
  const temperature = isMetric ? data.current.temp_c : data.current.temp_f;
  const feelsLike = isMetric ? data.current.feelslike_c : data.current.feelslike_f;
  const unit = isMetric ? '°C' : '°F';

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>{`${Math.round(temperature)}${unit}`}</Text>
      <Text style={styles.feelsLike}>{`Feels like ${Math.round(feelsLike)}${unit}`}</Text>
      <Text style={styles.location}>{`${data.location.name}, ${data.location.region}`}</Text>
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
    color: '#000000',
  },
  feelsLike: {
    fontSize: 18,
    color: '#555555',
  },
  location: {
    fontSize: 24,
    color: '#000000',
  },
});

export default CurrentWeather;
