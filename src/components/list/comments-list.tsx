import React from 'react';
import { View } from 'react-native';
import CommentItem from './items/comment-item';


interface ICommentList {
    commentIds: number[];
    commentsEntities: any;
    onLoadReplies?: (parentId: number, kids: number[]) => void;
}

const CommentList = ({ commentIds = [], commentsEntities = {}, onLoadReplies }: ICommentList) => {
    return (
        <View>
            {commentIds
                .filter((id) => {
                    const item = commentsEntities[id];
                    return item && !(item.kids || []).includes(id);
                })
                .map((id) => {
                    const item = commentsEntities[id];
                    return (
                        <View key={id.toString()}>
                            <CommentItem
                                item={item}
                                commentsEntities={commentsEntities}
                                onLoadReplies={onLoadReplies}
                            />
                        </View>
                    );
                })}
        </View>
    );
};

export default CommentList;
