import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StoriesList from '../stories-list';
import { navigate } from '@core/services/navigation/navigation-action';
import { ERouteName } from 'enum/navigation.enum';

jest.mock('@core/services/navigation/navigation-action', () => ({
    navigate: jest.fn(),
}));

const mockStories = [
    {
        'by': 'dhouston',
        'descendants': 71,
        'id': 8863,
        'kids': [8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876],
        'score': 111,
        'time': 1175714200,
        'title': 'My YC app: Dropbox - Throw away your USB drive',
        'type': 'story',
        'url': 'http://www.getdropbox.com/u/2/screencast.html',
    },
];

describe('StoriesList', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders loading', () => {
        const { getByTestId } = render(<StoriesList stories={[]} isLoading={true} />);
        expect(getByTestId('my-loading')).toBeTruthy();
    });

    it('renders error message', () => {
        const onRefresh = jest.fn();
        const { getByText } = render(
            <StoriesList stories={[]} error="Error from api" onRefresh={onRefresh} />
        );
        expect(getByText('Have error while fetching data !')).toBeTruthy();
        expect(getByText('Try again')).toBeTruthy();
        fireEvent.press(getByText('Try again'));
        expect(onRefresh).toHaveBeenCalled();
    });

    it('renders empty message', () => {
        const { getByText } = render(<StoriesList stories={[]} isLoading={false} />);
        expect(getByText('Empty List')).toBeTruthy();
    });

    it('renders stories and handles item press', () => {
        const { getByTestId } = render(<StoriesList stories={mockStories} />);
        const item = mockStories[0];

        fireEvent.press(getByTestId(`story-item-${item.id}`));
        expect(navigate).toHaveBeenCalledWith(ERouteName.StoryDetail, {
            item: item,
        });
    });

    it('load more', () => {
        const onLoadMore = jest.fn();
        const { getByTestId } = render(
            <StoriesList stories={mockStories} onLoadMore={onLoadMore} />
        );

        const flatList = getByTestId('flat-list');
        flatList.props.onEndReached();
        expect(onLoadMore).toHaveBeenCalled();
    });

    it('pull to refresh', () => {
        const onRefresh = jest.fn();
        const { getByTestId } = render(
            <StoriesList stories={mockStories} onRefresh={onRefresh} />
        );

        const flatList = getByTestId('flat-list');
        flatList.props.refreshControl.props.onRefresh();
        expect(onRefresh).toHaveBeenCalled();
    });
});
