import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useRoute } from '@react-navigation/native';
import StoryDetailScreen from '../story-detail-screen';
import * as useStoriesCommentsHook from '@hooks/useStoriesComments';
import { Linking } from 'react-native';
import { goBack } from '@core/services/navigation/navigation-action';
import Immutable from 'seamless-immutable';

jest.mock('@react-navigation/native', () => ({
    useRoute: jest.fn(),
}));
jest.mock('react-native-render-html', () => 'RenderHtml');
jest.mock('@core/services/navigation/navigation-action', () => ({
    goBack: jest.fn(),
}));

const mockItem = {
    'by': 'dhouston',
    'descendants': 71,
    'id': 8863,
    'kids': [8952, 9224],
    'score': 111,
    'time': 1175714200,
    'title': 'My YC app: Dropbox - Throw away your USB drive',
    'type': 'story',
    'text': '...',
    'url': 'http://www.getdropbox.com/u/2/screencast.html',
};

const mockCommentData = {
    commentsEntities: Immutable({
        '44275644': {
            'by': 'jayantrao94',
            'id': 44275644,
            'kids': [
                44275822,
                44275788,
            ],
            'parent': 44275643,
            'text': 'I’m a design agency founder + a recent indie builder, and I recently launched a tool that uses AI to roast website designs. Brutally. Trust me when I say it&#x27;s brutal.<p>It’s called UGH.design (gotta roll the eyes when u see crappy designs), this AI gives your site a score (the higher the UGH, the worse you did) and flags your worst design crimes, like “Font Size Felony” or “Contrast Denial.”<p>Right now you can:<p>- Upload up to 5 screenshots\n- Choose your roast level (Honest, Brutal, Undigestable)\n- Get a roast with scoring + violations\n- See it on the public gallery<p>I’d love feedback from from everyone here:<p>- The concept itself (too weird? too fun?)\n- How to improve the roast logic or interface',
            'time': 1749899552,
            'type': 'comment',
        },
    }),
    commentsByParentId: Immutable({
        44275643: [
            44275798,
            44275835,
            44275821,
            44275834,
            44275812,
            44275823,
            44275804,
            44275644,
        ],
    }),
    fetchComment: jest.fn(),
    isLoading: false,
    loadMoreComments: jest.fn(),
    handleLoadReplies: jest.fn(),
};

describe('StoryDetailScreen', () => {
    beforeEach(() => {
        (useRoute as jest.Mock).mockReturnValue({ params: { item: mockItem } });
        jest.spyOn(useStoriesCommentsHook, 'useStoriesComments').mockReturnValue(mockCommentData);
        jest.spyOn(Linking, 'openURL').mockImplementation(jest.fn());
    });

    it('renders title and header', () => {
        const { getByText } = render(<StoryDetailScreen />);
        expect(getByText('Hacker News')).toBeTruthy();
    });

    it('go back when left icon header pressed', () => {
        const { getByTestId } = render(<StoryDetailScreen />);
        fireEvent.press(getByTestId('header-left-icon'));
        expect(goBack).toHaveBeenCalled();
    });

    it('renders story details', () => {
        const { getByText } = render(<StoryDetailScreen />);
        expect(getByText(mockItem.title)).toBeTruthy();
        expect(getByText(`Author: ${mockItem.by}`)).toBeTruthy();
        expect(getByText(`Score: ${mockItem.score}`)).toBeTruthy();
        expect(getByText(`Comments: ${mockItem.descendants}`)).toBeTruthy();
        expect(getByText(/Posted:/)).toBeTruthy();
    });

    it('renders content if item.text exists', () => {
        const { getByText } = render(<StoryDetailScreen />);
        expect(getByText('Content:')).toBeTruthy();
    });

    it('call openURL link button pressed', () => {
        const { getByText } = render(<StoryDetailScreen />);
        fireEvent.press(getByText('Open External Link'));
        expect(Linking.openURL).toHaveBeenCalledWith(mockItem.url);
    });

    it('call fetchComment when press View Comments', () => {
        const { getByText } = render(<StoryDetailScreen />);
        fireEvent.press(getByText(/View 2 Comments/));
        expect(mockCommentData.fetchComment).toHaveBeenCalled();
    });
});
