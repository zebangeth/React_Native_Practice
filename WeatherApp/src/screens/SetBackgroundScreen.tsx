import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import { MainStackParamList } from '../navigation/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import CurrentWeather from '../components/CurrentWeather';
import { getWeatherData } from '../api/weatherApi';

type SetBackgroundScreenProps = NativeStackScreenProps<MainStackParamList, 'SetBackground'>;

const SetBackgroundScreen: React.FC<SetBackgroundScreenProps> = ({ route, navigation }) => {
  const { zipCode } = route.params;
  const { getFavoriteByZipCode, updateFavorite } = useContext(FavoritesContext);
  const favorite = getFavoriteByZipCode(zipCode);
  const { colors } = useTheme();
  const [backgroundImageUri, setBackgroundImageUri] = useState<string | undefined>(favorite?.backgroundImageUri);
  const [invertTextColor, setInvertTextColor] = useState<boolean>(favorite?.invertTextColor || false);
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    fetchWeatherData(zipCode);
  }, [zipCode]);

  const fetchWeatherData = async (zip: string) => {
    try {
      const data = await getWeatherData(zip);
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setBackgroundImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    try {
      await updateFavorite(zipCode, { backgroundImageUri, invertTextColor });
      Alert.alert('Success', 'Background image saved.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Unable to save background image.');
    }
  };

  const handleRemove = async () => {
    setBackgroundImageUri(undefined);
    setInvertTextColor(false);
    await updateFavorite(zipCode, { backgroundImageUri: undefined, invertTextColor: false });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {!backgroundImageUri ? (
        <TouchableOpacity onPress={pickImage} style={styles.button}>
          <Text style={[styles.buttonText, { color: colors.primary }]}>Choose Image</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity onPress={pickImage} style={styles.button}>
            <Text style={[styles.buttonText, { color: colors.primary }]}>Update Image</Text>
          </TouchableOpacity>
          {weatherData && (
            <CurrentWeather
              data={weatherData}
              isMetric={false}
              backgroundImageUri={backgroundImageUri}
              invertTextColor={invertTextColor}
            />
          )}
          <View style={styles.switchContainer}>
            <Text style={[styles.label, { color: colors.text }]}>Invert Text Color</Text>
            <Switch value={invertTextColor} onValueChange={setInvertTextColor} />
          </View>
          <TouchableOpacity onPress={handleSave} style={styles.button}>
            <Text style={[styles.buttonText, { color: colors.primary }]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRemove} style={styles.button}>
            <Text style={[styles.buttonText, { color: colors.primary }]}>Remove</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  button: {
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default SetBackgroundScreen;
