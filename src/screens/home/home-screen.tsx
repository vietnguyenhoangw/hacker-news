import MyHeader from '@components/header/my-header';
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const navigation: any = useNavigation();
    return (
        <View>
            <MyHeader title="Hacker News" leftIconName="menu" onLeftPress={() => navigation.openDrawer()} />
        </View>
    );
};

export default HomeScreen;
