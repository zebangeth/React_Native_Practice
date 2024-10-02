import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface UnitToggleProps {
  isMetric: boolean;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ isMetric, onToggle }) => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 16,
    },
    label: {
      marginHorizontal: 8,
      fontSize: 16,
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Imperial</Text>
      <Switch value={isMetric} onValueChange={onToggle} />
      <Text style={styles.label}>Metric</Text>
    </View>
  );
};

export default UnitToggle;
