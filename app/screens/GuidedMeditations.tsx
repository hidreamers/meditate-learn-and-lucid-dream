import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, StyleSheet, Modal, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

const { width } = Dimensions.get('window');

const guidedMeditationTracks = [
    {
        id: '18',
        title: 'Deep Healing Meditation: Didgeridoo, Theta Waves & 61 Points of Relaxation',
        videoUrl: 'https://youtu.be/U-OoFVeq16I?si=rAQQjaIKhhTH3P7v',
        image: 'https://img.youtube.com/vi/U-OoFVeq16I/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/path/to/your/pdf.pdf',
    },
    {
        id: '19',
        title: '61 Point Relaxation',
        videoUrl: 'https://youtu.be/4-yWJrL1Wyc?si=8wemevCjfWowUVdf',
        image: 'https://img.youtube.com/vi/4-yWJrL1Wyc/hqdefault.jpg',
    },
    {
        id: '20',
        title: 'Open Your Heart',
        videoUrl: 'https://youtu.be/q8xrwOck07Q?si=mXBkqjvKta83JCIG',
        image: 'https://img.youtube.com/vi/q8xrwOck07Q/hqdefault.jpg',
    },
    {
        id: '21',
        title: 'I Am Connected Meditation',
        description: `“I Am Connected” is a powerful guided meditation designed to help you realign with your higher self and awaken your inner knowing. This practice blends deeply relaxing theta wave binaural beats with soul-activating affirmations to create a sacred space for spiritual connection, healing, and inner clarity.

As the binaural tones gently shift your brain into the theta state—the gateway to deep meditation, intuition, and spiritual insight—you’ll be guided to release resistance and tune in to the frequency of your higher power. The affirmations woven throughout the session act as energetic keys, opening channels to divine intelligence and reminding you that you are never alone.

Whether you're seeking guidance, inner peace, or a deeper connection to your purpose, this meditation will help you feel grounded, aligned, and supported.`,
        videoUrl: 'https://youtu.be/9JLsmoTqUSQ',
        image: 'https://img.youtube.com/vi/9JLsmoTqUSQ/hqdefault.jpg',
    },
    {
        id: '22',
        title: 'Lucid Dreaming Audio Meditation',
        audioFile: 'https://www.hidreamers.com/wp-content/uploads/2025/06/lucid_Dreaming.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2025/05/ChatGPT-Image-May-10-2025-11_13_39-AM.png',
        duration: 30,
    },
    {
        id: '23',
        title: 'Healing Spirit Guide with Lucid Dreaming',
        audioFile: 'https://www.jerimiahmolfese.com/Healing%20Spirit%20Guid%20with%20Lucid%20Dreaming.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/mnucpb0w.png',
        description: 'A soothing meditation to connect with your spirit guide and enhance your lucid dreaming journey. Let healing energy guide you through your dreams for deeper insight and peace.',
        duration: 30,
    },
    {
        id: '24',
        title: 'Theta with I Am Light Affirmations',
        audioFile: 'https://www.jerimiahmolfese.com/Theta%20with%20I%20am%20Light%20Affermations.mp3',
        image: 'https://www.hidreamers.com/wp-content/uploads/2024/05/ypf109d9.png',
        description: "Immerse yourself in theta waves and uplifting 'I Am Light' affirmations. This meditation helps you relax deeply, raise your vibration, and prepare your mind for lucid dreaming.",
        duration: 30,
    },
];

function getYoutubeId(url: string) {
    if (!url) return '';
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
}

export default function GuidedMeditations() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState<any>(null);

    const handleTrackPress = (track: any, locked: boolean) => {
        if (locked) return;
        setSelectedTrack(track);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedTrack(null);
    };

    const renderLockedCard = (track: any, idx: number) => (
        <View key={track.id} style={[styles.card, { opacity: 0.5 }]}> 
            <Image source={{ uri: track.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.title}>{track.title}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                    <Ionicons name="lock-closed" size={18} color="#d76d77" />
                    <Text style={{ color: '#d76d77', marginLeft: 6, fontWeight: 'bold' }}>Premium</Text>
                </View>
            </View>
        </View>
    );

    return (
        <LinearGradient colors={['#3a1c71', '#b993d6', '#fff']} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerBox}>
                  <Text style={styles.headerTitle}>Guided Meditations</Text>
                  <Text style={styles.headerSubtitle}>Guided audio and video meditations for healing, relaxation, and spiritual connection.</Text>
                </View>
                {guidedMeditationTracks.map((track, idx) =>
                    idx === 0 ? (
                        <TouchableOpacity
                            key={track.id}
                            style={styles.card}
                            onPress={() => handleTrackPress(track, false)}
                        >
                            <Image source={{ uri: track.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{track.title}</Text>
                                {track.description && (
                                    <Text style={styles.description}>{track.description}</Text>
                                )}
                                {track.pdf && (
                                    <TouchableOpacity
                                        style={styles.pdfButton}
                                        onPress={() => Linking.openURL(track.pdf)}
                                    >
                                        <Ionicons name="document-text-outline" size={16} color="#fff" />
                                        <Text style={styles.pdfButtonText}>Read PDF Lesson</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </TouchableOpacity>
                    ) : renderLockedCard(track, idx)
                )}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleCloseModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContentFixed}>
                            <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                                <Ionicons name="close" size={24} color="#fff" />
                            </TouchableOpacity>
                            {selectedTrack && (selectedTrack.videoUrl || selectedTrack.audioFile) ? (
                                <>
                                    <Text style={styles.playerTitle}>{selectedTrack.title}</Text>
                                    {selectedTrack.videoUrl ? (
                                        <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20, alignSelf: 'center' }}>
                                            <YoutubePlayer
                                                height={220}
                                                play={true}
                                                videoId={getYoutubeId(selectedTrack.videoUrl)}
                                            />
                                        </View>
                                    ) : null}
                                    {selectedTrack.audioFile ? (
                                        <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                            <Text style={{ color: '#fff', fontSize: 16, marginBottom: 10 }}>Audio: {selectedTrack.title}</Text>
                                            {/* You can add an audio player here if needed */}
                                        </View>
                                    ) : null}
                                </>
                            ) : null}
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        padding: 20,
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
    card: {
        backgroundColor: '#fff',
        borderRadius: 18,
        marginBottom: 18,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        width: '100%',
        shadowColor: '#000',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 3,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 16,
        marginRight: 18,
        backgroundColor: '#eee',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#3a1c71',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
    },
    pdfButton: {
        marginTop: 8,
        backgroundColor: '#d76d77',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    pdfButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 6,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContentFixed: {
        backgroundColor: '#1a1a2e',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 50,
        padding: 20,
        alignSelf: 'center',
        width: width - 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    playerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
});