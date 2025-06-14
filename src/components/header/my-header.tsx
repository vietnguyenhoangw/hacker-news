import React from 'react';
import { Header } from '@rneui/themed';
import { Icon } from '@rneui/themed';
import { IMyHeader } from './my-header.type';

const MyHeader = ({
    title = 'Title',
    leftIconName = 'arrow-back',
    leftIconType = 'material',
    onLeftPress,
    rightIconName,
    rightIconType = 'material',
    onRightPress,
    backgroundColor = '#6200ee',
    titleColor = '#fff',
}: IMyHeader) => {
    return (
        <Header
            backgroundColor={backgroundColor}
            centerComponent={{ text: title, style: { color: titleColor, fontSize: 18, fontWeight: 'bold' } }}
            leftComponent={
                onLeftPress && (
                    <Icon
                        testID="header-left-icon"
                        name={leftIconName}
                        type={leftIconType}
                        color={titleColor}
                        onPress={onLeftPress}
                    />
                )
            }
            rightComponent={
                onRightPress && rightIconName ? (
                    <Icon
                        testID="header-right-icon"
                        name={rightIconName}
                        type={rightIconType}
                        color={titleColor}
                        onPress={onRightPress}
                    />
                ) : <></>
            }
        />
    );
};

export default MyHeader;
