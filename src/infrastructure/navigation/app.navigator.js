import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";
import { Ionicons } from '@expo/vector-icons';
import { ChatsList } from "../../features/chats/screens/chats-list.screen";

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false, headerShadowVisible: false }} >
            <Tab.Screen
                name="Chats"
                component={ChatsList}
                options={{ tabBarIcon: () => <Ionicons name="chatbubble-outline" size={24} color="black" /> }} />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarIcon: () => <Ionicons name="settings-outline" size={24} color="black" /> }} />
        </Tab.Navigator>
    );
};