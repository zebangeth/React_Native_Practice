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
        <Text style={styles.cardText}>
          Sunrise: <Text style={styles.valueText}>{sunrise}</Text>
          Sunset: <Text style={styles.valueText}>{sunset}</Text>
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Wind: <Text style={styles.valueText}>{windSpeed} {windUnit}</Text>
        </Text>
        <Text style={styles.cardText}>
          Direction: <Text style={styles.valueText}>{windDir}</Text>
        </Text>
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
    backgroundColor: '#a9cee7',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardText: {
    fontSize: 18,
    color: '#000000',
    marginBottom: 8,
  },
  valueText: {
    fontWeight: 'bold',
  },
});

export default WeatherDetails;
