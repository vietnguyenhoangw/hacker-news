import DeviceInfo from 'react-native-device-info';

export const getAppVersion = () => {
    const version = DeviceInfo.getVersion();
    const build = DeviceInfo.getBuildNumber();
    return `hackernews_v${version}.(${build})`;
};
