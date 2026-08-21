import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../../assets/images';
import Strings from '../../assets/strings';
import { normalize } from '../../commonutils/dimensionutils';
import Header from '../../components/Header';
import { fetchEvents } from '../../redux/slices/eventsSlice';
import { toggleFavorite } from '../../redux/slices/favoritesSlice';
import { Routes } from '../Routes';

const eventPosters = Images.eventPosters;

const getSearchText = (event: any) =>
  [
    event.title,
    event.name,
    event.event_name,
    event.event_id,
    event.event_date_id,
    event.id,
    event.city,
    event.country,
    event.type,
    event.dance,
    ...(event.keywords || []),
    ...(event.danceStyles || []).map((style: any) => style.ds_name),
  ]
    .filter(value => value !== undefined && value !== null)
    .join(' ')
    .toLowerCase();

export const getEventId = (event: any) =>
  String(
    event.event_date_id ?? event.id ?? event.event_id ?? event.event_url ?? '',
  );

const EventListTab = ({
  favoritesOnly = false,
  autoFocusSearch = false,
  fetchOnMount = true,
}: {
  favoritesOnly?: boolean;
  autoFocusSearch?: boolean;
  fetchOnMount?: boolean;
}) => {
  const dispatch = useDispatch<any>();
  const navigation = useNavigation<any>();
  const reduxEvents = useSelector((state: any) => state.events.items || []);
  const loading = useSelector((state: any) => state.events.loading);
  const favoriteIds = useSelector((state: any) => state.favorites.ids || []);
  const [query, setQuery] = useState('');
  const searchInputRef = useRef<TextInput>(null);
  const events = reduxEvents;

  useEffect(() => {
    if (fetchOnMount) {
      dispatch(fetchEvents());
    }
  }, [dispatch, fetchOnMount]);

  useEffect(() => {
    if (!autoFocusSearch) {
      return;
    }

    const frame = requestAnimationFrame(() => searchInputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [autoFocusSearch]);

  const visibleEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const matchingEvents = normalizedQuery
      ? events.filter((event: any) =>
          getSearchText(event).includes(normalizedQuery),
        )
      : events;
    return favoritesOnly
      ? matchingEvents.filter((event: any) =>
          favoriteIds.includes(getEventId(event)),
        )
      : matchingEvents;
  }, [events, favoriteIds, favoritesOnly, query]);
  return (
    <>
      <Header />
      <Text style={styles.heading}>
        {favoritesOnly
          ? Strings.eventList.favoritesHeading
          : Strings.eventList.greeting}
      </Text>
      <Text style={styles.subheading}>
        {favoritesOnly
          ? Strings.eventList.favoritesSubheading
          : Strings.eventList.eventsSubheading}
      </Text>
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          autoFocus={autoFocusSearch}
          ref={searchInputRef}
          value={query}
          onChangeText={setQuery}
          placeholder={Strings.eventList.searchPlaceholder}
          placeholderTextColor="#8D8D8D"
          style={styles.search}
        />
      </View>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#606060" />
        </View>
      ) : (
        <FlatList
          data={visibleEvents}
          keyExtractor={(item: any) => getEventId(item)}
          renderItem={({ item, index }) => (
            <EventCard
              event={item}
              poster={eventPosters[index % eventPosters.length]}
              favourite={favoriteIds.includes(getEventId(item))}
              onOpen={() =>
                navigation.navigate(Routes.EVENT_DETAILS_SCREEN, {
                  event: item,
                })
              }
              onToggle={() => dispatch(toggleFavorite(getEventId(item)))}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={styles.listContainer}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.empty}>
                {favoritesOnly
                  ? Strings.eventList.noFavorites
                  : Strings.eventList.noEvents}
              </Text>
            </View>
          }
        />
      )}
    </>
  );
};

const EventCard = ({
  event,
  poster,
  favourite,
  onOpen,
  onToggle,
}: {
  event: any;
  poster: number;
  favourite: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={Strings.eventList.openEvent(
      event.title || event.name || event.event_name,
    )}
    onPress={onOpen}
    style={styles.eventCard}
  >
    <Image
      accessibilityLabel={Strings.eventList.eventPoster(
        event.title || event.name || event.event_name,
      )}
      resizeMode="cover"
      source={poster}
      style={styles.poster}
    />
    <View style={styles.details}>
      <View style={styles.topline}>
        <Text style={styles.pill}>
          {event.type || event.keywords?.[0] || Strings.eventList.eventType}
        </Text>
        <Text style={styles.pill}>
          {event.dance ||
            event.danceStyles?.[0]?.ds_name ||
            Strings.eventList.danceStyle}
        </Text>
      </View>
      <Text numberOfLines={1} style={styles.eventTitle}>
        {event.title || event.name || event.event_name}
      </Text>
      <Text style={styles.meta}>
        ⌖ {event.city || Strings.eventList.city},{' '}
        {event.country || Strings.eventList.country}
      </Text>
      <View style={styles.bottomline}>
        <Text style={styles.meta}>
          ▣{' '}
          {event.date || event.readable_from_date || Strings.eventList.upcoming}
        </Text>
        <Text style={styles.price}>
          {event.price ||
            (event.event_price_from
              ? `€${event.event_price_from}`
              : Strings.eventList.free)}
        </Text>
      </View>
    </View>
    <Pressable
      accessibilityLabel={Strings.eventList.toggleFavorite}
      hitSlop={10}
      onPress={onToggle}
      style={styles.heart}
    >
      <Text style={[styles.heartText, favourite && styles.hearted]}>
        {favourite ? '♥' : '♡'}
      </Text>
    </Pressable>
  </Pressable>
);

const styles = StyleSheet.create({
  heading: { color: '#242424', fontSize: 17, fontWeight: '600' },
  subheading: { color: '#4E4E4E', fontSize: 14, lineHeight: 20, marginTop: 6 },
  searchWrap: {
    alignItems: 'center',
    borderColor: '#ECECEC',
    borderRadius: 3,
    borderWidth: 1,
    flexDirection: 'row',
    height: 42,
    marginTop: 18,
    paddingHorizontal: 10,
  },
  searchIcon: { color: '#777', fontSize: 19, marginRight: 5 },
  search: { color: '#262626', flex: 1, fontSize: 14, padding: 0 },
  loaderContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  listContainer: { flex: 1 },
  list: { flexGrow: 1, gap: 11, paddingBottom: 12, paddingTop: 18 },
  eventCard: {
    borderColor: '#EEEEEE',
    borderRadius: normalize(5),
    borderWidth: normalize(1),
    flexDirection: 'row',
    minHeight: normalize(100),
    overflow: 'hidden',
    position: 'relative',
  },
  poster: { height: '100%', width: '39%' },
  details: { flex: 1, padding: 10, paddingRight: 31 },
  topline: { flexDirection: 'row', gap: 5 },
  pill: {
    backgroundColor: '#F4F4F4',
    color: '#777',
    fontSize: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  eventTitle: {
    color: '#242424',
    fontSize: 15,
    fontWeight: '500',
    marginTop: 6,
  },
  meta: { color: '#656565', fontSize: 12, marginTop: 4 },
  bottomline: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: { color: '#242424', fontSize: 13, fontWeight: '600', marginTop: 4 },
  heart: { position: 'absolute', right: 8, top: 7 },
  heartText: { color: '#606060', fontSize: 18 },
  hearted: { color: '#C24753' },
  emptyContainer: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  empty: { color: '#777', fontSize: 13, textAlign: 'center' },
});
export default EventListTab;
