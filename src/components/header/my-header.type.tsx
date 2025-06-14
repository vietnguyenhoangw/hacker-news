export interface IMyHeader {
    title: string,
    leftIconName?: string,
    leftIconType?: string,
    onLeftPress?: () => void,
    rightIconName?: string,
    rightIconType?: string,
    onRightPress?: () => void,
    backgroundColor?: string,
    titleColor?: string,
}
