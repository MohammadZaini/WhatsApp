import React from "react";
import { Container } from "./page-title.styles";
import { Title } from "react-native-paper";

export const PageTitle = props => {
    return <Container>
        <Title>{props.text}</Title>
    </Container>
};