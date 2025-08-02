import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FaHome, FaStar, FaImages, FaBook, FaDownload, FaEnvelope } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Home', anchor: 'home' },
  { label: 'App Features', anchor: 'features' },
  { label: 'Screenshots', anchor: 'screenshots' },
  { label: 'Books', anchor: 'books' },
  { label: 'Download', anchor: 'download' },
  { label: 'Contact Us', anchor: 'contact' },
];

const screenshotData = [
  {
    file: 'Screenshot_20250726_092006_Meditate-Dream-Learn.jpg',
    label: 'MILD Practice',
    desc: 'Guided MILD lucid dreaming technique.',
    detail: 'The MILD (Mnemonic Induction of Lucid Dreams) screen introduces you to a proven technique for becoming aware while dreaming. Follow the on-screen steps to set your intention before sleep, use affirmations, and practice visualization. The app guides you through reminders and tips to help you recognize dream signs and increase your chances of having lucid dreams. Beginners are encouraged to use this feature nightly for best results.'
  },
  {
    file: 'Screenshot_20250726_092017_Meditate-Dream-Learn.jpg',
    label: '2-Hour Reminders',
    desc: 'Gentle reminders every 2 hours.',
    detail: 'This feature allows you to enable automatic reminders every two hours, both day and night. When a switch is ON, you will receive notifications prompting you to perform a specific lucid dreaming or mindfulness activity. This helps build the habit of regular reality checks, meditation, or journaling, which are essential for lucid dreamers. You can turn reminders ON or OFF for each practice card on the home screen.'
  },
  {
    file: 'Screenshot_20250726_092028_Meditate-Dream-Learn.jpg',
    label: 'Meditation & Journal Reminders',
    desc: 'Reminders to meditate and journal.',
    detail: 'Stay consistent with your meditation and dream journaling practice using this reminder system. Every two hours, the app will prompt you to take a moment for meditation or to record your dreams and thoughts. This regularity helps improve dream recall and supports mindfulness throughout your day and night.'
  },
  {
    file: 'Screenshot_20250726_092105_Meditate-Dream-Learn.jpg',
    label: 'Books Library',
    desc: 'Books by Jerimiah Molfese.',
    detail: 'Browse and access a curated library of books by Jerimiah Molfese, available in Kindle and audiobook formats. The library includes titles such as "Convergence and the Love Code," "The Great Journey: What Lies Beyond," "My Adventures in Lucid Dreaming," "Manifestation Through Spiritual Power," the "Guardians" series, "A Dreamer’s Odyssey," and "The Seventh Angel." Tap a book to read or listen, and use the navigation to explore more resources.'
  },
  {
    file: 'Screenshot_20250726_092124_Meditate-Dream-Learn.jpg',
    label: 'Video & PDF Lessons',
    desc: 'Didgeridoo, lucid dreaming, yoga.',
    detail: 'Access a comprehensive set of video and PDF lessons covering didgeridoo sound healing, lucid dreaming techniques, and dream yoga practices. The didgeridoo lessons teach you how to play the instrument from the basics, including breath control, drone, and circular breathing, and how to use it for sound healing and meditation. Each lesson includes a video for visual learning and a downloadable PDF for in-depth study. Tap a lesson to watch, read, or download resources and deepen your practice.'
  },
  {
    file: 'Screenshot_20250726_092143_Meditate-Dream-Learn.jpg',
    label: 'Joe Dispenza Meditations',
    desc: 'Open source lucid meditations.',
    detail: 'Explore open-source meditations inspired by Dr. Joe Dispenza. These guided meditations are designed to help you relax, enter altered states of consciousness, and enhance your lucid dreaming and meditation experience. Use headphones for best results and follow the step-by-step instructions provided in each meditation.'
  },
  {
    file: 'Screenshot_20250726_092212_Meditate-Dream-Learn.jpg',
    label: 'Dream Journal Analysis',
    desc: 'Record and analyze dreams.',
    detail: 'The Dream Journal feature lets you record your dreams and analyze them for recurring dream signs and patterns. The app automatically highlights keywords and common themes, helping you identify triggers for lucidity. Over time, you can track your progress and discover what appears most often in your dreams.'
  },
  {
    file: 'Screenshot_20250726_092241_Meditate-Dream-Learn.jpg',
    label: 'Binaural Beats Selection',
    desc: 'Multiple frequencies for each ear.',
    detail: 'Create your own binaural beats soundscape by selecting different frequencies and sounds for each ear. Choose from Alpha, Beta, Theta, Delta, Gamma, singing bowls, chakra tones, thunder, and ocean sounds. Layer multiple audio tracks for a personalized meditation or sleep experience. Use good headphones for the full effect.'
  },
  {
    file: 'Screenshot_20250726_092258_Meditate-Dream-Learn.jpg',
    label: 'Binaural Beats Player',
    desc: 'Mix and play binaural beats.',
    detail: 'The Binaural Beats Player screen lets you mix, match, and play your chosen binaural beats. Select audio for each ear, adjust the volume, and tap play to start your session. The player supports multi-select, so you can layer different frequencies and ambient sounds. Follow the on-screen tips for best results and safety.'
  },
  {
    file: 'Screenshot_20250726_092311_Meditate-Dream-Learn.jpg',
    label: 'Reality Check Reminders',
    desc: 'Reminders every 2 hours.',
    detail: 'Enable reality check reminders to receive notifications every two hours. Each reminder prompts you to question your reality, helping you build the habit of performing reality checks throughout the day. This is a core practice for increasing your chances of becoming lucid in dreams.'
  },
  {
    file: 'Screenshot_20250726_092319_Meditate-Dream-Learn.jpg',
    label: 'Custom Reality Checks',
    desc: 'Choose different reminders.',
    detail: 'Customize your reality check reminders by choosing different types and messages. You can set reminders for specific times or activities, making your lucid dreaming practice more engaging and effective. Experiment with different reality check types to find what works best for you.'
  },
  {
    file: 'Screenshot_20250726_092334_Meditate-Dream-Learn.jpg',
    label: 'More Reality Checks',
    desc: 'Additional reality check reminders.',
    detail: 'Set up additional reminders for reality checks to ensure you never miss an opportunity to build lucid dreaming awareness. The app allows you to add, edit, or remove reminders as needed, supporting a flexible and robust lucid dreaming routine.'
  },
  {
    file: 'Screenshot_20250726_094816_Meditate-Dream-Learn.jpg',
    label: 'Screen Saver',
    desc: 'Keeps phone on for reminders.',
    detail: 'Activate the screen saver mode to keep your phone display on while using the app. This feature is especially useful during meditation, relaxation, or when you want to keep receiving reminders without your device going to sleep. The screen saver displays calming visuals and can be exited at any time.'
  },
];

