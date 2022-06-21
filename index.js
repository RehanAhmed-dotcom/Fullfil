/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
// import TrackPlayer from 'react-native-track-player';
import {name as appName} from './app.json';
// TrackPlayer.registerPlaybackService(() => require('./service'));
AppRegistry.registerComponent(appName, () => App);
