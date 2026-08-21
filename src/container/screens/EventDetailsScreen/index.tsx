import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../../assets/images';
import Header from '../../../components/Header';

const BackIcon = Images.eventBack;
const CalendarIcon = Images.eventCalendar;
const LocationIcon = Images.eventLocation;
const ShareIcon = Images.share;
const FavoriteIcon = Images.heartOutline;

const eventValue = (event: any, ...keys: string[]) =>
  keys.map(key => event?.[key]).find(Boolean);
const DEFAULT_DESCRIPTION =
  'ADICTO: Berlin Festival returns for its most ambitious edition yet. Set against the industrial architectural backdrop of Berlin, this festival bridges the gap between raw contemporary aesthetics and the passionate precision of Bachata.\n\nExpect world-class instructors, immersive workshop sessions that challenge your technique, and nocturnal social rooms where the music never stops. Our curation focuses on the "Plié" philosophy—finding grace and stability in every movement.';

const EventDetailsScreen = ({ navigation, route }: any) => {
  const event = route.params?.event ?? {};
  const title =
    eventValue(event, 'title', 'name', 'event_name') ||
    'ADICTO: Berlin Festival';
  const type = eventValue(event, 'type') || event?.keywords?.[0] || 'Workshop';
  const dance =
    eventValue(event, 'dance') || event?.danceStyles?.[0]?.ds_name || 'Bachata';
  const date =
    eventValue(event, 'date', 'readable_from_date') ||
    '24 - 26 Feb 2022, 21:00 onwards';
  const city = eventValue(event, 'city') || 'Berlin';
  const country = eventValue(event, 'country') || 'Germany';
  const price =
    eventValue(event, 'price') ||
    (event.event_price_from ? `€${event.event_price_from}` : '€30 – €100');
  const organiser =
    eventValue(event, 'organiser', 'organizer', 'organisation_name') ||
    'Adicto International';
  const description =
    eventValue(event, 'description', 'event_description') ||
    DEFAULT_DESCRIPTION;

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safe}>
      <Header
        title=""
        leftAccessory={
        <Pressable
          accessibilityLabel="Go back"
          hitSlop={12}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <BackIcon height={24} width={24} />
        </Pressable>
        }
      />
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.hero}>
          <Image source={Images.eventPoster as any} style={styles.poster} />
          <View style={styles.heroActions}>
            <Pressable
              accessibilityLabel="Share event"
              style={styles.heroButton}
            >
              <ShareIcon height={20} width={20} />
            </Pressable>
            <Pressable
              accessibilityLabel="Add to favourites"
              style={styles.heroButton}
            >
              <FavoriteIcon height={20} width={20} />
            </Pressable>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.intro}>
            <View style={styles.tags}>
              <Pill label={type} />
              <Pill label={dance} />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
          <View style={styles.details}>
            <Detail
              icon={<CalendarIcon height={21} width={19} />}
              label="DATE & TIME"
              text={date}
            />
            <Detail
              icon={<LocationIcon height={21} width={18} />}
              label="LOCATION"
              text={`${city}, ${country}`}
            />
          </View>
          <Image resizeMode="cover" source={Images.eventMap as any} style={styles.map} />
          <View style={styles.about}>
            <Text style={styles.sectionTitle}>About the Event</Text>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.organiser}>
            <View style={styles.organiserMark}>
              <Text style={styles.organiserLetter}>
                {organiser.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.organiserCopy}>
              <Text style={styles.organiserLabel}>ORGANIZED BY</Text>
              <Text numberOfLines={1} style={styles.organiserName}>
                {organiser}
              </Text>
              <Pressable accessibilityLabel={`View ${organiser} profile`}>
                <Text style={styles.profileLink}>View Profile</Text>
              </Pressable>
            </View>
          </View>
          <Pressable accessibilityRole="button" style={styles.shareTickets}>
            <Text style={styles.shareTicketsText}>Share tickets</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Pill = ({ label }: { label: string }) => (
  <View style={styles.pill}>
    <Text style={styles.pillText}>{label}</Text>
  </View>
);
const Detail = ({
  icon,
  label,
  text,
}: {
  icon: React.ReactNode;
  label: string;
  text: string;
}) => (
  <View style={styles.detail}>
    <View style={styles.detailIcon}>{icon}</View>
    <View style={styles.detailCopy}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailText}>{text}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safe: { backgroundColor: '#F9F9F8', flex: 1 },
  scrollView: { backgroundColor: '#FFFFFF' },
  backButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    marginLeft: -8,
    width: 40,
  },
  content: { paddingBottom: 32 },
  hero: {
    height: 250,
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  poster: { height: '100%', width: '100%' },
  heroActions: {
    flexDirection: 'row',
    gap: 8,
    position: 'absolute',
    right: 16,
    top: 16,
  },
  heroButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 12,
    elevation: 2,
    height: 40,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    width: 40,
  },
  body: { gap: 24, paddingHorizontal: 20, paddingTop: 24 },
  intro: { gap: 12 },
  tags: { flexDirection: 'row', gap: 6 },
  pill: {
    backgroundColor: '#F9FAFB',
    borderColor: 'rgba(188,202,188,0.45)',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  pillText: {
    color: '#3D4A3F',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
  },
  title: {
    color: '#000000',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 38.4,
  },
  price: {
    color: '#1A1C1C',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.32,
    lineHeight: 29,
  },
  details: { gap: 16 },
  detail: { alignItems: 'center', flexDirection: 'row', gap: 16 },
  detailIcon: {
    alignItems: 'center',
    backgroundColor: '#EEEEED',
    borderRadius: 4,
    height: 48,
    justifyContent: 'center',
    width: 48,
  },
  detailCopy: { flex: 1, gap: 1 },
  detailLabel: {
    color: '#605E5A',
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 16,
  },
  detailText: { color: '#1A1C1C', fontSize: 18, lineHeight: 28 },
  map: {
    borderColor: 'rgba(0,0,0,0.10)',
    borderRadius: 4,
    borderWidth: 1,
    height: 192,
    width: '100%',
  },
  about: { gap: 12 },
  sectionTitle: {
    color: '#1A1C1C',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  description: { color: '#4A4457', fontSize: 16, lineHeight: 26 },
  organiser: {
    alignItems: 'center',
    backgroundColor: '#F3F4F3',
    borderRadius: 8,
    flexDirection: 'row',
    gap: 16,
    padding: 24,
  },
  organiserMark: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 12,
    height: 64,
    justifyContent: 'center',
    width: 64,
  },
  organiserLetter: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
  },
  organiserCopy: { flex: 1 },
  organiserLabel: {
    color: '#605E5A',
    fontSize: 12,
    letterSpacing: 0.6,
    lineHeight: 16,
  },
  organiserName: {
    color: '#1A1C1C',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
  },
  profileLink: {
    color: '#000000',
    fontSize: 12,
    lineHeight: 16,
    textDecorationLine: 'underline',
  },
  shareTickets: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    elevation: 1,
    justifyContent: 'center',
    minHeight: 56,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    width: '100%',
  },
  shareTicketsText: { color: '#FFFFFF', fontSize: 16, lineHeight: 24 },
});

export default EventDetailsScreen;
