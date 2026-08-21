declare module '*.png' {
  const value: number;
  export default value;
}

declare module '*.svg' {
  import {SvgProps} from 'react-native-svg';
  import {FC} from 'react';
  const content: FC<SvgProps>;
  export default content;
}
