import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import FloatingNav from './screens/FloatingNav';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="dream/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="dream-journal/new" options={{ title: 'New Dream' }} />
        <Stack.Screen name="technique/[id]" options={{ headerShown: false }} />
      </Stack>
      <FloatingNav />
    </ThemeProvider>
  );
}

// REMOVE TabLayout export to prevent Tabs from being used anywhere
// export function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarActiveTintColor: '#3a1c71',
//         tabBarInactiveTintColor: '#888',
//         headerShown: false,
//         tabBarStyle: { display: 'none' }, // Hide the default tab bar
//         tabBarIcon: ({ color, size }) => {
//           let iconName: "home-outline" | "book-outline" | "library-outline" | "eye-outline" | "musical-notes-outline" | "play-circle-outline" | "headset-outline" | "information-circle-outline" | "sunny-outline" = 'eye-outline';
//           if (route.name === 'index') iconName = 'home-outline';
//           else if (route.name === 'Meditations') iconName = 'musical-notes-outline';
//           else if (route.name === 'RealityChecks') iconName = 'eye-outline';
//           else if (route.name === 'Books') iconName = 'library-outline';
//           else if (route.name === 'Dream Journal') iconName = 'book-outline';
//           else if (route.name === 'Joe Dispenza') iconName = 'play-circle-outline';
//           else if (route.name === 'Binaural Beats') iconName = 'headset-outline';
//           else if (route.name === 'Instructions') iconName = 'information-circle-outline';
//           else if (route.name === 'About') iconName = 'sunny-outline';
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//     />
//   );
// }
