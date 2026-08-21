import { DefaultTheme } from '@react-navigation/native';

export const commonColors = {
  transparent: 'transparent',
  brandColor: 'rgba(91, 124, 253, 1)',
  brandColorLight: 'rgba(91,124,253,0.12)',
  white: '#fff',
  black: '#111111',
  darkGray: '#232522',
  lightGray: '#F9F9F9',
  mediumGray: '#D9D9D9',
  gray: '#828282',
  dividerLight: 'rgba(0,0,0,0.12)',
  dividerDark: 'rgba(255,255,255,0.12)',
  green: '#43A047',
  red: '#ff0000',
  transparentBlack: 'rgba(0,0,0,0.5)',
};

// colors
export const colors = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...commonColors,
    },
  },
  dark: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...commonColors,
    },
  },
};
