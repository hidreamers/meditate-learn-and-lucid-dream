import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, StyleSheet, Modal, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

const { width } = Dimensions.get('window');

const didgeridooTracks = [
    {
        id: '1',
        title: 'How to Play the Didgeridoo Part 1: Find the Sweet Spot',
        videoUrl: 'https://youtu.be/_renfJmANio',
        image: 'https://img.youtube.com/vi/_renfJmANio/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Find-the-Sweet-Spot-with-the-Didgeridoo.pdf',
    },
    {
        id: '2',
        title: 'How to Play the Didgeridoo Part 2: Circular Breathing',
        videoUrl: 'https://youtu.be/lWj16EFByCM',
        image: 'https://img.youtube.com/vi/lWj16EFByCM/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Do-Circular-Breathing.pdf',
    },
    {
        id: '3',
        title: 'How to Play the Didgeridoo Part 3: Healing and how to make sounds',
        videoUrl: 'https://youtu.be/dTM83JE1rkc',
        image: 'https://img.youtube.com/vi/dTM83JE1rkc/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Play-Overtones-on-the-Didgeridoo.pdf',
    },
    {
        id: '4',
        title: 'How to Play the Didgeridoo part 4 Build energy for healing part 1',
        videoUrl: 'https://youtu.be/zXc0i0UOqaU',
        image: 'https://img.youtube.com/vi/zXc0i0UOqaU/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Play-the-Didgeridoo-Building-and-Directing-Energy-for-Healing.pdf',
    },
    {
        id: '5',
        title: 'Didgeridoo Lessons Part 4 How to Build energy for healing part 2',
        videoUrl: 'https://youtu.be/3-btEDAdEtM',
        image: 'https://img.youtube.com/vi/3-btEDAdEtM/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/How-to-Play-the-Didgeridoo-Building-and-Directing-Energy-for-Healing.pdf',
    },
];

function getYoutubeId(url: string) {
    if (!url) return '';
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
}

export default function DidgeridooMeditations() {
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
                  <Text style={styles.headerTitle}>Didgeridoo Lessons</Text>
                  <Text style={styles.headerSubtitle}>Sound healing and didgeridoo lessons for relaxation, energy, and deep meditative states.</Text>
                </View>
                {didgeridooTracks.map((track, idx) =>
                    idx === 0 ? (
                        <TouchableOpacity
                            key={track.id}
                            style={styles.card}
                            onPress={() => handleTrackPress(track, false)}
                        >
                            <Image source={{ uri: track.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{track.title}</Text>
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
                            {selectedTrack && selectedTrack.videoUrl ? (
                                <>
                                    <Text style={styles.playerTitle}>{selectedTrack.title}</Text>
                                    <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20, alignSelf: 'center' }}>
                                        <YoutubePlayer
                                            height={220}
                                            play={true}
                                            videoId={getYoutubeId(selectedTrack.videoUrl)}
                                        />
                                    </View>
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