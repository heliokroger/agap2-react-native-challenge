import React, { useCallback } from 'react';
import { Text, Pressable, StyleProp, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { styles } from './styles';

export type ButtonProps = {
  onPress: () => void;
  title: string;
  iconName?: string;
  style?: StyleProp<ViewStyle>;
};

export const Button = ({ onPress, style, title, iconName }: ButtonProps) => {
  const renderIcon = useCallback(() => {
    if (iconName) {
      return <Icon name={iconName} color="#fff" size={20} />;
    }

    return null;
  }, [iconName]);

  return (
    <Pressable style={[styles.menuButton, style]} onPress={onPress}>
      <Text style={styles.menuButtonLabel}>{title}</Text>
      {renderIcon()}
    </Pressable>
  );
};
