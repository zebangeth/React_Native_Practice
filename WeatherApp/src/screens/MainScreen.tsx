import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CurrentWeather from '../components/CurrentWeather';
import FavoritesManager from '../components/FavoritesManager';
import UnitToggle from '../components/UnitToggle';
import ForecastList from '../components/ForecastList';
import WeatherDetails from '../components/WeatherDetails';
import { getWeatherData } from '../api/weatherApi';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainStackParamList } from '../navigation/types';

type MainScreenProps = NativeStackScreenProps<MainStackParamList, 'Weather'>;

const MainScreen: React.FC<MainScreenProps> = ({ route, navigation }) => {
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isMetric, setIsMetric] = useState<boolean>(false);

  useEffect(() => {
    if (route.params && route.params.zipCode) {
      handleSearch(route.params.zipCode);
    }
  }, [route.params]);

  const fetchWeatherData = async (zip: string) => {
    try {
      const data = await getWeatherData(zip);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSearch = (zip: string) => {
    setZipCode(zip);
    fetchWeatherData(zip);
  };

  const toggleUnit = () => {
    setIsMetric(!isMetric);
  };

  const openSearchModal = () => {
    navigation.navigate('Search');
  };

  const handleDayPress = (date: string, hourlyData: any[]) => {
    navigation.navigate('HourlyForecast', { date, hourlyData, isMetric });
  };

  return (
    <SafeAreaProvider>
      <Header onPressSearch={openSearchModal} />
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        alwaysBounceVertical={false}
      >
        {weatherData ? (
          <View style={styles.container}>
            <CurrentWeather data={weatherData} isMetric={isMetric} />
            <FavoritesManager
              currentZipCode={zipCode}
              currentLocation={`${weatherData.location.name}, ${weatherData.location.region}`}
            />
            <WeatherDetails data={weatherData} isMetric={isMetric} />
            <ForecastList
              forecast={weatherData.forecast.forecastday}
              isMetric={isMetric}
              onDayPress={handleDayPress}
            />
            <UnitToggle isMetric={isMetric} onToggle={toggleUnit} />
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text>Click on the search bar to enter a zip code</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default MainScreen;
