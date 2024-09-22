// weather-in-react-native/src/components/UnitToggle.tsx

import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface UnitToggleProps {
  isMetric: boolean;
  onToggle: () => void;
}

const UnitToggle: React.FC<UnitToggleProps> = ({ isMetric, onToggle }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Imperial</Text>
      <Switch value={isMetric} onValueChange={onToggle} />
      <Text style={styles.label}>Metric</Text>
    </View>
  );
};

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
  },
});

export default UnitToggle;
