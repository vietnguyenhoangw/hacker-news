import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoriesActions } from '@store/redux/config';

export const useStoriesComments = (storiesComment: [any]) => {
    const dispatch = useDispatch();
    const storiesState = useSelector((state: any) => state.stories);

    const { isFetchStoriesComments, commentsByParentId, commentsEntities } = storiesState;

    const [limitQuery, setLimitQuery] = useState({ from: 0, limit: 10 });

    useEffect(() => {
        return () => {
            dispatch(StoriesActions.clearStoriesComments());
        };
    }, [dispatch]);

    const fetchComment = () => {
        if (storiesComment?.length) {
            const idsToFetch = storiesComment.slice(
                limitQuery.from,
                limitQuery.limit,
            );
            dispatch(StoriesActions.fetchStoriesComments(idsToFetch, limitQuery));
        }
    };

    const loadMoreComments = () => {
        if (!isFetchStoriesComments) {
            const nextQuery = {
                from: limitQuery.limit,
                limit: limitQuery.limit + 10,
            };

            const idsToFetch = storiesComment.slice(
                nextQuery.from,
                nextQuery.limit,
            );

            dispatch(StoriesActions.fetchStoriesComments(idsToFetch, nextQuery));
            setLimitQuery(nextQuery);
        }
    };

    const handleLoadReplies = (parentCommentId: any, kids: any) => {
        if (!isFetchStoriesComments && kids && Array.isArray(kids)) {
            const kidsNotLoaded = kids.filter((id: number) => {
                return id !== parentCommentId && !commentsEntities?.[id];
            });

            if (kidsNotLoaded.length > 0) {
                dispatch(
                    StoriesActions.fetchStoriesComments(kidsNotLoaded, {
                        from: 0,
                        limit: kidsNotLoaded.length,
                    })
                );
            }
        }
    };


    return {
        isLoading: isFetchStoriesComments,
        commentsEntities: commentsEntities,
        commentsByParentId: commentsByParentId,
        fetchComment: fetchComment,
        loadMoreComments: loadMoreComments,
        handleLoadReplies: handleLoadReplies,
    };
};
