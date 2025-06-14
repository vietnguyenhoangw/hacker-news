import Reactotron from 'reactotron-react-native';

if (__DEV__) {
    Reactotron
        .configure({ name: 'React Native App', port: 9090 })
        .useReactNative()
        .connect();
}

export default Reactotron;
