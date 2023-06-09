import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

export const SearchBarContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${colors.extraLightGrey};
    height: 30px;
    margin-vertical: 8px;
    padding-horizontal: 8px;
    padding-vertical: 5px;
    border-radius: 5px;
`;

export const SearchInput = styled.TextInput.attrs(props => ({
    placeholder: "Search",
    value: props.value,
    onChangeText: props.onChangeText
}))`
    margin-left: 8px;
    font-size: 15px;
    width: 100%;
`;

export const UsersContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;  
`;

export const DefaultText = styled.Text`
    margin-top: 20px;
    color: ${colors.textColor};
    letter-spacing: 0.3px;
`;

export const LoadingContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;
export const ChatNameContainer = styled.View`
    padding-vertical: 10px;
`;

export const AddParticipantsContainer = styled.View`
    width: 100%;
    padding-horizontal: 10px;
    padding-vertical: 15px;
    background-color: ${colors.nearlyWhite}
    flex-direction: row;
    border-radius: 2px;
`;
export const AddParticipantsInput = styled.TextInput.attrs(props => ({
    placeholder: props.placeholder,
    autoCorrect: props.autoCorrect,
    autoComplete: props.autoComplete,
    onChangeText: props.onChangeText,
    value: props.value
}))`
    color: ${colors.textColor};
    width: 100%;
    letter-spacing: 0.3px;
`;