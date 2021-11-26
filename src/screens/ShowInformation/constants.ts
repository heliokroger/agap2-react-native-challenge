import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const STATUS_BAR_HEIGHT = Platform.select({
  ios: getStatusBarHeight(),
  android: 0,
});

export const HEADER_HEIGHT = (STATUS_BAR_HEIGHT ?? 0) + 60;
