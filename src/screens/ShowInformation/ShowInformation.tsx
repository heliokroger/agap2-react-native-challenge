import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { getShowEpisodes, getShowInformation } from '@api';
import type { Show, ShowEpisode } from '@api';
import { Button, HeroContainer } from '@components';
import {
  getYearFromPremieredDate,
  separateGenresByComma,
  removeHTMLFromString,
} from '@helpers';
import { POWERPUFF_GIRLS_SHOW_ID } from '../../constants';
import { styles } from './styles';
import { EpisodeItem } from './components/EpisodeItem/EpisodeItem';
import { HEADER_HEIGHT, STATUS_BAR_HEIGHT } from './constants';
import {
  OverlayMenu,
  OverlayMenuItem,
} from './components/OverlayMenu/OverlayMenu';
import { useNavigation } from '@react-navigation/core';

export const getSeasonsFromEpisodes = (episodes: ShowEpisode[]): number[] =>
  episodes.reduce((prev, next) => {
    if (prev.includes(next.season)) {
      return prev;
    }

    return [...prev, next.season];
  }, [] as number[]);

export const getMenuItemsFromSeasons = (
  selectedSeason: number,
  seasons: number[],
) =>
  seasons.map(season => ({
    label: `Season ${season}`,
    value: season,
    active: selectedSeason === season,
  })) as OverlayMenuItem[];

export const ShowInformation = () => {
  const [showLoaded, setShowLoaded] = useState(false);

  const [showInformation, setShowInformation] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<ShowEpisode[]>([]);

  const [selectedSeason, setSelectedSeason] = useState(1);
  const [seasons, setSeasons] = useState<number[]>([]);

  const isHeaderVisible = useRef(false);

  const [showSeasonsMenu, setShowSeasonsMenu] = useState(false);

  const headerTranslateYAnim = useRef(
    new Animated.Value(-HEADER_HEIGHT),
  ).current;

  const episodeListYPosition = useRef(0);

  const navigation = useNavigation();

  const getShow = useCallback(async () => {
    await getShowInformation(POWERPUFF_GIRLS_SHOW_ID).then(setShowInformation);
    await getShowEpisodes(POWERPUFF_GIRLS_SHOW_ID).then(response => {
      setSeasons(getSeasonsFromEpisodes(response));
      setEpisodes(response);
    });

    setShowLoaded(true);
  }, []);

  useEffect(() => {
    getShow();
  }, [getShow]);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { y } = event.nativeEvent.contentOffset;

      if (y > episodeListYPosition.current && !isHeaderVisible.current) {
        isHeaderVisible.current = true;
        Animated.timing(headerTranslateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      if (y < episodeListYPosition.current && isHeaderVisible.current) {
        isHeaderVisible.current = false;
        Animated.timing(headerTranslateYAnim, {
          toValue: -HEADER_HEIGHT,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
    [headerTranslateYAnim],
  );

  const onPressEpisode = useCallback((episode: ShowEpisode) => {
    navigation.navigate('ShowEpisodeInformation', { episode });
  }, []);

  const renderContent = useCallback(() => {
    const episodesFromSelectedSeason = episodes.filter(
      ({ season }) => season === selectedSeason,
    );

    return episodesFromSelectedSeason.map((episode: ShowEpisode) => (
      <EpisodeItem
        key={episode.id}
        episode={episode}
        onPress={() => onPressEpisode(episode)}
      />
    ));
  }, [episodes, selectedSeason]);

  const onSelectSeason = useCallback((season: number) => {
    setSelectedSeason(season);
  }, []);

  const onDismissMenu = useCallback(() => {
    setShowSeasonsMenu(false);
  }, [setShowSeasonsMenu]);

  if (!showLoaded) {
    return null;
  }

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslateYAnim }],
          },
        ]}>
        <View
          style={{
            paddingTop: STATUS_BAR_HEIGHT,
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}>
          <Text style={styles.headerTitle}>
            {showInformation?.name} - Season {selectedSeason}
          </Text>
        </View>
      </Animated.View>
      <OverlayMenu
        visible={showSeasonsMenu}
        items={getMenuItemsFromSeasons(selectedSeason, seasons)}
        onDismiss={onDismissMenu}
        onSelectItem={onSelectSeason}
      />
      <HeroContainer
        title={showInformation?.name!}
        imageURI={showInformation?.image.original!}
        description={`${getYearFromPremieredDate(
          showInformation?.premiered || '',
        )} — ${separateGenresByComma(showInformation?.genres || [])}`}
        onScroll={onScroll}>
        <>
          <View
            style={{
              width: '100%',
              paddingHorizontal: 20,
              backgroundColor: '#000814',
              paddingBottom: 20,
            }}>
            <Text style={styles.showSummary}>
              {removeHTMLFromString(showInformation?.summary || '')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View style={{ width: '35%' }}>
                <Button
                  onPress={() => setShowSeasonsMenu(true)}
                  iconName="chevron-down"
                  title={`Season ${selectedSeason}`}
                />
              </View>
            </View>
          </View>
          <View
            onLayout={({ nativeEvent }) =>
              (episodeListYPosition.current = nativeEvent.layout.y)
            }
            style={styles.episodeList}>
            {renderContent()}
          </View>
        </>
      </HeroContainer>
    </>
  );
};
