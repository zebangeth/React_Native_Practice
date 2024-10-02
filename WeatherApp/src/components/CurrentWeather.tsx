import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface CurrentWeatherProps {
  data: any;
  isMetric: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isMetric }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      padding: 16,
    },
    temperature: {
      fontSize: 64,
      color: colors.text,
    },
    feelsLike: {
      fontSize: 18,
      color: colors.text,
    },
    locationCity: {
      fontSize: 32,
      color: colors.text,
    },
    locationRegion: {
      fontSize: 24,
      color: colors.text,
    },
  });

  const temperature = isMetric ? data.current.temp_c : data.current.temp_f;
  const feelsLike = isMetric ? data.current.feelslike_c : data.current.feelslike_f;
  const unit = isMetric ? '°C' : '°F';

  return (
    <View style={styles.container}>
      <Text style={styles.temperature}>{`${Math.round(temperature)}${unit}`}</Text>
      <Text style={styles.feelsLike}>{`Feels like ${Math.round(feelsLike)}${unit}`}</Text>
      <Text style={styles.locationCity}>{data.location.name}</Text>
      <Text style={styles.locationRegion}>{data.location.region}</Text>
    </View>
  );
};

export default CurrentWeather;
