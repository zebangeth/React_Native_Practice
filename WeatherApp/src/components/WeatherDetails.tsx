import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface WeatherDetailsProps {
  data: any;
  isMetric: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, isMetric }) => {
  const { colors } = useTheme();

  if (!data) {
    return null;
  }

  const sunrise = data.forecast.forecastday[0].astro.sunrise;
  const sunset = data.forecast.forecastday[0].astro.sunset;
  const windSpeed = isMetric ? data.current.wind_kph : data.current.wind_mph;
  const windUnit = isMetric ? 'KPH' : 'MPH';
  const windDir = data.current.wind_dir;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Sunrise: </Text>
          <Text style={[styles.value, { color: colors.text }]}>{sunrise}</Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.label, { color: colors.text }]}>Sunset: </Text>
          <Text style={[styles.value, { color: colors.text }]}>{sunset}</Text>
        </View>
      </View>
      <View style={[styles.card, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.label, { color: colors.text }]}>Wind:</Text>
        <Text style={[styles.value, { color: colors.text }]}>{windSpeed} {windUnit}</Text>
        <Text style={[styles.value, { color: colors.text }]}>{windDir}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WeatherDetails;
