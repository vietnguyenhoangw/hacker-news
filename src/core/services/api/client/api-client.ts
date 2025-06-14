import RNFetchBlob from 'rn-fetch-blob';
import { HACKER_NEWS_URL } from '@env';

const BASE_URL = HACKER_NEWS_URL;

type RnFetchOptions = {
    method?: 'GET' | 'POST';
    headers?: Record<string, string>;
    body?: any;
    raw?: boolean;
};

export const apiClient = async (
    path: string,
    options: RnFetchOptions = {}
): Promise<any> => {
    const { method = 'GET', headers = {}, body, raw = false } = options;
    const url = `${BASE_URL}/${path}`;

    try {
        const response = await RNFetchBlob.config({ trusty: true }).fetch(method, url, headers, body);

        if (raw) {
            return response.data;
        }

        const json = await response.json();
        return json;
    } catch (err: any) {
        console.error('apiClient error:', err.message || err);
        throw err;
    }
};
