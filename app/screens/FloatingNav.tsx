import React, { useState, useRef } from 'react';
import { router, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, Animated, StyleSheet, PanResponder, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NAV_ITEMS = [
  { label: 'Home', icon: 'home-outline', route: '/' },
  { label: 'Dream Journal', icon: 'book-outline', route: '/dream-journal' },
  { label: 'Books', icon: 'library-outline', route: '/books' },
  { label: 'Reality Checks', icon: 'eye-outline', route: '/reality-checks' },
  { label: 'Meditation', icon: 'musical-notes-outline', route: '/meditation' },
  { label: 'Binaural Beats', icon: 'headset-outline', route: '/binaural-beats' },
  { label: 'Instructions', icon: 'information-circle-outline', route: '/instructions' },
  { label: 'About', icon: 'sunny-outline', route: '/about' },
  { label: 'Screensaver', icon: 'planet-outline', route: '/screensaver' },
];

const { width, height } = Dimensions.get('window');

export default function FloatingNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const currentRouteIdx = NAV_ITEMS.findIndex(item => item.route === pathname || (item.route === '/' && pathname === '/index'));

  // FAB position state
  const [fabPos, setFabPos] = useState({ x: width - 88, y: 100 });
  const pan = useRef(new Animated.ValueXY(fabPos)).current;
  const dragStarted = useRef(false);
  const startTouch = useRef({ x: 0, y: 0 });

  // PanResponder for dragging FAB with threshold and clamping
  const fabPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        dragStarted.current = false;
        startTouch.current = { x: gestureState.x0, y: gestureState.y0 };
      },
      onPanResponderMove: (evt, gestureState) => {
        const dx = gestureState.moveX - startTouch.current.x;
        const dy = gestureState.moveY - startTouch.current.y;
        if (!dragStarted.current && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) {
          dragStarted.current = true;
        }
        if (dragStarted.current) {
          // Clamp position so FAB stays on screen
          const margin = 8;
          let newX = fabPos.x + gestureState.dx;
          let newY = fabPos.y + gestureState.dy;
          newX = Math.max(margin, Math.min(newX, width - 64 - margin));
          newY = Math.max(margin, Math.min(newY, height - 64 - margin));
          pan.setValue({ x: newX, y: newY });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (dragStarted.current) {
          const margin = 8;
          let newX = fabPos.x + gestureState.dx;
          let newY = fabPos.y + gestureState.dy;
          newX = Math.max(margin, Math.min(newX, width - 64 - margin));
          newY = Math.max(margin, Math.min(newY, height - 64 - margin));
          setFabPos({ x: newX, y: newY });
        } else {
          setOpen(!open); // treat as tap if not dragged
        }
      },
    })
  ).current;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {open && (
        <View style={[styles.menuList, { position: 'absolute', top: fabPos.y + 72, right: width - fabPos.x - 64 }]}> {/* menu below FAB */}
          {/* Add close button at the top of the menu */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setOpen(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {NAV_ITEMS.map((item, idx) => {
            const isCurrent = idx === currentRouteIdx;
            // Defensive: ensure label and icon are strings
            const label = typeof item.label === 'string' ? item.label : '';
            const icon = typeof item.icon === 'string' ? item.icon : 'help';
            return (
              <TouchableOpacity
                key={label}
                style={[styles.menuButton, isCurrent ? styles.selectedButton : null]}
                onPress={() => {
                  router.push(item.route);
                  setOpen(false);
                }}
              >
                {/* Only <Text> and <Ionicons> allowed as children */}
                <Ionicons name={icon as any} size={isCurrent ? 28 : 22} color={isCurrent ? '#ffd700' : '#fff'} />
                <Text style={[styles.menuLabel, isCurrent ? styles.selectedLabel : null]}>{label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <Animated.View
        style={[styles.fabContainer, { transform: pan.getTranslateTransform() }]}
        {...fabPanResponder.panHandlers}
      >
        <View style={styles.fab}>
          <Ionicons name={open ? 'close' : 'menu'} size={32} color="#fff" />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    zIndex: 101,
  },
  fab: {
    backgroundColor: 'rgba(58,28,113,0.35)', // even more translucent
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  menuList: {
    marginBottom: 12,
    backgroundColor: 'rgba(185,147,214,0.35)', // even more translucent
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 0,
    alignItems: 'flex-end',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 2,
  },
  menuLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 15,
  },
  selectedButton: {
    backgroundColor: '#3a1c71',
  },
  selectedLabel: {
    color: '#ffd700',
    fontSize: 17,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 8,
    marginRight: 8,
    marginBottom: 4,
  },
});
