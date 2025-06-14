import MyHeader from '@components/header/my-header';
import StoriesList from '@components/list/stories-list';
import { useTopStories } from '@hooks/useTopStories';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import StoriesTitle from './components/stories-title';

const TopStoriesScreen = () => {
    const navigation: any = useNavigation();
    const {
        stories,
        isLoading,
        isLoadMore,
        onLoadMore,
        onRefresh,
        error,
    } = useTopStories();

    return (
        <View>
            <MyHeader
                title="Hacker News"
                leftIconName="menu"
                onLeftPress={() => navigation.openDrawer()}
            />
            <StoriesTitle title={'Top Stories'} />
            <StoriesList
                isLoading={isLoading}
                isLoadMore={isLoadMore}
                stories={stories}
                onLoadMore={onLoadMore}
                onRefresh={onRefresh}
                error={error}
            />
        </View>
    );
};

export default TopStoriesScreen;
