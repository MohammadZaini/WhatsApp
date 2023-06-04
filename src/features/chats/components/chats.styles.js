import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";
import { Feather } from '@expo/vector-icons';

export const ChatsBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/images/droplet.jpeg')
})`
    height: 100%;
    width: 100%;
    flex: 1
`;

export const ChatInput = styled.TextInput.attrs(props => ({
    value: props.value,
    onChangeText: props.onChangeText
}))`
    flex: 1;
    border-radius: 20px;
    border-width: 1px;
    margin: 8px;
    padding: 6px;
    border-color: ${colors.lightGrey};
`;

export const BottomView = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-horizontal: 10px;
`;

export const SendIcon = styled(Feather).attrs({
    name: "send",
    size: 20,
    color: "white"
})`
    border-width: 1px;
    border-radius: 50px; 
    padding: 7px;
    background-color: ${colors.blue}; 
    border-color: ${colors.blue};
`;