import React, { useCallback, useRef, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import type { ShowEpisode } from '@api';
import { convertRuntimeToHours, removeHTMLFromString } from '@helpers';
import { styles } from './styles';

export type EpisodeItemProps = {
  episode: ShowEpisode;
  onPress: () => void;
};

export const renderImagePlaceholder = (imageLoaded: boolean) => {
  if (!imageLoaded) {
    return (
      <SkeletonPlaceholder>
        <SkeletonPlaceholder.Item width="100%" height="100%" borderRadius={2} />
      </SkeletonPlaceholder>
    );
  }

  return null;
};

export const EpisodeItem = ({ episode, onPress }: EpisodeItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const imageOpacityAnim = useRef(new Animated.Value(0)).current;

  const onLoadImage = useCallback(() => {
    Animated.timing(imageOpacityAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setImageLoaded(true));
  }, [imageOpacityAnim]);

  const { number, name, runtime, summary, image } = episode;

  return (
    <Pressable style={styles.episodeButton} onPress={onPress}>
      <View style={styles.episodeImageContainer}>
        {renderImagePlaceholder(imageLoaded)}
        <Animated.Image
          source={{ uri: image.original }}
          style={[styles.episodeImage, { opacity: imageOpacityAnim }]}
          onLoadEnd={onLoadImage}
        />
      </View>
      <View style={styles.episodeInformationContainer}>
        <Text style={styles.episodeName} numberOfLines={1}>
          {number}. {name}
        </Text>
        <Text style={styles.episodeRuntime}>
          {convertRuntimeToHours(runtime)}
        </Text>
        <Text style={styles.episodeSummary} numberOfLines={3}>
          {removeHTMLFromString(summary)}
        </Text>
      </View>
    </Pressable>
  );
};
