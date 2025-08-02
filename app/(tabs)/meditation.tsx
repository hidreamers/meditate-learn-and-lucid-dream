import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

export default function Meditation() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#3a1c71', '#b993d6', '#fff']} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTitle}>Meditation Resources</Text>
          <Text style={styles.headerSubtitle}>
            Explore our meditation resources below. Each section offers a unique approach to meditation, lucid dreaming, and sound healing. Tap a button to dive into detailed lessons and guided experiences.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => router.replace('/LucidDreamingMeditations')}
        >
          <Ionicons name="moon" size={32} color="#3a1c71" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>Lucid Dreaming & Dream Yoga</Text>
            <Text style={styles.linkDesc}>
              Lessons and practices for lucid dreaming, dream yoga, and techniques to awaken within your dreams.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => router.push('/screens/DidgeridooMeditations')}
        >
          <Ionicons name="musical-notes" size={32} color="#b06ab3" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>Didgeridoo Lessons</Text>
            <Text style={styles.linkDesc}>
              Sound healing and didgeridoo lessons for relaxation, energy, and deep meditative states.
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkCard}
          onPress={() => router.push('/screens/GuidedMeditations')}
        >
          <Ionicons name="headset" size={32} color="#d76d77" style={styles.icon} />
          <View style={{ flex: 1 }}>
            <Text style={styles.linkTitle}>Guided Meditations</Text>
            <Text style={styles.linkDesc}>
              Guided audio and video meditations for healing, relaxation, and spiritual connection.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  headerBox: {
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 8,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f7fa',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  icon: {
    marginRight: 18,
  },
  linkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 4,
  },
  linkDesc: {
    fontSize: 14,
    color: '#555',
  },
});
