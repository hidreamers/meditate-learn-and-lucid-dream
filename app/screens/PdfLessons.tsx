// PdfLessons.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const pdfLessonTracks = [
  {
    id: 'pdf1',
    title: 'Introduction to Lucid Dreaming',
    pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/introduction-to-lucid-dreaming.pdf',
    image: 'https://img.icons8.com/ios-filled/100/000000/pdf.png',
    duration: 0,
  },
  // ... (add the rest of the tracks from the PDF Lessons category here, same as in meditation.tsx)
];

export default function PdfLessons({ onTrackPress }) {
  return (
    <View>
      <Text style={styles.categoryTitle}>PDF Lessons</Text>
      {pdfLessonTracks.map((track) => (
        <TouchableOpacity
          key={track.id}
          style={styles.card}
          onPress={() => onTrackPress(track, false)}
        >
          <Image source={{ uri: track.image }} style={styles.image} />
          <Text style={styles.title}>{track.title}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <Ionicons name="document-text-outline" size={16} color="#3a1c71" />
            <Text style={styles.pdfText}>PDF</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 10,
    marginTop: 18,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    width: 220,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 16,
    backgroundColor: '#eee',
    marginBottom: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#3a1c71',
    marginBottom: 4,
    textAlign: 'center',
  },
  pdfText: {
    fontSize: 13,
    color: '#3a1c71',
    marginLeft: 3,
  },
});