// Expanded and more descriptive features list
const featuresList = [
  {
    title: 'Lucid Dreaming & Dream Yoga Lessons',
    desc: 'Access a full library of video and PDF lessons to master lucid dreaming and dream yoga. Learn practical techniques, theory, and step-by-step practices to awaken within your dreams.'
  },
  {
    title: 'Didgeridoo Lessons & Sound Healing',
    desc: 'Learn how to play the didgeridoo from the basics, including breath control, drone, and circular breathing. Discover how to use the didgeridoo for sound healing, meditation, and energy work with guided video and PDF lessons.'
  },
  {
    title: 'Guided Meditations',
    desc: 'Enjoy a collection of guided audio and video meditations for deep relaxation, healing, and spiritual connection. Meditations are designed for all levels and support your lucid dreaming journey.'
  },
  {
    title: 'Binaural Beats Soundscape',
    desc: 'Create custom binaural beats soundscapes by selecting different frequencies and ambient sounds for each ear. Choose from Alpha, Beta, Theta, Delta, Gamma, singing bowls, chakra tones, thunder, and ocean sounds. Layer multiple tracks for a personalized meditation or sleep experience.'
  },
  {
    title: 'Dream Journal & Analysis',
    desc: 'Record, edit, and analyze your dreams in a digital journal. The app automatically highlights recurring dream signs and patterns, helping you improve dream recall and increase your chances of lucidity.'
  },
  {
    title: 'Books & Audio Books Library',
    desc: 'Access exclusive books and audiobooks by Jerimiah Molfese and other authors on lucid dreaming, spirituality, and personal growth. Read or listen directly in the app.'
  },
  {
    title: 'Reminders & Reality Checks',
    desc: 'Set up automatic reminders every two hours for meditation, dream journaling, and reality checks. Customize reminder types and messages to build strong lucid dreaming habits.'
  },
  {
    title: 'Open Source Dr. Joe Dispenza Meditations',
    desc: 'Practice open-source meditations inspired by Dr. Joe Dispenza to enhance your lucid dreaming and meditation experience. Includes step-by-step audio guidance.'
  },
  {
    title: 'Screen Saver / Keep Screen On',
    desc: 'Activate a dedicated screen saver mode to keep your phone display on while using the app. Perfect for meditation, relaxation, or when you want to keep receiving reminders without your device going to sleep.'
  },
];

const guardiansSaga = [
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Convergence-Through-a-Post-Apocalyptic-Dallas.png',
    title: 'Convergence and the Love Code',
    desc: 'In a post-apocalyptic world, humanity discovers a portal to a quantum realm where reality can be rewritten.'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Rise-of-The-Protectors-Jerimiah-Molfese-994x1536.png',
    title: 'Rise of The Protectors',
    desc: 'The first installment in an epic tale of destiny, sacrifice, and the battle against ancient darkness.'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-of-five-planets-Jerimiah-Molfese-994x1536.png',
    title: 'Battle of Five Planets',
    desc: 'The epic journey continues across multiple worlds as the battle against darkness intensifies.'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-For-The-Multiverse-Jerimiah-Molfese.png',
    title: 'Battle for the Multiverse',
    desc: 'The conflict expands to cosmic proportions as the fate of multiple realities hangs in the balance.'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Guardians-Battle-for-the-infinite-ones-1-scaled.jpeg',
    title: 'Battle for the Infinite Ones',
    desc: 'The epic conclusion brings the heroes to their final confrontation with the forces threatening existence.'
  },
];

