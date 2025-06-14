import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatus = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        return () => unsubscribe();
    }, []);

    return (
        <Modal visible={isOffline} transparent animationType="slide">
            <View style={styles.container}>
                <View style={styles.popup}>
                    <Text style={styles.text}>Your network is disconnected</Text>
                </View>
            </View>
        </Modal>
    );
};

export default NetworkStatus;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 40,
    },
    popup: {
        backgroundColor: '#ff5252',
        padding: 12,
        borderRadius: 8,
        elevation: 3,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
});
