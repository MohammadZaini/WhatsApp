import React from "react";
import { Input } from "./input.component";
import { SubmitButton } from "./submit-button.component";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const SignInForm = () => {
    return (
        <>
            <Input
                label="Email"
                icon="email-outline"
                iconPack={MaterialCommunityIcons} />

            <Input
                label="Password"
                icon="lock"
                iconPack={FontAwesome} />

            <SubmitButton title="Sign In" />
        </>
    );
};