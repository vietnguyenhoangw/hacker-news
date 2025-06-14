import React from 'react';
import {
    View,
    Linking,
    StyleSheet,
    ScrollView,
    useWindowDimensions,
} from 'react-native';
import { Card, Text, Button, Icon } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import MyHeader from '@components/header/my-header';
import { goBack } from '@core/services/navigation/navigation-action';
import RenderHtml from 'react-native-render-html';
import { useStoriesComments } from '@hooks/useStoriesComments';
import CommentList from '@components/list/comments-list';

const StoryDetailScreen = () => {
    const route = useRoute<any>();
    const { item } = route.params;
    const { width } = useWindowDimensions();

    const {
        commentsEntities,
        commentsByParentId,
        fetchComment,
        isLoading,
        loadMoreComments,
        handleLoadReplies,
    } = useStoriesComments(item?.kids ?? []);

    const handleOpenURL = () => {
        if (item.url) {
            Linking.openURL(item.url);
        }
    };

    return (
        <View style={styles.root}>
            <MyHeader
                title="Hacker News"
                leftIconName="arrow-back"
                onLeftPress={goBack}
            />
            <ScrollView style={styles.container}>
                <Card containerStyle={styles.card}>
                    <Card.Title style={styles.title}>{item.title}</Card.Title>
                    <Card.Divider />

                    <View style={styles.infoRow}>
                        <Icon name="person" type="material" size={18} />
                        <Text style={styles.infoText}>Author: {item.by}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="star" type="material" size={18} />
                        <Text style={styles.infoText}>Score: {item.score}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="chat" type="material" size={18} />
                        <Text style={styles.infoText}>Comments: {item.descendants}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Icon name="access-time" type="material" size={18} />
                        <Text style={styles.infoText}>
                            Posted: {dayjs.unix(item.time).format('MMM D, YYYY HH:mm')}
                        </Text>
                    </View>

                    {item.text ? (
                        <View style={styles.contentContainer}>
                            <Text style={styles.sectionTitle}>Content:</Text>
                            <RenderHtml
                                contentWidth={width}
                                source={{ html: item.text }}
                                baseStyle={styles.htmlText}
                                enableExperimentalMarginCollapsing={true}
                            />
                        </View>
                    ) : null}

                    {item?.url ? (
                        <Button
                            icon={
                                <Icon name="open-in-browser" type="material" color="#fff" />
                            }
                            title="  Open External Link"
                            onPress={handleOpenURL}
                            containerStyle={styles.buttonContainer}
                        />
                    ) : (
                        <Text style={styles.noLink}>No external link</Text>
                    )}
                </Card>

                {item?.kids?.length > 0 && (
                    <View>
                        {!commentsByParentId[item.id] ? (
                            <View style={styles.commentToggleContainer}>
                                <Button loading={isLoading} type="outline" onPress={fetchComment}>
                                    <View style={styles.buttonContent}>
                                        <Text style={styles.buttonText}>
                                            View {item.kids.length} Comments
                                        </Text>
                                    </View>
                                </Button>
                            </View>
                        ) : <Text style={[styles.buttonText, styles.showedComments]}>
                            Displayed Comments
                        </Text>}
                        <CommentList
                            commentIds={commentsByParentId.asMutable({ deep: true })[item.id] || []}
                            commentsEntities={commentsEntities.asMutable({ deep: true })}
                            onLoadReplies={handleLoadReplies}
                        />
                        {(commentsByParentId[item.id]?.length || 0) < (item.kids?.length || 0) && commentsByParentId[item.id] && (
                            <Button loading={isLoading} onPress={loadMoreComments}>Load more comment</Button>
                        )}
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    container: {
        flex: 1,
        backgroundColor: '#fafafa',
    },
    card: {
        borderRadius: 12,
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    infoText: {
        fontSize: 16,
        marginLeft: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    htmlText: {
        fontSize: 15,
        lineHeight: 22,
    },
    contentContainer: {
        marginTop: 16,
    },
    buttonContainer: {
        marginTop: 20,
    },
    noLink: {
        fontSize: 16,
        marginTop: 20,
        textAlign: 'center',
        color: '#888',
    },
    commentToggleContainer: {
        marginHorizontal: 16,
        marginTop: 24,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 14,
        color: '#2089dc',
        marginRight: 4,
        textAlign: 'center',
    },
    showedComments: {
        marginTop: 12,
    },
});

export default StoryDetailScreen;
