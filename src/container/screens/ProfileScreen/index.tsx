import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../../../assets/images';
import Strings from '../../../assets/strings';
import Header from '../../../components/Header';
import LogoutModal from '../../../components/LogoutModal';
import { selectAuth, signOut } from '../../../redux/slices/authSlice';
import { Routes } from '../../Routes';

const AvatarIcon = Images.profileAvatar;
const LogoutIcon = Images.profileLogout;
const EditIcon = Images.profileEdit;
const ChevronIcon = Images.profileChevron;
const TicketIcon = Images.myTicket;
const PaymentIcon = Images.paymentMethod;
const NotificationIcon = Images.notificationSettings;
const HelpIcon = Images.helpSupport;

type MenuRowProps = {
  label: string;
  Icon: React.ComponentType<{ height?: number; width?: number }>;
};

const MenuRow = ({ label, Icon }: MenuRowProps) => (
  <View style={styles.menuRow}>
    <View style={styles.menuIcon}>
      <Icon height={20} width={22} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
    <ChevronIcon height={12} width={7.4} />
  </View>
);

const ProfileScreen = () => {
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const { email } = useSelector(selectAuth);

  const handleLogout = () => {
    setLogoutModalVisible(false);
    dispatch(signOut());
    navigation.reset({ index: 0, routes: [{ name: Routes.LOGIN_SCREEN }] });
  };

  return (
    <>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <View style={styles.body}>
          <View style={styles.profileHeader}>
            <Pressable
              accessibilityLabel={Strings.profile.editPhoto}
              style={styles.avatar}
            >
              <View style={styles.avatarBackground}>
                <AvatarIcon height={43} width={43} />
              </View>
              <View style={styles.editBadge}>
                <EditIcon height={12} width={12} />
              </View>
            </Pressable>
            <View style={styles.profileCopy}>
              <Text style={styles.profileName}>
                {Strings.profile.defaultName}
              </Text>
              <Text style={styles.profileEmail}>
                {email || Strings.profile.defaultEmail}
              </Text>
            </View>
          </View>
          <View style={styles.menu}>
            <MenuRow Icon={TicketIcon} label={Strings.profile.myTickets} />
            <MenuRow
              Icon={PaymentIcon}
              label={Strings.profile.paymentMethods}
            />
            <MenuRow
              Icon={NotificationIcon}
              label={Strings.profile.notificationSettings}
            />
            <MenuRow Icon={HelpIcon} label={Strings.profile.helpAndSupport} />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={Strings.profile.logOut}
              onPress={() => setLogoutModalVisible(true)}
              style={styles.logoutRow}
            >
              <View style={styles.menuIcon}>
                <LogoutIcon height={18} width={18} />
              </View>
              <Text style={styles.logoutText}>{Strings.profile.logOut}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <LogoutModal
        visible={isLogoutModalVisible}
        onCancel={() => setLogoutModalVisible(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: { paddingBottom: 24 },
  body: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 24 },
  profileHeader: { alignItems: 'center' },
  avatar: {
    borderColor: '#E6E2DD',
    borderRadius: 12,
    borderWidth: 2,
    height: 128,
    padding: 6,
    width: 128,
  },
  avatarBackground: {
    alignItems: 'center',
    backgroundColor: '#EEEEED',
    borderRadius: 12,
    flex: 1,
    justifyContent: 'center',
  },
  editBadge: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 4,
    bottom: -1,
    height: 32,
    justifyContent: 'center',
    position: 'absolute',
    right: -1,
    width: 32,
  },
  profileCopy: { alignItems: 'center', marginTop: 8 },
  profileName: {
    color: '#000000',
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.8,
    lineHeight: 40,
  },
  profileEmail: { color: '#444748', fontSize: 16, lineHeight: 24 },
  menu: {
    alignSelf: 'stretch',
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 24,
    overflow: 'hidden',
    padding: 1,
  },
  menuRow: {
    alignItems: 'center',
    borderBottomColor: 'rgba(230, 226, 221, 0.2)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    height: 65,
    paddingHorizontal: 23,
  },
  menuIcon: { alignItems: 'center', justifyContent: 'center', width: 22 },
  menuLabel: {
    color: '#1A1C1C',
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
  logoutRow: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 72,
    paddingHorizontal: 23,
  },
  logoutText: {
    color: '#BA1A1A',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 16,
  },
});

export default ProfileScreen;
