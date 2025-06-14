import { EStoriesType } from 'enum/stories.enum';
import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
    fetchNewStories: null,
    fetchNewStoriesSuccess: ['ids'],
    fetchNewStoriesFailure: ['error'],

    fetchTopStories: null,
    fetchTopStoriesSuccess: ['ids'],
    fetchTopStoriesFailure: ['error'],

    fetchBestStories: null,
    fetchBestStoriesSuccess: ['ids'],
    fetchBestStoriesFailure: ['error'],

    fetchStoriesByIds: ['ids', 'storiesType', 'limitQuery'],
    fetchStoriesByIdsSuccess: ['stories', 'storiesType', 'limitQuery'],
    fetchStoriesByIdsFailure: ['error'],

    fetchStoriesComments: ['ids', 'limitQuery'],
    fetchStoriesCommentsSuccess: ['comments', 'limitQuery'],
    fetchStoriesCommentsFailure: ['error'],
    clearStoriesComments: null,
});

export const StoriesTypes = Types;
export default Creators;

/* ------------- State Types ------------- */
export interface StoriesState {
    newStoriesIds: any[] | any;
    newStories: any[] | any;
    isFetchingNewStories: boolean;
    errorFetchNewStories?: string | null;

    topStoriesIds: any[] | any;
    topStories: any[] | any;
    isFetchingTopStories: boolean;
    errorFetchTopStories?: string | null;

    bestStoriesIds: any[] | any;
    bestStories: any[] | any;
    isFetchingBestStories: boolean;
    errorFetchBestStories?: string | null;

    isFetchingStoriesByIds: boolean;
    errorFetchStoriesByIds?: string | null;

    commentsByParentId: any;
    commentsEntities: any;
    isFetchStoriesComments: boolean;

    merge?: (params: object) => any;
}

/* ------------- Initial State ------------- */
export const INITIAL_STATE: StoriesState = Immutable({
    newStoriesIds: [],
    newStories: [],
    isFetchingNewStories: false,
    errorFetchNewStories: null,

    topStoriesIds: [],
    topStories: [],
    isFetchingTopStories: false,
    errorFetchTopStories: null,

    bestStoriesIds: [],
    bestStories: [],
    isFetchingBestStories: false,
    errorFetchBestStories: null,

    isFetchingStoriesByIds: false,
    errorFetchStoriesByIds: null,

    commentsByParentId: {},
    commentsEntities: {},
    isFetchStoriesComments: false,
});

/* ------------- Reducers ------------- */
// * [new]
const fetchNewStories = (state: any) =>
    state.merge({
        isFetchingNewStories: true,
        errorFetchNewStories: null,
    });

const fetchNewStoriesSuccess = (state: any, { ids }: any) =>
    state.merge({
        newStoriesIds: ids,
        isFetchingNewStories: false,
    });

const fetchNewStoriesFailure = (state: any, { error }: any) =>
    state.merge({
        isFetchingNewStories: false,
        errorFetchNewStories: error,
    });

// * [top]
const fetchTopStories = (state: any) =>
    state.merge({
        isFetchingTopStories: true,
        errorFetchTopStories: null,
    });

const fetchTopStoriesSuccess = (state: any, { ids }: any) =>
    state.merge({
        topStoriesIds: ids,
        isFetchingTopStories: false,
    });

const fetchTopStoriesFailure = (state: any, { error }: any) =>
    state.merge({
        isFetchingTopStories: false,
        errorFetchTopStories: error,
    });

// * [best]
const fetchBestStories = (state: any) =>
    state.merge({
        isFetchingBestStories: true,
        error: null,
    });

const fetchBestStoriesSuccess = (state: any, { ids }: any) =>
    state.merge({
        bestStoriesIds: ids,
        isFetchingBestStories: false,
    });

const fetchBestStoriesFailure = (state: any, { error }: any) =>
    state.merge({
        isFetchingBestStories: false,
        errorFetchBestStories: error,
    });

