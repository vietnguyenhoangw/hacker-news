/**
 * @format
 */

import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    Reactotron
        .configure({ name: 'React Native App', port: 9090 })
        .useReactNative()
        .connect();

    console.tron = Reactotron;
    Reactotron.log('✅ Reactotron is ready!');
}

import { AppRegistry } from 'react-native';
import App from './src/screens/app.tsx';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
