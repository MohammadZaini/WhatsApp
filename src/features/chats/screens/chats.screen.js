import React from "react";
import { Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components";
import { View } from "react-native";

const ChatsBackground = styled.ImageBackground.attrs({
    source: require('../../../../assets/droplet.jpeg')
})`
    height: 100%;
    width: 100%;
    flex: 1
`

export const ChatsScreen = () => {
    return (
        <SafeAreaView edges={['bottom']} style={{ flex: 1 }} >
            <ChatsBackground>

            </ChatsBackground>
            <Button title="Camera" />
            <TextInput />
            <Button title="Image" />
        </SafeAreaView>
    );
};