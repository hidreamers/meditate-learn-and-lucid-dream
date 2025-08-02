import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking, Dimensions, Platform, StatusBar, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const books = [
  {
    id: '1',
    title: "Convergence and the Love Code",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Convergence-Through-a-Post-Apocalyptic-Dallas.png",
    link: "https://www.jerimiahmolfese.com/The_Love_Code.epub",
    description: "In a near-future world ravaged by nuclear devastation and an AI uprising, humanity finds itself on the brink of extinction. As society collapses and advanced machines wage war against the remnants of human civilization, a groundbreaking discovery offers a flicker of hope—a portal into an uncharted quantum realm where the laws of reality can be rewritten.\n\nConvergence and the Love Code is a sweeping tale of resilience, hope, and the transformative power of love—a story that challenges the boundaries between man and machine, and dares to imagine a world where even in the face of annihilation, the human spirit finds a way to prevail.",
  },
  {
    id: '2',
    title: "The Great Journey: What Lies Beyond",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/The-Great-Journey-What-Lies-Beyond-Fiction-or-reality-unraveling-some-of-humanitys-most-profound-questions-scaled.jpeg",
    link: "https://www.jerimiahmolfese.com/the_great_journy.epub",
    description: "Fiction or reality? Unraveling some of humanity's most profound questions.",
  },
  {
    id: '3',
    title: "My Adventures in Lucid Dreaming",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Lucid-Dreaming-cover.png",
    link: "https://www.jerimiahmolfese.com/My_Adventures_in_lucid_dreaming.epub",
    description: "Unlock the secrets of lucid dreaming and explore your inner universe.",
  },
  {
    id: '4',
    title: "Manifestation Through Spiritual Power: Unlock the secrets of Lucid Dreaming and Alchemy",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Manifestation-Unlock-the-Secrets-of-Lucid-Dreaming-and-Alchemy--scaled.jpeg",
    link: "https://www.jerimiahmolfese.com/Manifestation.epub",
    description: "Discover the connection between lucid dreaming and the art of manifestation.",
  },
  {
    id: '5',
    title: "Guardians Volume One",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Rise-of-The-Protectors-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/Guardians_Book_1.epub",
    description: "The first adventure in the Guardians saga.",
  },
  {
    id: '6',
    title: "Guardians Book 2",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-of-five-planets-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/GUARDIANS_Book_2.epub",
    description: "The epic battle continues across the stars.",
  },
  {
    id: '7',
    title: "Guardians Volume Three",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-For-The-Multiverse-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/Gaurdians_Book_3.epub",
    description: "The fate of the multiverse hangs in the balance.",
  },
  {
    id: '8',
    title: "Guardians Volume Four",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-For-The-Multiverse-Jerimiah-Molfese.png",
    link: "https://www.jerimiahmolfese.com/Guardians_Book_4.epub",
    description: "The final battle for the Guardians.",
  },
  {
    id: '9',
    title: "A Dreamer’s Odyssey: True Stories of a Dream Traveler",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/04/cover-scaled.jpg",
    link: "https://www.jerimiahmolfese/A_Dreamer_Odyssey.epub",
    description: "“A Dreamer’s Odyssey: True Stories of a Dream Traveler” is an intimate journey into the real-life experiences of lucid dreaming and spiritual discovery.",
  },
  {
    id: '10',
    title: "The Seventh Angel",
    cover: "https://www.hidreamers.com/wp-content/uploads/2025/05/cover-scaled.jpg",
    link: "https://www.dropbox.com/scl/fi/h0he9ko29yf3qx3jmvhjg/The-seventh-angel.pdf?rlkey=kiq9ax36gwd9x7cskjal6md88&dl=0",
    description: `"The Seventh Angel" delves into the life of Seth, a young man who grapples with profound questions of spirituality and reality through the realm of lucid dreaming. After the sudden death of his father, a scientist exploring the boundaries of consciousness, Seth inherits a legacy of dream experimentation that challenges his perception of life and his purpose in the cosmos. The narrative weaves a tapestry of metaphysical exploration and personal transformation, inviting readers to question the very fabric of their existence. My inspiration for "The Seventh Angel" stems from my deep interest in spiritual philosophy and the human psyche's untapped potentials.`,
  },
];

const { width } = Dimensions.get('window');

export default function BooksScreen() {
  const [isPremium, setIsPremium] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handlePremiumPress = () => setShowPremiumModal(true);
  const closePremiumModal = () => setShowPremiumModal(false);

  return (
    <LinearGradient
      colors={['#3a1c71', '#b993d6', '#fff']}
      style={styles.gradientBackground}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Books by Jerimiah Molfese</Text>
        <Text style={styles.headerSubtitle}>
          Recommended reading and resources for lucid dreaming
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.bodyText}>
          You can use the{' '}
          <Text
            style={styles.linkText}
            onPress={() =>
              Linking.openURL('https://www.amazon.com/b/ref=ruby_redirect?ie=UTF8&node=16571048011')
            }
          >
            Kindle Reader app
          </Text>{' '}
          to access these books.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {books.map(book => (
          <View key={book.id} style={styles.bookCard}>
            <Image
              source={{ uri: book.cover }}
              style={styles.bookCover}
              resizeMode="contain"
            />
            <Text style={styles.bookTitle}>{book.title}</Text>
            <Text style={styles.bookDesc}>{book.description}</Text>
            <TouchableOpacity
              style={{ marginTop: 2, opacity: isPremium ? 1 : 0.5, flexDirection: 'row', alignItems: 'center' }}
              onPress={isPremium ? () => Linking.openURL(book.link) : handlePremiumPress}
              activeOpacity={0.85}
              disabled={!isPremium}
            >
              <Text style={styles.bookLink}>Read now</Text>
              {!isPremium && <Text style={{ marginLeft: 6, color: '#d76d77', fontSize: 16 }}>🔒</Text>}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      {/* Premium Modal */}
      <Modal
        visible={showPremiumModal}
        animationType="slide"
        transparent
        onRequestClose={closePremiumModal}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center', maxWidth: 320 }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#3a1c71' }}>Go Premium</Text>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 20, textAlign: 'center' }}>
              Unlock all books and audio content!
            </Text>
            <TouchableOpacity onPress={closePremiumModal}>
              <Text style={{ color: '#3a1c71', marginTop: 8 }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 36,
    paddingBottom: 10,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginTop: 2,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
    alignItems: 'center',
  },
  description: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  link: {
    color: '#d76d77',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  bookCard: {
    width: width - 32,
    backgroundColor: '#fff',
    borderRadius: 18,
    marginBottom: 28,
    padding: 18,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 10,
  },
  bookCover: {
    width: width - 80,
    aspectRatio: 2 / 3,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#eee',
    alignSelf: 'center',
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#3a1c71',
    textAlign: 'center',
    marginBottom: 8,
  },
  bookDesc: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  bookLink: {
    color: '#d76d77',
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 2,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bodyText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  linkText: {
    color: '#3a1c71',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});