import React from 'react';
import {
    FlatList,
    StyleSheet,
    ActivityIndicator,
    View,
    RefreshControl,
    Text,
    TouchableOpacity,
} from 'react-native';
import StoryItem from './items/story-item';
import MyLoading from '@components/loading/my-loading';
import { navigate } from '@core/services/navigation/navigation-action';
import { ERouteName } from 'enum/navigation.enum';

interface IStoriesList {
    stories: any;
    onLoadMore?: () => void;
    onRefresh?: () => void;
    isLoading?: boolean;
    isLoadMore?: boolean;
    error?: string;
}

const StoriesList = ({
    stories,
    onLoadMore,
    onRefresh,
    isLoading = false,
    isLoadMore = false,
    error,
}: IStoriesList) => {
    if (stories.length === 0 && isLoading) {
        return <MyLoading isLoading={true} />;
    }

    if (error) {
        return (
            <View>
                <Text style={styles.title}>{'Have error while fetching data !'}</Text>
                <TouchableOpacity onPress={onRefresh}>
                    <Text style={[styles.title, styles.tryAgain]}>{'Try again'}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (stories.length === 0 && !isLoading) {
        return <Text style={styles.title}>{'Empty List'}</Text>;
    }

    return (
        <FlatList
            testID="flat-list"
            data={stories}
            keyExtractor={item => item?.id?.toString()}
            renderItem={({ item, index }) => {
                return (
                    <View>
                        <StoryItem
                            testID={`story-item-${item.id}`}
                            item={item}
                            onPress={() => {
                                navigate(ERouteName.StoryDetail, { item: item });
                            }}
                        />
                        {isLoadMore && index === stories.length - 1 && (
                            <View style={styles.footer}>
                                <ActivityIndicator size="small" />
                            </View>
                        )}
                    </View>
                );
            }}
            initialNumToRender={10}
            contentContainerStyle={styles.contentContainer}
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.1}
            refreshControl={
                <RefreshControl
                    refreshing={isLoading && stories.length > 0}
                    onRefresh={onRefresh}
                    tintColor="#888"
                />
            }
        />
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 120,
    },
    footer: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    tryAgain: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 0,
    },
});

export default StoriesList;
