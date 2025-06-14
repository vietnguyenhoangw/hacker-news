/**
 *
 *
 *
 *
 * Welcome to first entry point of the app.
 * This is the root component of our app, where we config
 * base of app Statusbar, redux's provider, root screen.
 *
 */
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigation } from '../core/services/navigation/app-navigation';
import { ThemeProvider } from '@rneui/themed';
import store from '@store/redux/config/store';
import NetworkStatus from '@components/network/network-status';

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const App: () => any = () => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <View style={styles.container}>
                    <NetworkStatus />
                    <AppNavigation />
                </View>
            </ThemeProvider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    statusBar: { height: STATUSBAR_HEIGHT },
    stagingText: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: 'red',
    },
});

export default App;
