import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const stylesPortrait = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',         // portrait -> coluna
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#FFA500',      // fundo portrait
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  top:    { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFA07A' },
  middle: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F08080' },
  bottom: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF6347' },
  modeText: { position: 'absolute', bottom: 12, alignSelf: 'center', color: '#111' },
});
export default stylesPortrait;
