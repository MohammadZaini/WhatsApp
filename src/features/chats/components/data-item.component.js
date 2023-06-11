import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { ProfileImage } from "../../../components/profile-image.component";
import { Container, TextContainer, Title, SubTitle } from "./data-item.styles";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../../infrastructure/theme/colors";

export const DataItem = props => {
    const { title, subTitle, image, type, isChecked } = props;

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
                {
                    type === "checkbox" &&
                    <View style={{ ...styles.iconContainer, ...isChecked && styles.checkedStyle }} >
                        <Ionicons name="checkmark" size={18} color="white" />
                    </View>

                }
            </Container>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    iconContainer: {
        borderWidth: 1,
        borderRadius: 50,
        borderColor: colors.lightGrey,
        backgroundColor: 'white'
    },
    checkedStyle: {
        backgroundColor: colors.primary,
        borderColor: 'transparent'
    }
})

