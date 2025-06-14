import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screenTracking } from './navigation-action';
import { CustomDrawerContent } from '@components/drawable/my-drawable';
import { BestStoriesScreen, NewStoriesScreen, StoryDetailScreen, TopStoriesScreen } from '@screens/stories';
import SplashScreen from '@screens/splash/splash-screen';

export const navigationRef: any = React.createRef();

const SCREEN_OPTIONS = {
    headerShown: false,
    drawerStyle: {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
    },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const renderDrawerContent = (props: any) => <CustomDrawerContent {...props} />;

function DrawerNavigation() {
    return (
        <Drawer.Navigator screenOptions={SCREEN_OPTIONS} drawerContent={renderDrawerContent}>
            <Drawer.Screen name="NewStoriesScreen" component={NewStoriesScreen} />
            <Drawer.Screen name="BestStoriesScreen" component={BestStoriesScreen} />
            <Drawer.Screen name="TopStoriesScreen" component={TopStoriesScreen} />
        </Drawer.Navigator>
    );
}

function AppNavigation() {
    return (
        <NavigationContainer ref={navigationRef} onStateChange={screenTracking}>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
                <Stack.Screen name="MainDrawer" component={DrawerNavigation} />
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="StoryDetailScreen" component={StoryDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export { AppNavigation };
