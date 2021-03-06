import React, { useCallback } from 'react';
import { View, Text, Pressable, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute, useNavigation } from '@react-navigation/core';
import { ShowEpisode } from '@api';
import { Button, HeroContainer } from '@components';
import { removeHTMLFromString } from '@helpers';
import { styles } from './styles';

export const zeroFill = (num: number) => String(num).padStart(2, '0');

export const formatEpisodeDescription = (
  season: number,
  episodeNumber: number,
) => {
  return `S${zeroFill(season)}E${zeroFill(episodeNumber)}`;
};

export const ShowEpisodeInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const { episode } = route.params as { episode: ShowEpisode };
  const { name, summary, image, season, number, url } = episode;

  const openOnTVMaze = useCallback(() => {
    Linking.openURL(url);
  }, [url]);

  return (
    <>
      <Pressable style={styles.closeButton} onPress={navigation.goBack}>
        <Icon name="x" color="#fff" size={20} />
      </Pressable>
      <HeroContainer
        title={name}
        imageURI={image.original}
        description={formatEpisodeDescription(season, number)}>
        <View style={styles.content}>
          <Text style={styles.episodeSummary}>
            {removeHTMLFromString(summary)}
          </Text>
          <Button
            onPress={openOnTVMaze}
            title="View on TVMaze"
            style={styles.viewOnTVMazeButton}
          />
        </View>
      </HeroContainer>
    </>
  );
};
