import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';
import { useTheme } from '@react-navigation/native';

type HourlyForecastScreenProps = NativeStackScreenProps<MainStackParamList, 'HourlyForecast'>;

const HourlyForecastScreen: React.FC<HourlyForecastScreenProps> = ({ route }) => {
  const { date, hourlyData, isMetric } = route.params;
  const { colors } = useTheme();

  const currentHour = new Date().getHours();

  // Filter hourlyData to only include hours from the current hour onwards if the date is today
  const today = new Date().toISOString().split('T')[0];
  const filteredHourlyData = date === today ? hourlyData.slice(currentHour) : hourlyData;

  const renderItem = ({ item }: { item: any }) => {
    const time = item.time.split(' ')[1];
    const temp = isMetric ? item.temp_c : item.temp_f;
    const unit = isMetric ? '°C' : '°F';
    const humidity = item.humidity;

    return (
      <View style={[styles.itemContainer, { backgroundColor: colors.cardBackground }]}>
        <Text style={[styles.time, { color: colors.text }]}>{time}</Text>
        <Image source={{ uri: `https:${item.condition.icon}` }} style={styles.icon} />
        <Text style={[styles.temp, { color: colors.text }]}>{`${temp} ${unit}`}</Text>
        <Text style={[styles.humidity, { color: colors.text }]}>{`${humidity}%`}</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.date, { color: colors.text }]}>{date}</Text>
      <FlatList
        data={filteredHourlyData}
        keyExtractor={(item) => item.time_epoch.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  date: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
  listContainer: {
    paddingVertical: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 16,
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  time: {
    width: 60,
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    width: 30,
    height: 30,
  },
  temp: {
    width: 80,
    fontSize: 16,
    fontWeight: 'bold',
  },
  humidity: {
    fontSize: 16,
  },
});

export default HourlyForecastScreen;
