import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ChatsNavigator } from "./chats.navigator";

export const Navigation = () => {
    return (
        <NavigationContainer>
            <ChatsNavigator />
        </NavigationContainer>
    )
}