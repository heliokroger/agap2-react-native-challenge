import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Animated,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/core';
import spinnerAnimation from '../../assets/animations/spinner.json';
import { getShowEpisodes, getShowInformation } from '@api';
import type { Show, ShowEpisode } from '@api';
import { Button, HeroContainer } from '@components';
import { POWERPUFF_GIRLS_SHOW_ID } from '@constants';
import {
  getYearFromPremieredDate,
  separateGenresByComma,
  removeHTMLFromString,
} from '@helpers';
import { EpisodeItem, OverlayMenu } from './components';
import type { OverlayMenuItem } from './components';
import { HEADER_HEIGHT } from './constants';
import { styles } from './styles';

export const getSeasonsFromEpisodes = (episodes: ShowEpisode[]): number[] =>
  episodes.reduce((prev, next) => {
    if (prev.includes(next.season)) {
      return prev;
    }

    return [...prev, next.season];
  }, [] as number[]);

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

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

  const loadingOverlayOpacityAnim = useRef(new Animated.Value(1)).current;

  const episodeListYPosition = useRef(0);

  const navigation = useNavigation();

  const getShow = useCallback(async () => {
    await getShowInformation(POWERPUFF_GIRLS_SHOW_ID).then(setShowInformation);
    await getShowEpisodes(POWERPUFF_GIRLS_SHOW_ID).then(response => {
      setSeasons(getSeasonsFromEpisodes(response));
      setEpisodes(response);
    });

    await sleep(1000);

    Animated.timing(loadingOverlayOpacityAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setShowLoaded(true));
  }, [loadingOverlayOpacityAnim]);

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

  const onPressEpisode = useCallback(
    (episode: ShowEpisode) => {
      navigation.navigate('ShowEpisodeInformation', { episode });
    },
    [navigation],
  );

  const renderEpisodes = useCallback(() => {
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
  }, [episodes, selectedSeason, onPressEpisode]);

  const onSelectSeason = useCallback((season: number) => {
    setSelectedSeason(season);
  }, []);

  const onDismissMenu = useCallback(() => {
    setShowSeasonsMenu(false);
  }, [setShowSeasonsMenu]);

  const getHeroContainerDescription = useCallback(() => {
    if (showInformation) {
      const { premiered, genres } = showInformation;

      return `${getYearFromPremieredDate(premiered)} — ${separateGenresByComma(
        genres,
      )}`;
    }

    return '';
  }, [showInformation]);

  const renderLoading = useCallback(() => {
    if (showLoaded) {
      return null;
    }

    return (
      <Animated.View
        style={[
          styles.loadingOverlay,
          {
            opacity: loadingOverlayOpacityAnim,
          },
        ]}>
        <LottieView
          source={spinnerAnimation}
          autoPlay
          loop
          style={{
            width: 150,
            height: 150,
          }}></LottieView>
      </Animated.View>
    );
  }, [showLoaded, loadingOverlayOpacityAnim]);

  const renderContent = useCallback(() => {
    if (!showInformation) {
      return null;
    }

    const { name, image, summary } = showInformation;

    return (
      <>
        <Animated.View
          style={[
            styles.header,
            {
              transform: [{ translateY: headerTranslateYAnim }],
            },
          ]}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>
              {name} - Season {selectedSeason}
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
          title={name}
          imageURI={image.original}
          description={getHeroContainerDescription()}
          onScroll={onScroll}>
          <>
            <View style={styles.heroContent}>
              <Text style={styles.showSummary}>
                {removeHTMLFromString(summary)}
              </Text>
              <View style={styles.heroSeasonSelection}>
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
              {renderEpisodes()}
            </View>
          </>
        </HeroContainer>
      </>
    );
  }, [
    showInformation,
    getHeroContainerDescription,
    headerTranslateYAnim,
    onDismissMenu,
    onScroll,
    onSelectSeason,
    renderEpisodes,
    seasons,
    selectedSeason,
    showSeasonsMenu,
  ]);

  return (
    <>
      {renderLoading()}
      {renderContent()}
    </>
  );
};
