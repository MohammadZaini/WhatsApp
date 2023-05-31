import React, { useReducer, useCallback } from "react";
import { Input } from "./input.component";
import { SubmitButton } from "./submit-button.component";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { validateInput } from "../../../components/utilts/actions/form_actions";
import { reducer } from "../../../components/utilts/reducers/form_reducer";

const initialState = {
    inputValidities: {
        email: false,
        password: false,
    },
    formIsValid: false
};

export const SignInForm = () => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result })
    }, [dispatchFormState]);


    return (
        <>
            <Input
                id="email"
                label="Email"
                icon="email-outline"
                iconPack={MaterialCommunityIcons}
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
            />

            <Input
                id="password"
                label="Password"
                icon="lock"
                iconPack={FontAwesome}
                secureTextEntry
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
            />

            <SubmitButton
                title="Sign In"
                disabled={!formState.formIsValid}
            />
        </>
    );
};