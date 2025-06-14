import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { ERouteName } from 'enum/navigation.enum';
import VersionInfo from '@components/app/my-app-version';

export function CustomDrawerContent(props: any) {
    const navigation: any = props.navigation;

    const drawerItems = [
        { label: 'New Stories', screen: ERouteName.NewStories },
        { label: 'Top Stories', screen: ERouteName.TopStories },
        { label: 'Best Stories', screen: ERouteName.BestStories },
    ];

    return (
        <DrawerContentScrollView
            {...props}
            contentContainerStyle={styles.container}
        >
            <View style={styles.customItems}>
                {drawerItems.map((item, index) => (
                    <Pressable
                        key={index}
                        android_ripple={{ color: '#e0e0e0', borderless: false }}
                        style={({ pressed }) => [
                            styles.item,
                            pressed && styles.itemPressed,
                        ]}
                        onPress={() => navigation.navigate(item.screen)}
                    >
                        <Text style={styles.itemText}>{item.label}</Text>
                    </Pressable>
                ))}
            </View>
            <View style={styles.versionContainer}>
                <VersionInfo />
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    customItems: {
        marginTop: 40,
        paddingTop: 12,
        borderTopWidth: 1,
        borderColor: '#e0e0e0',
    },
    item: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 8,
        backgroundColor: '#f9f9f9',
    },
    itemPressed: {
        backgroundColor: '#e6e6e6',
    },
    itemText: {
        fontSize: 16,
        color: '#1c1b1f',
        fontWeight: '500',
    },
    versionContainer: {
        marginTop: 'auto',
    },
});
