import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoriesActions } from '@store/redux/config';
import { EStoriesType } from 'enum/stories.enum';

export const useTopStories = () => {
    const dispatch = useDispatch();
    const storiesState = useSelector((state: any) => state.stories);
    const {
        topStoriesIds,
        topStories,
        isFetchingStoriesByIds,
        isFetchingTopStories,
        errorFetchTopStories,
    } = storiesState;

    const [limitQuery, setLimitQuery] = useState({ from: 0, limit: 10 });

    useEffect(() => {
        dispatch(StoriesActions.fetchTopStories());
    }, [dispatch]);

    useEffect(() => {
        if (topStoriesIds?.length) {
            const idsToFetch = topStoriesIds.slice(limitQuery.from, limitQuery.limit);
            dispatch(
                StoriesActions.fetchStoriesByIds(
                    idsToFetch,
                    EStoriesType.top,
                    limitQuery
                )
            );
        }
    }, [topStoriesIds, dispatch, limitQuery]);

    const handleLoadMore = () => {
        if (!isFetchingStoriesByIds && topStoriesIds.length > topStories.length) {
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
        stories: topStories,
        isLoading: (isFetchingStoriesByIds || isFetchingTopStories) && limitQuery.from === 0,
        isLoadMore: (isFetchingStoriesByIds || isFetchingTopStories) && limitQuery.from > 0,
        onLoadMore: handleLoadMore,
        onRefresh: handleRefresh,
        error: errorFetchTopStories,
    };
};
