import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from './src/components/Header';
import CurrentWeather from './src/components/CurrentWeather';
import FavoritesManager from './src/components/FavoritesManager';
import UnitToggle from './src/components/UnitToggle';
import ForecastList from './src/components/ForecastList';
import SearchModal from './src/components/SearchModal';
import WeatherDetails from './src/components/WeatherDetails';
import { getWeatherData } from './src/api/weatherApi';

const App: React.FC = () => {
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isMetric, setIsMetric] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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
    setModalVisible(true);
  };

  const closeSearchModal = () => {
    setModalVisible(false);
    // Refresh favorite status when modal closes
    setRefreshFavorites((prev) => !prev);
  };

  // State to trigger refresh of favorites
  const [refreshFavorites, setRefreshFavorites] = useState<boolean>(false);

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
            <WeatherDetails data={weatherData} isMetric={isMetric} />
            <FavoritesManager
              currentZipCode={zipCode}
              currentLocation={`${weatherData.location.name}, ${weatherData.location.region}`}
              onSelectFavorite={handleSearch}
              refreshTrigger={refreshFavorites}
            />
            <ForecastList forecast={weatherData.forecast.forecastday} isMetric={isMetric} />
            <UnitToggle isMetric={isMetric} onToggle={toggleUnit} />
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text>Click on the search bar to enter a zip code</Text>
          </View>
        )}
      </ScrollView>
      <SearchModal
        visible={modalVisible}
        onClose={closeSearchModal}
        onSelectLocation={handleSearch}
      />
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

export default App;
