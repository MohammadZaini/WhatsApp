import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import styled from "styled-components";
import { ProfileImage } from "../../../components/profile-image.component";
import { colors } from "../../../infrastructure/theme/colors";
export const DataItem = props => {

    const { title, subTitle, image } = props;

    return (
        <TouchableWithoutFeedback>
            <Container>
                <ProfileImage size={40} uri={image} />
                <TextContainer>
                    <Title
                        numberOfLines={1}
                    >{title}
                    </Title>

                    <SubTitle
                        numberOfLines={1}
                    >{subTitle}
                    </SubTitle>
                </TextContainer>
            </Container>
        </TouchableWithoutFeedback>
    )
};

const Container = styled.View`
    flex-direction: row;
    padding-vertical: 7px;
    border-bottom-color: ${colors.extraLightGrey};
    border-bottom-width: 1px;
    align-items: center;
    min-height: 50px;
`;

const TextContainer = styled.View`
    margin-left: 14px;
`;

const Title = styled.Text.attrs(props => ({
    numberOfLines: props.numberOfLines,
}))`
    font-size: 16px;
    letter-spacing: 0.3px;
`;

const SubTitle = styled.Text.attrs(props => ({
    numberOfLines: props.numberOfLines,
}))`
    font-size: 16px;
    letter-spacing: 0.3px;
    color: ${colors.grey}
`;
