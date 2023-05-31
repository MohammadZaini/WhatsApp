import React, { useCallback, useReducer } from "react";
import { Input } from "./input.component";
import { SubmitButton } from "./submit-button.component";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { validateInput } from "../../../components/utilts/actions/form_actions";
import { reducer } from "../../../components/utilts/reducers/form_reducer";

const initialState = {
    inputValidities: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
    },
    formIsValid: false
};

export const SignUpForm = () => {
    const [formState, dispatchFormState] = useReducer(reducer, initialState);

    const inputChangedHandler = useCallback((inputId, inputValue) => {
        const result = validateInput(inputId, inputValue);
        dispatchFormState({ inputId, validationResult: result })
    }, [dispatchFormState]);

    return (
        <>
            <Input
                id="FirstName"
                label="First name"
                icon="user-o"
                iconPack={FontAwesome}
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}
            />

            <Input
                id="LastName"
                label="Last name"
                icon="user-o"
                iconPack={FontAwesome}
                autoCapitalize="none"
                onInputChanged={inputChangedHandler}

            />
            <Input
                id="email"
                label="Email"
                icon="email-outline"
                iconPack={MaterialCommunityIcons}
                keyboardType="email-address"
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
                title="Sign Up"
                disabled={!formState.formIsValid}
            />
        </>
    )
}