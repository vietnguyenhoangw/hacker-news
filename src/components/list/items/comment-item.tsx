import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

dayjs.extend(relativeTime);

interface ICommentItem {
    item: any;
    commentsEntities: any;
    onLoadReplies?: (parentId: number, kids: number[]) => void;
}

const CommentItem = ({ item, commentsEntities, onLoadReplies }: ICommentItem) => {
    const { width } = useWindowDimensions();

    const validKids = (item.kids || []).filter((id: any) => id !== item.id);

    const replies = validKids
        .map((id: any) => commentsEntities[id])
        .filter((reply: any) => reply && reply.id !== item.id);

    const hasUnloadedReplies = validKids.some((id: any) => !commentsEntities[id]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.author}>{item.by}</Text>
                <Text style={styles.time}>{dayjs.unix(item.time).fromNow()}</Text>
            </View>

            <RenderHtml
                contentWidth={width - 32}
                source={{ html: item.text || '' }}
                baseStyle={styles.commentText}
            />

            {validKids.length > 0 && hasUnloadedReplies && (
                <TouchableOpacity
                    onPress={() =>
                        onLoadReplies?.(
                            item.id,
                            validKids.filter((id: any) => !commentsEntities[id])
                        )
                    }
                    style={styles.replyButton}
                >
                    <Text style={styles.replyText}>View {validKids.length} replies</Text>
                </TouchableOpacity>
            )}

            {replies.length > 0 && (
                <View style={styles.repliesContainer}>
                    {replies.map((reply: any) => (
                        <CommentItem
                            key={reply.id}
                            item={reply}
                            commentsEntities={commentsEntities}
                            onLoadReplies={onLoadReplies}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginVertical: 6,
        marginHorizontal: 12,
        padding: 12,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    author: {
        fontWeight: 'bold',
        color: '#333',
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    commentText: {
        fontSize: 14,
        color: '#333',
        marginTop: 12,
    },
    replyButton: {
        marginTop: 8,
        paddingVertical: 4,
    },
    replyText: {
        color: '#0066cc',
        fontWeight: '500',
    },
    repliesContainer: {
        marginTop: 8,
        paddingLeft: 12,
        borderLeftWidth: 1,
        borderColor: '#ddd',
    },
});

export default CommentItem;
