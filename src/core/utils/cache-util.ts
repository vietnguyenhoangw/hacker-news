import AsyncStorage from '@react-native-async-storage/async-storage';

export enum CacheKeys {
    newStoriesIds = 'newStoriesIds',
    topStoriesIds = 'topStoriesIds',
    bestStoriesIds = 'bestStoriesIds',
}

export const CacheUtil = {
    async setItem(key: string, value: any): Promise<any> {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
        }
    },

    async getItem(key: string): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error(`Error getting ${key}:`, error);
            return null;
        }
    },

    async removeItem(key: string): Promise<any> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error(`Error removing ${key}:`, error);
        }
    },


    async getCachedIds(key: CacheKeys): Promise<{hash: string, ids: number[] | null}> {
        return await CacheUtil.getItem(key);
    },

    async cacheIds(key: CacheKeys, objectVal: {hash: string, ids: number[]}): Promise<void> {
        await CacheUtil.setItem(key, objectVal);
    },
};
