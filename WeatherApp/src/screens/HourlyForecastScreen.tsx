import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';
import { useTheme } from '@react-navigation/native';

type HourlyForecastScreenProps = NativeStackScreenProps<MainStackParamList, 'HourlyForecast'>;

const HourlyForecastScreen: React.FC<HourlyForecastScreenProps> = ({ route }) => {
  const { colors } = useTheme();
  const { date, hourlyData, isMetric } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      padding: 16,
    },
    date: {
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 16,
      color: colors.text,
    },
    listContainer: {
      paddingVertical: 8,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 10,
      padding: 16,
      marginBottom: 8,
      justifyContent: 'space-between',
    },
    time: {
      width: 60,
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    icon: {
      width: 30,
      height: 30,
    },
    temp: {
      width: 80,
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    humidity: {
      fontSize: 16,
      color: colors.text,
    },
  });

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
      <View style={styles.itemContainer}>
        <Text style={styles.time}>{time}</Text>
        <Image source={{ uri: `https:${item.condition.icon}` }} style={styles.icon} />
        <Text style={styles.temp}>{`${temp} ${unit}`}</Text>
        <Text style={styles.humidity}>{`${humidity}%`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
      <FlatList
        data={filteredHourlyData}
        keyExtractor={(item) => item.time_epoch.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default HourlyForecastScreen;
