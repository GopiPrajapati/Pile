import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import images from '../../../assets/images';
import Strings from '../../../assets/strings';
import { selectAuth } from '../../../redux/slices/authSlice';
import { Routes } from '../../Routes';

const SplashScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(
    state => selectAuth(state).isAuthenticated,
  );

  useEffect(() => {
    const timer = setTimeout(
      () =>
        navigation.replace(
          isAuthenticated ? Routes.MAIN_SCREEN : Routes.LOGIN_SCREEN,
        ),
      1300,
    );
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.background}>
      <FastImage
        source={images.ic_login_background}
        style={styles.backgroundImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <StatusBar barStyle="dark-content" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.logo}>{Strings.appName}</Text>
        <Text style={styles.tagline}>{Strings.splash.tagline}</Text>
      </View>
      <Text style={styles.footer}>{Strings.splash.footer}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, backgroundColor: '#F7F6F2', position: 'relative' },
  backgroundImage: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.62)',
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    // The Figma lockup is optically centred, slightly above the screen midpoint.
    transform: [{ translateY: -16 }],
    zIndex: 2,
  },
  logo: { color: '#000', fontSize: 58, fontWeight: '600', letterSpacing: -3 },
  tagline: {
    color: '#4E4C48',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 2.2,
    marginTop: 4,
  },
  footer: {
    bottom: 56,
    color: '#605E5A',
    fontSize: 11,
    letterSpacing: 1.2,
    lineHeight: 14,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
    zIndex: 2,
  },
});

export default SplashScreen;
//
