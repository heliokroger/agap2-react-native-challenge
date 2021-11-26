import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  episodeButton: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
  },
  episodeInformationContainer: {
    width: '100%',
    flexShrink: 1,
    marginLeft: 15,
  },
  episodeImageContainer: {
    width: 100,
    height: 100,
    position: 'relative',
  },
  episodeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 2,
    position: 'absolute',
    zIndex: 1,
  },
  episodeName: {
    color: '#fff',
    fontFamily: 'Nunito-Bold',
    fontSize: 18,
  },
  episodeRuntime: {
    color: '#ced4da',
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
  },
  episodeSummary: {
    color: '#ced4da',
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
  },
});
