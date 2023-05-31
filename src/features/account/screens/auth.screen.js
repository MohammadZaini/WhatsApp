import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { PageContainer } from "../../../components/utilty/page-container";
import { StyleSheet, Text } from "react-native";

export const AuthScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <PageContainer  >

                <Text>Auth Screen</Text>
            </PageContainer>
        </SafeAreaView>
    );
};