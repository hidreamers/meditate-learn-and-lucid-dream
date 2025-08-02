import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function CustomTabBar(props) {
  // Fallback to default Tabs bar if TabBar is not available
  if (!Tabs || !Tabs.Bar) {
    return null;
  }
  return (
    <Tabs.Bar
      {...props}
      renderIcon={({ route, focused, color, size }) => {
        switch (route.name) {
          case 'index':
            return <Ionicons name="home" size={size} color={color} />;
          case 'screensaver':
            return <Ionicons name="planet" size={size} color={color} />;
          case 'meditation':
            return <Ionicons name="musical-notes" size={size} color={color} />;
          case 'reality-checks':
            return <Ionicons name="eye" size={size} color={color} />;
          case 'about':
            return <Ionicons name="sunny" size={size} color={color} />;
          case 'books':
            return <Ionicons name="library" size={size} color={color} />;
          case 'dream-journal':
            return <Ionicons name="book" size={size} color={color} />;
          case 'joe-dispenza':
            return <Ionicons name="play-circle" size={size} color={color} />;
          case 'binaural-beats':
            return <Ionicons name="headset" size={size} color={color} />;
          default:
            return <Ionicons name="help" size={size} color={color} />;
        }
      }}
    />
  );
}
