import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WeatherDetailsProps {
  data: any;
  isMetric: boolean;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data, isMetric }) => {
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
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>Sunrise:  </Text>
          <Text style={styles.value}>{sunrise}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Sunset:  </Text>
          <Text style={styles.value}>{sunset}</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Wind:</Text>
        <Text style={styles.value}>{windSpeed} {windUnit}</Text>
        <Text style={styles.value}>{windDir}</Text>
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
    backgroundColor: '#A7D3FF',
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
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default WeatherDetails;
