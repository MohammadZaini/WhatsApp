import React, { useEffect } from "react";
import { Text, Button, View } from 'react-native'
import CustomHeaderButton from "../../../components/custom-header-button.component";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

export const ChatsListScreen = props => {

    useEffect(() => {
        props.navigation.setOptions({
            headerRight: () => {
                return <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item
                        title="New chat"
                        iconName="create-outline"
                        onPress={() => { props.navigation.navigate("NewChat") }} />
                </HeaderButtons>
            }
        })
    }, []);

    return (
        <View>
            <Text >Chats List</Text>
            <Button title="Go To Chats" onPress={() => props.navigation.navigate('Chats1')} />
        </View>
    );
};