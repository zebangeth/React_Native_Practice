import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';

type HourlyForecastScreenProps = NativeStackScreenProps<MainStackParamList, 'HourlyForecast'>;

const HourlyForecastScreen: React.FC<HourlyForecastScreenProps> = ({ route }) => {
  const { date, hourlyData, isMetric } = route.params;

  const currentHour = new Date().getHours();

  // Filter hourlyData to only include hours from the current hour onwards if the date is today
  const today = new Date().toISOString().split('T')[0];
  const filteredHourlyData = date === today ? hourlyData.slice(currentHour) : hourlyData;

  const renderItem = ({ item }: { item: any }) => {
    const time = item.time.split(' ')[1]; // Get the time part
    const temp = isMetric ? item.temp_c : item.temp_f;
    const unit = isMetric ? '°C' : '°F';
    const condition = item.condition.text;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.time}>{time}</Text>
        <Image source={{ uri: `https:${item.condition.icon}` }} style={styles.icon} />
        <Text style={styles.temp}>{`${temp}${unit}`}</Text>
        <Text style={styles.condition}>{condition}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={filteredHourlyData}
      keyExtractor={(item) => item.time_epoch.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  time: {
    width: 60,
    fontSize: 16,
  },
  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 16,
  },
  temp: {
    width: 60,
    fontSize: 16,
  },
  condition: {
    flex: 1,
    fontSize: 16,
  },
});

export default HourlyForecastScreen;
