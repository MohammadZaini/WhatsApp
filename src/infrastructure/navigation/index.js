import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ChatsNavigator } from "./chats.navigator";
import { AuthScreen } from "../../features/account/screens/auth.screen";

export const Navigation = () => {
    const isAuth = false;
    return (
        <NavigationContainer>
            {isAuth && <ChatsNavigator />}
            {!isAuth && <AuthScreen />}
        </NavigationContainer>
    );
};