import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface ForecastListProps {
  forecast: any[];
  isMetric: boolean;
  onDayPress: (date: string, hourlyData: any[]) => void;
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast, isMetric, onDayPress }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 16,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 8,
      color: colors.text,
    },
    forecastItem: {
      backgroundColor: colors.card,
      padding: 16,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    date: {
      fontSize: 18,
      width: 80,
      color: colors.text,
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
      color: colors.text,
    },
  });

  const renderForecastItem = (item: any) => {
    const highTemp = isMetric ? item.day.maxtemp_c : item.day.maxtemp_f;
    const lowTemp = isMetric ? item.day.mintemp_c : item.day.mintemp_f;
    const unit = isMetric ? '°C' : '°F';
    const date = new Date(item.date + 'T00:00:00Z').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });

    return (
      <TouchableOpacity
        key={item.date}
        onPress={() => onDayPress(item.date, item.hour)}
        style={styles.forecastItem}
      >
        <Text style={styles.date}>{date}</Text>
        <Image source={{ uri: `https:${item.day.condition.icon}` }} style={styles.icon} />
        <Text style={styles.temp}>{`High: ${Math.round(highTemp)}${unit}`}</Text>
        <Text style={styles.temp}>{`Low: ${Math.round(lowTemp)}${unit}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>3-Day Forecast</Text>
      {forecast.map(renderForecastItem)}
    </View>
  );
};

export default ForecastList;
