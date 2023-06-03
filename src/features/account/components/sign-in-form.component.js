import React, { useState, useReducer, useCallback, useEffect } from "react";
import { Input } from "./input.component";
import { SubmitButton } from "./submit-button.component";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { validateInput } from "../../../components/utils/actions/form_actions";
import { reducer } from "../../../components/utils/reducers/form_reducer";
import { signIn } from "../../../components/utils/actions/auth-actions";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";
import { Alert } from "react-native";
import { useDispatch } from "react-redux";

const isTestMode = true;

const initialState = {
    inputValues: {
        email: isTestMode ? "zaini@outlook.com" : "",
        password: isTestMode ? "zaini123" : "",
    },
    inputValidities: {
        email: isTestMode,
        password: isTestMode,
    },
    formIsValid: isTestMode
};

export const SignInForm = () => {
    const [isloading, setIsloading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured", error);
        }
    }, [error]);

    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result, inputValue })
    }, [dispatchFormState]);

    const authHandler = useCallback(async () => {
        try {
            setIsloading(true)
            const action = signIn(
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
                id="email"
                label="Email"
                icon="email-outline"
                iconPack={MaterialCommunityIcons}
                autoCapitalize="none"
                keyboardType="email-address"
                onInputChanged={inputChangedHandler}
                value={formState.inputValues.email}
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
                value={formState.inputValues.password}
                errorText={formState.inputValidities["password"]}
            />

            {isloading
                ?
                <ActivityIndicator size="small" color={colors.primary} style={{ marginTop: 10 }} />
                :
                <SubmitButton
                    title="Sign In"
                    onPress={authHandler}
                    disabled={!formState.formIsValid}
                />
            }
        </>
    );
};