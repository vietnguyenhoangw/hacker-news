import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoriesActions } from '@store/redux/config';
import { EStoriesType } from 'enum/stories.enum';

export const useBestStories = () => {
    const dispatch = useDispatch();
    const storiesState = useSelector((state: any) => state.stories);
    const {
        bestStoriesIds,
        bestStories,
        isFetchingStoriesByIds,
        isFetchingBestStories,
        errorFetchBestStories,
    } = storiesState;

    const [limitQuery, setLimitQuery] = useState({ from: 0, limit: 10 });

    useEffect(() => {
        dispatch(StoriesActions.fetchBestStories());
    }, [dispatch]);

    useEffect(() => {
        if (bestStoriesIds?.length) {
            const idsToFetch = bestStoriesIds.slice(limitQuery.from, limitQuery.limit);
            dispatch(
                StoriesActions.fetchStoriesByIds(
                    idsToFetch,
                    EStoriesType.best,
                    limitQuery
                )
            );
        }
    }, [bestStoriesIds, dispatch, limitQuery]);

    const handleLoadMore = () => {
        if (!isFetchingStoriesByIds && bestStoriesIds.length > bestStories.length) {
            setLimitQuery(prev => ({
                from: prev.limit,
                limit: prev.limit + 10,
            }));
        }
    };

    const handleRefresh = () => {
        setLimitQuery({ from: 0, limit: 10 });
    };

    return {
        stories: bestStories,
        isLoading: (isFetchingStoriesByIds || isFetchingBestStories) && limitQuery.from === 0,
        isLoadMore: (isFetchingStoriesByIds || isFetchingBestStories) && limitQuery.from > 0,
        onLoadMore: handleLoadMore,
        onRefresh: handleRefresh,
        error: errorFetchBestStories,
    };
};
