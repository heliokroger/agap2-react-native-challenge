import React, { useCallback } from 'react';
import { Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';

export type ButtonProps = {
  onPress: () => void;
  title: string;
  iconName?: string;
  iconTestID?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Button = ({
  testID,
  iconTestID,
  onPress,
  style,
  title,
  iconName,
}: ButtonProps) => {
  const renderIcon = useCallback(() => {
    if (iconName) {
      return (
        <Icon testID={iconTestID} name={iconName} color="#fff" size={20} />
      );
    }

    return null;
  }, [iconName, iconTestID]);

  return (
    <Pressable testID={testID} style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonLabel}>{title}</Text>
      {renderIcon()}
    </Pressable>
  );
};
