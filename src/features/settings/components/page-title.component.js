import React from "react";
import styled from "styled-components";
import { colors } from "../../../infrastructure/theme/colors";

const Title = styled.Text`
    font-size: 28px;
    color: ${colors.textColor};
    letter-spacing: 0.3px;
`;

const Container = styled.View`
    margin-bottom: 10px;
`;

export const PageTitle = props => {
    return <Container>
        <Title>{props.text}</Title>
    </Container>
};