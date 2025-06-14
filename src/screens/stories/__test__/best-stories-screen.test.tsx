import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import * as useBestStoriesHook from '@hooks/useBestStories';
import BestStoriesScreen from '../best-stories-screen';

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

describe('BestStoriesScreen', () => {
    beforeEach(() => {
        jest.spyOn(useBestStoriesHook, 'useBestStories').mockReturnValue(mockHookData);
    });

    it('renders title and header', () => {
        const { getByText } = render(<BestStoriesScreen />);
        expect(getByText('Hacker News')).toBeTruthy();
        expect(getByText('Best Stories')).toBeTruthy();
    });

    it('open drawer when menu pressed', () => {
        const { getByTestId } = render(<BestStoriesScreen />);
        fireEvent.press(getByTestId('header-left-icon'));
        expect(mockNavigation.openDrawer).toHaveBeenCalled();
    });
});
