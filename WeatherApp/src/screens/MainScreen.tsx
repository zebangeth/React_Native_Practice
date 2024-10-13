import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView, useWindowDimensions, ActivityIndicator, Alert } from 'react-native';
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
import { useTheme } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as SplashScreen from 'expo-splash-screen';
import { FavoritesContext, Favorite } from '../contexts/FavoritesContext';
import { getZipCode } from '../api/geoapifyApi';

type MainScreenProps = NativeStackScreenProps<MainStackParamList, 'Weather'>;

SplashScreen.preventAutoHideAsync();

const MainScreen: React.FC<MainScreenProps> = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [zipCode, setZipCode] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isMetric, setIsMetric] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const { getFavoriteByZipCode, favorites } = useContext(FavoritesContext);

  const [favoriteData, setFavoriteData] = useState<Favorite | undefined>(undefined);

  const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      backgroundColor: colors.background,
    },
    container: {
      flex: 1,
      flexDirection: isLandscape ? 'row' : 'column',
      justifyContent: 'space-around',
      paddingHorizontal: isLandscape ? 16 : 0,
    },
    leftColumn: {
      flex: 1,
    },
    rightColumn: {
      flex: 1,
    },
    placeholder: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    placeholderText: {
      color: colors.text,
    },
  });

  useEffect(() => {
    if (route.params && route.params.zipCode) {
      handleSearch(route.params.zipCode);
    } else {
      requestLocationPermission();
    }
  }, [route.params]);

  useEffect(() => {
    if (zipCode) {
      const favorite = getFavoriteByZipCode(zipCode);
      setFavoriteData(favorite);
    } else {
      setFavoriteData(undefined);
    }
  }, [zipCode, favorites]);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        getCurrentLocation();
      } else {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    } catch (error) {
      console.error('Error requesting location permissions:', error);
      setIsLoading(false);
      SplashScreen.hideAsync();
    }
  };

  const getCurrentLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      // Get the zip code using Geoapify API
      const zip = await getZipCode(latitude, longitude);
      if (zip) {
        handleSearch(zip);
      } else {
        Alert.alert('Error', 'Unable to get ZIP code from location.');
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    } catch (error) {
      console.error('Error getting current location:', error);
      setIsLoading(false);
      SplashScreen.hideAsync();
    }
  };

  const fetchWeatherData = async (zip: string) => {
    try {
      const data = await getWeatherData(zip);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
      SplashScreen.hideAsync();
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

  const favorite = getFavoriteByZipCode(zipCode);

  return (
    <SafeAreaProvider>
      <Header onPressSearch={openSearchModal} />
      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.primary} />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          alwaysBounceVertical={false}
        >
          {weatherData ? (
            <View style={styles.container}>
              {isLandscape ? (
                <>
                  <View style={styles.leftColumn}>
                    <CurrentWeather
                      data={weatherData}
                      isMetric={isMetric}
                      backgroundImageUri={favoriteData?.backgroundImageUri}
                      invertTextColor={favoriteData?.invertTextColor}
                    />
                    <FavoritesManager
                      currentZipCode={zipCode}
                      currentLocation={`${weatherData.location.name}, ${weatherData.location.region}`}
                      navigation={navigation}
                    />
                  </View>
                  <View style={styles.rightColumn}>
                    <WeatherDetails data={weatherData} isMetric={isMetric} />
                    <ForecastList
                      forecast={weatherData.forecast.forecastday}
                      isMetric={isMetric}
                      onDayPress={handleDayPress}
                    />
                    <UnitToggle isMetric={isMetric} onToggle={toggleUnit} />
                  </View>
                </>
              ) : (
                <>
                  <CurrentWeather
                    data={weatherData}
                    isMetric={isMetric}
                    backgroundImageUri={favoriteData?.backgroundImageUri}
                    invertTextColor={favoriteData?.invertTextColor}
                  />
                  <FavoritesManager
                    currentZipCode={zipCode}
                    currentLocation={`${weatherData.location.name}, ${weatherData.location.region}`}
                    navigation={navigation}
                  />
                  <WeatherDetails data={weatherData} isMetric={isMetric} />
                  <ForecastList
                    forecast={weatherData.forecast.forecastday}
                    isMetric={isMetric}
                    onDayPress={handleDayPress}
                  />
                  <UnitToggle isMetric={isMetric} onToggle={toggleUnit} />
                </>
              )}
            </View>
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>
                Click on the search bar to enter a zip code
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaProvider>
  );
};

export default MainScreen;
