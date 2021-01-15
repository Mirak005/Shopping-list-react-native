/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
import 'react-native-get-random-values';

AppRegistry.registerComponent(appName, () => App);
LogBox.ignoreLogs(['Remote debugger']);