// * [detail]
const fetchStoriesByIds = (state: any) => {
    return state.merge({
        isFetchingStoriesByIds: true,
        errorFetchStoriesByIds: null,
    });
};

const fetchStoriesByIdsSuccess = (
    state: any,
    {
        stories,
        storiesType,
        limitQuery,
    }: {
        stories: any[];
        storiesType: EStoriesType;
        limitQuery: { from: number; limit: number };
    },
) => {
    const keyMap = {
        [EStoriesType.new]: 'newStories',
        [EStoriesType.top]: 'topStories',
        [EStoriesType.best]: 'bestStories',
    };

    const stateKey = keyMap[storiesType];
    if (!stateKey) {
        return state;
    }

    const currentStories = state[stateKey] || [];
    const updatedStories = limitQuery.from === 0 ? stories : [...currentStories, ...stories];

    return state.merge({
        [stateKey]: updatedStories,
        isFetchingStoriesByIds: false,
        errorFetchBestStories: null,
    });
};

const fetchStoriesByIdsFailure = (state: any, { error }: any) =>
    state.merge({
        isFetchingStoriesByIds: false,
        errorFetchStoriesByIds: error,
    });

// * [comment]
const fetchStoriesComments = (state: any) => {
    return state.merge({
        isFetchStoriesComments: true,
    });
};

const fetchStoriesCommentsSuccess = (state: any, { comments }: any) => {
    const mergedComments = state.commentsEntities.asMutable({ deep: true });
    const updatedCommentsByParent = state.commentsByParentId.asMutable({ deep: true });

    comments.forEach((comment: any) => {
        mergedComments[comment.id] = comment;

        const parentId = comment.parent;
        if (parentId) {
            if (!updatedCommentsByParent[parentId]) {
                updatedCommentsByParent[parentId] = [];
            }

            if (!updatedCommentsByParent[parentId].includes(comment.id)) {
                updatedCommentsByParent[parentId].push(comment.id);
            }
        }
    });

    return state.merge({
        isFetchStoriesComments: false,
        commentsEntities: Immutable(mergedComments),
        commentsByParentId: Immutable(updatedCommentsByParent),
    });
};



const fetchStoriesCommentsFailure = (state: any) => {
    return state.merge({
        isFetchStoriesComments: false,
    });
};

const clearStoriesComments = (state: any) => {
    return state.merge({
        commentsEntities: {},
        commentsByParentId: {},
    });
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
    [Types.FETCH_NEW_STORIES]: fetchNewStories,
    [Types.FETCH_NEW_STORIES_SUCCESS]: fetchNewStoriesSuccess,
    [Types.FETCH_NEW_STORIES_FAILURE]: fetchNewStoriesFailure,

    [Types.FETCH_TOP_STORIES]: fetchTopStories,
    [Types.FETCH_TOP_STORIES_SUCCESS]: fetchTopStoriesSuccess,
    [Types.FETCH_TOP_STORIES_FAILURE]: fetchTopStoriesFailure,

    [Types.FETCH_BEST_STORIES]: fetchBestStories,
    [Types.FETCH_BEST_STORIES_SUCCESS]: fetchBestStoriesSuccess,
    [Types.FETCH_BEST_STORIES_FAILURE]: fetchBestStoriesFailure,

    [Types.FETCH_STORIES_BY_IDS]: fetchStoriesByIds,
    [Types.FETCH_STORIES_BY_IDS_SUCCESS]: fetchStoriesByIdsSuccess,
    [Types.FETCH_STORIES_BY_IDS_FAILURE]: fetchStoriesByIdsFailure,

    [Types.FETCH_STORIES_COMMENTS]: fetchStoriesComments,
    [Types.FETCH_STORIES_COMMENTS_SUCCESS]: fetchStoriesCommentsSuccess,
    [Types.FETCH_STORIES_COMMENTS_FAILURE]: fetchStoriesCommentsFailure,
    [Types.CLEAR_STORIES_COMMENTS]: clearStoriesComments,
});
