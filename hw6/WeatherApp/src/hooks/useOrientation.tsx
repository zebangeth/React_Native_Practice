import { useEffect, useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

export function useOrientation() {
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);

  useEffect(() => {
    // Function to get the current orientation
    const getCurrentOrientation = async () => {
      try {
        const currentOrientation = await ScreenOrientation.getOrientationAsync();
        setOrientation(currentOrientation);
      } catch (error) {
        console.error('Error getting current orientation:', error);
      }
    };

    getCurrentOrientation();

    // Subscribe to orientation changes
    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      setOrientation(evt.orientationInfo.orientation);
    });

    // Cleanup the subscription on unmount
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return orientation;
}
