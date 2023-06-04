import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import userImage from "../../assets/images/userImage.jpeg"
import { colors } from "../infrastructure/theme/colors";
import { FontAwesome } from '@expo/vector-icons';
import styled from "styled-components";
import { launchImagePicker, uploadImageAsync } from "./utils/image-picker-helper";
import { updateSignInUserData } from "./utils/actions/auth-actions";
import { useDispatch } from "react-redux";
import { updateLoggedInUserData } from "../../store/auth-slice";
import { ActivityIndicator } from "react-native-paper";

export const ProfileImage = props => {
    const source = props.uri ? { uri: props.uri } : userImage;
    const userId = props.userId;
    const dispatch = useDispatch();

    const [image, setImage] = useState(source);
    const [isloading, setIsloading] = useState(false)

    const pickImage = async () => {
        try {
            const tempUri = await launchImagePicker();

            if (!tempUri) return;

            setIsloading(true);
            const uploadUrl = await uploadImageAsync(tempUri);
            setIsloading(false);

            if (!uploadUrl) {
                throw new Error("could not upload the image");
            };

            const newData = { profilePicture: uploadUrl }

            await updateSignInUserData(userId, newData);
            dispatch(updateLoggedInUserData({ newData }))

            setImage({ uri: uploadUrl });

        } catch (error) {
            setIsloading(false);
            console.log(error);
        };
    };

    return (
        <TouchableOpacity onPress={pickImage} >

            {
                isloading ?
                    <LoadingContainer height={props.size} width={props.size} >
                        <ActivityIndicator size="small" color={colors.primary} />
                    </LoadingContainer> :
                    <Image
                        style={{ ...styles.image, ...{ width: props.size, height: props.size } }}
                        source={image} />
            }

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

const LoadingContainer = styled.View.attrs(props => ({
    height: props.height,
    width: props.width
}))`
justify-content: center;
align-items: center;
`;