import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    backgroundColor: '#000814',
    paddingHorizontal: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  episodeSummary: {
    color: '#fff',
    fontFamily: 'Nunito-Regular',
    fontSize: 16,
  },
  viewOnTVMazeButton: {
    justifyContent: 'center',
    marginTop: 20,
  },
});
