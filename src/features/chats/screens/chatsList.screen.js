import React from "react";
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

export const ChatsList = ({ navigation }) => {
    return (
        <SafeAreaView>
            <Text>Chats List</Text>
            <Button title="Go To Chats" onPress={() => navigation.navigate('Chats1')} />
        </SafeAreaView>
    );
};