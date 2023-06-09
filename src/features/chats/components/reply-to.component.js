import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";
import { AntDesign } from '@expo/vector-icons';

export const ReplyTo = props => {
    const { text, user, onCancel } = props;
    const name = `${user.firstName} ${user.lastName}`;

    return <Container>
        <TextContainer>
            <Name numberOfLines={1} >{name}</Name>
            <Text numberOfLines={1} >{text}</Text>
        </TextContainer>

        <TouchableOpacity onPress={onCancel} >
            <AntDesign name="closecircle" size={24} color={colors.red} />
        </TouchableOpacity>
    </Container>
};

const Container = styled.View`
    background-color: ${colors.extraLightGrey};
    padding: 8px;
    flex-direction: row;
    align-items: center;
    border-left-color: ${colors.blue};
    border-left-width: 4px;
`;

const TextContainer = styled.View`
    flex: 1;
    margin-right: 5px;
`;

const Name = styled.Text.attrs(props => ({
    numberOfLines: props.numberOfLines
}))`
    color: ${colors.blue};
    letter-spacing: 0.3px;
`;

