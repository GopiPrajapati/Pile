import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import Strings from '../assets/strings';
import Button from './Button';

type LogoutModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

/** A confirmation dialog shown before the locally persisted session is cleared. */
const LogoutModal = ({ visible, onCancel, onConfirm }: LogoutModalProps) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <Pressable onPress={onCancel} style={styles.backdrop}>
      <Pressable
        onPress={event => event.stopPropagation()}
        style={styles.content}
      >
        <Text style={styles.title}>{Strings.logout.title}</Text>
        <Text style={styles.subtitle}>{Strings.logout.message}</Text>
        <View style={styles.actions}>
          <Button
            onPress={onConfirm}
            style={styles.logoutButton}
            textStyle={styles.logoutText}
            title={Strings.profile.logOut}
          />
          <Pressable
            accessibilityRole="button"
            onPress={onCancel}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelText}>{Strings.logout.cancel}</Text>
          </Pressable>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

const styles = StyleSheet.create({
  backdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
  },
  title: {
    color: '#242424',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#605E5A',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 10,
    textAlign: 'center',
  },
  actions: { gap: 10, marginTop: 26 },
  logoutButton: { backgroundColor: '#BA1A1A', borderRadius: 24 },
  logoutText: { fontWeight: '600' },
  cancelButton: { alignItems: 'center', paddingVertical: 12 },
  cancelText: { color: '#605E5A', fontSize: 14, fontWeight: '600' },
});

export default LogoutModal;
