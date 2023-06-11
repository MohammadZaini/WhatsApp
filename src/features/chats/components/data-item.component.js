import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ProfileImage } from "../../../components/profile-image.component";
import { Container, TextContainer, Title, SubTitle, AddIconContainer } from "./data-item.styles";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../../infrastructure/theme/colors";
import { AntDesign } from '@expo/vector-icons';

const imageSize = 40;

export const DataItem = props => {
    const { title, subTitle, image, type, isChecked, icon } = props;

    return (
        <TouchableWithoutFeedback onPress={props.onPress} >
            <Container>
                {
                    !icon &&
                    <ProfileImage
                        size={imageSize}
                        uri={image} />
                }

                {
                    icon &&
                    <AddIconContainer height={imageSize} width={imageSize} >
                        <AntDesign name={icon} size={20} color={colors.blue} />
                    </AddIconContainer>
                }

                <TextContainer>

                    <Text
                        style={{ ...styles.title, ...{ color: type === "button" ? colors.blue : colors.textColor } }}
                        numberOfLines={1}
                    >{title}
                    </Text>

                    {
                        subTitle &&
                        <SubTitle
                            numberOfLines={1}
                        >{subTitle}
                        </SubTitle>
                    }

                </TextContainer>

                {
                    type === "checkbox" &&
                    <View style={{ ...styles.iconContainer, ...isChecked && styles.checkedStyle }} >
                        <Ionicons name="checkmark" size={18} color="white" />
                    </View>
                }

                {
                    type === "link" &&
                    <View >
                        <Ionicons name="chevron-forward-outline" size={18} color={colors.grey} />
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
    },
    title: {
        fontSize: 16,
        letterSpacing: 0.3
    }
})

