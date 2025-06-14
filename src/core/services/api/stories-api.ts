import { apiClient } from './client/api-client';

export const StoriesApi = {
    getItem: async (id: number) => {
        try {
            return await apiClient(`item/${id}.json`);
        } catch (err) {
            handleApiError(`Get item ${id}`, err);
        }
    },

    getTopStories: async () => {
        try {
            return await apiClient('topstories.json');
        } catch (err) {
            handleApiError('Get top stories', err);
        }
    },

    getBestStories: async () => {
        try {
            return await apiClient('beststories.json');
        } catch (err) {
            handleApiError('Get best stories', err);
        }
    },

    getNewStories: async () => {
        try {
            return await apiClient('newstories.json');
        } catch (err) {
            handleApiError('Get new stories', err);
        }
    },
};

const handleApiError = (action: string, err: any) => {
    console.error(`[StoriesApi] Failed to ${action}:`, err?.message || err);
    throw err;
};
