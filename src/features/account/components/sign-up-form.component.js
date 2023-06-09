import React, { useState, useEffect, useCallback, useReducer } from "react";
import { Input } from "./input.component";
import { SubmitButton } from "./submit-button.component";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { validateInput } from "../../../components/utils/actions/form_actions";
import { reducer } from "../../../components/utils/reducers/form_reducer";
import { signUp } from "../../../components/utils/actions/auth-actions";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { useDispatch } from "react-redux";

const initialState = {
    inputValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    },

    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false
};

export const SignUpForm = () => {
    const [error, setError] = useState();
    const [isloading, setIsloading] = useState(false);
    const [formState, dispatchFormState] = useReducer(reducer, initialState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured", error);
        }
    }, [error]);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue })
    }, [dispatchFormState]);

    const authHandler = useCallback(async () => {
        try {
            setIsloading(true)
            const action = signUp(
                formState.inputValues.firstName,
                formState.inputValues.lastName,
                formState.inputValues.email,
                formState.inputValues.password,
            );
            setError(null)
            await dispatch(action)
        } catch (error) {
            setError(error.message)
            setIsloading(false)
        };
    }, [dispatch, formState]);

    return (
        <>
            <Input
                id="firstName"
                label="First name"
                icon="user-o"
                iconPack={FontAwesome}
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["firstName"]}
            />

            <Input
                id="lastName"
                label="Last name"
                icon="user-o"
                iconPack={FontAwesome}
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["lastName"]}
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
            />

            <Input
                id="password"
                label="Password"
                icon="lock"
                iconPack={FontAwesome}
                secureTextEntry
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
                errorText={formState.inputValidities["password"]}
            />

            {isloading
                ?
                <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 10 }} />
                :
                <SubmitButton
                    title="Sign Up"
                    onPress={authHandler}
                    disabled={!formState.formIsValid}
                />
            }
        </>
    );
};