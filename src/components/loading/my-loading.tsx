import React from 'react';
import { ActivityIndicator } from 'react-native';

const MyLoading = ({
    isLoading = false,
    size,
}: {
    isLoading: boolean;
    size?: any;
}) => {
    return isLoading ? (
        <ActivityIndicator testID="my-loading" size={size || 'small'} />
    ) : null;
};

export default MyLoading;
