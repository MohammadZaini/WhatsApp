import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import userImage from "../../assets/images/userImage.jpeg"
import { colors } from "../infrastructure/theme/colors";
import { FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";
import { launchImagePicker } from "./utils/image-picker-helper";

export const ProfileImage = props => {
    const source = props.uri ? { uri: props.uri } : userImage;

    const [image, setImage] = useState(source);

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) return;

            setImage({ uri: tempUri });

        } catch (error) {
            console.log(error);
        };
    };

    return (
        <TouchableOpacity onPress={pickImage} >
            <Image
                style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
                source={image} />

            <IconContainer>
                <FontAwesome name="pencil" size={20} color="black" />
            </IconContainer>
        </TouchableOpacity>
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