import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { normalize } from '../commonutils/dimensionutils';

type InputProps = TextInputProps & {
  inputTitle: string;
  containerStyle?: StyleProp<ViewStyle>;
};

/** Adapted from the shared Yett Input component for Plié's login fields. */
const Input = ({ inputTitle, containerStyle, style, ...props }: InputProps) => (
  <View style={[styles.container, containerStyle]}>
    <Text style={styles.label}>{inputTitle}</Text>
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholderTextColor="#6B7280"
      selectionColor="#111111"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { width: '100%' },
  label: {
    color: '#605E5A',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.6,
    lineHeight: 16,
    marginBottom: 4,
  },
  input: {
    borderColor: '#C4C7C7',
    borderRadius: 8,
    borderWidth: 1,
    color: '#111111',
    fontSize: 16,
    height: normalize(48),
    paddingHorizontal: 10,
  },
});

export default React.memo(Input);
