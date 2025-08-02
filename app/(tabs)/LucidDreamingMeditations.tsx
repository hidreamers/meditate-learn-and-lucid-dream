import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, Image, StyleSheet, Modal, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { LinearGradient } from 'expo-linear-gradient';
import * as Linking from 'expo-linking';

const { width } = Dimensions.get('window');

const dreamYogaLessons = [
    {
        id: '1',
        title: 'What Is Dream Yoga?',
        videoUrl: 'https://youtu.be/yhVgYI1Er_4',
        image: 'https://img.youtube.com/vi/yhVgYI1Er_4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/what-is-Dream-yoga.pdf',
    },
    {
        id: '2',
        title: 'Relaxation and Dream Yoga',
        videoUrl: 'https://youtu.be/jSHXax5LDIE',
        image: 'https://img.youtube.com/vi/jSHXax5LDIE/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Relaxation-Exercises-for-Lucid-Dreaming-and-Meditation.pdf',
    },
    {
        id: '3',
        title: 'The Weirdness of WILDs | Wake-Induced Lucid Dreaming Class',
        videoUrl: 'https://youtu.be/jnLVh1PgGmw',
        image: 'https://img.youtube.com/vi/jnLVh1PgGmw/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Weirdness-of-Wake-Induced-Lucid-Dreaming.pdf',
    },
    {
        id: '4',
        title: 'The Weirdness of WILDs Dream Yoga Step',
        videoUrl: 'https://youtu.be/xEe4OyFcoc4',
        image: 'https://img.youtube.com/vi/xEe4OyFcoc4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Weirdness-of-Wake-Induced-Lucid-Dreaming.pdf',
    },
    {
        id: '5',
        title: 'The Dream Lotus Technique Tibetan Dream Yoga',
        videoUrl: 'https://youtu.be/a0I9f8k-Yz4',
        image: 'https://img.youtube.com/vi/a0I9f8k-Yz4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-Lotus-and-Flame-Technique.pdf',
    },
    {
        id: '6',
        title: '5 Different Relaxation Exercises Dream Yoga step 3',
        videoUrl: 'https://youtu.be/JmYiKGjqIoo',
        image: 'https://img.youtube.com/vi/JmYiKGjqIoo/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Relaxation-Exercises-for-Lucid-Dreaming-and-Meditation.pdf',
    },
];

const mildLucidDreamingLessons = [
    {
        id: '7',
        title: 'What is Lucid dreaming and Dream Yoga',
        videoUrl: 'https://youtu.be/z33AMyp7sXc',
        image: 'https://img.youtube.com/vi/z33AMyp7sXc/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/introduction-to-lucid-dreaming.pdf',
    },
    {
        id: '8',
        title: 'Dream Signs',
        videoUrl: 'https://youtu.be/yhVgYI1Er_4',
        image: 'https://img.youtube.com/vi/yhVgYI1Er_4/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-signs-1.pdf',
    },
    {
        id: '9',
        title: 'Dream Signs: Doorways to Lucidity',
        videoUrl: 'https://youtu.be/z_eTrZssaJQ',
        image: 'https://img.youtube.com/vi/z_eTrZssaJQ/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Dream-signs-1.pdf',
    },
    {
        id: '10',
        title: 'Lucid Dreaming Autosuggestion Technique',
        videoUrl: 'https://youtu.be/aoRKFasR7qY',
        image: 'https://img.youtube.com/vi/aoRKFasR7qY/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Autosuggestion-Technique-1.pdf',
    },
    {
        id: '11',
        title: 'Lucid Dreaming Reflection Intention Technique',
        videoUrl: 'https://youtu.be/X1GyUQRhTLI',
        image: 'https://img.youtube.com/vi/X1GyUQRhTLI/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Reflection-Intention-Exercise.pdf',
    },
    {
        id: '12',
        title: 'Staying Lucid and Applications/Conclusion',
        videoUrl: 'https://youtu.be/Le9a9-oxTCQ',
        image: 'https://img.youtube.com/vi/Le9a9-oxTCQ/hqdefault.jpg',
        pdf: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Staying-lucid-1.pdf',
    },
];

