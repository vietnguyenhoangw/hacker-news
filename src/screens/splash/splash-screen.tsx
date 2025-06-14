import { resetTo } from '@core/services/navigation/navigation-action';
import { myIcons } from 'assets';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image, Text } from 'react-native';

function SplashScreen() {

    useEffect(() => {
        const timeOut = setTimeout(() => {
            resetTo('MainDrawer');
            clearTimeout(timeOut);
        }, 500);
    }, []);

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Image
                testID="image"
                source={myIcons.appIcon}
                style={styles.logo}
                resizeMode="contain"
            />
            <Text style={styles.title}>Hacker News</Text>
        </SafeAreaView>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 6,
    },
    logo: {
        width: 64,
        height: 64,
    },
});
