import { StyleSheet } from 'react-native';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from './constants';

export const styles = StyleSheet.create({
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    position: 'absolute',
    backgroundColor: '#000814',
    zIndex: 1,
    borderColor: '#003566',
    borderBottomWidth: 2,
  },
  headerContent: {
    paddingTop: STATUS_BAR_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  headerTitle: {
    fontFamily: 'Nunito-Black',
    fontSize: 16,
    color: '#fff',
  },
  showSummary: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  episodeList: {
    width: '100%',
    backgroundColor: '#000814',
    paddingHorizontal: 20,
  },
  heroContent: {
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#000814',
    paddingBottom: 20,
  },
  heroSeasonSelection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
