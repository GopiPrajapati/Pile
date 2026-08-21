import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { normalize } from '../commonutils/dimensionutils';
import Images from '../assets/images';

export type BottomTab = 'search' | 'events' | 'favorites' | 'profile';

type BottomBarProps = {
  activeTab: BottomTab;
  onTabPress: (tab: BottomTab) => void;
};

const tabs: { key: BottomTab; label: string }[] = [
  { key: 'search', label: 'SEARCH' },
  { key: 'events', label: 'EVENTS' },
  { key: 'favorites', label: 'FAVOURITES' },
  { key: 'profile', label: 'PROFILE' },
];

const icons = {
  search: Images.search,
  events: Images.events,
  favorites: Images.favourite,
  profile: Images.profile,
};

const TabIcon = ({ tab, color }: { tab: BottomTab; color: string }) => {
  const Icon = icons[tab];
  return <Icon color={color} height={20} width={20} />;
};

/** Bottom navigation matching the Figma event, search, favourite and profile tabs. */
const BottomBar = ({ activeTab, onTabPress }: BottomBarProps) => (
  <View style={styles.bar}>
    {tabs.map(tab => {
      const active = activeTab === tab.key;
      const color = active ? '#000000' : '#9D9C99';
      return (
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected: active }}
          accessibilityLabel={tab.label}
          key={tab.key}
          onPress={() => onTabPress(tab.key)}
          style={styles.tab}
        >
          <TabIcon color={color} tab={tab.key} />
          <Text style={[styles.label, active && styles.activeLabel]}>
            {tab.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EEEEEE',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: normalize(60),
  },
  tab: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingTop: normalize(3),
  },
  label: {
    color: '#9D9C99',
    fontSize: normalize(10),
    fontWeight: '600',
    letterSpacing: 0.2,
    marginTop: normalize(4),
  },
  activeLabel: { color: '#000000' },
});

export default BottomBar;
