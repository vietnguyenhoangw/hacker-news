import React from 'react';
import { StyleSheet, Text } from 'react-native';

const StoriesTitle = ({ title = 'title' }: { title: string }) => {
    return <Text style={styles.title}>{title}</Text>;
};

export default StoriesTitle;

const styles = StyleSheet.create({
    title: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
        textAlign: 'right',
        padding: 8,
    },
});
