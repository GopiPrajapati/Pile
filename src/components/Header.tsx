import React, { ReactNode, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import Strings from '../assets/strings';
import { normalize } from '../commonutils/dimensionutils';

type HeaderProps = {
  title?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
};

const Header = ({
  title = Strings.appName,
  leftAccessory,
  rightAccessory,
}: HeaderProps) => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('#F9F9F8');
    }
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar}>
        {leftAccessory ? (
          <View style={styles.leftAccessory}>{leftAccessory}</View>
        ) : null}
        {title ? <Text style={styles.logo}>{title}</Text> : null}
        {rightAccessory ? (
          <View style={styles.rightAccessory}>{rightAccessory}</View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  topBar: {
    alignItems: 'center',
    backgroundColor: '#F9F9F8',
    height: 64,
    justifyContent: 'center',
    position: 'relative',
  },
  logo: {
    color: '#000000',
    fontSize: normalize(22),
    fontWeight: '600',
    letterSpacing: -1.6,
    lineHeight: 40,
  },
  leftAccessory: { left: 20, position: 'absolute' },
  rightAccessory: { position: 'absolute', right: 20 },
});

export default Header;
