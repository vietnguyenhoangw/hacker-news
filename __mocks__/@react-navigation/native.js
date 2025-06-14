export const NavigationContainer = ({ children }) => children;
export const useNavigation = () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
});
