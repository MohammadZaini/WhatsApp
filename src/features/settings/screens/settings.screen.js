import React, { useCallback, useReducer, useState } from "react";
import { PageTitle } from "../components/page-title.component";
import { PageContainer } from "../../../components/utils/page-container";
import { reducer } from "../../../components/utils/reducers/form_reducer";
import { validateInput } from "../../../components/utils/actions/form_actions";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from "../../account/components/input.component";
import { useDispatch, useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { SubmitButton } from "../../account/components/submit-button.component";
import { updateSignInUserData, userLogout } from "../../../components/utils/actions/auth-actions";
import { colors } from "../../../infrastructure/theme/colors";
import { updateLoggedInUserData } from "../../../../store/auth-slice";
import { Text, ScrollView } from "react-native";
import { ProfileImage } from "../../../components/profile-image.component";
import styled from "styled-components";
import { DataItem } from "../../chats/components/data-item.component";
import { useMemo } from "react";

export const SettingsScreen = props => {
    const dispatch = useDispatch();
    const [isloading, setIsloading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const userData = useSelector(state => state.auth.userData);
    const starredMessages = useSelector(state => state.messages.starredMessages ?? {});

    const storedStarredMessages = useMemo(() => {
        let result = [];

        const chats = Object.values(starredMessages);

        chats.forEach(chat => {
            const chatMessages = Object.values(chat);
            result = result.concat(chatMessages);
        });

        return result;
    }, [starredMessages])


    const firstName = userData.firstName || "";
    const lastName = userData.lastName || "";
    const email = userData.email || "";
    const about = userData.about || "";

    const initialState = {
        inputValues: {
            firstName,
            lastName,
            email,
            about
        },

        inputValidities: {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            about: undefined,
        },
        formIsValid: false
    };

    const [formState, dispatchFormState] = useReducer(reducer, initialState)

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue })
    }, [dispatchFormState]);

    const saveHandler = useCallback(async () => {
        const updatedValues = formState.inputValues
        try {
            setIsloading(true);
            await updateSignInUserData(userData.userId, updatedValues)
            dispatch(updateLoggedInUserData({ newData: updatedValues }));

            setShowSuccessMessage(true)

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

        } catch (error) {
            console.log(error);
        } finally {
            setIsloading(false);
        };
    }, [formState, dispatch]);

    const hasChanges = () => {
        const currentValues = formState.inputValues;

        return currentValues.firstName != firstName ||
            currentValues.lastName != lastName ||
            currentValues.email != email ||
            currentValues.about != about
    };

    return (
        <PageContainer>
            <PageTitle text="Settings" />
            <ScrollViewContainer>
                <ProfileImage
                    size={80}
                    userId={userData.userId}
                    uri={userData.profilePicture}
                    showEditButton={true}
                />

                <Input
                    id="firstName"
                    label="First name"
                    icon="user-o"
                    iconPack={FontAwesome}
                    autoCapitalize="none"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities["firstName"]}
                    initialValue={userData.firstName}
                />

                <Input
                    id="lastName"
                    label="Last name"
                    icon="user-o"
                    iconPack={FontAwesome}
                    autoCapitalize="none"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities["lastName"]}
                    initialValue={userData.lastName}
                />

                <Input
                    id="email"
                    label="Email"
                    icon="email-outline"
                    iconPack={MaterialCommunityIcons}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities["email"]}
                    initialValue={userData.email}
                />

                <Input
                    id="about"
                    label="About"
                    icon="exclamation"
                    iconPack={FontAwesome}
                    autoCapitalize="none"
                    onInputChanged={inputChangedHandler}
                    errorText={formState.inputValidities["about"]}
                    initialValue={userData.about}
                />

                {
                    showSuccessMessage && <Text>Saved!</Text>
                }

                {isloading
                    ?
                    <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 10 }} />
                    :
                    hasChanges() &&
                    <SubmitButton
                        title="Save"
                        onPress={saveHandler}
                        disabled={!formState.formIsValid}
                    />
                }

                <DataItem
                    type="link"
                    title="Starred messages"
                    hideImage={true}
                    onPress={() => props.navigation.navigate("DataList", { title: "Starred messages", data: storedStarredMessages, type: "messages" })}
                />

                <SubmitButton
                    title="Log out"
                    onPress={() => dispatch(userLogout(userData))}
                    color={colors.red}
                />
            </ScrollViewContainer>

        </PageContainer>
    );
};

const ScrollViewContainer = styled(ScrollView).attrs({
    contentContainerStyle: {
        alignItems: 'center'
    }
})`
    flex: 1;
`;