const publishedWorks = [
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Manifestation-Unlock-the-Secrets-of-Lucid-Dreaming-and-Alchemy--663x1024.jpeg',
    title: 'Manifestation: Unlock the Secrets of Lucid Dreaming and Alchemy',
    desc: 'A comprehensive guide to using lucid dreaming for manifestation and personal transformation.',
    link: 'https://www.amazon.com/dp/B0D4K6JQ7B',
    linkText: 'View on Amazon'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/The-Great-Journey-What-Lies-Beyond-Fiction-or-reality-unraveling-some-of-humanitys-most-profound-questions-663x1024.jpeg',
    title: 'The Great Journey: Dying and What Lies Beyond',
    desc: 'An exploration of existence, death, and the afterlife through out-of-body experiences and ancient wisdom.',
    link: 'https://www.amazon.com/dp/B0D4K6JQ7B',
    linkText: 'View on Amazon'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/04/cover-683x1024.jpg',
    title: "A Dreamer's Odyssey: True Stories of a Dream Traveler",
    desc: 'An autobiographical journey through lucid dreaming, from childhood wonder to spiritual awakening.',
    link: 'https://www.amazon.com/dp/B0D4K6JQ7B',
    linkText: 'View on Amazon'
  },
  {
    img: 'https://www.hidreamers.com/wp-content/uploads/2025/05/Lucid-Dreaming-663x1024.jpeg',
    title: 'My Adventures in Lucid Dreaming',
    desc: 'A personal exploration of conscious dreaming as a gateway to healing, insight, and spiritual growth.',
    link: 'https://www.amazon.com/dp/B0D4K6JQ7B',
    linkText: 'View on Amazon'
  }
];

