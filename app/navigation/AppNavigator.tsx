import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FloatingNav from '../screens/FloatingNav';
import { View, StyleSheet } from 'react-native';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {/* REMOVE Tab.Navigator and only use FloatingNav */}
        <FloatingNav />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});