function getYoutubeId(url) {
    if (!url) return '';
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : '';
}

export default function LucidDreamingMeditations() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleTrackPress = (track, locked) => {
        if (locked) return;
        setSelectedTrack(track);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedTrack(null);
    };

    return (
        <LinearGradient colors={['#3a1c71', '#b993d6', '#fff']} style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.headerBox}>
                    <Text style={styles.headerTitle}>Lucid Dreaming and Dream Yoga Lessons</Text>
                    <Text style={styles.headerSubtitle}>Lessons and practices for lucid dreaming, dream yoga, and techniques to awaken within your dreams.</Text>
                </View>
                <Text style={styles.categoryTitle}>Dream Yoga Lessons</Text>
                {dreamYogaLessons.map((track, idx) => {
                    const locked = idx > 0;
                    return (
                        <TouchableOpacity
                            key={track.id}
                            style={[styles.card, locked && { opacity: 0.5 }]}
                            onPress={() => handleTrackPress(track, locked)}
                            disabled={locked}
                        >
                            <Image source={{ uri: track.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{track.title}</Text>
                                {locked ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                        <Ionicons name="lock-closed" size={18} color="#d76d77" />
                                        <Text style={{ color: '#d76d77', marginLeft: 6, fontWeight: 'bold' }}>Premium</Text>
                                    </View>
                                ) : (
                                    track.pdf && (
                                        <TouchableOpacity
                                            style={styles.pdfButton}
                                            onPress={() => Linking.openURL(track.pdf)}
                                        >
                                            <Ionicons name="document-text-outline" size={16} color="#fff" />
                                            <Text style={styles.pdfButtonText}>Read PDF Lesson</Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
                <Text style={[styles.categoryTitle, { marginTop: 30 }]}>MILD Lucid Dreaming Lessons</Text>
                {mildLucidDreamingLessons.map((track, idx) => {
                    const locked = idx > 0;
                    return (
                        <TouchableOpacity
                            key={track.id}
                            style={[styles.card, locked && { opacity: 0.5 }]}
                            onPress={() => handleTrackPress(track, locked)}
                            disabled={locked}
                        >
                            <Image source={{ uri: track.image }} style={styles.image} />
                            <View style={{ flex: 1 }}>
                                <Text style={styles.title}>{track.title}</Text>
                                {locked ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
                                        <Ionicons name="lock-closed" size={18} color="#d76d77" />
                                        <Text style={{ color: '#d76d77', marginLeft: 6, fontWeight: 'bold' }}>Premium</Text>
                                    </View>
                                ) : (
                                    track.pdf && (
                                        <TouchableOpacity
                                            style={styles.pdfButton}
                                            onPress={() => Linking.openURL(track.pdf)}
                                        >
                                            <Ionicons name="document-text-outline" size={16} color="#fff" />
                                            <Text style={styles.pdfButtonText}>Read PDF Lesson</Text>
                                        </TouchableOpacity>
                                    )
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
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
                                (() => {
                                    const videoId = getYoutubeId(selectedTrack.videoUrl);
                                    if (!videoId) {
                                        return <Text style={{ color: '#fff', textAlign: 'center', margin: 20 }}>Invalid or missing YouTube video. Please contact support.</Text>;
                                    }
                                    return (
                                        <>
                                            <Text style={styles.playerTitle}>{selectedTrack.title}</Text>
                                            <View style={{ width: width - 40, aspectRatio: 16 / 9, marginBottom: 20, alignSelf: 'center' }}>
                                                <YoutubePlayer
                                                    height={220}
                                                    play={true}
                                                    videoId={videoId}
                                                />
                                            </View>
                                        </>
                                    );
                                })()
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