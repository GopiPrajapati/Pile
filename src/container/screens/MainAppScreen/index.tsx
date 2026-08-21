import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar, { BottomTab } from '../../../components/BottomBar';
import EventsScreen from '../EventsScreen';
import FavoritesScreen from '../FavoritesScreen';
import ProfileScreen from '../ProfileScreen';
import SearchScreen from '../SearchScreen';
import { normalize } from '../../../commonutils/dimensionutils';

const MainAppScreen = () => {
  const [tab, setTab] = useState<BottomTab>('events');
  const Screen = {
    search: SearchScreen,
    events: EventsScreen,
    favorites: FavoritesScreen,
    profile: ProfileScreen,
  }[tab];
  return (
    <SafeAreaView
      style={styles.safe}
      edges={{ bottom: 'off', top: 'additive' }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={[styles.page, tab === 'profile' && styles.profilePage]}>
        <Screen />
      </View>
      <BottomBar activeTab={tab} onTabPress={setTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F9F9F8', flex: 1, paddingBottom: normalize(10) },
  page: { backgroundColor: '#FFFFFF', flex: 1, paddingHorizontal: 16 },
  profilePage: { paddingHorizontal: 0 },
});
export default MainAppScreen;