function NavBar({ current, setCurrent }) {
  return (
    <nav className="main-nav sticky-nav">
      <ul>
        {NAV_LINKS.map(link => (
          <li key={link.anchor}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              href="#"
              className={current === link.anchor ? 'active' : ''}
              onClick={e => {
                e.preventDefault();
                setCurrent(link.anchor);
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function AppHeader({ current, setCurrent }) {
  return (
    <header className="app-header" style={{display: 'flex', alignItems: 'center', background: '#181f3a', position: 'sticky', top: 0, zIndex: 100, padding: '0 2em'}}>
      <img src="/applogo.png" alt="App Logo Left" style={{height: 60, width: 'auto', marginRight: 32}} />
      <NavBar current={current} setCurrent={setCurrent} />
      <img src="/applogo.png" alt="App Logo Right" style={{height: 60, width: 'auto', marginLeft: 32}} />
    </header>
  );
}

function BottomNavBar({ current, setCurrent }) {
  const navItems = [
    { label: 'Home', anchor: 'home', icon: <FaHome /> },
    { label: 'Features', anchor: 'features', icon: <FaStar /> },
    { label: 'Screenshots', anchor: 'screenshots', icon: <FaImages /> },
    { label: 'Books', anchor: 'books', icon: <FaBook /> },
    { label: 'Download', anchor: 'download', icon: <FaDownload /> },
    { label: 'Contact', anchor: 'contact', icon: <FaEnvelope /> },
  ];
  return (
    <nav className="bottom-nav-bar">
      {navItems.map(item => (
        <button
          key={item.anchor}
          className={current === item.anchor ? 'active' : ''}
          onClick={() => setCurrent(item.anchor)}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

function BookCarousel({ books, isPublished, onBookClick }) {
  const carouselRef = useRef(null);
  const autoScrollRef = useRef();

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    let direction = 1;
    const scrollStep = 1;
    autoScrollRef.current = setInterval(() => {
      if (!container) return;
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) direction = -1;
      if (container.scrollLeft <= 0) direction = 1;
      container.scrollLeft += scrollStep * direction;
    }, 20);
    return () => clearInterval(autoScrollRef.current);
  }, []);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    let isDown = false;
    let startX;
    let scrollLeft;
    const onMouseDown = (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      container.classList.remove('dragging');
    };
    const onMouseUp = () => {
      isDown = false;
      container.classList.remove('dragging');
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e) => {
      isDown = true;
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = container.scrollLeft;
    };
    const onTouchEnd = () => {
      isDown = false;
    };
    const onTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.5;
      container.scrollLeft = touchScrollLeft - walk;
    };
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchmove', onTouchMove);
    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  const scrollByAmount = (amount) => {
    const container = carouselRef.current;
    if (!container) return;
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    container.scrollLeft += amount;
  };

  return (
    <div style={{position: 'relative', margin: '0 0 2em 0'}}>
      <button
        aria-label="Scroll left"
        style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#232b4a', color: '#00eaff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #0002'}}
        onClick={() => scrollByAmount(-340)}
      >&#8592;</button>
      <button
        aria-label="Scroll right"
        style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#232b4a', color: '#00eaff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #0002'}}
        onClick={() => scrollByAmount(340)}
      >&#8594;</button>
      <div ref={carouselRef} className="futuristic-carousel" style={{display: 'flex', overflowX: 'auto', gap: 32, padding: '16px 0', scrollBehavior: 'smooth', scrollbarWidth: 'none', cursor: 'grab'}}>
        {books.map((book, idx) => (
          <div
            className={isPublished ? 'futuristic-card published-card' : 'futuristic-card guardian-card'}
            key={idx}
            style={{position: 'relative', minWidth: 320, maxWidth: 320, height: 340, borderRadius: 18, overflow: 'hidden', background: '#232b4a', boxShadow: '0 8px 32px #00eaff33, 0 2px 24px #1a2340', cursor: 'pointer', transition: 'transform 0.2s'}}
            onClick={() => onBookClick && onBookClick(book)}
          >
            <div className="book-img-wrap">
              <img src={book.img} alt={book.title} style={{width: '100%', height: 220, objectFit: 'contain', borderRadius: 10, background: '#181f3a', boxShadow: '0 2px 12px rgba(58,28,113,0.10)'}} />
            </div>
            <div className={isPublished ? 'published-info' : 'guardian-info'} style={{padding: '14px 10px 18px 10px', textAlign: 'left', color: '#fff'}}>
              <strong style={{color: '#ffda79', fontSize: '1.08rem', display: 'block', marginBottom: 4}}>{book.title}</strong>
              <p style={{color: '#b993d6', fontSize: '0.98rem', margin: 0}}>{book.desc}</p>
              {isPublished && book.link && (
                <a href={book.link} className="cta-btn published-amazon-btn" target="_blank" rel="noopener noreferrer" style={{marginTop: 8}}>{book.linkText}</a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BooksPage() {
  const [modalBook, setModalBook] = useState(null);

  // Ensure the five main books are in the correct order and on the same line
  const guardiansOrder = [
    'Convergence and the Love Code',
    'Rise of The Protectors',
    'Battle of Five Planets',
    'Battle for the Multiverse',
    'Battle for the Infinite Ones'
  ];
  const guardiansSagaOrdered = guardiansOrder
    .map(title => guardiansSaga.find(b => b.title === title))
    .filter(Boolean);
  const allBooks = [...guardiansSagaOrdered, ...publishedWorks];

  return (
    <section id="books" className="section books-page" style={{maxWidth: '100vw', width: '100%', padding: 0}}>
      <div style={{maxWidth: '1400px', margin: '0 auto', padding: '48px 24px 32px 24px', display: 'flex', flexDirection: 'row', gap: 32, alignItems: 'flex-start'}}>
        <div style={{flex: 2, minWidth: 0}}>
          <BookCarousel books={allBooks} isPublished={false} onBookClick={setModalBook} />
        </div>
        <div style={{flex: 1, minWidth: 320, maxWidth: 420, background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0002', padding: '2em 1.5em', color: '#232b4a', fontSize: '1.05rem', textAlign: 'left', fontFamily: 'Inter, Segoe UI, Arial, sans-serif', overflowY: 'auto', maxHeight: 420}}>
          <h2 style={{textAlign: 'left', color: '#232b4a', fontWeight: 700, fontSize: '1.2em', marginBottom: 14}}>📚 <b>Get All My Books — Before They're Published (Audio + Kindle)</b></h2>
          <p style={{marginBottom: 10}}>As a <b>Meditate. Learn. Dream.</b> member, you’re not just getting access to tools —<br/>You’re stepping inside my personal creative process.</p>
          <p style={{marginBottom: 10}}>You'll receive <b>exclusive early access</b> to <b>every book I write</b>, delivered directly to the app in <b>audio and Kindle-ready formats</b> — long before they're available to the public.</p>
          <ul style={{color: '#5b5b7a', marginBottom: 10, fontWeight: 500, fontSize: '1em', paddingLeft: 18}}>
            <li>🌀 <i>Guardians of the Silent Truth</i></li>
            <li>🌀 <i>Convergence and the Love Code</i></li>
            <li>🌀 <i>Rise of The Protectors</i></li>
            <li>🌀 <i>Battle of Five Planets</i></li>
            <li>🌀 <i>Battle for the Multiverse</i></li>
            <li>🌀 <i>Battle for the Infinite Ones</i></li>
            <li>💎 <i>Manifestation: Unlock the Secrets of Lucid Dreaming and Alchemy</i></li>
            <li>🔮 <i>The Great Journey: Dying and What Lies Beyond</i></li>
            <li>🌙 <i>A Dreamer's Odyssey: True Stories of a Dream Traveler</i></li>
            <li>🌙 <i>My Adventures in Lucid Dreaming</i></li>
          </ul>
          <p style={{marginBottom: 10}}>And all future titles — <b>as I write them</b>.</p>
          <p style={{marginBottom: 10}}>Every member gets new chapters, full previews, and exclusive author commentary — available in:</p>
          <ul style={{color: '#232b4a', marginBottom: 10, fontWeight: 500, fontSize: '1em', paddingLeft: 18}}>
            <li>🎧 <b>Audio format</b> (so you can listen while you walk, meditate, or fall asleep)</li>
            <li>📖 <b>Kindle-ready text</b> for reading at your own pace</li>
          </ul>
          <p style={{marginBottom: 10}}>You’ll be part of a growing community who reads these visionary works <b>before anyone else</b>.</p>
          <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '1.5em 0'}}/>
          <h2 style={{textAlign: 'center', color: '#232b4a', fontWeight: 700, fontSize: '1.1em', marginBottom: 10}}>✍️ <b>Who Am I — And Why This App Exists</b></h2>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10}}>
            <img src="/Jerimiah_molfese.jpg" alt="Jerimiah Molfese" style={{width: 90, height: 90, borderRadius: '50%', objectFit: 'cover', marginBottom: 10, border: '2px solid #ffda79'}} />
          </div>
          <p style={{marginBottom: 10}}>My name is <b>Jerimiah Molfese</b>.<br/><br/>For over 20 years, I’ve been exploring lucid dreaming, meditation, ancient wisdom, and energy healing. What started as a childhood fascination with dreams evolved into a lifetime of study — including <b>Egyptian Hermetic philosophy</b>, <b>brain-heart coherence</b>, <b>Tibetan dream yoga</b>, and <b>sound healing with the didgeridoo</b>.<br/><br/>I've taught internationally, spoken at universities, led hundreds of private sessions, and published multiple books rooted in real visionary experiences.<br/><br/>But even after all that — I wanted to do something more.<br/><br/>I wanted to create a <b>living, breathing tool</b> — something <b>real</b> that could help others experience what I have.<br/>Not just to talk about dreams — but to give you the system to <b>wake up inside them</b>.<br/>Not just to meditate — but to heal, expand, and evolve.<br/><br/>That’s why I built this app.<br/><br/>To share everything — from the deepest meditations to the most advanced lucid dreaming techniques — in one place, so you can <b>live more consciously</b>… and dream more powerfully.<br/><br/>And I’m continuing to add to it. Every month. Every season.<br/>More meditations. More trainings. More content.<br/>The app <b>grows with you.</b> But your price stays the same.</p>
          <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '1.5em 0'}}/>
          <h2 style={{textAlign: 'center', color: '#232b4a', fontWeight: 700, fontSize: '1.1em', marginBottom: 10}}>🎁 <b>All of This — Yours for Just $2.99/month</b></h2>
          <p style={{marginBottom: 10}}>Books, meditations, dream journal, sound healing, brainwave training, MILD technique, screen savers, lucid dream induction, reality checks, and more — with <b>new content added every month</b>…<br/><br/>All for less than a coffee. Just <b>$2.99/month</b> or a <b>one-time purchase under $40</b>.<br/><br/>No tricks. Cancel anytime. Lifetime value.</p>
          <hr style={{border: 'none', borderTop: '1px solid #eee', margin: '1.5em 0'}}/>
          <div style={{textAlign: 'center', marginTop: 10}}>
            <h3 style={{color: '#232b4a', fontWeight: 700, fontSize: '1em', margin: 0}}>🌟 Join now. Awaken your dreams.</h3>
            <h3 style={{color: '#232b4a', fontWeight: 700, fontSize: '1em', margin: 0}}>Heal your body.</h3>
            <h3 style={{color: '#232b4a', fontWeight: 700, fontSize: '1em', margin: 0, marginBottom: 10}}>Expand your consciousness.</h3>
            <span style={{
              background: '#d76d77',
              color: '#fff',
              borderRadius: 24,
              padding: '10px 18px',
              fontWeight: 700,
              fontSize: '1em',
              boxShadow: '0 2px 12px #d76d77aa',
              display: 'inline-block',
              maxWidth: 320,
              lineHeight: 1.4,
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              marginTop: 10
            }}>
              👉 Download <i>Meditate. Learn. Dream.</i> today —<br/>and become a dreamer who is finally awake.
            </span>
          </div>
        </div>
      </div>
      {modalBook && (
        <div className="modal-overlay" onClick={() => setModalBook(null)} style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(24,31,58,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-img-box futuristic-modal" onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(120deg, #232b4a 60%, #00eaff22 100%)',
            color: '#fff',
            fontFamily: 'Inter, Segoe UI, Roboto, Arial, sans-serif',
            maxWidth: 420,
            width: '90vw',
            boxShadow: '0 8px 32px #00eaff33, 0 2px 24px #1a2340',
            borderRadius: 18,
            padding: '2em 2em 1.5em 2em',
            textAlign: 'center',
          }}>
            <img src={modalBook.img} alt={modalBook.title} style={{
              maxWidth: '90vw',
              maxHeight: '60vh',
              borderRadius: 12,
              marginBottom: 18,
              boxShadow: '0 2px 12px #00eaff33',
              background: '#232b4a',
            }} />
            <div className="modal-caption" style={{
              color: '#fff',
              fontFamily: 'inherit',
              marginBottom: 10,
            }}>
              <strong style={{ color: '#ffda79', fontSize: '1.25rem', display: 'block', marginBottom: 8 }}>{modalBook.title}</strong>
              <p style={{ color: '#b993d6', fontSize: '1.08rem', margin: 0 }}>{modalBook.desc}</p>
              {modalBook.link && (
                <a href={modalBook.link} className="cta-btn published-amazon-btn" target="_blank" rel="noopener noreferrer" style={{marginTop: 8, display: 'inline-block'}}>{modalBook.linkText}</a>
              )}
            </div>
            <button className="modal-close" style={{
              background: '#d76d77',
              color: '#fff',
              border: 'none',
              borderRadius: 22,
              padding: '8px 28px',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginTop: 12,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }} onClick={() => setModalBook(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

function HomePage() {
  return (
    <section className="main-header" id="home">
      <div style={{maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #0001', padding: '2.5em 2em', fontSize: '1.13rem', textAlign: 'left'}}>
        {/* Removed top image for professional look */}
        <div style={{marginBottom: 24}}>
          <h1 style={{color: '#1a2340', fontWeight: 700, fontSize: '2.2em', marginBottom: 8, textAlign: 'left'}}>🌙 <b>Welcome to Meditate. Learn. Dream.</b></h1>
          <h2 style={{color: '#5b5b7a', fontWeight: 500, fontSize: '1.25em', marginBottom: 0, textAlign: 'left'}}>A Revolutionary App for Lucid Dreaming, Deep Meditation, and Inner Transformation</h2>
        </div>
        <hr style={{border: 'none', borderTop: '1px solid #444', margin: '1.5em 0'}}/>
        <h3 style={{color: '#232b4a', fontWeight: 600, fontSize: '1.15em', marginBottom: 0, textAlign: 'left'}}>✨ <i>Imagine waking up inside your dreams…</i></h3>
        <p style={{marginTop: 8, marginBottom: 18}}>
          ...exploring higher states of consciousness, healing your body with sound, mastering your breath, and receiving exclusive books and meditations every month.<br/><br/>
          You’re not just downloading another app.<br/>
          You’re stepping into a living <b>portal of transformation</b>, built for people who are ready to unlock their deepest potential — in sleep, in spirit, and in waking life.
        </p>
        <hr style={{border: 'none', borderTop: '1px solid #444', margin: '1.5em 0'}}/>
        <h2 style={{color: '#232b4a', fontWeight: 700, fontSize: '1.15em', marginBottom: 10, textAlign: 'left'}}>🚀 <b>This Is Your All-In-One Platform to Awaken from the Inside Out</b></h2>
        <p><b>Meditate. Learn. Dream.</b> is a powerful mobile toolkit created by author, dream teacher, and spiritual guide <b>Jerimiah Molfese</b> — combining decades of lucid dreaming mastery, energy healing, meditation, and ancient wisdom in one immersive app.</p>
        <p>Inside the app, you’ll find:</p>
        <ul style={{color: '#232b4a', fontWeight: 500, fontSize: '1.05em', marginBottom: 18, paddingLeft: 24}}>
          <li>✅ <i>Complete lucid dreaming training</i></li>
          <li>✅ <i>Meditation and sound healing library</i></li>
          <li>✅ <i>Smart reminders and dream journaling tools</i></li>
          <li>✅ <i>Access to exclusive books and audiobooks</i></li>
          <li>✅ <i>New content every month — forever</i></li>
        </ul>
        <p>And you get it all for less than a cup of coffee.<br/>Just <b>$2.99/month</b> — cancel anytime.<br/>Lock in your lifetime price before the next update.</p>
        <hr style={{border: 'none', borderTop: '2px solid #232b4a', margin: '2.5em 0 1.5em 0'}}/>
        <blockquote style={{color: '#232b4a', fontStyle: 'italic', borderLeft: '4px solid #232b4a', margin: '1em 0 1em 0', paddingLeft: 16}}>
          “The next time I’m dreaming, I will realize I’m dreaming.”<br/>
          “I will remember my dreams.”<br/>
          “I am aware, even in sleep."
        </blockquote>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18}}>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, maxWidth: 700, width: '100%'}}>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Dozens of lessons (video + PDF)
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Meditations, audio tracks, soundscapes
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Reality check reminders
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Dream journaling + analysis
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Didgeridoo training + sound healing
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> All books in audio + Kindle format — as they’re written
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> New content <b>added monthly</b>
            </li>
          </ul>
        </div>
        <p style={{textAlign: 'center', color: '#232b4a', fontWeight: 700, fontSize: '1.15em', marginBottom: 0}}>
          All for just $2.99/month or under $40 once.<br/>No surprises. Cancel anytime.<br/>Keep everything. Lock in your access for life.
        </p>
      </div>
    </section>
  );
}

function FeaturesPage() {
  return (
    <section id="features" className="section">
      <div className="sales-presentation" style={{maxWidth: 900, margin: '0 auto', fontSize: '1.13rem', color: '#232b4a', background: 'transparent', borderRadius: 18, boxShadow: 'none', padding: 0, marginBottom: 32, textAlign: 'justify'}}>
        <h2 style={{textAlign: 'center', color: '#232b4a', fontWeight: 700, fontSize: '2em', marginBottom: 24}}>🌟 <b>App Features — Your Toolkit for Awakening</b></h2>
        <p style={{textAlign: 'center', color: '#232b4a', fontSize: '1.18em', fontWeight: 500, marginBottom: 18}}>
          The <b>Meditate. Learn. Dream.</b> app is your all-in-one platform for unlocking the full spectrum of your consciousness.<br/>
          All for just $2.99/month or a one-time purchase under $40.
        </p>
        <p style={{textAlign: 'justify', color: '#232b4a', fontSize: '1.15em', marginBottom: 24}}>
          The <b>Meditate. Learn. Dream.</b> app is a living library, spiritual dojo, and lucid dreaming launchpad — all in the palm of your hand. Here's what you'll unlock the moment you join:
        </p>
        <hr style={{border: 'none', borderTop: '1px solid #444', margin: '2em 0'}}/>
        <h3 style={{color: '#232b4a', fontWeight: 600, fontSize: '1.15em', marginBottom: 0, textAlign: 'left'}}>✨ <i>Imagine waking up inside your dreams…</i></h3>
        <p style={{marginTop: 8, marginBottom: 18}}>
          ...exploring higher states of consciousness, healing your body with sound, mastering your breath, and receiving exclusive books and meditations every month.<br/><br/>
          You’re not just downloading another app.<br/>
          You’re stepping into a living <b>portal of transformation</b>, built for people who are ready to unlock their deepest potential — in sleep, in spirit, and in waking life.
        </p>
        <hr style={{border: 'none', borderTop: '1px solid #444', margin: '1.5em 0'}}/>
        <h2 style={{color: '#232b4a', fontWeight: 700, fontSize: '1.15em', marginBottom: 10, textAlign: 'left'}}>🚀 <b>This Is Your All-In-One Platform to Awaken from the Inside Out</b></h2>
        <p><b>Meditate. Learn. Dream.</b> is a powerful mobile toolkit created by author, dream teacher, and spiritual guide <b>Jerimiah Molfese</b> — combining decades of lucid dreaming mastery, energy healing, meditation, and ancient wisdom in one immersive app.</p>
        <p>Inside the app, you’ll find:</p>
        <ul style={{color: '#232b4a', fontWeight: 500, fontSize: '1.05em', marginBottom: 18, paddingLeft: 24}}>
          <li>✅ <i>Complete lucid dreaming training</i></li>
          <li>✅ <i>Meditation and sound healing library</i></li>
          <li>✅ <i>Smart reminders and dream journaling tools</i></li>
          <li>✅ <i>Access to exclusive books and audiobooks</i></li>
          <li>✅ <i>New content every month — forever</i></li>
        </ul>
        <p>And you get it all for less than a cup of coffee.<br/>Just <b>$2.99/month</b> — cancel anytime.<br/>Lock in your lifetime price before the next update.</p>
        <hr style={{border: 'none', borderTop: '2px solid #232b4a', margin: '2.5em 0 1.5em 0'}}/>
        <blockquote style={{color: '#232b4a', fontStyle: 'italic', borderLeft: '4px solid #232b4a', margin: '1em 0 1em 0', paddingLeft: 16}}>
          “The next time I’m dreaming, I will realize I’m dreaming.”<br/>
          “I will remember my dreams.”<br/>
          “I am aware, even in sleep."
        </blockquote>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18}}>
          <ul style={{listStyle: 'none', padding: 0, margin: 0, maxWidth: 700, width: '100%'}}>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Dozens of lessons (video + PDF)
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Meditations, audio tracks, soundscapes
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Reality check reminders
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Dream journaling + analysis
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> Didgeridoo training + sound healing
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> All books in audio + Kindle format — as they’re written
            </li>
            <li style={{marginBottom: 8, color: '#232b4a', fontWeight: 500, fontSize: '1.05em', display: 'flex', alignItems: 'center'}}>
              <span style={{marginRight: 8}}>✅</span> New content <b>added monthly</b>
            </li>
          </ul>
        </div>
        <p style={{textAlign: 'center', color: '#232b4a', fontWeight: 700, fontSize: '1.15em', marginBottom: 0}}>
          All for just $2.99/month or under $40 once.<br/>No surprises. Cancel anytime.<br/>Keep everything. Lock in your access for life.
        </p>
        <hr style={{border: 'none', borderTop: '1px solid #444', margin: '2em 0'}}/>
        <h3 style={{color: '#232b4a', fontWeight: 600, fontSize: '1.15em', marginBottom: 0, textAlign: 'left'}}>🧩 Ready to Transform Your Life?</h3>
        <p style={{color: '#232b4a', marginBottom: 10, textAlign: 'left'}}>
          The <b>Meditate. Learn. Dream.</b> app is your all-in-one platform for unlocking the full spectrum of your consciousness.<br/><br/>Join now and get:
        </p>
        <ul style={{color: '#232b4a', marginTop: 0, marginBottom: 18, fontWeight: 500, fontSize: '1.05em', paddingLeft: 24}}>
          <li>✅ Complete lucid dreaming training</li>
          <li>✅ Meditation and sound healing library</li>
          <li>✅ Smart reminders and dream journaling tools</li>
          <li>✅ Access to exclusive books and audiobooks</li>
          <li>✅ New content every month — forever</li>
        </ul>
        <p style={{color: '#232b4a', marginBottom: 10}}>
          All for just <b>$2.99/month</b> or a one-time purchase under <b>$40</b>.
        </p>
      </div>
    </section>
  );
}

function ScreenshotsPage({ modalImg, setModalImg }) {
  const carouselRef = useRef(null);
  const autoScrollRef = useRef();

  // Auto-scroll logic
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    let direction = 1;
    const scrollStep = 1;
    autoScrollRef.current = setInterval(() => {
      if (!container) return;
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) direction = -1;
      if (container.scrollLeft <= 0) direction = 1;
      container.scrollLeft += scrollStep * direction;
    }, 20);
    return () => clearInterval(autoScrollRef.current);
  }, []);

  // Drag-to-scroll logic
  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    let isDown = false;
    let startX;
    let scrollLeft;
    const onMouseDown = (e) => {
      isDown = true;
      container.classList.add('dragging');
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };
    const onMouseLeave = () => {
      isDown = false;
      container.classList.remove('dragging');
    };
    const onMouseUp = () => {
      isDown = false;
      container.classList.remove('dragging');
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5;
      container.scrollLeft = scrollLeft - walk;
    };
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseleave', onMouseLeave);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;
    const onTouchStart = (e) => {
      isDown = true;
      touchStartX = e.touches[0].pageX;
      touchScrollLeft = container.scrollLeft;
    };
    const onTouchEnd = () => {
      isDown = false;
    };
    const onTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX;
      const walk = (x - touchStartX) * 1.5;
      container.scrollLeft = touchScrollLeft - walk;
    };
    container.addEventListener('touchstart', onTouchStart);
    container.addEventListener('touchend', onTouchEnd);
    container.addEventListener('touchmove', onTouchMove);
    return () => {
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchstart', onTouchStart);
      container.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  // Arrow scroll handlers
  const scrollByAmount = (amount) => {
    const container = carouselRef.current;
    if (!container) return;
    // Stop auto-scroll when user clicks arrow
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
    container.scrollLeft += amount;
  };

  return (
    <section id="screenshots" className="section" style={{background: '#181f3a', borderRadius: 18, boxShadow: '0 4px 24px #0002', color: '#fff', marginTop: 32, padding: '2.5em 2em', position: 'relative'}}>
      <h2 style={{color: '#1a2340', fontWeight: 700, fontSize: '2em', marginBottom: 24, letterSpacing: 2, textShadow: '0 2px 16px #00eaff88'}}>App Screenshots</h2>
      <button
        aria-label="Scroll left"
        style={{position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#232b4a', color: '#00eaff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #0002'}}
        onClick={() => scrollByAmount(-340)}
      >
        &#8592;
      </button>
      <button
        aria-label="Scroll right"
        style={{position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: '#232b4a', color: '#00eaff', border: 'none', borderRadius: '50%', width: 40, height: 40, fontSize: 28, cursor: 'pointer', boxShadow: '0 2px 8px #0002'}}
        onClick={() => scrollByAmount(340)}
      >
        &#8594;
      </button>
      <div ref={carouselRef} className="futuristic-carousel" style={{display: 'flex', overflowX: 'auto', gap: 32, padding: '16px 0', scrollBehavior: 'smooth', scrollbarWidth: 'none', cursor: 'grab'}}>
        {screenshotData.map((shot, idx) => (
          <div className="futuristic-card" key={shot.file} style={{position: 'relative', minWidth: 320, maxWidth: 320, height: 220, borderRadius: 18, overflow: 'hidden', background: '#232b4a', boxShadow: '0 8px 32px #00eaff33, 0 2px 24px #1a2340', cursor: 'pointer', transition: 'transform 0.2s'}}
            onClick={() => setModalImg(shot)}
          >
            <img 
              src={require(`../screenshots/${shot.file}`)} 
              alt={shot.label} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.85)'}}
            />
            <div className="futuristic-overlay">
              {shot.label}
            </div>
            <div className="futuristic-title-bar"> 
              {shot.label}
            </div>
          </div>
        ))}
      </div>
      {modalImg && (
        <div className="modal-overlay" onClick={() => setModalImg(null)}>
          <div className="modal-img-box futuristic-modal" onClick={e => e.stopPropagation()} style={{
            background: 'linear-gradient(120deg, #232b4a 60%, #00eaff22 100%)',
            color: '#fff',
            fontFamily: 'Inter, Segoe UI, Roboto, Arial, sans-serif',
            maxWidth: 600,
            boxShadow: '0 8px 32px #00eaff33, 0 2px 24px #1a2340',
            borderRadius: 18,
            padding: '2em 2em 1.5em 2em',
            textAlign: 'center',
          }}>
            <img src={require(`../screenshots/${modalImg.file}`)} alt={modalImg.label} style={{
              maxWidth: '90vw',
              maxHeight: '50vh',
              borderRadius: 12,
              marginBottom: 18,
              boxShadow: '0 2px 12px #00eaff33',
              background: '#232b4a',
            }} />
            <div className="modal-caption" style={{
              color: '#fff',
              fontFamily: 'inherit',
              marginBottom: 10,
            }}>
              <strong style={{ color: '#ffda79', fontSize: '1.25rem', display: 'block', marginBottom: 8 }}>{modalImg.label}</strong>
              <p style={{ color: '#b993d6', fontSize: '1.08rem', margin: 0 }}>{modalImg.detail}</p>
            </div>
            <button className="modal-close" style={{
              background: '#d76d77',
              color: '#fff',
              border: 'none',
              borderRadius: 22,
              padding: '8px 28px',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginTop: 12,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }} onClick={() => setModalImg(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

function DownloadPage() {
  return (
    <section id="download" className="section" style={{background: '#232b4a', borderRadius: 18, boxShadow: '0 4px 24px #0002', color: '#fff', marginTop: 32, padding: '2.5em 2em'}}>
      <h2 style={{color: '#ffda79', fontWeight: 700, fontSize: '2em', marginBottom: 24}}>Download</h2>
      <p>Ready to awaken within your dreams? Download the app and start your journey today.</p>
      <a href="https://www.hidreamers.com/" className="cta-btn">Visit Official Site</a>
    </section>
  );
}

function ContactPage() {
  return (
    <section id="contact" className="section contact-section">
      {/* Removed profile image for professional look */}
      <h2 style={{color: '#1a2340', fontWeight: 700, fontSize: '2em', marginBottom: 24}}>Contact Us</h2>
      <p>Have questions or feedback? Reach out and we’ll be happy to help you on your lucid dreaming journey.</p>
      <a href="mailto:info@hidreamers.com" className="cta-btn">Email Us</a>
    </section>
  );
}

function App() {
  const [current, setCurrent] = useState('home');
  const [modalImg, setModalImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      {!isMobile && <AppHeader current={current} setCurrent={setCurrent} />}
      {current === 'home' && <HomePage />}
      {current === 'features' && <FeaturesPage />}
      {current === 'screenshots' && <ScreenshotsPage modalImg={modalImg} setModalImg={setModalImg} />}
      {current === 'books' && <BooksPage />}
      {current === 'download' && <DownloadPage />}
      {current === 'contact' && <ContactPage />}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Lucid Dreaming & Meditation App. All rights reserved.</p>
      </footer>
      <BottomNavBar current={current} setCurrent={setCurrent} />
    </div>
  );
}

export default App;
