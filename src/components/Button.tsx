import React, { useRef } from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { normalize } from '../commonutils/dimensionutils';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: object;
};

/** Adapted from the shared Yett Button component for Plié's primary action. */
const Button = ({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
}: ButtonProps) => {
  const scale = useRef(new Animated.Value(1)).current;
  const animate = (toValue: number) =>
    Animated.spring(scale, { toValue, useNativeDriver: true }).start();
  return (
    <TouchableOpacity
      activeOpacity={0.86}
      disabled={disabled || !onPress}
      onPress={onPress}
      onPressIn={() => animate(0.98)}
      onPressOut={() => animate(1)}
      style={[styles.button, { transform: [{ scale }] }, style]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: normalize(6),
    height: normalize(46),
    justifyContent: 'center',
  },
  text: { color: '#FFFFFF', fontSize: normalize(14) },
});

export default Button;
