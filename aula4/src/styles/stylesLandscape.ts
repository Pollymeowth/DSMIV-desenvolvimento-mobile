import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const stylesLandscape = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',            // landscape -> linha
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#1E90FF',      // fundo landscape
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  top:    { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#87CEFA' },
  middle: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00BFFF' },
  bottom: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#6495ED' },
  modeText: { position: 'absolute', bottom: 12, alignSelf: 'center', color: '#fff' },
});
export default stylesLandscape;
