import React from "react";
import { Image, StyleSheet, View } from "react-native";
import userImage from "../../assets/images/userImage.jpeg"
import { colors } from "../infrastructure/theme/colors";
import { FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";

export const ProfileImage = props => {
    return (
        <View>
            <Image
                style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
                source={userImage} />

            <IconContainer>
                <FontAwesome name="pencil" size={20} color="black" />
            </IconContainer>
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        borderRadius: 50,
        borderColor: colors.grey,
        borderWidth: 1,
    }
});

const IconContainer = styled.View`
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: ${colors.lightGrey};
    border-radius: 20px;
    padding: 8px;
`;