import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Image, View } from 'react-native';
import LottiewView from 'lottie-react-native';
import {
  spinnerAnimation,
  blossomHeadImage,
  buttercupHeadImage,
  bubblesHeadImage,
} from '@assets';
import {
  styles,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  HEAD_HEIGHT_OFFSET,
  BUTTERCUP_COLOR,
  BLOSSOM_COLOR,
  BUBBLES_COLOR,
} from './styles';

export type LoadingOverlayProps = {
  loaded: boolean;
};

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const LoadingOverlay = ({ loaded }: LoadingOverlayProps) => {
  const [showAnimation, setShowAnimation] = useState(!loaded);

  const spinnerOpacityAnim = useRef(new Animated.Value(1)).current;

  const buttercupTrailHeightAnim = useRef(
    new Animated.Value(WINDOW_HEIGHT + HEAD_HEIGHT_OFFSET * 2),
  ).current;
  const blossomTrailHeightAnim = useRef(
    new Animated.Value(WINDOW_HEIGHT + HEAD_HEIGHT_OFFSET * 2),
  ).current;
  const bubblesTrailHeightAnim = useRef(
    new Animated.Value(WINDOW_HEIGHT + HEAD_HEIGHT_OFFSET * 2),
  ).current;

  const girlsTrailOpacityAnim = useRef(new Animated.Value(1)).current;

  const leftDrawerTranslateXAnim = useRef(new Animated.Value(0)).current;
  const rightDrawerTranslateXAnim = useRef(new Animated.Value(0)).current;

  const onLoaded = useCallback(async () => {
    await sleep(1000);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(spinnerOpacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(buttercupTrailHeightAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(blossomTrailHeightAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bubblesTrailHeightAnim, {
          toValue: 0,
          duration: 1400,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(girlsTrailOpacityAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(leftDrawerTranslateXAnim, {
          toValue: (WINDOW_WIDTH / 2) * -1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(rightDrawerTranslateXAnim, {
          toValue: WINDOW_WIDTH / 2,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => setShowAnimation(false));
  }, [
    blossomTrailHeightAnim,
    bubblesTrailHeightAnim,
    buttercupTrailHeightAnim,
    girlsTrailOpacityAnim,
    leftDrawerTranslateXAnim,
    rightDrawerTranslateXAnim,
    spinnerOpacityAnim,
  ]);

  useEffect(() => {
    if (loaded) {
      onLoaded();
    }
  }, [loaded, onLoaded]);

  const powerpuffGirls = [
    {
      headImage: buttercupHeadImage,
      style: {
        zIndex: 2,
        backgroundColor: BUTTERCUP_COLOR,
        transform: [
          {
            translateY: buttercupTrailHeightAnim,
          },
        ],
      },
      headStyle: styles.buttercupHeadImage,
    },
    {
      headImage: blossomHeadImage,
      style: {
        zIndex: 1,
        backgroundColor: BLOSSOM_COLOR,
        transform: [
          {
            translateY: blossomTrailHeightAnim,
          },
        ],
      },
      headStyle: styles.blossomHeadImage,
    },
    {
      headImage: bubblesHeadImage,
      style: {
        zIndex: 2,
        backgroundColor: BUBBLES_COLOR,
        transform: [
          {
            translateY: bubblesTrailHeightAnim,
          },
        ],
      },
      headStyle: styles.bubblesHeadImage,
    },
  ];

  if (!showAnimation) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.drawer,
          {
            transform: [{ translateX: leftDrawerTranslateXAnim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.drawer,
          {
            marginLeft: '50%',
            transform: [{ translateX: rightDrawerTranslateXAnim }],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.spinnerContainer,
          {
            opacity: spinnerOpacityAnim,
          },
        ]}>
        <LottiewView
          source={spinnerAnimation}
          autoPlay
          loop
          style={styles.spinner}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.girlsContainer,
          {
            opacity: girlsTrailOpacityAnim,
          },
        ]}>
        {powerpuffGirls.map((girl, index) => (
          <Animated.View
            key={`girl-${index}`}
            style={[styles.girlTrail, girl.style]}>
            <Image
              source={girl.headImage}
              style={[
                girl.headStyle,
                {
                  position: 'absolute',
                  top: -25,
                },
              ]}
            />
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
};
