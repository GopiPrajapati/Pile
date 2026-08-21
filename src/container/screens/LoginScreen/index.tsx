import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { Routes } from '../../Routes';
import FastImage from 'react-native-fast-image';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  selectAuth,
  signInAsGuest,
} from '../../../redux/slices/authSlice';
import images from '../../../assets/images';

const AppleIcon = images.apple;
const FacebookIcon = images.facebook;
const GoogleIcon = images.google;
const VisibilityIcon = images.visibility;

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch<any>();
  const isSubmitting = useSelector((state: any) => selectAuth(state).loading);
  const showUnavailable = () =>
    Alert.alert('Coming soon', 'This action is not available yet.');
  const enterApp = () => {
    dispatch(signInAsGuest());
    navigation.replace(Routes.MAIN_SCREEN);
  };
  const signIn = () => {
    if (!email.trim() || !password) {
      Alert.alert(
        'Missing details',
        'Enter your email and password to sign in.',
      );
      return;
    }

    dispatch(loginUser({ email: email.trim(), password } as any) as any)
      .unwrap()
      .then(() => navigation.replace(Routes.MAIN_SCREEN))
      .catch((error: any) =>
        Alert.alert('Unable to sign in', error || 'Please check your connection and try again.'),
      );
  };

  return (
    <View style={styles.background}>
      {/* <Image
        pointerEvents="none"
        resizeMode="cover"
        source={images.ic_login_background as any}
        style={styles.backgroundImage}
      /> */}
      <FastImage
        source={images.ic_login_background as any}
        style={styles.backgroundImage as any}
      />
      <StatusBar barStyle="dark-content" />
      <View pointerEvents="none" style={styles.overlay} />
      <KeyboardAwareScrollView
        testID={`concierge_keyboard_scroll + ${Date.now()}`}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bottomOffset={24}
        style={styles.scrollView}
      >
        <View style={styles.content}>
          <View style={styles.brand}>
            <Text style={styles.brandName}>Plié</Text>
            <Text style={styles.tagline}>ELEVATE THE MOVEMENT</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.form}>
              <Input
                autoCapitalize="none"
                autoComplete="email"
                inputMode="email"
                inputTitle="Email"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="email@example.com"
                returnKeyType="next"
                value={email}
              />
              <View>
                <Input
                  autoComplete="password"
                  inputTitle="Password"
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  secureTextEntry={!isPasswordVisible}
                  value={password}
                />
                <Pressable
                  accessibilityLabel={
                    isPasswordVisible ? 'Hide password' : 'Show password'
                  }
                  hitSlop={12}
                  onPress={() => setPasswordVisible(value => !value)}
                  style={styles.visibilityButton}
                >
                  <VisibilityIcon height={16} width={22} />
                </Pressable>
                <Pressable
                  onPress={showUnavailable}
                  style={styles.forgotButton}
                >
                  <Text style={styles.smallLink}>Forgot Password?</Text>
                </Pressable>
              </View>
              <Button
                disabled={isSubmitting}
                title={isSubmitting ? 'Signing In...' : 'Sign In'}
                onPress={signIn}
              />
            </View>
            <Text style={styles.memberText}>
              Not a member?{' '}
              <Text onPress={showUnavailable} style={styles.signupText}>
                Sign Up Here
              </Text>
            </Text>
            <View style={styles.socialSection}>
              <View style={styles.dividerRow}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>or Sign In with</Text>
                <View style={styles.divider} />
              </View>
              <View style={styles.socialButtons}>
                <SocialButton
                  Icon={GoogleIcon}
                  label="Sign in with Google"
                  onPress={showUnavailable}
                />
                <SocialButton
                  Icon={AppleIcon}
                  label="Sign in with Apple"
                  onPress={showUnavailable}
                />
                <SocialButton
                  Icon={FacebookIcon}
                  label="Sign in with Facebook"
                  onPress={showUnavailable}
                />
              </View>
            </View>
            <Pressable onPress={enterApp} style={styles.guestButton}>
              <Text style={styles.guestText}>Enter as Guest</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const SocialButton = ({
  Icon,
  label,
  onPress,
}: {
  Icon: React.ComponentType<{ width: number; height: number }>;
  label: string;
  onPress: () => void;
}) => (
  <Pressable
    accessibilityLabel={label}
    onPress={onPress}
    style={styles.socialButton}
  >
    <Icon height={24} width={24} />
  </Pressable>
);

const styles = StyleSheet.create({
  background: { backgroundColor: '#F9F9F8', flex: 1, position: 'relative' },
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
    zIndex: 0,
  },
  scrollView: { zIndex: 2 },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  content: { alignSelf: 'center', maxWidth: 448, width: '100%' },
  brand: { alignItems: 'center', marginBottom: 48 },
  brandName: {
    color: '#000000',
    fontSize: 32,
    fontWeight: '600',
    letterSpacing: -1.6,
    lineHeight: 40,
  },
  tagline: {
    color: '#605E5A',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 2.4,
    lineHeight: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 12,
    borderWidth: 1,
    padding: 32,
  },
  form: { gap: 20 },
  visibilityButton: { position: 'absolute', right: 14, top: 35 },
  forgotButton: { alignSelf: 'flex-end', marginTop: 8 },
  smallLink: {
    color: '#605E5A',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 16,
  },
  memberText: {
    color: '#605E5A',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  signupText: { color: '#000000' },
  socialSection: { gap: 24, marginTop: 32 },
  dividerRow: { alignItems: 'center', flexDirection: 'row', gap: 24 },
  divider: { backgroundColor: 'rgba(196,199,199,0.4)', flex: 1, height: 1 },
  dividerText: {
    color: '#605E5A',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
  socialButtons: { flexDirection: 'row', gap: 24, justifyContent: 'center' },
  socialButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(196,199,199,0.3)',
    borderRadius: 12,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  guestButton: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderColor: 'rgba(188,202,188,0.3)',
    borderRadius: 100,
    borderWidth: 1,
    height: 42,
    justifyContent: 'center',
    marginTop: 32,
  },
  guestText: {
    color: '#605E5A',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
});

export default LoginScreen;
