import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface CurrentWeatherProps {
  data: any;
  isMetric: boolean;
  backgroundImageUri?: string;
  invertTextColor?: boolean;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data, isMetric, backgroundImageUri, invertTextColor }) => {
  const { colors } = useTheme();
  const textColor = invertTextColor ? (colors.text === '#FFFFFF' ? '#000000' : '#FFFFFF') : colors.text;
  const temperature = isMetric ? data.current.temp_c : data.current.temp_f;
  const feelsLike = isMetric ? data.current.feelslike_c : data.current.feelslike_f;
  const unit = isMetric ? '°C' : '°F';

  return (
    <View style={styles.container}>
      {backgroundImageUri ? (
        <ImageBackground
          source={{ uri: backgroundImageUri }}
          style={styles.backgroundImage}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.overlay}>
            <Text style={[styles.temperature, { color: textColor }]}>{`${Math.round(temperature)}${unit}`}</Text>
            <Text style={[styles.feelsLike, { color: textColor }]}>{`Feels like ${Math.round(feelsLike)}${unit}`}</Text>
            <Text style={[styles.locationCity, { color: textColor }]}>{data.location.name}</Text>
            <Text style={[styles.locationRegion, { color: textColor }]}>{data.location.region}</Text>
          </View>
        </ImageBackground>
      ) : (
        <View style={styles.noBackground}>
          <Text style={[styles.temperature, { color: textColor }]}>{`${Math.round(temperature)}${unit}`}</Text>
          <Text style={[styles.feelsLike, { color: textColor }]}>{`Feels like ${Math.round(feelsLike)}${unit}`}</Text>
          <Text style={[styles.locationCity, { color: textColor }]}>{data.location.name}</Text>
          <Text style={[styles.locationRegion, { color: textColor }]}>{data.location.region}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 16,
  },
  backgroundImage: {
    width: '100%',
    aspectRatio: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBackground: {
    width: '100%',
    alignItems: 'center',
  },
  overlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
  },
  temperature: {
    fontSize: 64,
  },
  feelsLike: {
    fontSize: 18,
  },
  locationCity: {
    fontSize: 32,
  },
  locationRegion: {
    fontSize: 24,
  },
});

export default CurrentWeather;
