import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as useTopStoriesHook from '@hooks/useTopStories';
import TopStoriesScreen from '../top-stories-screen';

const mockNavigation = {
    openDrawer: jest.fn(),
};

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockNavigation,
}));

const mockHookData = {
    stories: [],
    isLoading: false,
    isLoadMore: false,
    onLoadMore: jest.fn(),
    onRefresh: jest.fn(),
    error: null,
};

describe('TopStoriesScreen', () => {
    beforeEach(() => {
        jest.spyOn(useTopStoriesHook, 'useTopStories').mockReturnValue(mockHookData);
    });

    it('renders title and header', () => {
        const { getByText } = render(<TopStoriesScreen />);
        expect(getByText('Hacker News')).toBeTruthy();
        expect(getByText('Top Stories')).toBeTruthy();
    });

    it('open drawer when menu pressed', () => {
        const { getByTestId } = render(<TopStoriesScreen />);
        fireEvent.press(getByTestId('header-left-icon'));
        expect(mockNavigation.openDrawer).toHaveBeenCalled();
    });
});
