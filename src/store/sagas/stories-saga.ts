import { all, call, put } from 'redux-saga/effects';
import { StoriesActions } from '@store/redux/config/index';
import { HashUtil } from '@core/utils/hash-util';
import { CacheKeys, CacheUtil } from '@core/utils/cache-util';

export function* fetchNewStoriesSaga(api: any): any {
    try {
        const response = yield call(api);
        if (Array.isArray(response) && response.length >= 0) {
            const hash = HashUtil.hashIdList(response);
            const previousCache = yield call(CacheUtil.getCachedIds, CacheKeys.newStoriesIds);
            let ids = previousCache ? previousCache?.ids : [];

            const shouldUpdateCache = !previousCache || !HashUtil.compareHashId(response, previousCache.hash);
            if (shouldUpdateCache) {
                ids = response;
                yield call(CacheUtil.cacheIds, CacheKeys.newStoriesIds, {
                    hash,
                    ids,
                });
            }
            yield put(StoriesActions.fetchNewStoriesSuccess(ids));
        } else {
            yield put(StoriesActions.fetchNewStoriesFailure(response?.error));
        }
    } catch (error) {
        yield put(StoriesActions.fetchNewStoriesFailure(error));
    }
}

export function* fetchTopStoriesSaga(api: any): any {
    try {
        const response = yield call(api);
        if (Array.isArray(response) && response.length >= 0) {
            const hash = HashUtil.hashIdList(response);
            const previousCache = yield call(CacheUtil.getCachedIds, CacheKeys.topStoriesIds);
            let ids = previousCache ? previousCache?.ids : [];

            const shouldUpdateCache = !previousCache || !HashUtil.compareHashId(response, previousCache.hash);
            if (shouldUpdateCache) {
                ids = response;
                yield call(CacheUtil.cacheIds, CacheKeys.topStoriesIds, {
                    hash,
                    ids,
                });
            }
            yield put(StoriesActions.fetchTopStoriesSuccess(ids));
        } else {
            yield put(StoriesActions.fetchTopStoriesFailure(response?.error));
        }
    } catch (error) {
        yield put(StoriesActions.fetchTopStoriesFailure(error));
    }
}

export function* fetchBestStoriesSaga(api: any): any {
    try {
        const response = yield call(api);
        if (Array.isArray(response) && response.length >= 0) {
            const hash = HashUtil.hashIdList(response);
            const previousCache = yield call(CacheUtil.getCachedIds, CacheKeys.bestStoriesIds);
            let ids = previousCache ? previousCache?.ids : [];

            const shouldUpdateCache = !previousCache || !HashUtil.compareHashId(response, previousCache.hash);
            if (shouldUpdateCache) {
                ids = response;
                yield call(CacheUtil.cacheIds, CacheKeys.bestStoriesIds, {
                    hash,
                    ids: ids,
                });
            }
            yield put(StoriesActions.fetchBestStoriesSuccess(ids));
        }
        else {
            yield put(StoriesActions.fetchBestStoriesFailure(response?.error));
        }
    } catch (error) {
        yield put(StoriesActions.fetchBestStoriesFailure(error));
    }
}

export function* fetchStoriesByIdsSaga(api: any, action: any): any {
    try {
        const { ids, storiesType, limitQuery } = action;
        const stories = yield all(ids.map((id: any) => call(api, id)));
        const filteredStories = stories.filter(Boolean);
        yield put(StoriesActions.fetchStoriesByIdsSuccess(filteredStories, storiesType, limitQuery));
    } catch (error) {
        yield put(StoriesActions.fetchStoriesByIdsFailure(error));
    }
}

export function* fetchStoriesCommentsSaga(api: any, action: any): any {
    try {
        const { ids, limitQuery } = action;
        const comments = yield all(ids.map((id: any) => call(api, id)));
        const filteredComments = comments.filter(Boolean);
        yield put(StoriesActions.fetchStoriesCommentsSuccess(filteredComments, limitQuery));
    } catch (error) {
        yield put(StoriesActions.fetchStoriesCommentsFailure(error));
    }
}

