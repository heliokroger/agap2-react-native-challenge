import React, { useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';

export type OverlayMenuItem = {
  label: string;
  value: number;
  active: boolean;
};

export type OverlayMenuProps = {
  items: OverlayMenuItem[];
  visible: boolean;
  onDismiss: () => void;
  onSelectItem: (value: number) => void;
};

export const getItemFontFamily = (active: boolean) => {
  if (active) {
    return 'Nunito-Black';
  }

  return 'Nunito-Regular';
};

export const OverlayMenu = ({
  items,
  visible,
  onDismiss,
  onSelectItem,
}: OverlayMenuProps) => {
  const seasonsMenuOpacityAnim = useRef(new Animated.Value(0)).current;

  const seasonsOpacityAnim = useRef(new Animated.Value(0)).current;
  const seasonsTranslateYAnim = useRef(new Animated.Value(50)).current;

  const performSeasonMenuAnimations = useCallback(
    (
      [
        seasonsMenuOpacityValue,
        seasonsOpacityValue,
        seasonsTranslateYValue,
      ]: number[],
      callback?: () => void,
    ) => {
      Animated.parallel([
        Animated.timing(seasonsMenuOpacityAnim, {
          toValue: seasonsMenuOpacityValue,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(seasonsOpacityAnim, {
          toValue: seasonsOpacityValue,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(seasonsTranslateYAnim, {
          toValue: seasonsTranslateYValue,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(callback);
    },
    [seasonsMenuOpacityAnim, seasonsOpacityAnim, seasonsTranslateYAnim],
  );

  const openMenu = useCallback(() => {
    performSeasonMenuAnimations([1, 1, 0]);
  }, [performSeasonMenuAnimations]);

  const closeMenu = useCallback(() => {
    performSeasonMenuAnimations([0, 0, 50], onDismiss);
  }, [performSeasonMenuAnimations, onDismiss]);

  const onPressItem = useCallback(
    (item: OverlayMenuItem) => {
      closeMenu();
      onSelectItem(item.value);
    },
    [closeMenu, onSelectItem],
  );

  const renderItems = useCallback(() => {
    return items.map((item, index) => (
      <Pressable
        key={`item-${index}`}
        style={styles.item}
        onPress={() => onPressItem(item)}>
        <Text
          style={[
            styles.itemLabel,
            {
              fontFamily: getItemFontFamily(item.active),
            },
          ]}>
          {item.label}
        </Text>
      </Pressable>
    ));
  }, [items, onPressItem]);

  useEffect(() => {
    if (visible) {
      openMenu();
    } else {
      closeMenu();
    }
  }, [visible, openMenu, closeMenu]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.seasonsMenu,
        {
          opacity: seasonsMenuOpacityAnim,
        },
      ]}>
      <Animated.View
        style={[
          styles.seasonsMenuList,
          {
            opacity: seasonsOpacityAnim,
            transform: [{ translateY: seasonsTranslateYAnim }],
          },
        ]}>
        {renderItems()}
      </Animated.View>
      <Pressable style={styles.closeSeasonsMenuButton} onPress={closeMenu}>
        <Icon name="x" color="#000" size={20} />
      </Pressable>
    </Animated.View>
  );
};
