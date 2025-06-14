import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    useWindowDimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

interface StoryItemProps {
    item: any;
    onPress?: () => void;
    testID: string,
}

const StoryItem = ({ item, onPress, testID }: StoryItemProps) => {
    const { width } = useWindowDimensions();

    const date = item.time ? new Date(item.time * 1000).toLocaleString() : 'N/A';
    const isDisabled = item.deleted || item.dead;

    return (
        <Pressable
            testID={testID}
            onPress={onPress}
            disabled={isDisabled}
            style={({ pressed }) => [
                styles.container,
                pressed && !isDisabled && styles.pressed,
            ]}>
            <View style={styles.row}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {(item.by?.[0] ?? '?').toUpperCase()}
                    </Text>
                </View>

                <View style={styles.content}>
                    {item.title ? (
                        <RenderHTML
                            contentWidth={width - 72}
                            source={{ html: item.title }}
                            baseStyle={styles.titleHTML}
                        />
                    ) : (
                        <Text style={styles.titleText}>Item #{item.id}</Text>
                    )}

                    <Text style={styles.subtitle}>
                        {item.by && `by ${item.by}`} - {item.score ?? 0} points -{' '}
                        {item.descendants ?? 0} comments
                    </Text>

                    <Text style={styles.dateText}>{date}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default StoryItem;

const AVATAR_SIZE = 40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    pressed: {
        backgroundColor: '#f0f0f0',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    avatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        borderRadius: AVATAR_SIZE / 2,
        backgroundColor: '#1976d2',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    titleText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    titleHTML: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 4,
    },
    subtitle: {
        color: '#555',
        marginTop: 4,
    },
    dateText: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
});
