import { NavigationState } from '@react-navigation/routers';
import { CommonActions } from '@react-navigation/native';
import { navigationRef } from './app-navigation';

export function getActiveRouteName(state: NavigationState | undefined) {
    if (state) {
        const route: any = state.routes[state.index];
        if (route.state) {
            return getActiveRouteName(route.state);
        }
        return route.name;
    }
}

export const screenTracking = (state: NavigationState | undefined) => {
    const currentRouteName = getActiveRouteName(state);
    console.log(`=== NAVIGATE To: ${currentRouteName}`);
};

export const navigate = (routerName: string, params: object | undefined) => {
    navigationRef.current?.navigate(routerName, params);
};

export const goBack = () => {
    navigationRef.current?.goBack();
};

export const resetTo = (routerName: string) => {
    navigationRef.current.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: routerName }],
        })
    );
};
