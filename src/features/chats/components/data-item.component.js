import React, { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";
import { ProfileImage } from "../../../components/profile-image.component";
import { Container, TextContainer, Title, SubTitle } from "./data-item.styles";

export const DataItem = props => {
    const { title, subTitle, image } = props;

    return (
        <TouchableWithoutFeedback onPress={props.onPress} >
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

