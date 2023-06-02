import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const StartUpScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: 'center' }} >
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    )
}