import { Dimensions, StyleSheet } from 'react-native';

export const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } =
  Dimensions.get('window');

export const HEAD_HEIGHT_OFFSET = 30;

export const [BUTTERCUP_COLOR, BLOSSOM_COLOR, BUBBLES_COLOR] = [
  '#57ba48',
  '#e2096f',
  '#0088cd',
];

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  drawer: {
    width: '50%',
    height: '100%',
    backgroundColor: '#000814',
    position: 'absolute',
  },
  spinnerContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: { width: 150, height: 150 },
  girlsContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1,
    flexDirection: 'row',
  },
  girlTrail: {
    width: 15,
    bottom: 0,
    position: 'relative',
    alignItems: 'center',
    height: WINDOW_HEIGHT + HEAD_HEIGHT_OFFSET,
  },
  buttercupHeadImage: {
    width: 38,
    height: 33,
    tintColor: BUTTERCUP_COLOR,
  },
  blossomHeadImage: {
    width: 30,
    height: 39,
    tintColor: BLOSSOM_COLOR,
  },
  bubblesHeadImage: {
    width: 39,
    height: 27,
    tintColor: BUBBLES_COLOR,
  },
});
