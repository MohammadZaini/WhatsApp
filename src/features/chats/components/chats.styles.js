import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const ChatsBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/droplet.jpeg')
})`
    height: 100%;
    width: 100%;
    flex: 1
`
export const ChatInput = styled.TextInput.attrs(props => ({
    value: props.value,
    onChangeText: props.onChangeText
}))`
    flex: 1;
    border-radius: 20px;
    border-width: 1px;
    margin: 8px;
    padding: 6px;
    border-color: ${colors.grey};
`
export const BottomView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-horizontal: 10px;
`