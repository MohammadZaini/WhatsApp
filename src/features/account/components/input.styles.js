import styled from "styled-components";
import { TextInput } from "react-native";
import { colors } from "../../../infrastructure/theme/colors";

export const Container = styled.View`
    width: 100%;
`;

export const FieldLabel = styled.Text`
    margin-vertical: 8px;
    letter-spacing: 0.3px;
    color: ${colors.textColor};
`;

export const InputContainer = styled.View`
    width: 100%;
    background-color: red;
    padding-horizontal: 10px;
    padding-vertical: 15px;
    border-radius: 2px;
    background-color: ${colors.nearlyWhite};
    flex-direction: row;
    align-items: center;
`;

export const AuthInput = styled(TextInput)`
    color: ${colors.textColor};
    flex: 1;
    letter-spacing: 0.3px;
    paddingTop: 0 ;
`

export const ErrorContainer = styled.View`
    margin-vertical: 5px;
`

export const ErrorText = styled.Text`
    color: red;
    font-size: 13px;
    letter-spacing: 0.3px;    
`;