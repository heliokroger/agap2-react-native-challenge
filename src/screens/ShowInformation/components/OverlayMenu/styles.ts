import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  seasonsMenu: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
  },
  seasonsMenuList: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeSeasonsMenuButton: {
    position: 'absolute',
    bottom: 35 + getBottomSpace(),
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  item: { marginBottom: 20 },
  itemLabel: {
    color: '#fff',
    fontSize: 20,
  },
});
