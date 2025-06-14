import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoriesActions } from '@store/redux/config';
import { EStoriesType } from 'enum/stories.enum';

export const useNewStories = () => {
    const dispatch = useDispatch();
    const storiesState = useSelector((state: any) => state.stories);
    const {
        newStoriesIds,
        newStories,
        isFetchingStoriesByIds,
        isFetchingNewStories,
        errorFetchNewStories,
    } = storiesState;

    const [limitQuery, setLimitQuery] = useState({ from: 0, limit: 10 });

    useEffect(() => {
        dispatch(StoriesActions.fetchNewStories());
    }, [dispatch]);

    useEffect(() => {
        if (newStoriesIds?.length) {
            const idsToFetch = newStoriesIds.slice(limitQuery.from, limitQuery.limit);
            dispatch(
                StoriesActions.fetchStoriesByIds(
                    idsToFetch,
                    EStoriesType.new,
                    limitQuery
                )
            );
        }
    }, [newStoriesIds, dispatch, limitQuery]);

    const handleLoadMore = () => {
        if (!isFetchingStoriesByIds && newStoriesIds.length > newStories.length) {
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
        stories: newStories,
        isLoading: (isFetchingStoriesByIds || isFetchingNewStories) && limitQuery.from === 0,
        isLoadMore: (isFetchingStoriesByIds || isFetchingNewStories) && limitQuery.from > 0,
        onLoadMore: handleLoadMore,
        onRefresh: handleRefresh,
        error: errorFetchNewStories,
    };
};
