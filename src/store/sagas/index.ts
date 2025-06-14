import { all, takeLatest } from 'redux-saga/effects';
import { StoriesTypes } from '@store/redux/stories-redux';
import {
    fetchBestStoriesSaga,
    fetchNewStoriesSaga,
    fetchTopStoriesSaga,
    fetchStoriesByIdsSaga,
    fetchStoriesCommentsSaga,
} from './stories-saga';
import { StoriesApi } from '@core/services/api/stories-api';

export default function* rootSaga() {
    yield all([
        takeLatest(StoriesTypes.FETCH_NEW_STORIES, fetchNewStoriesSaga, StoriesApi.getNewStories),
        takeLatest(StoriesTypes.FETCH_TOP_STORIES, fetchTopStoriesSaga, StoriesApi.getTopStories),
        takeLatest(StoriesTypes.FETCH_BEST_STORIES, fetchBestStoriesSaga, StoriesApi.getBestStories),
        takeLatest(StoriesTypes.FETCH_STORIES_BY_IDS, fetchStoriesByIdsSaga, StoriesApi.getItem),
        takeLatest(StoriesTypes.FETCH_STORIES_COMMENTS, fetchStoriesCommentsSaga, StoriesApi.getItem),
    ]);
}
