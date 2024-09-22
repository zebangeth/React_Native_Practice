import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface ForecastListProps {
  forecast: any[];
  isMetric: boolean;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, isMetric }) => {
  const renderForecastItem = (item: any) => {
    const highTemp = isMetric ? item.day.maxtemp_c : item.day.maxtemp_f;
    const lowTemp = isMetric ? item.day.mintemp_c : item.day.mintemp_f;
    const unit = isMetric ? '°C' : '°F';
    const date = new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    return (
      <View key={item.date} style={styles.forecastItem}>
        <Text style={styles.date}>{date}</Text>
        <Image source={{ uri: `https:${item.day.condition.icon}` }} style={styles.icon} />
        <Text style={styles.temp}>{`High: ${Math.round(highTemp)}${unit}`}</Text>
        <Text style={styles.temp}>{`Low: ${Math.round(lowTemp)}${unit}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3-Day Forecast</Text>
      {forecast.map(renderForecastItem)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  forecastItem: {
    backgroundColor: '#c8d6df',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 18,
    width: 80,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 16,
    resizeMode: 'contain',
  },
  temp: {
    fontSize: 16,
    flex: 1,
  },
});

export default ForecastList;