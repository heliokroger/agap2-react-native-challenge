import { StyleSheet } from 'react-native';
import { BANNER_HEIGHT } from './constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000814',
  },
  bannerLinearGradient: {
    width: '100%',
    height: BANNER_HEIGHT,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  bannerTitle: {
    color: '#fff',
    fontFamily: 'Nunito-Black',
    fontSize: 30,
  },
  bannerDescription: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
});
