import React, { useCallback, useReducer, useState } from "react";
import { PageTitle } from "../components/page-title.component";
import { PageContainer } from "../../../components/utils/page-container";
import { reducer } from "../../../components/utils/reducers/form_reducer";
import { validateInput } from "../../../components/utils/actions/form_actions";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from "../../account/components/input.component";
import { useSelector } from "react-redux";
import { ActivityIndicator } from "react-native-paper";
import { SubmitButton } from "../../account/components/submit-button.component";
import { updateSignInUserData } from "../../../components/utils/actions/auth-actions";

export const SettingsScreen = () => {
    const [isloading, setIsloading] = useState(false);
    const userData = useSelector(state => state.auth.userData);

    const initialState = {
        inputValues: {
            firstName: userData.firstName || "",
            lastName: userData.lastName || "",
            email: userData.email || "",
            about: userData.about || ""
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

    const saveHandler = async () => {
        const updatedValues = formState.inputValues

        try {
            await updateSignInUserData(userData.userId, updatedValues)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <PageContainer>
            <PageTitle text="Settings" />

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

            {isloading
                ?
                <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 10 }} />
                :
                <SubmitButton
                    title="Save"
                    onPress={saveHandler}
                    disabled={!formState.formIsValid}
                />
            }

        </PageContainer>
    );
};