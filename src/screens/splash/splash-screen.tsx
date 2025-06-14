import { resetTo } from '@core/services/navigation/navigation-action';
import { myIcons } from 'assets';
import { ERouteName } from 'enum/navigation.enum';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';

function SplashScreen() {

    useEffect(() => {
        const timeOut = setTimeout(() => {
            resetTo(ERouteName.Splash);
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
    logo: {
        width: 200,
        height: 200,
    },
});
