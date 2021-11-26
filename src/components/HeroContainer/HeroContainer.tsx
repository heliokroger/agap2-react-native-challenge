import React, { useCallback, useRef } from 'react';
import {
  View,
  Animated,
  ScrollView,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BANNER_HEIGHT } from './constants';
import { styles } from './styles';

export type HeroContainerProps = {
  title: string;
  description: string;
  imageURI: string;
  children: React.ReactChild;
  scrollViewTestID?: string;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
};

export const HeroContainer = ({
  title,
  description,
  imageURI,
  children,
  scrollViewTestID,
  onScroll: customOnScroll,
}: HeroContainerProps) => {
  const bannerHeightAnim = useRef(new Animated.Value(BANNER_HEIGHT)).current;

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = event.nativeEvent.contentOffset;

      if (y < 0) {
        bannerHeightAnim.setValue(BANNER_HEIGHT + Math.abs(y));
      }

      if (typeof customOnScroll === 'function') {
        customOnScroll(event);
      }
    },
    [bannerHeightAnim, customOnScroll],
  );

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: imageURI,
        }}
        style={{
          height: bannerHeightAnim,
          width: '100%',
          position: 'absolute',
        }}
      />
      <ScrollView
        testID={scrollViewTestID}
        scrollEventThrottle={1}
        onScroll={onScroll}>
        <LinearGradient
          colors={['transparent', '#000814']}
          style={styles.bannerLinearGradient}>
          <Text style={styles.bannerTitle}>{title}</Text>
          <Text style={styles.bannerDescription}>{description}</Text>
        </LinearGradient>
        {children}
      </ScrollView>
    </View>
  );
};
