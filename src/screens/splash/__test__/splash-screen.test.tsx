import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../splash-screen';

jest.mock('@core/services/navigation/navigation-action', () => ({
    resetTo: jest.fn(),
}));

jest.mock('assets', () => ({
    myIcons: {
        appIcon: 'mock-icon',
    },
}));

describe('SplashScreen', () => {
    it('render logo image', () => {
        const { getByTestId } = render(<SplashScreen />);
        const image = getByTestId('image');
        expect(image).toBeTruthy();
    });
});
