import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

import stylesPortrait from '../../src/styles/stylesPortrait';
import stylesLandscape from '../../src/styles/stylesLandscape';

type Mode = '' | 'portrait' | 'landscape';

export default function Orientacao() {
  const [mode, setMode] = useState<Mode>('');

  useEffect(() => {
    // leitura inicial
    readOrientation();

    // listener de mudança de orientação
    const subscription = ScreenOrientation.addOrientationChangeListener(({ orientationInfo }) => {
      if (
        orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
        orientationInfo.orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN
      ) {
        setMode('portrait');
      } else if (
        orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        orientationInfo.orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        setMode('landscape');
      }
    });

    // limpeza do listener
    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const readOrientation = async () => {
    const o = await ScreenOrientation.getOrientationAsync();
    if (o === ScreenOrientation.Orientation.PORTRAIT_UP || o === ScreenOrientation.Orientation.PORTRAIT_DOWN) {
      setMode('portrait');
    } else if (o === ScreenOrientation.Orientation.LANDSCAPE_LEFT || o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT) {
      setMode('landscape');
    }
  };

  // alterna estilos por orientação
  const S = mode === 'landscape' ? stylesLandscape : stylesPortrait;

  return (
    <SafeAreaView style={S.container}>
      <View style={S.top}><Text>Top</Text></View>
      <View style={S.middle}><Text>Middle</Text></View>
      <View style={S.bottom}><Text>Bottom</Text></View>
      <Text style={S.modeText}>Tela em modo {mode || '...'}</Text>
    </SafeAreaView>
  );
}
