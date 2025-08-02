import { Tabs } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="meditation" />
      <Tabs.Screen name="reality-checks" />
      <Tabs.Screen name="about" />
      <Tabs.Screen name="books" />
      <Tabs.Screen name="dream-journal" />
      <Tabs.Screen name="joe-dispenza" />
      <Tabs.Screen name="binaural-beats" />
      <Tabs.Screen name="screensaver" />
    </Tabs>
  );
}
