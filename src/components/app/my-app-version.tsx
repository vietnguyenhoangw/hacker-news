import { getAppVersion } from '@core/utils/app-util';
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const VersionInfo = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.versionText}>{getAppVersion()}</Text>
        </View>
    );
};

export default VersionInfo;

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-start',
        marginTop: 10,
    },
    versionText: {
        fontSize: 12,
        color: '#888',
    },
});
